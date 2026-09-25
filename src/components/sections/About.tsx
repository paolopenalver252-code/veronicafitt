import { Media } from "~/components/media/Media";
import { FadeIn, ImageReveal } from "~/components/motion/Reveal";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { about } from "~/data/home";
import { media } from "~/data/media";
import { isPending } from "~/lib/pending";

/** Imagen grande, relato corto y aire. La foto de Verónica manda. */
export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="section-y bg-tiza-deep/60">
      <div className="lg:container-site lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="relative lg:col-span-6">
          <ImageReveal className="aspect-[4/5] lg:aspect-[5/6]">
            <Media slot={media.about} tone="deep" sizes="(min-width: 1024px) 55vw, 100vw" />
          </ImageReveal>
        </div>

        <div className="px-5 pt-14 md:px-10 lg:col-span-5 lg:col-start-8 lg:px-0 lg:pt-0">
          <FadeIn>
            <p className="label text-acento">Sobre mí</p>
            <h2 id="sobre-mi-title" className="font-display mt-5 text-h2">
              {about.title}
            </h2>
            <p className="mt-8 text-lead text-pretty">{about.lead}</p>
            {about.body.map((p) => (
              <p key={p} className="mt-5 text-pretty text-piedra">
                {p}
              </p>
            ))}
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* Móvil: filas (título | texto). Desde sm: tres columnas separadas por filetes. */}
            <dl className="mt-12 border-t border-linea sm:grid sm:grid-cols-3">
              {about.principles.map((p) => (
                <div
                  key={p.title}
                  className="flex items-baseline justify-between gap-6 border-b border-linea py-4 sm:block sm:border-r sm:border-b-0 sm:px-4 sm:py-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dt className="font-heading text-[1.5rem] leading-tight sm:text-[1.375rem]">{p.title}</dt>
                  <dd className="text-right text-small text-piedra sm:mt-1.5 sm:text-left">{p.body}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          {!isPending(about.quote) && (
            <blockquote className="font-heading mt-12 text-h3 text-pretty">“{about.quote}”</blockquote>
          )}

          <div className="dev-only mt-10 flex flex-col items-start gap-2">
            <DevNote value={about.copyNote} />
            <DevNote value={about.storyNote} />
            <DevNote value={about.credentialsNote} />
            <DevNote value={about.quote} />
          </div>

          <div className="mt-8">
            <a href={`#${about.cta.anchor}`} className={textLinkClasses("min-h-11")}>
              {about.cta.label}
            </a>
          </div>

          {/* Detalle visual: segunda foto pequeña, como en una página de revista. */}
          <ImageReveal delay={0.2} className="mt-14 aspect-[4/5] w-1/2 lg:w-2/5">
            <Media slot={media.aboutDetail} tone="soft" sizes="(min-width: 1024px) 15vw, 50vw" />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
