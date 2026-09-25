import { ArrowDown } from "lucide-react";
import { m } from "motion/react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { HeroMedia } from "~/components/media/HeroMedia";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { RevealLines } from "~/components/motion/RevealLines";
import { textLinkClasses } from "~/components/ui/Button";
import { hero } from "~/data/home";
import { media } from "~/data/media";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative pt-(--nav-h)">
      <div className="container-site grid gap-7 pt-3 pb-16 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-6 lg:pb-20">
        {/* Marco vertical: aprovecha el material vertical real sin recortarlo en escritorio. */}
        <m.div
          data-motion
          className="relative h-[min(48svh,32rem)] w-full overflow-hidden rounded-media bg-tiza-deep lg:order-2 lg:col-span-5 lg:col-start-8 lg:aspect-[9/16] lg:h-[min(80svh,52rem)] lg:w-auto lg:justify-self-end"
          initial={{ clipPath: "inset(7% 7% 7% 7%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.2, ease: easeOutSoft, delay: 0.1 }}
        >
          <HeroMedia slot={media.hero} />
        </m.div>

        <div className="lg:order-1 lg:col-span-7">
          <RevealLines
            as="h1"
            id="hero-title"
            trigger="load"
            width={{ from: 122, to: 78 }}
            lines={hero.headline}
            className="font-display text-display"
            before={
              <span className="mb-5 block text-small font-semibold tracking-normal text-cobalto [font-variation-settings:'wdth'_100] lg:mb-7 lg:text-body">
                {hero.kicker}
              </span>
            }
          />

          <m.div
            data-motion
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutSoft, delay: 0.55 }}
          >
            <p className="mt-6 max-w-[33rem] text-lead text-pretty text-piedra lg:mt-8">{hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-7 lg:mt-10">
              <ContactCta className="xs:w-auto w-full">{hero.primaryCta}</ContactCta>
              <a href={`#${hero.secondaryCta.anchor}`} className={textLinkClasses("min-h-11 self-start xs:self-auto")}>
                {hero.secondaryCta.label}
              </a>
            </div>
          </m.div>
        </div>
      </div>

      <a
        href="#manifiesto"
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-micro font-medium text-piedra transition-colors hover:text-grafito lg:inline-flex"
      >
        <ArrowDown aria-hidden className="size-4" />
        Sigue bajando
      </a>
    </section>
  );
}
