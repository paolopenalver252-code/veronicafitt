import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion con carga mínima (domAnimation, ~15 KB) y respeto automático por
 * `prefers-reduced-motion`. Además, app.css fuerza el estado final de todo
 * elemento con [data-motion] cuando el usuario pide menos movimiento.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export const easeOutSoft = [0.22, 1, 0.36, 1] as const;
