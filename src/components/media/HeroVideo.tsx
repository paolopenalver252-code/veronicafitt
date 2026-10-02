import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "~/lib/cn";
import { resolved } from "~/lib/pending";
import type { HeroVideo as HeroVideoData } from "~/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { useAutoplayAllowed } from "./useAutoplayAllowed";
import { useVideoControl, VideoToggle } from "./VideoToggle";

/** Desde tablet (768 px) el póster horizontal; en móvil, la imagen móvil si existe. */
const WIDE = "(min-width: 48rem)";

const fit =
  "absolute inset-0 h-full w-full object-cover [object-position:var(--focal-m)] md:[object-position:var(--focal)]";

/**
 * Vídeo vertical del hero. En tablet y escritorio rellena su marco (9:16, la
 * proporción del Reel); en móvil, el bloque a sangre del hero (con su encuadre).
 * - El póster es el elemento LCP y se ve al instante.
 * - El vídeo empieza a descargarse solo después del evento `load`, en un
 *   momento ocioso, y sustituye al póster con un fundido cuando ya se reproduce.
 * - Con movimiento reducido, ahorro de datos o conexión lenta, o si el vídeo
 *   falla: se queda el póster. Sin material todavía: hueco tonal 9:16.
 */
export function HeroVideo({ hero }: { hero: HeroVideoData }) {
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useAutoplayAllowed();
  const control = useVideoControl(ref);
  const { autoPlay } = control;
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const src = resolved(hero.video);
  const poster = resolved(hero.poster);
  const showVideo = Boolean(load && src && !failed);
  const posterMobile = (hero.posterMobile ? resolved(hero.posterMobile) : null) ?? poster;

  useEffect(() => {
    if (!allowed || !src) return;
    let idleId = 0;
    const start = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setLoad(true), { timeout: 2000 })
        : window.setTimeout(() => setLoad(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [allowed, src]);

  // Fuera de pantalla, el vídeo se pausa.
  useEffect(() => {
    const el = ref.current;
    if (!el || !showVideo) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) autoPlay();
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [showVideo, autoPlay]);

  const focal = { "--focal-m": hero.focalMobile ?? hero.focal, "--focal": hero.focal } as CSSProperties;

  return (
    <div className="absolute inset-0" style={focal}>
      {posterMobile ? (
        <picture>
          {poster && <source media={WIDE} srcSet={poster} />}
          <img src={posterMobile} alt={hero.alt} loading="eager" fetchPriority="high" decoding="sync" className={fit} />
        </picture>
      ) : (
        <MediaPlaceholder
          slot={{ id: "hero", kind: "video", src: hero.video, width: 1080, height: 1920, alt: hero.alt, brief: hero.brief }}
          tone="deep"
        />
      )}

      {showVideo && (
        <video
          ref={ref}
          src={src ?? undefined}
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

      {showVideo && playing && <VideoToggle paused={control.paused} onToggle={control.toggle} />}
    </div>
  );
}
