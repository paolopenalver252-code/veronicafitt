import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { Media } from "~/components/media/Media";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { textLinkClasses } from "~/components/ui/Button";
import { PendingNote } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { StatusTag } from "~/components/ui/StatusTag";
import { services } from "~/data/home";
import { cn } from "~/lib/cn";
import type { Service } from "~/types/content";

/**
 * Escritorio: lista editorial; al pasar el ratón o enfocar un servicio, su
 * imagen aparece en el marco fijo de la derecha. Móvil: cada servicio lleva
 * su imagen en línea (no hay hover en pantallas táctiles).
 */
export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="entrenamientos" aria-labelledby="entrenamientos-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="entrenamientos-title"
          label="Entrenamientos"
          title="Cómo puedes entrenar conmigo"
          intro="Siempre con la misma idea: el entrenamiento se adapta a ti."
        />

        <div className="mt-14 grid lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <ul className="border-t border-linea lg:col-span-7">
            {services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                active={i === active}
                onActivate={() => setActive(i)}
              />
            ))}
          </ul>

          <div aria-hidden className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] aspect-[4/5] overflow-hidden rounded-media bg-tiza-deep">
              <AnimatePresence initial={false}>
                <m.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeOutSoft }}
                >
                  <Media slot={current.media} sizes="40vw" />
                </m.div>
              </AnimatePresence>
              {current.status === "coming-soon" && (
                <StatusTag tone="soon" className="absolute top-4 right-4">
                  Próximamente
                </StatusTag>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, active, onActivate }: { service: Service; active: boolean; onActivate: () => void }) {
  const comingSoon = service.status === "coming-soon";

  return (
    <li
      className="group relative border-b border-linea py-8 lg:py-10"
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      {/* Indicador del servicio activo (solo escritorio) */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0 left-0 hidden h-px bg-cobalto transition-[width] duration-500 ease-(--ease-out-soft) lg:block",
          active ? "w-full" : "w-0",
        )}
      />

      <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-media bg-tiza-deep sm:aspect-[3/2] lg:hidden">
        <Media slot={service.media} sizes="100vw" />
        {comingSoon && (
          <StatusTag tone="soon" className="absolute top-4 right-4">
            Próximamente
          </StatusTag>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h3
          className={cn(
            "font-heading text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-none transition-[color,translate] duration-300 ease-(--ease-out-soft)",
            active && "lg:translate-x-2 lg:text-cobalto",
          )}
        >
          {service.title}
        </h3>
        {comingSoon && (
          <span className="hidden lg:inline-flex">
            <StatusTag tone="soon">Próximamente</StatusTag>
          </span>
        )}
      </div>

      <p className="mt-4 max-w-[36rem] text-pretty">{service.summary}</p>
      <p className="mt-2 max-w-[36rem] text-small text-pretty text-piedra">{service.forWhom}</p>

      {service.notes?.map((note, i) => (
        <PendingNote key={i} value={note} className="mt-4" />
      ))}

      <div className="mt-5">
        {comingSoon ? (
          <a href={service.cta.href} className={textLinkClasses("min-h-11")}>
            {service.cta.label}
          </a>
        ) : (
          <ContactCta service={service.id} variant="text" className={textLinkClasses("min-h-11")}>
            {service.cta.label}
          </ContactCta>
        )}
      </div>
    </li>
  );
}
