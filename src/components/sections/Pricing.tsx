import { ContactCta } from "~/components/contact/ContactIntent";
import { FadeIn } from "~/components/motion/Reveal";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { pricing } from "~/data/home";
import { isPending } from "~/lib/pending";
import type { PricingPlan } from "~/types/content";

/** Tarifas como servicios de una marca personal: filas con aire, no una tabla de precios. */
export function Pricing() {
  return (
    <section id="tarifas" aria-labelledby="tarifas-title" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label text-acento">Tarifas</p>
          <h2 id="tarifas-title" className="font-display mt-5 text-h2">
            {pricing.title}
          </h2>
          <p className="mt-6 max-w-[24rem] text-pretty text-piedra">{pricing.intro}</p>
          <DevNote value={pricing.conditionsNote} className="mt-5" />
        </div>

        <ul className="lg:col-span-7 lg:col-start-6">
          {pricing.plans.map((plan, i) => (
            <FadeIn as="li" key={plan.id} delay={i * 0.08} className="border-t border-linea py-9 last:border-b lg:py-11">
              <PlanRow plan={plan} />
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlanRow({ plan }: { plan: PricingPlan }) {
  const comingSoon = plan.status === "coming-soon";

  return (
    <article className="grid gap-5 sm:grid-cols-[1fr_auto] sm:gap-10">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-heading text-h3">{plan.name}</h3>
          {comingSoon && <StatusTag tone="soon">Próximamente</StatusTag>}
        </div>
        <p className="mt-2 text-piedra">{plan.description}</p>
        {!isPending(plan.includes) && (
          <ul className="mt-4 flex flex-col gap-1 text-small text-piedra">
            {plan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="dev-only mt-4 flex flex-col items-start gap-2">
          <DevNote value={plan.price} />
          <DevNote value={plan.unit} />
          <DevNote value={plan.includes} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-start">
        <p className="font-heading text-[1.5rem] leading-none">
          {isPending(plan.price) ? (comingSoon ? "" : "A consultar") : plan.price}
          {!isPending(plan.price) && !isPending(plan.unit) && (
            <span className="ml-1 font-sans text-small text-piedra">/ {plan.unit}</span>
          )}
        </p>
        {comingSoon ? (
          <a href="#online" className={textLinkClasses("min-h-11")}>
            Lista de espera
          </a>
        ) : (
          <ContactCta service={plan.service} variant="text" className={textLinkClasses("min-h-11")}>
            Preguntar
          </ContactCta>
        )}
      </div>
    </article>
  );
}
