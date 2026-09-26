import { PackGrid } from "~/components/packs/PackGrid";
import { DevNote } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { packsIntro } from "~/data/home";
import { packs } from "~/data/packs";

/** Packs: donde convergen las dos vías (presencial y online). Generado desde datos. */
export function Packs() {
  const visible = packs.filter((p) => p.status !== "draft");

  return (
    <section id="packs" aria-labelledby="packs-title" className="section-y bg-tiza-deep/70">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading id="packs-title" label="Packs" title={packsIntro.title} className="lg:col-span-7" />
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-pretty text-piedra">{packsIntro.intro}</p>
            <p className="mt-4 text-small text-pretty text-piedra">{packsIntro.pricesNote}</p>
            <DevNote value={packsIntro.conditionsNote} className="mt-4" />
          </div>
        </div>

        <PackGrid packs={visible} className="mt-16 lg:mt-24" />
      </div>
    </section>
  );
}
