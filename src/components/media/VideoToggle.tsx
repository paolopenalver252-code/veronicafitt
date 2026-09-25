import { Pause, Play } from "lucide-react";
import { useCallback, useRef, useState, type RefObject } from "react";
import { cn } from "~/lib/cn";

/**
 * Control de pausa para vídeos en bucle (WCAG 2.2.2: todo movimiento
 * automático de más de 5 s debe poder pausarse). Si la persona pausa, el
 * vídeo no vuelve a arrancar solo al hacer scroll.
 */
export function useVideoControl(ref: RefObject<HTMLVideoElement | null>) {
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);

  const toggle = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
      setPaused(false);
    } else {
      userPaused.current = true;
      video.pause();
      setPaused(true);
    }
  }, [ref]);

  /** Reproducción automática (al entrar en pantalla) que respeta la pausa manual. */
  const autoPlay = useCallback(() => {
    if (!userPaused.current) ref.current?.play().catch(() => {});
  }, [ref]);

  return { paused, toggle, autoPlay, userPaused };
}

export function VideoToggle({ paused, onToggle, className }: { paused: boolean; onToggle: () => void; className?: string }) {
  const Icon = paused ? Play : Pause;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Reproducir vídeo" : "Pausar vídeo"}
      className={cn(
        "absolute right-3 bottom-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-tiza/85 text-grafito",
        "transition-[background-color,transform] duration-200 hover:bg-tiza active:scale-95",
        className,
      )}
    >
      <Icon aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
    </button>
  );
}
