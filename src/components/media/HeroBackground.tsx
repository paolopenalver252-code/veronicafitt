import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "~/lib/cn";
import { resolved } from "~/lib/pending";
import type { HeroBackground as HeroBackgroundData, MediaSlot } from "~/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { useAutoplayAllowed } from "./useAutoplayAllowed";
import { useVideoControl, VideoToggle } from "./VideoToggle";

/** Desde tablet (768 px) hay vídeo; por debajo, solo imagen. */
const WIDE = "(min-width: 48rem)";
const PORTRAIT = "(orientation: portrait)";

const fit =
  "absolute inset-0 h-full w-full object-cover [object-position:var(--focal-m)] " +
  "md:[object-position:var(--focal-t)] lg:[object-position:var(--focal-d)]";

/**
 * Fondo del hero, como una imagen de fondo cinematográfica:
 * - La imagen (póster en tablet/escritorio, foto vertical en móvil) es el
 *   elemento LCP y se ve al instante.
 * - Desde tablet, el vídeo se descarga solo después del evento `load`, en un
 *   momento ocioso, y sustituye al póster con un fundido cuando ya se
 *   reproduce. En tablet vertical usa la versión vertical si existe.
 * - En móvil, con movimiento reducido, ahorro de datos o conexión lenta, o si
 *   el vídeo falla: se queda la imagen.
 * - Sin material todavía: hueco tonal con la proporción de cada tamaño.
 */
export function HeroBackground({ bg }: { bg: HeroBackgroundData }) {
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useAutoplayAllowed();
  const control = useVideoControl(ref);
  const { autoPlay } = control;
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const video = resolved(bg.video);
  const videoPortrait = bg.videoPortrait ? resolved(bg.videoPortrait) : null;
  const poster = resolved(bg.poster);
  const posterMobile = resolved(bg.posterMobile) ?? poster;

  useEffect(() => {
    if (!allowed || !video) return;
    const wide = window.matchMedia(WIDE);
    const portrait = window.matchMedia(PORTRAIT);
    let ready = false;
    let idleId = 0;

    const update = () => {
      const next = ready && wide.matches ? (portrait.matches && videoPortrait) || video : null;
      setVideoSrc((prev) => (prev === next ? prev : next));
    };
    const onIdle = () => {
      ready = true;
      update();
    };
    const start = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(onIdle, { timeout: 2000 })
        : window.setTimeout(onIdle, 300);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    wide.addEventListener("change", update);
    portrait.addEventListener("change", update);
    return () => {
      window.removeEventListener("load", start);
      wide.removeEventListener("change", update);
      portrait.removeEventListener("change", update);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [allowed, video, videoPortrait]);

  // Cambio de fuente (girar la tablet) o paso a móvil: vuelve el póster hasta que el nuevo vídeo arranque.
  useEffect(() => setPlaying(false), [videoSrc]);

  // Fuera de pantalla, el vídeo se pausa.
  useEffect(() => {
    const el = ref.current;
    if (!el || !videoSrc) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) autoPlay();
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc, autoPlay]);

  const focal = {
    "--focal-m": bg.focal.mobile,
    "--focal-t": bg.focal.tablet,
    "--focal-d": bg.focal.desktop,
  } as CSSProperties;
  const showVideo = videoSrc && !failed;

  return (
    <div className="absolute inset-0" style={focal}>
      {posterMobile ? (
        <picture>
          {poster && <source media={WIDE} srcSet={poster} />}
          <img
            src={posterMobile}
            alt={bg.alt}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className={fit}
          />
        </picture>
      ) : (
        <>
          <MediaPlaceholder slot={placeholder(bg, "mobile")} tone="deep" className="md:hidden" />
          <MediaPlaceholder slot={placeholder(bg, "wide")} tone="deep" className="hidden md:block" />
        </>
      )}

      {showVideo && (
        <video
          key={videoSrc}
          ref={ref}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={cn(fit, "transition-opacity duration-1000", playing ? "opacity-100" : "opacity-0")}
        />
      )}

      {/* Velo para la legibilidad del texto (tablet y escritorio): funde el fondo en el blanco roto. */}
      <div aria-hidden className="hero-veil pointer-events-none absolute inset-0 hidden md:block" />

      {showVideo && playing && (
        <VideoToggle paused={control.paused} onToggle={control.toggle} className="ring-1 ring-grafito/10 md:right-5 md:bottom-5" />
      )}
    </div>
  );
}

/** Hueco reservado con la proporción y el encargo de cada formato. */
function placeholder(bg: HeroBackgroundData, format: "mobile" | "wide"): MediaSlot {
  return format === "mobile"
    ? { id: "hero-mobile", kind: "image", src: bg.posterMobile, width: 1080, height: 1350, alt: bg.alt, brief: bg.brief }
    : { id: "hero", kind: "video", src: bg.video, width: 1920, height: 1080, alt: bg.alt, brief: bg.brief };
}
