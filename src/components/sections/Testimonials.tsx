import { FadeIn } from "~/components/motion/Reveal";
import { services, testimonials } from "~/data/home";
import { site } from "~/data/site";

/**
 * Testimonios reales con consentimiento. Se activa solo con añadirlos a
 * `testimonials` en src/data/home.ts. Mientras no haya:
 * - vista de cliente: la sección no existe (no rompe el ritmo de la página);
 * - notas internas (?notas=1): un aviso compacto del espacio reservado.
 */
export function Testimonials() {
  const published = testimonials.filter((t) => t.consent);
  const serviceName = (id: string) => services.find((s) => s.id === id)?.title ?? "";

  if (published.length === 0) {
    if (!site.demo) return null;
    return (
      <div className="dev-only container-site py-10">
        <p className="rounded-md border border-dashed border-pendiente-line bg-pendiente-bg px-5 py-4 text-small text-pendiente">
          <strong className="font-semibold">Testimonios: espacio reservado.</strong> Pendiente de confirmar: 3–6
          testimonios reales con nombre, servicio y consentimiento firmado. La sección aparece sola al añadirlos en
          src/data/home.ts.
        </p>
      </div>
    );
  }

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="section-y">
      <div className="container-site">
        <p className="label text-acento">Testimonios</p>
        <h2 id="testimonios-title" className="font-display mt-5 max-w-[16ch] text-h2">
          Lo que dicen quienes entrenan conmigo
        </h2>
        <ul className="mt-16 grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {published.map((t, i) => (
            <FadeIn as="li" key={t.id} delay={i * 0.08} className="border-t border-linea pt-8">
              <figure>
                <blockquote className="font-heading text-[1.625rem] leading-snug text-pretty">“{t.quote}”</blockquote>
                {t.result && <p className="mt-4 text-small text-piedra">{t.result}</p>}
                <figcaption className="mt-6 text-small">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-piedra">
                    , {serviceName(t.service)}
                    {t.since ? `, ${t.since}` : ""}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
