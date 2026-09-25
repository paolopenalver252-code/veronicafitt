import { Quote } from "lucide-react";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { services, testimonials } from "~/data/home";
import { site } from "~/data/site";

/**
 * Solo testimonios reales con consentimiento. Sin testimonios:
 * - en producción la sección no existe;
 * - en la demo se ve un espacio reservado, solo con las notas de revisión activas.
 */
export function Testimonials() {
  const published = testimonials.filter((t) => t.consent);
  if (published.length === 0 && !site.demo) return null;

  const serviceName = (id: string) => services.find((s) => s.id === id)?.title ?? "";

  if (published.length === 0) {
    return (
      <section id="testimonios" aria-labelledby="testimonios-title" className="review-only section-y">
        <div className="container-site">
          <SectionHeading id="testimonios-title" title="Lo que dicen quienes entrenan conmigo" />
          <div className="mt-10 rounded-card border-2 border-dashed border-pendiente-line bg-pendiente-bg/60 p-6 text-pendiente sm:p-10">
            <p className="font-semibold">Espacio reservado para testimonios reales</p>
            <p className="mt-2 max-w-[40rem] text-small text-pretty">
              Pendiente de confirmar: 3–6 testimonios de clientes de Verónica, con nombre (o nombre e inicial), servicio
              y consentimiento firmado. Foto y resultados solo si son reales y están autorizados. Esta sección no se
              publica hasta tenerlos.
            </p>
            <div aria-hidden className="mt-8 grid gap-4 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-card border border-pendiente-line/70 bg-tiza/70 p-5">
                  <Quote className="size-5 opacity-50" />
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-full rounded bg-pendiente-line/60" />
                    <div className="h-2.5 w-11/12 rounded bg-pendiente-line/60" />
                    <div className="h-2.5 w-3/5 rounded bg-pendiente-line/60" />
                  </div>
                  <div className="mt-6 h-2.5 w-1/3 rounded bg-pendiente-line" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="section-y">
      <div className="container-site">
        <SectionHeading id="testimonios-title" title="Lo que dicen quienes entrenan conmigo" />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {published.map((t) => (
            <li key={t.id}>
              <figure className="flex h-full flex-col rounded-card border border-linea bg-blanco p-6 lg:p-8">
                <Quote aria-hidden className="size-6 text-cobalto" />
                <blockquote className="mt-4 text-lead text-pretty">{t.quote}</blockquote>
                {t.result && <p className="mt-4 text-small text-piedra">{t.result}</p>}
                <figcaption className="mt-auto pt-6 text-small">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-piedra">
                    , {serviceName(t.service)}
                    {t.since ? `, ${t.since}` : ""}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
