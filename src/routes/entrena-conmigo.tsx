import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/entrena-conmigo";
import { ContactCta } from "~/components/contact/ContactIntent";
import { FadeIn } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { WaitlistForm } from "~/components/online/WaitlistForm";
import { WorkoutCatalog } from "~/components/online/WorkoutCatalog";
import { PackGrid } from "~/components/packs/PackGrid";
import { OnlineAudience, OnlineDifference, OnlinePillars, OnlineSessionFrame } from "~/components/sections/OnlineTraining";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { liveTraining } from "~/data/online";
import { packs } from "~/data/packs";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Entrena conmigo | Entrenamiento online y sesiones grabadas con Verónica Calabuch",
    description:
      "Entrena con Verónica desde casa: sesiones en directo con corrección de la técnica y acompañamiento, la grabación si no puedes conectarte y una biblioteca de sesiones grabadas.",
    path: "/entrena-conmigo",
  });
}

/** Índice de la página: las dos formas de entrenar a distancia, el pack y el aviso. */
const sections = [
  { id: "en-directo", label: "En directo" },
  { id: "sesiones-grabadas", label: "Sesiones grabadas" },
  { id: "pack-online", label: "Pack online" },
  { id: "aviso", label: "Avísame" },
];

/**
 * Entrena conmigo: el espacio completo del entrenamiento a distancia (directo +
 * sesiones grabadas). La sección "Online" de la home es su presentación breve.
 * /online redirige aquí (vercel.json).
 */
export default function EntrenaConmigo() {
  const onlinePacks = packs.filter((p) => p.channel === "Online" && p.status !== "draft");

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
            <p className="label text-acento">Entrenamiento online · en directo y grabado</p>
            {liveTraining.status === "coming-soon" && <StatusTag tone="soon">Próximamente</StatusTag>}
          </div>
          <RevealLines
            as="h1"
            id="online-title"
            trigger="load"
            delay={0.1}
            lines={["Entrena conmigo,", "estés donde estés."]}
            className="font-display mt-8 text-display"
          />
          <p className="mt-8 max-w-[34rem] text-lead text-pretty text-piedra">{liveTraining.lead}</p>
          <ContactCta service="online" className="mt-9">
            {liveTraining.cta}
          </ContactCta>
          <nav aria-label="En esta página" className="mt-12 flex flex-wrap gap-x-7 gap-y-1 border-t border-linea pt-4">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={textLinkClasses("text-small")}>
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 lg:container-site lg:mt-20">
          <OnlineSessionFrame priority className="lg:mx-auto lg:max-w-3xl" />
        </div>
      </section>

      <section id="en-directo" aria-label="En directo: qué lo hace diferente" className="container-site pt-20 lg:pt-32">
        <p className="label text-acento">En directo</p>
        <OnlineDifference size="lg" className="mt-6" />
        <OnlinePillars layout="grid" className="mt-16 lg:mt-24" />
      </section>

      <section aria-labelledby="sesion-title" className="container-site pt-24 lg:pt-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="sesion-title" className="font-display text-h2">
              Así será cada sesión
            </h2>
            <ol className="mt-10">
              {liveTraining.steps.map((step, i) => (
                <FadeIn as="li" key={step.title} delay={i * 0.08} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-linea py-6">
                  <span aria-hidden className="font-display text-[2.5rem] leading-none text-acento">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.5rem] leading-tight">{step.title}</h3>
                    <p className="mt-2 text-pretty text-piedra">{step.body}</p>
                  </div>
                </FadeIn>
              ))}
            </ol>
          </div>
          <FadeIn delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <OnlineAudience />
            <div className="mt-6 flex flex-col items-start gap-2">
              {liveTraining.notes.map((n, i) => (
                <DevNote key={i} value={n} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div id="sesiones-grabadas" data-anchor className="container-site mt-24 lg:mt-32">
        <p className="label text-acento">Sesiones grabadas</p>
        <p className="mt-6 border-y border-linea py-5 text-small text-piedra">
          <span className="font-semibold text-grafito">Vista previa de las grabaciones.</span> Así podrás encontrar las
          sesiones grabadas cuando no puedas conectarte en directo. Las categorías y sesiones de esta página son ejemplos.
        </p>
      </div>

      <WorkoutCatalog />

      {onlinePacks.length > 0 && (
        <section id="pack-online" aria-labelledby="packs-online-title" className="container-site pt-24 lg:pt-36">
          <h2 id="packs-online-title" className="font-display text-h2">
            Pack online
          </h2>
          <PackGrid packs={onlinePacks} className="mt-12" />
        </section>
      )}

      <section id="aviso" aria-labelledby="espera-title" className="section-y">
        <div className="container-site">
          <div className="bg-acento-profundo px-6 py-14 text-tiza sm:px-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-16 lg:py-20">
            <div className="lg:col-span-6">
              <h2 id="espera-title" className="font-display text-h2 text-balance">
                ¿Quieres saber cuándo empezamos?
              </h2>
              <p className="mt-5 text-tiza/80">Déjame tu email y te aviso en cuanto abra las primeras sesiones en directo.</p>
            </div>
            <WaitlistForm tone="dark" className="mt-10 lg:col-span-6 lg:mt-0" />
          </div>
        </div>
      </section>
    </>
  );
}
