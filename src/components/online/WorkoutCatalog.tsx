import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Media } from "~/components/media/Media";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { StatusTag } from "~/components/ui/StatusTag";
import { categories, durationFilters, levelLabel, workouts } from "~/data/online";
import { cn } from "~/lib/cn";
import type { Level } from "~/types/content";
import { WorkoutCard } from "./WorkoutCard";

const levels = Object.keys(levelLabel) as Level[];

/**
 * Catálogo con filtros por facetas (principio de FFITCOCO: cada entreno se
 * describe con datos). Los filtros viven en la URL para poder compartirlos.
 * Los parámetros se leen tras hidratar: el HTML prerenderizado no los conoce.
 */
export function WorkoutCatalog() {
  const [params, setParams] = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const read = (key: string) => (hydrated ? params.get(key) : null);
  const category = read("tipo") ?? "todas";
  const duration = read("duracion") ?? "todas";
  const level = read("nivel") ?? "todos";

  const update = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(params);
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const durationTest = durationFilters.find((d) => d.id === duration);
  const results = workouts.filter(
    (w) =>
      (category === "todas" || w.categoryIds.includes(category)) &&
      (level === "todos" || w.level === level) &&
      (!durationTest || !("test" in durationTest) || durationTest.test(w.durationMin)),
  );

  return (
    <>
      <section aria-labelledby="categorias-title" className="container-site pt-20 lg:pt-28">
        <div className="flex items-center gap-3">
          <h2 id="categorias-title" className="font-display text-h2">
            Categorías
          </h2>
          <StatusTag tone="example" className="dev-only">Ejemplo</StatusTag>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {categories.map((c, i) => {
            const selected = category === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => update("tipo", selected ? "todas" : c.id, "todas")}
                  className="group block w-full text-left"
                >
                  <span
                    className={cn(
                      "relative block aspect-[4/5] overflow-hidden outline-2 outline-offset-4 transition-[outline-color]",
                      selected ? "outline-acento" : "outline-transparent",
                    )}
                  >
                    <Media slot={c.media} tone={i % 2 ? "light" : "deep"} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </span>
                  <span className="font-heading mt-4 block text-[1.5rem] leading-tight transition-colors group-hover:text-acento">{c.name}</span>
                  <span className="mt-1 block text-small text-piedra">{c.description}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="entrenos-title" className="container-site pt-20 lg:pt-28">
        <div className="flex items-center gap-3">
          <h2 id="entrenos-title" className="font-display text-h2">
            Entrenamientos
          </h2>
          <StatusTag tone="example" className="dev-only">Ejemplo</StatusTag>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-y border-linea py-6 lg:flex-row lg:gap-10">
          <FilterGroup
            label="Tipo"
            value={category}
            onChange={(v) => update("tipo", v, "todas")}
            options={[{ id: "todas", label: "Todos" }, ...categories.map((c) => ({ id: c.id, label: c.name }))]}
          />
          <FilterGroup
            label="Duración"
            value={duration}
            onChange={(v) => update("duracion", v, "todas")}
            options={durationFilters.map((d) => ({ id: d.id, label: d.label }))}
          />
          <FilterGroup
            label="Nivel"
            value={level}
            onChange={(v) => update("nivel", v, "todos")}
            options={[{ id: "todos", label: "Todos" }, ...levels.map((l) => ({ id: l, label: levelLabel[l] }))]}
          />
        </div>

        <p role="status" className="mt-6 text-small text-piedra">
          {results.length === 1 ? "1 entrenamiento" : `${results.length} entrenamientos`}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-card border border-dashed border-linea p-10 text-center">
            <p className="font-semibold">No hay entrenamientos con esos filtros.</p>
            <button
              type="button"
              className="mt-3 min-h-11 font-semibold text-acento underline underline-offset-4"
              onClick={() => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true })}
            >
              Quitar filtros
            </button>
          </div>
        ) : (
          <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((w, i) => (
                <m.li
                  key={w.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutSoft, delay: i * 0.03 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <WorkoutCard workout={w} tone={i % 2 ? "light" : "deep"} />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </>
  );
}


function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-micro font-semibold text-piedra">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-small font-medium transition-colors",
                active ? "border-grafito bg-grafito text-tiza" : "border-linea bg-blanco hover:border-grafito",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
