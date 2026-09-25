import { Media } from "~/components/media/Media";
import { ImageReveal } from "~/components/motion/Reveal";
import { textLinkClasses } from "~/components/ui/Button";
import { PendingNote } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { about } from "~/data/home";
import { media } from "~/data/media";
import { isPending } from "~/lib/pending";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5 lg:self-start">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-media">
            <Media slot={media.about} sizes="(min-width: 1024px) 40vw, 100vw" />
          </ImageReveal>
          <ImageReveal
            delay={0.25}
            className="relative -mt-16 ml-auto aspect-[4/5] w-[46%] overflow-hidden rounded-media border-8 border-tiza lg:absolute lg:-right-16 lg:-bottom-20 lg:mt-0 lg:w-[44%]"
          >
            <Media slot={media.aboutDetail} compact sizes="(min-width: 1024px) 18vw, 46vw" />
          </ImageReveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <SectionHeading id="sobre-mi-title" label="Sobre mí" title={about.title} />
          <p className="mt-6 max-w-[36rem] text-lead text-pretty">{about.lead}</p>
          <div className="mt-5 flex max-w-[36rem] flex-col gap-4 text-piedra">
            {about.body.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start gap-2">
            <PendingNote value={about.copyNote} />
            <PendingNote value={about.storyNote} />
            <PendingNote value={about.credentialsNote} />
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-linea bg-linea sm:grid-cols-3">
            {about.principles.map((p) => (
              <div key={p.title} className="bg-tiza p-5">
                <dt className="font-heading text-h3">{p.title}</dt>
                <dd className="mt-2 text-small text-piedra">{p.body}</dd>
              </div>
            ))}
          </dl>

          {isPending(about.quote) ? (
            <PendingNote value={about.quote} className="mt-8" />
          ) : (
            <blockquote className="mt-10 border-l-2 border-cobalto pl-5 text-lead">{about.quote}</blockquote>
          )}

          <div className="mt-10">
            <a href={`#${about.cta.anchor}`} className={textLinkClasses("min-h-11")}>
              {about.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
