import { Link } from "react-router";
import { Media } from "~/components/media/Media";
import { FadeIn } from "~/components/motion/Reveal";
import { WaitlistForm } from "~/components/online/WaitlistForm";
import { WorkoutCard } from "~/components/online/WorkoutCard";
import { textLinkClasses } from "~/components/ui/Button";
import { PendingNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { media } from "~/data/media";
import { onlineIntro, workouts } from "~/data/online";

/** Avance de la futura plataforma online en la home + lista de espera. */
export function OnlinePreview() {
  const preview = workouts.slice(0, 3);

  return (
    <section id="online" aria-labelledby="online-title" className="section-y bg-blanco">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <StatusTag tone="soon">{onlineIntro.status}</StatusTag>
            <h2 id="online-title" className="font-heading mt-5 text-h2 text-balance">
              {onlineIntro.title}
            </h2>
            <p className="mt-5 text-lead text-pretty text-piedra">{onlineIntro.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {onlineIntro.audience.map((a) => (
                <li key={a}>
                  <StatusTag>{a}</StatusTag>
                </li>
              ))}
            </ul>
            <PendingNote value={onlineIntro.launchNote} className="mt-5" />
            <WaitlistForm className="mt-10" />
          </div>

          <div className="relative aspect-video overflow-hidden rounded-media bg-tiza-deep lg:col-span-7">
            <Media slot={media.online} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-h3">Así podría verse la plataforma</h3>
                <StatusTag tone="example">Ejemplo</StatusTag>
              </div>
              <p className="mt-2 max-w-[36rem] text-small text-piedra">
                Vista previa con contenido de ejemplo: las categorías y los entrenamientos reales los definirá Verónica.
              </p>
            </div>
            <Link to="/online" className={textLinkClasses("min-h-11")}>
              Ver la vista previa completa
            </Link>
          </div>

          <ul className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {preview.map((w, i) => (
              <FadeIn as="li" key={w.id} delay={i * 0.08} className="w-[82%] shrink-0 snap-start xs:w-[70%] md:w-auto">
                <WorkoutCard workout={w} headingLevel={4} />
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
