import { PendingValue } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { cn } from "~/lib/cn";
import { isPending, resolved } from "~/lib/pending";
import type { Pack, Workout } from "~/types/content";

/** Ficha de pack: la información que evita dudas antes de comprar. Sin compra real. */
export function PackCard({ pack, workouts }: { pack: Pack; workouts: Workout[] }) {
  const included = workouts.filter((w) => pack.workoutIds.includes(w.id));
  const facts: Array<{ label: string; value: string }> = [
    { label: "Entrenamientos", value: String(pack.workoutIds.length) },
    { label: "Duración por sesión", value: pack.sessionMinutes },
    { label: "Nivel", value: pack.level },
    ...(pack.weeks && pack.sessionsPerWeek
      ? [{ label: "Estructura", value: `${pack.weeks} semanas, ${pack.sessionsPerWeek} sesiones por semana` }]
      : []),
    { label: "Material", value: pack.equipment.join(", ") },
  ];

  return (
    <article className="grid overflow-hidden rounded-card border border-linea bg-blanco lg:grid-cols-12">
      <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
        <div className="flex flex-wrap gap-2">
          {pack.isExample && <StatusTag tone="example">Pack de ejemplo</StatusTag>}
          <StatusTag tone="soon">Próximamente</StatusTag>
        </div>
        <h3 className="font-heading mt-5 text-h2">{pack.name}</h3>
        <p className="mt-4 max-w-[32rem] text-lead text-pretty text-piedra">{pack.hook}</p>

        <dl className="mt-8 grid gap-x-8 border-t border-linea sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="border-b border-linea py-3">
              <dt className="text-micro font-semibold text-piedra">{f.label}</dt>
              <dd className="mt-1">{f.value}</dd>
            </div>
          ))}
          <div className="border-b border-linea py-3">
            <dt className="text-micro font-semibold text-piedra">Acceso</dt>
            <dd className="mt-1">
              {isPending(pack.expires) ? (
                <PendingValue value={pack.expires} />
              ) : pack.expires ? (
                "Con caducidad"
              ) : (
                "Sin caducidad"
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col border-t border-linea bg-tiza p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-10">
        <h4 className="text-small font-semibold text-piedra">Incluye</h4>
        <ul className="mt-3 flex flex-col gap-2">
          {included.map((w) => (
            <li key={w.id} className="flex justify-between gap-4 border-b border-linea pb-2">
              <span>{w.title}</span>
              <span className="text-small whitespace-nowrap text-piedra tabular-nums">{w.durationMin} min</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 lg:mt-auto">
          <p className="text-micro font-semibold text-piedra">Precio</p>
          <p className={cn("font-heading mt-1 text-h2", isPending(pack.price) ? "text-piedra" : "text-grafito")} aria-hidden={isPending(pack.price)}>
            {resolved(pack.price) ?? "— €"}
          </p>
          <PendingValue value={pack.price} className="mt-2 text-small" />
          <p className="mt-6 rounded-field border border-dashed border-piedra/50 px-4 py-3 text-small text-piedra">
            La compra todavía no está disponible. Apúntate a la lista de espera y te aviso cuando lo esté.
          </p>
        </div>
      </div>
    </article>
  );
}
