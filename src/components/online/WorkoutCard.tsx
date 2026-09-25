import { Lock } from "lucide-react";
import { Media } from "~/components/media/Media";
import type { PlaceholderTone } from "~/components/media/MediaPlaceholder";
import { StatusTag } from "~/components/ui/StatusTag";
import { levelLabel } from "~/data/online";
import type { Workout } from "~/types/content";

const accessLabel: Record<Workout["access"], string> = {
  free: "Gratis",
  pack: "Incluido en un pack",
  subscription: "Con suscripción",
};

/**
 * Tarjeta de entrenamiento de la futura plataforma: la imagen manda y los
 * datos (duración, nivel, objetivo) van debajo, sin caja alrededor.
 * Preparada para datos reales: estado de acceso y de publicación incluidos.
 */
export function WorkoutCard({
  workout,
  headingLevel = 3,
  tone = "light",
}: {
  workout: Workout;
  headingLevel?: 3 | 4;
  tone?: PlaceholderTone;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const available = workout.status === "available";

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-(--ease-out-soft) group-hover:scale-[1.04]">
          <Media slot={workout.media} tone={tone} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 80vw" />
        </div>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {workout.isExample ? (
            <StatusTag tone="example" className="dev-only">
              Ejemplo
            </StatusTag>
          ) : (
            <span />
          )}
          {!available && <StatusTag tone="light">Próximamente</StatusTag>}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4 text-small text-piedra">
        <span className="tabular-nums">{workout.durationMin} min</span>
        <span aria-hidden className="h-3 w-px bg-linea" />
        <span>Nivel {levelLabel[workout.level].toLowerCase()}</span>
      </div>
      <Heading className="font-heading mt-2 text-[1.625rem] leading-tight">{workout.title}</Heading>
      <p className="mt-1.5 text-small text-piedra">
        {workout.goal}, {workout.equipment.join(", ").toLowerCase()}
      </p>
      <p className="mt-4 flex items-center gap-2 text-micro text-piedra">
        <Lock aria-hidden className="size-3.5" />
        {accessLabel[workout.access]}
      </p>
    </article>
  );
}
