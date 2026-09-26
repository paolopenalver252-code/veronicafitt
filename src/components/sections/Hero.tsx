import { m } from "motion/react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { HeroBackground } from "~/components/media/HeroBackground";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { RevealLines } from "~/components/motion/RevealLines";
import { textLinkClasses } from "~/components/ui/Button";
import { hero } from "~/data/home";
import { heroBackground } from "~/data/media";

/**
 * Portada editorial: nombre, oficio y una frase grande abajo a la izquierda.
 * - Tablet y escritorio: Verónica en vídeo a pantalla completa, fundido en el
 *   blanco roto por el lado del texto (el texto sigue en grafito sobre claro).
 * - Móvil: la foto va a sangre arriba y el texto debajo; nunca se carga vídeo.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative pt-(--nav-h)">
      <div className="relative md:flex md:min-h-[calc(100svh-var(--nav-h))] md:items-end">
        {/* Fondo: máscara que se abre y escala que se asienta, una sola vez. */}
        <div data-hero-media className="relative h-[48svh] min-h-[22rem] md:absolute md:inset-0 md:h-auto md:min-h-0">
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
              <HeroBackground bg={heroBackground} />
            </m.div>
          </m.div>
        </div>

        {/* Desde tablet el bloque cubre el fondo: solo su contenido recibe clics (el botón de pausa del vídeo queda accesible). */}
        <div className="relative flex w-full flex-col px-5 pt-7 pb-16 md:pointer-events-none md:container-site md:pt-32 md:pb-16 md:*:pointer-events-auto lg:pb-20">
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
                className="mb-6 block font-sans lg:mb-12"
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
            className="order-2 mt-7 flex items-center gap-6 md:order-3 md:mt-8 md:self-start lg:mt-10 lg:gap-8"
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
