import { MessageCircle } from "lucide-react";
import { ContactForm } from "~/components/contact/ContactForm";
import { Media } from "~/components/media/Media";
import { buttonClasses } from "~/components/ui/Button";
import { PendingNote } from "~/components/ui/Pending";
import { closing } from "~/data/home";
import { media } from "~/data/media";
import { site } from "~/data/site";
import { isPending } from "~/lib/pending";
import { whatsappUrl } from "~/lib/whatsapp";

/** Cierre: la única sección oscura de la página, continúa en el footer. */
export function Contact() {
  const wa = whatsappUrl();
  const details = [
    { label: "Dónde", value: site.contact.address },
    { label: "Horario", value: site.contact.hours },
  ];

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-y bg-grafito text-tiza">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="contacto-title" className="font-display text-h2 text-balance lg:text-[clamp(3rem,1.5rem+3vw,4.75rem)]">
            {closing.title}
          </h2>
          <p className="mt-6 max-w-[28rem] text-lead text-pretty text-tiza/75">{closing.body}</p>

          <div className="mt-8">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("inverse")}>
                <MessageCircle aria-hidden className="size-5" />
                Escríbeme por WhatsApp
              </a>
            ) : (
              <div className="flex flex-col items-start gap-2">
                <p className="inline-flex items-center gap-2 text-tiza/60">
                  <MessageCircle aria-hidden className="size-5" />
                  WhatsApp: pendiente de confirmar
                </p>
                <PendingNote value={site.contact.whatsapp} tone="dark" />
              </div>
            )}
          </div>

          <dl className="mt-10 border-t border-linea-dark">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-linea-dark py-3.5 text-small">
                <dt className="font-semibold text-tiza/60">{d.label}</dt>
                <dd>{isPending(d.value) ? <span className="text-tiza/60">Pendiente de confirmar</span> : d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-10 hidden aspect-[4/5] w-2/3 overflow-hidden rounded-media lg:block">
            <Media slot={media.closing} tone="dark" sizes="25vw" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
