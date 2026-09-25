import { m, useInView, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { DevNote } from "~/components/ui/Pending";
import { process } from "~/data/home";
import { cn } from "~/lib/cn";
import type { ProcessStep } from "~/types/content";

/**
 * Cuatro pasos con números protagonistas. La línea avanza con el scroll y
 * cada número se enciende al llegar a él: el proceso se lee en orden.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <section id="como-trabajo" aria-labelledby="como-trabajo-title" className="section-y bg-tiza-deep">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <p className="label text-acento">Método</p>
            <h2 id="como-trabajo-title" className="font-display mt-5 text-h2">
              {process.title}
            </h2>
            <p className="mt-6 max-w-[24rem] text-lead text-pretty text-piedra">{process.intro}</p>
            <div className="mt-10 hidden lg:block">
              <ContactCta>Dar el primer paso</ContactCta>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-linea" />
          <m.span
            aria-hidden
            data-motion
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-acento"
            style={{ scaleY: progress }}
          />
          {process.steps.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </ol>

        <ContactCta className="w-full lg:hidden">Dar el primer paso</ContactCta>
      </div>
    </section>
  );
}

function Step({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });

  return (
    <li ref={ref} className="relative pb-16 pl-8 last:pb-0 sm:pl-12 lg:pb-24">
      <span
        aria-hidden
        className={cn(
          "font-display block text-[clamp(4.5rem,3rem+6vw,8rem)] leading-[0.85] tabular-nums transition-colors duration-700",
          active ? "text-acento" : "text-linea",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <m.div
        data-motion
        initial={{ opacity: 0, y: 16 }}
        animate={active ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: easeOutSoft, delay: 0.1 }}
        className="mt-6"
      >
        <h3 className="font-heading text-h3">
          <span className="sr-only">Paso {index + 1}: </span>
          {step.title}
        </h3>
        <p className="mt-4 max-w-[32rem] text-lead text-pretty text-piedra">{step.body}</p>
        {step.note && <DevNote value={step.note} className="mt-4" />}
      </m.div>
    </li>
  );
}
