import { ContactCta } from "~/components/contact/ContactIntent";
import { buttonClasses } from "~/components/ui/Button";
import { PendingNote, PendingValue } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { StatusTag } from "~/components/ui/StatusTag";
import { pricing } from "~/data/home";
import { cn } from "~/lib/cn";
import { isPending, resolved } from "~/lib/pending";
import type { PricingPlan } from "~/types/content";

export function Pricing() {
  return (
    <section id="tarifas" aria-labelledby="tarifas-title" className="section-y">
      <div className="container-site">
        <SectionHeading id="tarifas-title" title={pricing.title} intro={pricing.intro} />

        <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {pricing.plans.map((plan) => (
            <li key={plan.id}>
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>

        <PendingNote value={pricing.conditionsNote} className="mt-6" />
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const comingSoon = plan.status === "coming-soon";
  const pricePending = isPending(plan.price);

  return (
    <article className="flex h-full flex-col rounded-card border border-linea bg-blanco p-6 lg:p-8">
      <div className="flex min-h-7 items-start justify-between gap-3">
        <h3 className="font-heading text-h3">{plan.name}</h3>
        {comingSoon && <StatusTag tone="soon">Próximamente</StatusTag>}
      </div>
      <p className="mt-2 text-small text-piedra">{plan.description}</p>

      <div className="mt-8 border-t border-linea pt-6">
        <p className={cn("font-heading text-[3rem] leading-none", pricePending ? "text-piedra" : "text-grafito")} aria-hidden={pricePending}>
          {resolved(plan.price) ?? "— €"}
        </p>
        <div className="mt-3 flex flex-col gap-2 text-small">
          {pricePending ? (
            <>
              <PendingValue value={plan.price} fallback="Tarifa pendiente de confirmar" />
              <PendingNote value={plan.unit} />
            </>
          ) : (
            <PendingValue value={plan.unit} />
          )}
        </div>
      </div>

      <div className="mt-6 text-small">
        <p className="font-semibold">Qué incluye</p>
        {isPending(plan.includes) ? (
          <PendingValue value={plan.includes} className="mt-1" />
        ) : (
          <ul className="mt-2 list-disc pl-5 text-piedra">
            {plan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto pt-8">
        {comingSoon ? (
          <a href="#online" className={buttonClasses("secondary", "w-full")}>
            Apuntarme a la lista de espera
          </a>
        ) : (
          <ContactCta service={plan.service} variant="secondary" className="w-full">
            Preguntar por esta tarifa
          </ContactCta>
        )}
      </div>
    </article>
  );
}
