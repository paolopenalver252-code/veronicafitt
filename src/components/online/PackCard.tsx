import { Media } from "~/components/media/Media";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { workoutThumb } from "~/data/media";
import { isPending } from "~/lib/pending";
import type { Pack, Workout } from "~/types/content";

/** Ficha de pack: lo que evita dudas antes de comprar. Sin compra real. */
export function PackCard({ pack, workouts }: { pack: Pack; workouts: Workout[] }) {
  const included = workouts.filter((w) => pack.workoutIds.includes(w.id));
  const facts: Array<{ label: string; value: string }> = [
    { label: "Entrenamientos", value: String(pack.workoutIds.length) },
    { label: "Duración", value: pack.sessionMinutes },
    { label: "Nivel", value: pack.level },
    ...(pack.weeks && pack.sessionsPerWeek
      ? [{ label: "Estructura", value: `${pack.weeks} semanas, ${pack.sessionsPerWeek} por semana` }]
      : []),
    { label: "Material", value: pack.equipment.join(", ") },
    ...(!isPending(pack.expires) ? [{ label: "Acceso", value: pack.expires ? "Con caducidad" : "Sin caducidad" }] : []),
  ];

  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
        <Media slot={workoutThumb(`pack-${pack.id}`, pack.name)} tone="deep" sizes="(min-width: 1024px) 40vw, 100vw" />
        <StatusTag tone="light" className="absolute top-4 right-4">
          Próximamente
        </StatusTag>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label">Pack</p>
          {pack.isExample && (
            <StatusTag tone="example" className="dev-only">
              Pack de ejemplo
            </StatusTag>
          )}
        </div>
        <h3 className="font-display mt-4 text-h2">{pack.name}</h3>
        <p className="mt-5 max-w-[30rem] text-lead text-pretty text-piedra">{pack.hook}</p>

        <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-linea py-3">
              <dt className="text-micro text-piedra">{f.label}</dt>
              <dd className="mt-1">{f.value}</dd>
            </div>
          ))}
        </dl>

        <h4 className="label mt-10">Incluye</h4>
        <ul className="mt-3">
          {included.map((w) => (
            <li key={w.id} className="flex justify-between gap-4 border-t border-linea py-2.5 last:border-b">
              <span>{w.title}</span>
              <span className="text-small whitespace-nowrap text-piedra tabular-nums">{w.durationMin} min</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-small text-piedra">
          La compra todavía no está disponible. Apúntate a la lista de espera y te aviso cuando lo esté.
        </p>
        <div className="mt-3 flex flex-col items-start gap-2">
          <DevNote value={pack.price} />
          <DevNote value={pack.expires} />
        </div>
      </div>
    </article>
  );
}
