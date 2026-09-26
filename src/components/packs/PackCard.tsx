import { Link } from "react-router";
import { Media } from "~/components/media/Media";
import type { PlaceholderTone } from "~/components/media/MediaPlaceholder";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { isPending, resolved } from "~/lib/pending";
import type { Pack } from "~/types/content";
import { priceLabel, PurchaseButton } from "./PurchaseButton";

/**
 * Tarjeta de pack: imagen grande, nombre, qué incluye y precio, sin caja
 * alrededor. Más cerca de una colección que de una tienda.
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
  const includes = resolved(pack.includes);

  return (
    <article className="group flex h-full flex-col">
      <Link to={href} className="relative block aspect-[5/4] overflow-hidden sm:aspect-[3/4]" tabIndex={-1} aria-hidden>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-(--ease-out-soft) group-hover:scale-[1.03]">
          <Media slot={pack.media} tone={tone} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <StatusTag tone="light">{pack.channel}</StatusTag>
          {pack.status === "coming-soon" && <StatusTag tone="soon">Próximamente</StatusTag>}
        </div>
      </Link>

      <Heading className="font-display mt-7 text-[2rem] leading-[1.05] text-balance">
        <Link to={href} className="transition-colors hover:text-acento">
          {pack.name}
        </Link>
      </Heading>
      <p className="mt-3 text-pretty text-piedra">{pack.summary}</p>

      {includes && (
        <ul className="mt-6 flex flex-col gap-2.5 text-small">
          {includes.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-acento" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-4 border-t border-linea pt-5">
          <div>
            <p className="text-micro text-piedra">Precio</p>
            <p className="font-heading mt-1 text-[1.5rem] leading-none">
              {price ?? priceLabel(pack)}
              {price && priceNote && <span className="ml-1.5 font-sans text-small text-piedra">{priceNote}</span>}
            </p>
          </div>
          <Link to={href} className={textLinkClasses("text-small")}>
            Ver el pack
          </Link>
        </div>
        {/* Contorno en la rejilla: tres botones macizos seguidos leen como tabla de precios.
            El verde macizo queda para la ficha del pack, donde se decide. */}
        <PurchaseButton pack={pack} variant="secondary" className="mt-5 w-full" />
        <div className="mt-3 flex flex-col items-start gap-2">
          {isPending(pack.price) && <DevNote value={pack.price} />}
          {pack.notes?.map((n, i) => <DevNote key={i} value={n} />)}
        </div>
      </div>
    </article>
  );
}
