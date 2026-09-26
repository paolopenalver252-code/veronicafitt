import { useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "~/lib/cn";

/**
 * Indicador "En directo": el hilo visual del entrenamiento online (sección,
 * ficha y pack). Con `pulse`, el punto late tres veces al entrar en pantalla y
 * se queda quieto: señala, no distrae.
 */
export function LiveBadge({
  children = "En directo",
  pulse = false,
  tone = "light",
  className,
}: {
  children?: string;
  pulse?: boolean;
  /** light: sobre imagen. soft: sobre el fondo de la página. */
  tone?: "light" | "soft";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-micro font-semibold whitespace-nowrap text-grafito",
        tone === "light" ? "bg-tiza/92" : "bg-acento-suave",
        className,
      )}
    >
      <span aria-hidden className="relative flex size-2">
        {pulse && inView && <span className="live-ping absolute inset-0 rounded-full bg-acento" />}
        <span className="relative size-2 rounded-full bg-acento" />
      </span>
      {children}
    </span>
  );
}
