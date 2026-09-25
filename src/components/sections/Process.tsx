import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { FadeIn } from "~/components/motion/Reveal";
import { PendingNote } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { process } from "~/data/home";

/**
 * Proceso en cuatro pasos (aquí sí hay una secuencia real, por eso numeramos).
 * La línea vertical avanza con el scroll; en escritorio el título queda fijo.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="como-trabajo" aria-labelledby="como-trabajo-title" className="section-y bg-cielo">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SectionHeading id="como-trabajo-title" title={process.title} intro={process.intro} />
            <div className="mt-8 hidden lg:block">
              <ContactCta>Dar el primer paso</ContactCta>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-cobalto/20" />
          <m.span
            aria-hidden
            data-motion
            className="absolute top-2 bottom-2 left-[1.1875rem] w-px origin-top bg-cobalto"
            style={{ scaleY: progress }}
          />
          {process.steps.map((step, i) => (
            <FadeIn as="li" key={step.title} delay={0.05} className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-12 last:pb-0 lg:gap-8 lg:pb-16">
              <span
                aria-hidden
                className="relative z-10 flex size-10 items-center justify-center rounded-full border border-cobalto bg-cielo text-small font-semibold text-cobalto tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <h3 className="font-heading text-h3">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34rem] text-pretty text-grafito/80">{step.body}</p>
                {step.note && <PendingNote value={step.note} className="mt-4" />}
              </div>
            </FadeIn>
          ))}
        </ol>

        <ContactCta className="w-full lg:hidden">Dar el primer paso</ContactCta>
      </div>
    </section>
  );
}
