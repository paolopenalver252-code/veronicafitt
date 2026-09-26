import { Link } from "react-router";
import { Media } from "~/components/media/Media";
import type { PlaceholderTone } from "~/components/media/MediaPlaceholder";
import { LiveBadge } from "~/components/online/LiveBadge";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { isPending, resolved } from "~/lib/pending";
import type { Pack } from "~/types/content";
import { priceLabel, PurchaseButton } from "./PurchaseButton";

/**
 * Tarjeta de pack: imagen grande y, debajo, el recorrido de decisión
 * (qué es → para quién → qué incluye → duración y precio → solicitar), sin
 * caja alrededor. Más cerca de una colección que de una tienda.
 */
export function PackCard({
  pack,
  tone = "deep",
  headingLevel = 3,
}: {
  pack: Pack;
  tone?: PlaceholderTone;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/packs/${pack.slug}`;
  const price = resolved(pack.price);
  const priceNote = pack.priceNote ? resolved(pack.priceNote) : null;
  const duration = pack.duration ? resolved(pack.duration) : null;
  const includes = resolved(pack.includes);

  return (
    <article className="group flex h-full flex-col">
      <Link to={href} className="relative block aspect-[5/4] overflow-hidden sm:aspect-[3/4]" tabIndex={-1} aria-hidden>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-(--ease-out-soft) group-hover:scale-[1.03]">
          <Media slot={pack.media} tone={tone} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {pack.channel === "Online" ? <LiveBadge>Online en directo</LiveBadge> : <StatusTag tone="light">{pack.channel}</StatusTag>}
          {pack.status === "coming-soon" && <StatusTag tone="soon">Próximamente</StatusTag>}
        </div>
      </Link>

      <Heading className="font-display mt-7 text-[2rem] leading-[1.05] text-balance">
        <Link to={href} className="transition-colors hover:text-acento">
          {pack.name}
        </Link>
      </Heading>
      <p className="mt-3 text-pretty text-piedra">{pack.summary}</p>

      <p className="mt-6 border-l-2 border-acento-claro pl-4 text-pretty">
        <span className="label block">Para quién</span>
        <span className="mt-1 block">{pack.forWhom}</span>
      </p>

      {includes && (
        <>
          <p className="label mt-7">Incluye</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {includes.map((item) => (
              <li key={item} className="flex gap-3 text-pretty">
                <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-acento" />
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-4 border-t border-linea pt-5">
          <dl className="flex gap-8">
            {duration && (
              <div>
                <dt className="text-micro text-piedra">Duración</dt>
                <dd className="font-heading mt-1 text-[1.5rem] leading-none">{duration}</dd>
              </div>
            )}
            <div>
              <dt className="text-micro text-piedra">Precio</dt>
              <dd className="font-heading mt-1 text-[1.5rem] leading-none">
                {price ?? priceLabel(pack)}
                {price && priceNote && <span className="ml-1.5 font-sans text-small text-piedra">{priceNote}</span>}
              </dd>
            </div>
          </dl>
          <Link to={href} className={textLinkClasses("shrink-0 text-small")}>
            Ver el pack
          </Link>
        </div>
        {/* Contorno en la rejilla: tres botones macizos seguidos leen como tabla de precios.
            El verde macizo queda para la ficha del pack, donde se decide. */}
        <PurchaseButton pack={pack} variant="secondary" className="mt-5 w-full" />
        <div className="mt-3 flex flex-col items-start gap-2">
          {isPending(pack.price) && <DevNote value={pack.price} />}
          {pack.duration && <DevNote value={pack.duration} />}
          {pack.notes?.map((n, i) => <DevNote key={i} value={n} />)}
        </div>
      </div>
    </article>
  );
}
