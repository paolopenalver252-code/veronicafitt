import { m } from "motion/react";
import type { ReactNode } from "react";
import { easeOutSoft } from "./MotionProvider";

/**
 * Revelado de imagen tipo "telón" (clip-path) al entrar en pantalla.
 * Se usa solo en momentos concretos (Sobre mí), no en todas las secciones.
 */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      data-motion
      className={className}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.1, ease: easeOutSoft, delay }}
    >
      {children}
    </m.div>
  );
}

/** Aparición sutil (opacidad + 16 px) para bloques secundarios puntuales. */
export function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component
      data-motion
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: easeOutSoft, delay }}
    >
      {children}
    </Component>
  );
}
