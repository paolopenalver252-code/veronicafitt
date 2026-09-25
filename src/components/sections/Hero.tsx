import { m } from "motion/react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { HeroMedia } from "~/components/media/HeroMedia";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { RevealLines } from "~/components/motion/RevealLines";
import { textLinkClasses } from "~/components/ui/Button";
import { hero } from "~/data/home";
import { media } from "~/data/media";

/**
 * Portada editorial: nombre, oficio y una frase grande a la izquierda;
 * Verónica en vertical a la derecha. En móvil, la imagen va a sangre.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative pt-(--nav-h)">
      <div className="lg:container-site lg:grid lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-8 lg:pb-14">
        {/* Imagen / vídeo vertical: máscara que se abre y escala que se asienta. */}
        <div className="relative lg:order-2 lg:col-span-5 lg:col-start-8 lg:justify-self-end">
          <m.div
            data-motion
            className="relative h-[58svh] min-h-[24rem] w-full overflow-hidden lg:aspect-[9/16] lg:h-[min(80svh,54rem)] lg:min-h-0 lg:w-auto"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: easeOutSoft, delay: 0.15 }}
          >
            <m.div
              data-motion
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: easeOutSoft, delay: 0.15 }}
            >
              <HeroMedia slot={media.hero} />
            </m.div>
          </m.div>
          {/* Filete fino desplazado: aire de página impresa, sin llegar a ser un marco. */}
          <m.span
            aria-hidden
            data-motion
            className="pointer-events-none absolute -inset-3 hidden border border-linea lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </div>

        <div className="px-5 pt-9 pb-16 md:px-10 lg:order-1 lg:col-span-7 lg:px-0 lg:pt-0 lg:pb-2">
          <RevealLines
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.35}
            lines={hero.headline}
            className="font-display text-display"
            before={
              <m.span
                data-motion
                className="mb-8 block font-sans lg:mb-12"
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

          <m.div
            data-motion
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutSoft, delay: 0.85 }}
          >
            <p className="mt-8 max-w-[29rem] text-lead text-pretty text-piedra lg:mt-10">{hero.subtitle}</p>
            <div className="mt-9 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-8">
              <ContactCta className="w-full xs:w-auto xs:px-9">{hero.primaryCta}</ContactCta>
              <a href={`#${hero.secondaryCta.anchor}`} className={textLinkClasses("min-h-11 self-start xs:self-auto")}>
                {hero.secondaryCta.label}
              </a>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
