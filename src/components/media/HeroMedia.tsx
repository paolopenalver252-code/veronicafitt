import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/cn";
import { isPending, resolved } from "~/lib/pending";
import type { MediaSlot } from "~/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { useAutoplayAllowed } from "./useAutoplayAllowed";
import { useVideoControl, VideoToggle } from "./VideoToggle";

const cover = "absolute inset-0 h-full w-full object-cover";

/**
 * Hero: el póster es el elemento LCP (carga prioritaria). El vídeo empieza a
 * descargarse solo después del evento `load`, en un momento ocioso, y
 * sustituye al póster con un fundido cuando ya se está reproduciendo.
 * Con conexión lenta, ahorro de datos o movimiento reducido: solo imagen.
 */
export function HeroMedia({ slot }: { slot: MediaSlot }) {
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useAutoplayAllowed();
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const control = useVideoControl(ref);
  const src = resolved(slot.src);
  const poster = slot.poster ? resolved(slot.poster) : null;
  const isVideo = slot.kind === "video";

  useEffect(() => {
    if (!allowed || !src || !isVideo) return;
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
  }, [allowed, src, isVideo]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !load) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) control.autoPlay();
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [load, control]);

  const image = isVideo ? poster : src;

  // Sin asset todavía: hueco reservado con la proporción final.
  if (!image && (isPending(slot.src) || !isVideo)) return <MediaPlaceholder slot={slot} tone="deep" />;

  return (
    <>
      {image && (
        <img
          src={image}
          alt={slot.alt}
          width={slot.width}
          height={slot.height}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className={cover}
          style={{ objectPosition: slot.focal }}
        />
      )}
      {isVideo && load && src && (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          aria-hidden
          onPlaying={() => setPlaying(true)}
          className={cn(cover, "transition-opacity duration-700", playing ? "opacity-100" : "opacity-0")}
          style={{ objectPosition: slot.focal }}
        />
      )}
      {playing && <VideoToggle paused={control.paused} onToggle={control.toggle} />}
    </>
  );
}
