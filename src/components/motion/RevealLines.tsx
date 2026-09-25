import { m, useInView } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "~/lib/cn";
import { easeOutSoft } from "./MotionProvider";

type Props = {
  lines: string[];
  as?: ElementType;
  id?: string;
  className?: string;
  lineClassName?: string;
  /** "load": al montar (hero). "view": al entrar en pantalla, una sola vez. */
  trigger?: "load" | "view";
  delay?: number;
  before?: ReactNode;
};

/**
 * Revelado por líneas con máscara: cada línea sube desde debajo de su propia caja.
 * La visibilidad se observa en el contenedor (nunca recortado), no en las líneas,
 * que empiezan ocultas por su máscara y el observador podría no detectarlas.
 */
export function RevealLines({
  lines,
  as: Tag = "p",
  id,
  className,
  lineClassName,
  trigger = "view",
  delay = 0,
  before,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = trigger === "load" || inView;

  return (
    <Tag ref={ref} id={id} className={className}>
      {before}
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <m.span
            data-motion
            className={cn("block", lineClassName)}
            initial={{ y: "108%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 1, ease: easeOutSoft, delay: delay + i * 0.1 }}
          >
            {line}{" "}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
