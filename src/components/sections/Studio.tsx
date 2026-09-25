import { Media } from "~/components/media/Media";
import { PendingValue } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { studio } from "~/data/home";
import { media } from "~/data/media";

export function Studio() {
  return (
    <section id="sala" aria-labelledby="sala-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <SectionHeading id="sala-title" title={studio.title} intro={studio.lead} className="lg:col-span-6" />

          <dl className="self-end border-t border-linea lg:col-span-5 lg:col-start-8">
            {studio.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-linea py-3.5">
                <dt className="text-small font-semibold text-piedra">{fact.label}</dt>
                <dd className="text-small">
                  <PendingValue value={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-media lg:col-span-8">
            <Media slot={media.studio} sizes="(min-width: 1024px) 66vw, 100vw" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-media lg:col-span-4 lg:mb-16">
            <Media slot={media.studioDetailA} sizes="(min-width: 1024px) 33vw, 50vw" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-media lg:hidden">
            <Media slot={media.studioDetailB} sizes="50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
