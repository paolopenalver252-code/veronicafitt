import { m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/cn";
import { easeOutSoft } from "./MotionProvider";

const DIGITS = Array.from({ length: 10 }, (_, k) => k);

/**
 * Cifras que giran una sola vez hasta su valor (adaptación del Animated Number
 * de Vengeance UI, sin dependencias nuevas).
 * - El HTML prerenderizado ya muestra el valor final (sin JS, buscadores).
 * - Al montar, si el número está fuera de pantalla, las tiras vuelven a 0 sin
 *   que se vea y giran al entrar. Con movimiento reducido, no se mueve nada.
 * - Las tiras son decorativas (cifras en ::before): el valor real va en `label`.
 */
export function OdometerNumber({ value, label, className }: { value: string; label: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      <span className="sr-only">{label}</span>
      {value.split("").map((char, i) => (
        <Digit key={i} digit={Number(char)} state={!armed ? "final" : inView ? "roll" : "zero"} delay={i * 0.14} />
      ))}
    </span>
  );
}

function Digit({ digit, state, delay }: { digit: number; state: "final" | "zero" | "roll"; delay: number }) {
  const finalY = `${-digit * 10}%`;
  return (
    // Recorte solo vertical (el eje del giro): los trazos de la Didone pueden sobresalir en horizontal.
    <span
      aria-hidden
      className="relative inline-block overflow-x-visible overflow-y-clip pt-[0.12em] pb-[0.03em] leading-none tracking-normal [&:not(:last-child)]:-mr-[0.04em]"
    >
      {/* Reserva exactamente el ancho y alto de la cifra final. */}
      <span className="invisible block before:content-[attr(data-d)]" data-d={digit} />
      <m.span
        className="absolute inset-x-0 top-[0.12em] flex flex-col items-center"
        initial={false}
        animate={{ y: state === "zero" ? "0%" : finalY }}
        transition={state === "roll" ? { duration: 1.8, ease: easeOutSoft, delay } : { duration: 0 }}
      >
        {/* Cifras como contenido CSS: no ensucian el texto del documento (SEO, copiar/pegar). */}
        {DIGITS.map((n) => (
          <span key={n} className="block before:content-[attr(data-d)]" data-d={n} />
        ))}
      </m.span>
    </span>
  );
}
