import { MessageCircle } from "lucide-react";
import { ContactForm } from "~/components/contact/ContactForm";
import { Media } from "~/components/media/Media";
import { ImageReveal } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { buttonClasses } from "~/components/ui/Button";
import { InstagramIcon } from "~/components/ui/InstagramIcon";
import { DevNote } from "~/components/ui/Pending";
import { closing } from "~/data/home";
import { media } from "~/data/media";
import { site } from "~/data/site";
import { isPending } from "~/lib/pending";
import { whatsappUrl } from "~/lib/whatsapp";

/** Cierre: la frase central de la marca, el primer paso y una imagen cálida. */
export function Contact() {
  const wa = whatsappUrl();
  const details = [
    { label: "Dónde", value: site.contact.address },
    { label: "Horario", value: site.contact.hours },
  ];
  const known = details.filter((d) => !isPending(d.value));

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-y bg-acento-profundo text-tiza">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="label text-acento-claro">Contacto</p>
          <RevealLines
            as="h2"
            id="contacto-title"
            lines={["Tu punto", "de partida", "es suficiente."]}
            className="font-display mt-6 text-h2 lg:text-[clamp(3.5rem,2rem+3.2vw,5.5rem)]"
          />
          <p className="mt-8 max-w-[26rem] text-lead text-pretty text-tiza/80">{closing.body}</p>

          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("inverse", "mt-10")}>
              <MessageCircle aria-hidden className="size-5" />
              Escríbeme por WhatsApp
            </a>
          )}
          {/* Canal confirmado mientras no haya WhatsApp: su Instagram. */}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2.5 text-tiza/90 underline decoration-tiza/40 underline-offset-[0.3em] transition-colors hover:decoration-tiza"
          >
            <InstagramIcon className="size-5" />
            También puedes escribirme por Instagram
          </a>
          <div className="mt-6 flex flex-col items-start gap-2">
            <DevNote value={site.contact.whatsapp} tone="dark" />
            {details.map((d) => (
              <DevNote key={d.label} value={d.value} tone="dark" />
            ))}
          </div>

          {known.length > 0 && (
            <dl className="mt-10">
              {known.map((d) => (
                <div key={d.label} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-tiza/20 py-3.5 text-small">
                  <dt className="text-tiza/70">{d.label}</dt>
                  <dd>{d.value as string}</dd>
                </div>
              ))}
            </dl>
          )}

          <ImageReveal className="mt-14 hidden aspect-[4/5] w-3/5 lg:block">
            <Media slot={media.closing} tone="deep" sizes="20vw" />
          </ImageReveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
