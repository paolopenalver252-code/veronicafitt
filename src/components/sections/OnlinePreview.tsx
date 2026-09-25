import { useRef, useState } from "react";
import { Link } from "react-router";
import { Media } from "~/components/media/Media";
import { FadeIn, ScrollSettle } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { WaitlistForm } from "~/components/online/WaitlistForm";
import { WorkoutCard } from "~/components/online/WorkoutCard";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { media } from "~/data/media";
import { onlineIntro, workouts } from "~/data/online";

/** Ventana al futuro: aspiracional, pero sin fingir que ya está disponible. */
export function OnlinePreview() {
  const preview = workouts.slice(0, 3);
  const tones = ["deep", "light", "deep"] as const;
  const railRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  // Móvil: qué tarjeta está a la vista (para el indicador "1 / 3").
  const onRailScroll = () => {
    const rail = railRef.current;
    const first = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !first) return;
    setCurrent(Math.min(preview.length - 1, Math.round(rail.scrollLeft / (first.offsetWidth + 20))));
  };

  return (
    <section id="online" aria-labelledby="online-title" className="section-y bg-blanco">
      <div className="container-site">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label text-acento">Online</p>
          <StatusTag tone="soon">Próximamente</StatusTag>
        </div>
        <RevealLines
          as="h2"
          id="online-title"
          lines={[onlineIntro.title]}
          className="font-display mt-6 text-statement"
        />
        <p className="mt-6 text-h3 font-heading text-piedra">
          {onlineIntro.subtitle.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="relative mt-14 lg:container-site lg:mt-20">
        <ScrollSettle className="aspect-[4/5] sm:aspect-video">
          <Media slot={media.online} tone="dark" sizes="(min-width: 1024px) 84rem, 100vw" />
        </ScrollSettle>
        <StatusTag tone="light" className="absolute bottom-4 left-5 md:left-10 lg:left-14">
          En preparación
        </StatusTag>
      </div>

      <div className="container-site mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <FadeIn className="lg:col-span-5">
          <p className="text-lead text-pretty">{onlineIntro.body}</p>
          <DevNote value={onlineIntro.launchNote} className="mt-5" />
        </FadeIn>
        <FadeIn delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <h3 className="font-heading text-h3">Te aviso cuando esté lista</h3>
          <WaitlistForm className="mt-6" />
        </FadeIn>
      </div>

      <div className="container-site mt-24 lg:mt-36">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-linea pt-8">
          <div>
            <p className="label">Vista previa</p>
            <h3 className="font-heading mt-2 text-h3">Así podrás elegir tus entrenamientos</h3>
          </div>
          <Link to="/online" className={textLinkClasses("min-h-11")}>
            Ver la vista previa completa
          </Link>
        </div>

        <ul
          ref={railRef}
          onScroll={onRailScroll}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0"
        >
          {preview.map((w, i) => (
            <FadeIn as="li" key={w.id} delay={i * 0.1} className="w-[78%] shrink-0 snap-start xs:w-[66%] md:w-auto">
              <WorkoutCard workout={w} headingLevel={4} tone={tones[i]} />
            </FadeIn>
          ))}
        </ul>
        {/* Indicador del carrusel (solo móvil): deja claro que se puede deslizar. */}
        <div aria-hidden className="mt-4 flex items-center gap-4 md:hidden">
          <span className="text-micro text-piedra tabular-nums">
            {current + 1} / {preview.length}
          </span>
          <span className="relative h-px flex-1 bg-linea">
            <span
              className="absolute inset-y-0 left-0 bg-acento transition-[width] duration-500 ease-(--ease-out-soft)"
              style={{ width: `${((current + 1) / preview.length) * 100}%` }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
