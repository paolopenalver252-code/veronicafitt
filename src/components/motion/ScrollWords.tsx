import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ElementType } from "react";

/**
 * Declaración que se "enciende" palabra a palabra al hacer scroll.
 * Sigue al usuario: si se para, la frase se para; nunca se anima sola.
 */
export function ScrollWords({
  text,
  as: Tag = "p",
  id,
  className,
}: {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} id={id} className={className}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <m.span data-motion style={{ opacity }}>
        {children}
      </m.span>{" "}
    </>
  );
}
