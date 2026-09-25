import { m, useInView } from "motion/react";
import { useRef } from "react";
import { Media } from "~/components/media/Media";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { FadeIn, ImageReveal, ScrollSettle } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { DevNote } from "~/components/ui/Pending";
import { studio } from "~/data/home";
import { media } from "~/data/media";
import { isPending } from "~/lib/pending";

/** 45 m²: la escala íntima convertida en el momento visual más potente de la página. */
export function Studio() {
  const facts = studio.facts;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section id="sala" aria-labelledby="sala-title" className="section-y overflow-hidden">
      <div className="container-site">
        <p className="label text-acento">{studio.title}</p>
        <h2 ref={titleRef} id="sala-title" className="mt-6 grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
          <span className="block overflow-hidden lg:col-span-7">
            <m.span
              data-motion
              className="font-display flex items-start text-giant leading-[0.8] tracking-[-0.05em]"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 1.3, ease: easeOutSoft }}
            >
              {studio.size}
              <span aria-hidden className="mt-[0.08em] ml-2 text-[0.22em] tracking-normal">
                m²
              </span>
            </m.span>
          </span>
          <span className="sr-only">metros cuadrados. </span>
          <RevealLines
            as="span"
            delay={0.2}
            lines={studio.lines}
            className="font-display block text-h2 lg:col-span-5 lg:pb-[0.4em]"
          />
        </h2>
      </div>

      <ScrollSettle className="mt-16 aspect-[4/5] sm:aspect-[16/9] lg:mt-24 lg:aspect-[21/9]">
        <Media slot={media.studio} tone="deep" sizes="100vw" />
      </ScrollSettle>

      <div className="container-site mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <FadeIn className="lg:col-span-5">
          <p className="text-lead text-pretty">{studio.lead}</p>
          <dl className="mt-10">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className={
                  isPending(fact.value)
                    ? "dev-only border-t border-linea py-3.5"
                    : "grid grid-cols-[7rem_1fr] gap-4 border-t border-linea py-3.5 last:border-b"
                }
              >
                <dt className="text-small text-piedra">{fact.label}</dt>
                <dd className="text-small">{isPending(fact.value) ? <DevNote value={fact.value} /> : fact.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-6 lg:col-start-7">
          <ImageReveal className="aspect-[4/5]">
            <Media slot={media.studioDetailA} tone="light" sizes="(min-width: 1024px) 25vw, 50vw" />
          </ImageReveal>
          <ImageReveal delay={0.15} className="mt-16 aspect-[4/5]">
            <Media slot={media.studioDetailB} tone="deep" sizes="(min-width: 1024px) 25vw, 50vw" />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
