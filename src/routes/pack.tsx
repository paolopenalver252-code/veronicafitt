import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import type { Route } from "./+types/pack";
import NotFound from "./not-found";
import { ContactCta } from "~/components/contact/ContactIntent";
import { Media } from "~/components/media/Media";
import { FadeIn, ImageReveal } from "~/components/motion/Reveal";
import { PackGrid } from "~/components/packs/PackGrid";
import { priceLabel, PurchaseButton } from "~/components/packs/PurchaseButton";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { getPack, packs } from "~/data/packs";
import { isPending, resolved } from "~/lib/pending";
import { buildMeta } from "~/lib/seo";
import type { Pack } from "~/types/content";

export function meta({ params }: Route.MetaArgs) {
  const pack = getPack(params.slug);
  if (!pack) return buildMeta({ title: "Pack no encontrado | Verónica Calabuch", description: "", path: "/404", noindex: true });
  return buildMeta({
    title: `${pack.name} | Packs de Verónica Calabuch`,
    description: pack.summary,
    path: `/packs/${pack.slug}`,
  });
}

/** Qué pasa después de elegir el pack: Web → Pack → Compra → Acceso. */
function startSteps(pack: Pack) {
  const buying = pack.purchase.type === "external";
  if (pack.status === "coming-soon") {
    return [
      { title: "Me escribes", body: "Desde el botón de este pack, para que te avise en cuanto empiece." },
      { title: "Te aviso", body: "Te cuento las condiciones y la fecha de inicio en cuanto estén cerradas." },
      { title: "Empezamos", body: "Cuando esté listo, te explico cómo conectarte a la primera sesión." },
    ];
  }
  return [
    {
      title: buying ? "Compras el pack" : "Solicitas el pack",
      body: buying ? "Desde el botón de compra." : "Desde el botón de este pack, y resolvemos tus dudas.",
    },
    { title: "Hablamos", body: "Te escribo para conocer tu punto de partida y concretar los detalles." },
    { title: "Empezamos", body: "Te explico cómo será la primera sesión y empezamos a entrenar." },
  ];
}

export default function PackPage() {
  const { slug } = useParams();
  const pack = getPack(slug);
  if (!pack) return <NotFound />;

  const includes = resolved(pack.includes);
  const price = resolved(pack.price);
  const priceNote = pack.priceNote ? resolved(pack.priceNote) : null;
  const details = pack.details.filter((d) => !isPending(d.value));
  const others = packs.filter((p) => p.id !== pack.id && p.status !== "draft");

  return (
    <>
      <article className="pt-(--nav-h)">
        <div className="container-site pt-6 lg:pt-10">
          <Link to="/#packs" className="inline-flex min-h-11 items-center gap-2 text-small text-piedra hover:text-grafito">
            <ArrowLeft aria-hidden className="size-4" />
            Todos los packs
          </Link>
        </div>

        <div className="mt-6 lg:container-site lg:mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
          <ImageReveal className="aspect-[4/5] lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:col-span-6">
            <Media slot={pack.media} tone="deep" priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </ImageReveal>

          <div className="px-5 pt-10 md:px-10 lg:col-span-5 lg:col-start-8 lg:px-0 lg:pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="label text-acento">Pack {pack.channel.toLowerCase()}</p>
              {pack.status === "coming-soon" && <StatusTag tone="soon">Próximamente</StatusTag>}
            </div>
            <h1 className="font-display mt-5 text-h2 text-balance">{pack.name}</h1>
            <p className="mt-6 text-lead text-pretty">{pack.description}</p>

            {includes && (
              <>
                <h2 className="label mt-10">Incluye</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-acento" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {details.length > 0 && (
              <dl className="mt-10">
                {details.map((d) => (
                  <div key={d.label} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-linea py-3.5 text-small last:border-b">
                    <dt className="text-piedra">{d.label}</dt>
                    <dd>{d.value as string}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-10 border-t border-linea pt-6">
              <p className="text-micro text-piedra">Precio</p>
              <p className="font-heading mt-1 text-h3">
                {price ?? priceLabel(pack)}
                {price && priceNote && <span className="ml-2 font-sans text-small text-piedra">{priceNote}</span>}
              </p>
              <PurchaseButton pack={pack} className="mt-6 w-full sm:w-auto" />
              <p className="mt-5 text-small text-piedra">
                ¿Tienes dudas antes de decidir?{" "}
                <ContactCta service={pack.service} pack={pack.name} variant="text" className={textLinkClasses("text-small")}>
                  Pregúntame
                </ContactCta>
              </p>
            </div>

            <div className="mt-6 flex flex-col items-start gap-2">
              <DevNote value={pack.price} />
              {pack.priceNote && <DevNote value={pack.priceNote} />}
              <DevNote value={pack.includes} />
              {pack.details.map((d) => (
                <DevNote key={d.label} value={d.value} />
              ))}
              {pack.notes?.map((n, i) => <DevNote key={i} value={n} />)}
            </div>
          </div>
        </div>
      </article>

      <section aria-labelledby="empezar-title" className="container-site pt-24 lg:pt-36">
        <h2 id="empezar-title" className="font-display text-h2">
          Cómo empezar
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {startSteps(pack).map((step, i) => (
            <FadeIn as="li" key={step.title} delay={i * 0.08} className="border-t border-linea pt-6">
              <span aria-hidden className="font-display block text-[3rem] leading-none text-acento">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-5 text-[1.5rem] leading-tight">{step.title}</h3>
              <p className="mt-2 text-pretty text-piedra">{step.body}</p>
            </FadeIn>
          ))}
        </ol>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="otros-title" className="section-y">
          <div className="container-site">
            <h2 id="otros-title" className="font-display text-h2">
              Otros packs
            </h2>
            <PackGrid packs={others} className="mt-14" />
          </div>
        </section>
      )}
    </>
  );
}
