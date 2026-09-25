import { ArrowLeft, CalendarDays, Clapperboard, House } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/online";
import { Media } from "~/components/media/Media";
import { RevealLines } from "~/components/motion/RevealLines";
import { PackCard } from "~/components/online/PackCard";
import { WaitlistForm } from "~/components/online/WaitlistForm";
import { WorkoutCatalog } from "~/components/online/WorkoutCatalog";
import { PendingNote } from "~/components/ui/Pending";
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
  { icon: Clapperboard, title: "Vídeos de unos 45 minutos", body: "Sesiones completas grabadas por Verónica." },
  { icon: CalendarDays, title: "Organizados en packs", body: "Para seguir una progresión, no entrenos sueltos." },
  { icon: House, title: "Desde casa", body: "Cuando quieras y donde quieras, estés donde estés." },
];

export default function Online() {
  return (
    <>
      <section id="inicio" aria-labelledby="online-title" className="pt-(--nav-h)">
        <div className="container-site pt-6 lg:pt-10">
          <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-small font-medium text-piedra hover:text-grafito">
            <ArrowLeft aria-hidden className="size-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="container-site grid gap-12 pt-6 pb-4 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-10">
          <div className="lg:col-span-6">
            <StatusTag tone="soon">{onlineIntro.status}</StatusTag>
            <RevealLines
              as="h1"
              id="online-title"
              trigger="load"
              width={{ from: 118, to: 80 }}
              lines={["Entrena conmigo", "desde casa."]}
              className="font-display mt-6 text-display"
              before={
                <span className="mb-4 block text-small font-semibold tracking-normal text-cobalto [font-variation-settings:'wdth'_100]">
                  Entrenamiento online con Verónica Calabuch
                </span>
              }
            />
            <p className="mt-6 max-w-[32rem] text-lead text-pretty text-piedra">{onlineIntro.body}</p>
            <PendingNote value={onlineIntro.launchNote} className="mt-5" />
            <WaitlistForm className="mt-10" />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-media bg-tiza-deep lg:col-span-6">
            <Media slot={media.online} priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <div className="container-site mt-16">
        <p className="rounded-card border border-dashed border-piedra/50 bg-tiza px-5 py-4 text-small text-piedra">
          <strong className="font-semibold text-grafito">Vista previa.</strong> Los entrenamientos todavía no están
          disponibles. Las categorías, entrenamientos y packs de esta página son ejemplos para mostrar cómo funcionará la
          plataforma.
        </p>
      </div>

      <section aria-labelledby="como-funcionara-title" className="container-site pt-20 lg:pt-28">
        <h2 id="como-funcionara-title" className="font-heading text-h2">
          Cómo funcionará
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-6">
          {howItWorks.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-card border border-linea bg-blanco p-6">
              <Icon aria-hidden className="size-6 text-cobalto" strokeWidth={1.75} />
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-1 text-small text-piedra">{body}</p>
            </li>
          ))}
        </ul>
        <PendingNote value={onlineIntro.formatNote} className="mt-5" />
      </section>

      <WorkoutCatalog />

      <section aria-labelledby="packs-title" className="container-site pt-20 lg:pt-28">
        <div className="flex items-center gap-3">
          <h2 id="packs-title" className="font-heading text-h2">
            Packs
          </h2>
          <StatusTag tone="example">Ejemplo</StatusTag>
        </div>
        <div className="mt-8">
          {packs.map((p) => (
            <PackCard key={p.id} pack={p} workouts={workouts} />
          ))}
        </div>
      </section>

      <section aria-labelledby="espera-title" className="section-y">
        <div className="container-site">
          <div className="rounded-card bg-cielo p-6 sm:p-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-14">
            <div className="lg:col-span-6">
              <h2 id="espera-title" className="font-heading text-h2 text-balance">
                ¿Quieres saber cuándo empieza?
              </h2>
              <p className="mt-4 text-piedra">Déjame tu email y te aviso cuando los entrenamientos estén disponibles.</p>
            </div>
            <WaitlistForm className="mt-8 lg:col-span-6 lg:mt-0" />
          </div>
        </div>
      </section>
    </>
  );
}
