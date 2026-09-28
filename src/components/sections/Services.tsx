import { ContactCta } from "~/components/contact/ContactIntent";
import { Media } from "~/components/media/Media";
import type { PlaceholderTone } from "~/components/media/MediaPlaceholder";
import { FadeIn, ImageReveal } from "~/components/motion/Reveal";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { services } from "~/data/home";
import { cn } from "~/lib/cn";
import type { Service } from "~/types/content";

/** Composición de cada servicio presencial: alterna lado, proporción y tono para crear ritmo. */
const layouts: Array<{ tag: string; aspect: string; tone: PlaceholderTone }> = [
  { tag: "Uno a uno", aspect: "aspect-[4/5]", tone: "deep" },
  { tag: "Fuerza", aspect: "aspect-[4/5] lg:aspect-[3/4]", tone: "light" },
  { tag: "En grupo", aspect: "aspect-[4/5] sm:aspect-[3/2]", tone: "deep" },
];

export function Services() {
  const presencial = services.filter((s) => s.status !== "coming-soon");
  const online = services.find((s) => s.status === "coming-soon");

  return (
    <section id="entrenamientos" aria-labelledby="entrenamientos-title" className="section-y">
      <div className="container-site">
        <p className="label text-acento">Presencial</p>
        <h2 id="entrenamientos-title" className="font-display mt-5 max-w-[16ch] text-h2 text-balance">
          Entrena conmigo en la sala
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-24 lg:mt-28 lg:gap-40">
        {presencial.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      {online && (
        <div className="container-site mt-24 lg:mt-40">
          <FadeIn className="flex flex-col gap-6 border-y border-linea py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-h3">{online.title}</h3>
                <StatusTag tone="soon">Próximamente</StatusTag>
              </div>
              <p className="mt-3 max-w-[34rem] text-pretty text-piedra">{online.summary}</p>
            </div>
            <a href={online.cta.href} className={textLinkClasses("min-h-11 shrink-0")}>
              {online.cta.label}
            </a>
          </FadeIn>
        </div>
      )}
    </section>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const layout = layouts[index % layouts.length];
  const reversed = index % 2 === 1;
  const wide = index === 2;

  return (
    <article className="lg:container-site lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
      <ImageReveal
        className={cn(
          "media-inset",
          layout.aspect,
          "group",
          wide ? "lg:col-span-8" : "lg:col-span-6",
          reversed ? "lg:order-2 lg:col-start-7" : "lg:col-start-1",
        )}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-(--ease-out-soft) group-hover:scale-[1.03]">
          <Media slot={service.media} tone={layout.tone} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </ImageReveal>

      <FadeIn
        className={cn(
          "px-5 pt-10 md:px-10 lg:px-0 lg:pt-0",
          wide ? "lg:col-span-4" : "lg:col-span-5",
          reversed ? "lg:order-1 lg:col-start-1" : wide ? "lg:col-start-9" : "lg:col-start-8",
        )}
      >
        <p className="label">{layout.tag}</p>
        <h3 className="font-display mt-4 text-h2">{service.title}</h3>
        <p className="mt-6 max-w-[30rem] text-lead text-pretty">{service.summary}</p>
        <p className="mt-4 max-w-[30rem] text-pretty text-piedra">{service.forWhom}</p>
        {service.notes?.map((note, i) => (
          <DevNote key={i} value={note} className="mt-4" />
        ))}
        <div className="mt-8">
          <ContactCta service={service.id} variant="text" className={textLinkClasses("min-h-11")}>
            {service.cta.label}
          </ContactCta>
        </div>
      </FadeIn>
    </article>
  );
}
