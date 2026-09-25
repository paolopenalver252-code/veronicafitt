import { m } from "motion/react";
import type { CSSProperties, ElementType, ReactNode } from "react";
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
  /**
   * Gesto de marca: la anchura de la tipografía pasa de `from` a `to`.
   * Las líneas no se parten (nowrap), así que no hay saltos de layout.
   */
  width?: { from: number; to: number };
  delay?: number;
  before?: ReactNode;
};

/** Revelado por líneas con máscara. Cada línea sube desde debajo de su propia caja. */
export function RevealLines({
  lines,
  as: Tag = "p",
  id,
  className,
  lineClassName,
  trigger = "view",
  width,
  delay = 0,
  before,
}: Props) {
  const target = {
    y: "0%",
    ...(width ? { "--wdth": width.to } : {}),
  };
  const animateProps =
    trigger === "load"
      ? { animate: target }
      : { whileInView: target, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag id={id} className={className}>
      {before}
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <m.span
            data-motion
            className={cn("block whitespace-nowrap", lineClassName)}
            style={
              width
                ? // font-variation-settings se declara en la propia línea: así lee su --wdth animado.
                  ({ "--wdth-final": width.to, fontVariationSettings: '"wdth" var(--wdth)' } as CSSProperties)
                : undefined
            }
            initial={{ y: "105%", ...(width ? { "--wdth": width.from } : {}) }}
            {...animateProps}
            transition={{
              y: { duration: 0.8, ease: easeOutSoft, delay: delay + i * 0.09 },
              "--wdth": { duration: 1.3, ease: easeOutSoft, delay: delay + i * 0.09 },
            }}
          >
            {line}{" "}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
