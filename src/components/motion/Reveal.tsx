import { m, useInView, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "~/lib/cn";
import { easeOutSoft } from "./MotionProvider";

/**
 * Revelado de imagen: el marco se abre de abajo arriba mientras la imagen
 * se asienta desde una escala mínima. Una sola vez, al entrar en pantalla.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  // Se observa el contenedor, que no está recortado; la máscara va dentro.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <div ref={ref} className={cn("relative", className)}>
      <m.div
        data-motion
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.2, ease: easeOutSoft, delay }}
      >
        <m.div
          data-motion
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease: easeOutSoft, delay }}
        >
          {children}
        </m.div>
      </m.div>
    </div>
  );
}

/** Imagen que se asienta muy despacio mientras cruza la pantalla (escala 1,08 → 1). */
export function ScrollSettle({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.08, 1]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div data-motion className="absolute inset-0" style={{ scale }}>
        {children}
      </m.div>
    </div>
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
      transition={{ duration: 0.8, ease: easeOutSoft, delay }}
    >
      {children}
    </Component>
  );
}
