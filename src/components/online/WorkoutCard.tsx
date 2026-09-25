import { Clock, Lock } from "lucide-react";
import { Media } from "~/components/media/Media";
import { StatusTag } from "~/components/ui/StatusTag";
import { levelLabel } from "~/data/online";
import { cn } from "~/lib/cn";
import type { Workout } from "~/types/content";

const accessLabel: Record<Workout["access"], string> = {
  free: "Gratis",
  pack: "Incluido en un pack",
  subscription: "Con suscripción",
};

/**
 * Tarjeta de entrenamiento de la futura plataforma.
 * Preparada para datos reales: el estado de acceso y de publicación ya existen.
 */
export function WorkoutCard({ workout, headingLevel = 3 }: { workout: Workout; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const available = workout.status === "available";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-linea bg-blanco transition-[translate,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-float">
      <div className="relative aspect-[16/10] overflow-hidden bg-tiza-deep">
        <div className="absolute inset-0 transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-[1.03]">
          <Media slot={workout.media} compact sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw" />
        </div>
        <div className="absolute inset-x-3 top-3 flex justify-between gap-2">
          {workout.isExample ? <StatusTag tone="example">Ejemplo</StatusTag> : <span />}
          {!available && <StatusTag tone="soon">Próximamente</StatusTag>}
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-grafito/85 px-2.5 py-1 text-micro font-semibold text-tiza">
          <Clock aria-hidden className="size-3.5" />
          <span>
            {workout.durationMin} min<span className="sr-only"> de duración</span>
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-heading text-[1.3125rem] leading-tight">{workout.title}</Heading>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Características">
          <li>
            <StatusTag>{`Nivel ${levelLabel[workout.level].toLowerCase()}`}</StatusTag>
          </li>
          <li>
            <StatusTag>{workout.goal}</StatusTag>
          </li>
          {workout.equipment.map((e) => (
            <li key={e}>
              <StatusTag>{e}</StatusTag>
            </li>
          ))}
        </ul>
        <p className={cn("mt-auto flex items-center gap-2 pt-5 text-small text-piedra")}>
          <Lock aria-hidden className="size-4" />
          {accessLabel[workout.access]}
        </p>
      </div>
    </article>
  );
}
