import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { DevNote } from "~/components/ui/Pending";
import { pending, type Maybe } from "~/lib/pending";

export type LegalSection = { title: string; body: ReactNode; note?: Maybe<string> };

const legalReview = pending("Texto base: revisar con asesoría legal antes de publicar");

/** Plantilla de página legal. Los datos del titular siguen pendientes. */
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <article className="container-site pt-[calc(var(--nav-h)+2rem)] pb-24 lg:pt-[calc(var(--nav-h)+4rem)]">
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-small font-medium text-piedra hover:text-grafito">
        <ArrowLeft aria-hidden className="size-4" />
        Volver al inicio
      </Link>
      <h1 className="font-display mt-6 text-h2">{title}</h1>
      <p className="mt-5 max-w-[40rem] text-lead text-piedra">{intro}</p>
      <DevNote value={legalReview} className="mt-5" />

      <div className="mt-12 flex max-w-[42rem] flex-col gap-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-heading text-h3">{s.title}</h2>
            <div className="mt-3 flex flex-col gap-3 text-piedra">{s.body}</div>
            {s.note && <DevNote value={s.note} className="mt-3" />}
          </section>
        ))}
      </div>
    </article>
  );
}
