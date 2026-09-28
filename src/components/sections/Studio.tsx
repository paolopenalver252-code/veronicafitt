import { Media } from "~/components/media/Media";
import { OdometerNumber } from "~/components/motion/OdometerNumber";
import { FadeIn, ImageReveal, ScrollSettle } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { DevNote } from "~/components/ui/Pending";
import { studio } from "~/data/home";
import { media } from "~/data/media";
import { isPending } from "~/lib/pending";

/** 45 m²: la escala íntima convertida en el momento visual más potente de la página. */
export function Studio() {
  const facts = studio.facts;

  return (
    <section id="sala" aria-labelledby="sala-title" className="section-y overflow-hidden">
      <div className="container-site">
        <p className="label text-acento">{studio.title}</p>
        {/* Escritorio: el 45 a la izquierda; a su lado, la sala en dos fotos y la frase debajo.
            Móvil y tablet: número, frase y fotos, en ese orden. */}
        <div className="mt-6 grid items-end gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
          <h2
            id="sala-title"
            className="font-display flex items-start text-giant tracking-[-0.05em] lg:col-span-6 lg:row-span-2 lg:row-start-1"
          >
            <OdometerNumber value={studio.size} label={`${studio.size} metros cuadrados.`} className="-mt-[0.26em] -mb-[0.17em]" />
            <span aria-hidden className="mt-[0.02em] ml-2 text-[0.22em] tracking-normal">
              m²
            </span>
          </h2>
          <RevealLines
            as="p"
            delay={0.3}
            lines={studio.lines}
            lineClassName="lg:whitespace-nowrap"
            className="font-display block text-h2 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:pb-[0.3em] lg:text-[clamp(2.75rem,1rem+3.4vw,4.25rem)]"
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <ImageReveal className="aspect-[4/5]">
              <Media slot={media.studioDetailA} tone="light" sizes="(min-width: 1024px) 20vw, 50vw" />
            </ImageReveal>
            <ImageReveal delay={0.15} className="mt-16 aspect-[4/5]">
              <Media slot={media.studioDetailB} tone="deep" sizes="(min-width: 1024px) 20vw, 50vw" />
            </ImageReveal>
          </div>
        </div>
      </div>

      <ScrollSettle className="media-inset mt-16 aspect-[4/5] sm:aspect-[16/9] lg:mt-24 lg:aspect-[21/9]">
        <Media slot={media.studio} tone="deep" sizes="100vw" />
      </ScrollSettle>

      <FadeIn className="container-site mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <p className="text-lead text-pretty lg:col-span-6">{studio.lead}</p>
        <dl className="lg:col-span-5 lg:col-start-8">
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
    </section>
  );
}
