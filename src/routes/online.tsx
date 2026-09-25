import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/online";
import { Media } from "~/components/media/Media";
import { FadeIn, ScrollSettle } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { PackCard } from "~/components/online/PackCard";
import { WaitlistForm } from "~/components/online/WaitlistForm";
import { WorkoutCatalog } from "~/components/online/WorkoutCatalog";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { media } from "~/data/media";
import { onlineIntro, packs, workouts } from "~/data/online";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Entrenamiento online con Verónica Calabuch",
    description:
      "Entrenamientos grabados de unos 45 minutos, organizados en packs, para entrenar desde casa. En preparación: apúntate a la lista de espera.",
    path: "/online",
  });
}

const howItWorks = [
  { title: "Sesiones de unos 45 minutos", body: "Entrenamientos completos, grabados por Verónica." },
  { title: "Organizadas en packs", body: "Para seguir una progresión, no entrenos sueltos." },
  { title: "Desde casa", body: "Cuando quieras y donde quieras, estés donde estés." },
];

export default function Online() {
  return (
    <>
      <section id="inicio" aria-labelledby="online-title" className="pt-(--nav-h)">
        <div className="container-site pt-6 lg:pt-10">
          <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-small text-piedra hover:text-grafito">
            <ArrowLeft aria-hidden className="size-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="container-site pt-10 lg:pt-16">
          <div className="flex flex-wrap items-center gap-3">
            <p className="label text-acento">Entrenamiento online con Verónica Calabuch</p>
            <StatusTag tone="soon">Próximamente</StatusTag>
          </div>
          <RevealLines
            as="h1"
            id="online-title"
            trigger="load"
            delay={0.1}
            lines={["Entrena", "donde quieras."]}
            className="font-display mt-8 text-display"
          />
          <p className="font-heading mt-8 text-h3 text-piedra">
            {onlineIntro.subtitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-14 lg:container-site lg:mt-20">
          <ScrollSettle className="aspect-[4/5] sm:aspect-video">
            <Media slot={media.online} tone="dark" priority sizes="(min-width: 1024px) 84rem, 100vw" />
          </ScrollSettle>
        </div>

        <div className="container-site mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-lead text-pretty">{onlineIntro.body}</p>
            <DevNote value={onlineIntro.launchNote} className="mt-5" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-heading text-h3">Te aviso cuando esté lista</h2>
            <WaitlistForm className="mt-6" />
          </div>
        </div>
      </section>

      <section aria-labelledby="como-funcionara-title" className="container-site pt-24 lg:pt-36">
        <h2 id="como-funcionara-title" className="font-display text-h2">
          Cómo funcionará
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {howItWorks.map(({ title, body }, i) => (
            <FadeIn as="li" key={title} delay={i * 0.08} className="border-t border-linea pt-6">
              <span aria-hidden className="font-display block text-[3rem] leading-none text-acento">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-5 text-[1.5rem] leading-tight">{title}</h3>
              <p className="mt-2 text-piedra">{body}</p>
            </FadeIn>
          ))}
        </ol>
        <DevNote value={onlineIntro.formatNote} className="mt-6" />
      </section>

      <div className="container-site mt-24 lg:mt-32">
        <p className="border-y border-linea py-5 text-small text-piedra">
          <span className="font-semibold text-grafito">Vista previa.</span> Los entrenamientos todavía no están
          disponibles: las categorías, sesiones y packs de esta página son ejemplos de cómo funcionará la plataforma.
        </p>
      </div>

      <WorkoutCatalog />

      <section aria-labelledby="packs-title" className="container-site pt-24 lg:pt-36">
        <h2 id="packs-title" className="font-display text-h2">
          Packs
        </h2>
        <div className="mt-12">
          {packs.map((p) => (
            <PackCard key={p.id} pack={p} workouts={workouts} />
          ))}
        </div>
      </section>

      <section aria-labelledby="espera-title" className="section-y">
        <div className="container-site">
          <div className="bg-acento-profundo px-6 py-14 text-tiza sm:px-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-16 lg:py-20">
            <div className="lg:col-span-6">
              <h2 id="espera-title" className="font-display text-h2 text-balance">
                ¿Quieres saber cuándo empieza?
              </h2>
              <p className="mt-5 text-tiza/80">Déjame tu email y te aviso cuando los entrenamientos estén disponibles.</p>
            </div>
            <WaitlistForm tone="dark" className="mt-10 lg:col-span-6 lg:mt-0" />
          </div>
        </div>
      </section>
    </>
  );
}
