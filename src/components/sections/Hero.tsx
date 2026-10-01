import { m } from "motion/react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { HeroVideo } from "~/components/media/HeroVideo";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { RevealLines } from "~/components/motion/RevealLines";
import { textLinkClasses } from "~/components/ui/Button";
import { hero } from "~/data/home";
import { heroVideo } from "~/data/media";

/**
 * Portada editorial: nombre, oficio y una frase grande; Verónica en vertical.
 * - Tablet y escritorio: texto a la izquierda y el vídeo (un Reel, 9:16) a la
 *   derecha, en un marco de su misma proporción: nunca se recorta ni se deforma.
 *   En tablet, el titular a su escala.
 * - Móvil: la imagen va a sangre arriba y el texto debajo; nunca se carga vídeo.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative pt-(--nav-h)">
      <div className="md:container-site md:flex md:items-end md:gap-8 md:pt-10 md:pb-16 lg:grid lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:gap-10 lg:pt-8 lg:pb-14">
        <div className="md:order-2 md:flex md:shrink-0 md:items-end md:justify-end lg:col-span-5 lg:col-start-8 lg:justify-self-end">
          {/* Móvil: bloque a sangre. Desde tablet: marco vertical 9:16. Máscara que se abre y escala que se asienta, una sola vez. */}
          <div
            data-hero-media
            className="relative h-[48svh] min-h-[22rem] md:aspect-[9/16] md:h-[min(62svh,36rem)] md:min-h-0 lg:h-[min(80svh,54rem)]"
          >
            <m.div
              data-motion
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, ease: easeOutSoft, delay: 0.15 }}
            >
              <m.div
                data-motion
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.4, ease: easeOutSoft, delay: 0.15 }}
              >
                <HeroVideo hero={heroVideo} />
              </m.div>
            </m.div>
            {/* Filete fino desplazado: aire de página impresa, sin llegar a ser un marco. */}
            <m.span
              aria-hidden
              data-motion
              className="pointer-events-none absolute hidden border border-linea md:block md:-inset-2.5 lg:-inset-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </div>
        </div>

        <div className="flex flex-col px-5 pt-7 pb-16 md:order-1 md:flex-1 md:px-0 md:pt-0 md:pb-2 lg:col-span-7">
          <RevealLines
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.35}
            lines={hero.headline}
            className="font-display text-display md:text-[clamp(3.25rem,7.5vw,4.75rem)] lg:text-display"
            before={
              <m.span
                data-motion
                className="mb-6 block font-sans md:mb-8 lg:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="block text-small font-semibold tracking-[0.22em] uppercase">{hero.name}</span>
                <span className="sr-only">, </span>
                <span className="mt-1.5 block text-small tracking-normal text-piedra">{hero.role}</span>
                <span className="sr-only">. </span>
              </m.span>
            }
          />

          {/* En móvil el CTA va antes que el texto: así entra en el primer pantallazo. */}
          <m.p
            data-motion
            className="order-3 mt-7 max-w-[29rem] text-lead text-pretty text-piedra md:order-2 md:mt-8 lg:mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutSoft, delay: 0.95 }}
          >
            {hero.subtitle}
          </m.p>
          <m.div
            data-motion
            className="order-2 mt-7 flex items-center gap-6 md:order-3 md:mt-8 lg:mt-10 lg:gap-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutSoft, delay: 0.85 }}
          >
            <ContactCta className="px-9">{hero.primaryCta}</ContactCta>
            <a href={`#${hero.secondaryCta.anchor}`} className={textLinkClasses()}>
              {hero.secondaryCta.label}
            </a>
          </m.div>
        </div>
      </div>
    </section>
  );
}
