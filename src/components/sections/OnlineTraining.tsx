import { Link } from "react-router";
import { ContactCta } from "~/components/contact/ContactIntent";
import { Media } from "~/components/media/Media";
import { FadeIn, ScrollSettle } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { ScrollWords } from "~/components/motion/ScrollWords";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { media } from "~/data/media";
import { liveTraining } from "~/data/online";
import { cn } from "~/lib/cn";

/**
 * Entrenamiento online en directo (home). La idea que vende no es "clases
 * online", sino que Verónica está contigo aunque no estéis en la misma sala.
 */
export function OnlineTraining() {
  return (
    <section id="online" aria-labelledby="online-title" className="section-y bg-blanco">
      <div className="container-site">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label text-acento">Entrenamiento online</p>
          {liveTraining.status === "coming-soon" && <StatusTag tone="soon">Próximamente</StatusTag>}
        </div>
        <RevealLines
          as="h2"
          id="online-title"
          lines={["Entrena conmigo,", "estés donde estés."]}
          className="font-display mt-6 text-statement"
        />
        <p className="mt-8 max-w-[36rem] text-lead text-pretty text-piedra">{liveTraining.lead}</p>
      </div>

      <div className="mt-14 lg:container-site lg:mt-20">
        <ScrollSettle className="aspect-[4/5] sm:aspect-video">
          <Media slot={media.online} tone="deep" sizes="(min-width: 1024px) 84rem, 100vw" />
        </ScrollSettle>
      </div>

      <div className="container-site">
        <OnlineDifference className="mt-20 lg:mt-32" />
        <OnlinePillars className="mt-16 lg:mt-24" />

        <div className="mt-20 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-6">
            <OnlineAudience />
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="font-heading text-h3 text-pretty">¿Te encaja? Escríbeme y te cuento cuándo empezamos.</p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <ContactCta service="online" className="w-full sm:w-auto">
                {liveTraining.cta}
              </ContactCta>
              <Link to="/online" className={textLinkClasses()}>
                Todo sobre el entrenamiento online
              </Link>
            </div>
            <div className="mt-6 flex flex-col items-start gap-2">
              {liveTraining.notes.map((n, i) => (
                <DevNote key={i} value={n} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/** "No estás siguiendo un vídeo. Estoy contigo.": la diferencia, como declaración. */
export function OnlineDifference({ className }: { className?: string }) {
  return (
    <ScrollWords
      as="p"
      text={liveTraining.difference.join(" ")}
      className={cn("font-display max-w-[16ch] text-h2 text-balance lg:text-[clamp(3rem,1.5rem+3.4vw,5.25rem)]", className)}
    />
  );
}

/** Las cuatro ideas del servicio, separadas solo por filetes. */
export function OnlinePillars({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {liveTraining.pillars.map((p, i) => (
        <FadeIn as="li" key={p.title} delay={i * 0.08} className="border-t border-linea py-7">
          <h3 className="font-heading text-[1.625rem] leading-tight">{p.title}</h3>
          <p className="mt-3 text-pretty text-piedra">{p.body}</p>
        </FadeIn>
      ))}
    </ul>
  );
}

export function OnlineAudience() {
  return (
    <>
      <h3 className="label">{liveTraining.audienceTitle}</h3>
      <ul className="mt-5">
        {liveTraining.audience.map((item) => (
          <li key={item} className="border-t border-linea py-4 text-lead text-pretty last:border-b">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
