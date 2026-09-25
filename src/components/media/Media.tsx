import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/cn";
import { isPending, resolved } from "~/lib/pending";
import type { MediaSlot } from "~/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { useAutoplayAllowed } from "./useAutoplayAllowed";

type MediaProps = {
  slot: MediaSlot;
  /** Solo para contenido crítico: carga inmediata y prioritaria. */
  priority?: boolean;
  sizes?: string;
  tone?: "light" | "dark";
  /** Huecos pequeños o con etiquetas encima: el marcador muestra solo el icono. */
  compact?: boolean;
  className?: string;
};

const fill = "absolute inset-0 h-full w-full object-cover";

/** Rellena su contenedor (que fija la proporción): imagen, vídeo o hueco pendiente. */
export function Media({ slot, priority = false, sizes = "100vw", tone, compact, className }: MediaProps) {
  if (isPending(slot.src)) return <MediaPlaceholder slot={slot} tone={tone} compact={compact} className={className} />;
  if (slot.kind === "video") return <LazyVideo slot={slot} priority={priority} className={className} />;
  return <Picture slot={slot} priority={priority} sizes={sizes} className={className} />;
}

function Picture({ slot, priority, sizes, className }: MediaProps) {
  const src = resolved(slot.src);
  if (!src) return null;
  return (
    <picture>
      {slot.sources?.map((s) => <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />)}
      <img
        src={src}
        srcSet={slot.srcSet}
        sizes={slot.srcSet ? sizes : undefined}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(fill, className)}
        style={{ objectPosition: slot.focal }}
      />
    </picture>
  );
}

/**
 * Vídeo de apoyo: se ve el póster; el vídeo solo se descarga cuando está cerca
 * de la pantalla y la conexión lo permite, y se pausa al salir de ella.
 */
function LazyVideo({ slot, priority, className }: MediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useAutoplayAllowed();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const src = resolved(slot.src);
  const poster = slot.poster ? resolved(slot.poster) : null;

  useEffect(() => {
    const video = ref.current;
    if (!video || !allowed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [allowed]);

  return (
    <>
      {poster && (
        <img
          src={poster}
          alt={slot.alt}
          width={slot.width}
          height={slot.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={cn(fill, className)}
          style={{ objectPosition: slot.focal }}
        />
      )}
      <video
        ref={ref}
        src={shouldLoad && src ? src : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={poster ? true : undefined}
        aria-label={poster ? undefined : slot.alt}
        onPlaying={() => setPlaying(true)}
        className={cn(
          fill,
          "transition-opacity duration-700",
          playing || !poster ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ objectPosition: slot.focal }}
      />
    </>
  );
}
