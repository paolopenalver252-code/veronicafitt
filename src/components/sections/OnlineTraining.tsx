import { ArrowDown } from "lucide-react";
import { Link } from "react-router";
import { ContactCta } from "~/components/contact/ContactIntent";
import { Media } from "~/components/media/Media";
import { FadeIn, ImageReveal } from "~/components/motion/Reveal";
import { RevealLines } from "~/components/motion/RevealLines";
import { ScrollWords } from "~/components/motion/ScrollWords";
import { LiveBadge } from "~/components/online/LiveBadge";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { StatusTag } from "~/components/ui/StatusTag";
import { media } from "~/data/media";
import { liveTraining } from "~/data/online";
import { packs } from "~/data/packs";
import { cn } from "~/lib/cn";
import { resolved } from "~/lib/pending";

/**
 * Entrenamiento online en directo (home). La idea que vende no es "clases
 * online", sino que Verónica está contigo aunque no estéis en la misma sala.
 * Termina llevando a Packs: el online es una vía de venta, no solo información.
 */
export function OnlineTraining() {
  const onlinePack = packs.find((p) => p.channel === "Online" && p.status !== "draft");

  return (
    <section id="online" aria-labelledby="online-title" className="section-y bg-blanco">
      <div className="container-site">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label text-acento">Entrenamiento online</p>
          {liveTraining.status === "coming-soon" && <StatusTag tone="soon">Próximamente</StatusTag>}
        </div>
        <RevealLines
          as="h2"
          id="online-title"
          lines={["Entrena conmigo,", "estés donde estés."]}
          className="font-display mt-6 text-statement"
        />
        <p className="mt-8 max-w-[36rem] text-lead text-pretty text-piedra">{liveTraining.lead}</p>
      </div>

      {/* La sesión: Verónica "en pantalla" a un lado, lo que la hace distinta al otro. */}
      <div className="mt-14 lg:container-site lg:mt-24 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <OnlineSessionFrame className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:col-span-6" />
        <div className="mt-16 px-5 md:px-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:px-0 lg:pt-4">
          <OnlineDifference />
          <OnlinePillars className="mt-12 lg:mt-16" />
        </div>
      </div>

      <div className="container-site">
        <div className="mt-20 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-6">
            <OnlineAudience />
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="font-heading text-h3 text-pretty">¿Te encaja? Escríbeme y te cuento cuándo empezamos.</p>
            <div className="mt-8 flex flex-col items-start gap-2">
              <ContactCta service="online" className="w-full sm:w-auto">
                {liveTraining.cta}
              </ContactCta>
              <Link to="/entrena-conmigo" className={cn(textLinkClasses(), "mt-2")}>
                Todo sobre el entrenamiento online
              </Link>
            </div>
            <div className="mt-6 flex flex-col items-start gap-2">
              {liveTraining.notes.map((n, i) => (
                <DevNote key={i} value={n} />
              ))}
            </div>
          </FadeIn>
        </div>

        <PacksBridge onlinePackSlug={onlinePack?.slug} className="mt-20 lg:mt-32" />
      </div>
    </section>
  );
}

/**
 * Marco de la sesión en directo: la imagen de Verónica tal como la verías
 * desde casa, con tres detalles de videollamada (en directo, su nombre y tu
 * ventana). Lo justo para que se entienda; la protagonista es ella.
 */
export function OnlineSessionFrame({ className, priority = false }: { className?: string; priority?: boolean }) {
  const { session } = liveTraining;
  const time = resolved(session.time);

  return (
    <figure className={cn("media-inset relative", className)}>
      <ImageReveal className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-[calc(100svh-var(--nav-h)-4rem)]">
        <Media slot={media.online} tone="deep" priority={priority} sizes="(min-width: 1024px) 45vw, 100vw" />
      </ImageReveal>

      <FadeIn delay={0.5} className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
        <LiveBadge pulse />
        {time && <span className="rounded-full bg-tiza/92 px-3 py-1 text-micro font-semibold text-grafito">{time}</span>}
      </FadeIn>

      <FadeIn delay={0.65} className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
        <figcaption className="rounded-full bg-tiza/92 px-3 py-1 text-micro font-semibold text-grafito">
          {session.trainer}
        </figcaption>
        {/* Tu ventana: quien entrena desde casa también está en la sesión. */}
        <span
          aria-hidden
          className="relative block aspect-[3/4] w-[28%] max-w-40 min-w-24 border border-tiza/90 bg-tiza-deep shadow-float"
        >
          <span className="absolute bottom-2 left-2 text-micro leading-tight font-semibold text-piedra">{session.you}</span>
        </span>
      </FadeIn>

      <DevNote value={session.time} className="mt-3 md:px-10 lg:px-0" />
    </figure>
  );
}

/** "No estás siguiendo un vídeo. Estás entrenando conmigo.": la diferencia, como declaración. */
export function OnlineDifference({ size = "md", className }: { size?: "md" | "lg"; className?: string }) {
  return (
    <ScrollWords
      as="p"
      text={liveTraining.difference.join(" ")}
      className={cn(
        "font-display text-balance",
        size === "lg"
          ? "max-w-[16ch] text-h2 lg:text-[clamp(3rem,1.5rem+3.4vw,5.25rem)]"
          : "max-w-[18ch] text-[clamp(2.25rem,1.7rem+2.2vw,3.5rem)] leading-[1.04]",
        className,
      )}
    />
  );
}

/** Las cuatro ideas del servicio, numeradas y separadas solo por filetes. */
export function OnlinePillars({ layout = "list", className }: { layout?: "list" | "grid"; className?: string }) {
  return (
    <ol className={cn(layout === "grid" && "grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {liveTraining.pillars.map((p, i) => (
        <FadeIn
          as="li"
          key={p.title}
          delay={i * 0.08}
          className={cn(
            "border-t border-linea",
            layout === "list" ? "grid grid-cols-[3.25rem_1fr] gap-4 py-7 last:border-b" : "py-7",
          )}
        >
          <span aria-hidden className="font-display block text-[2.5rem] leading-none text-acento">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className={cn(layout === "grid" && "mt-5")}>
            <h3 className="font-heading text-[1.625rem] leading-tight">{p.title}</h3>
            <p className="mt-2 text-pretty text-piedra">{p.body}</p>
          </div>
        </FadeIn>
      ))}
    </ol>
  );
}

export function OnlineAudience() {
  return (
    <>
      <h3 className="label">{liveTraining.audienceTitle}</h3>
      <ul className="mt-5">
        {liveTraining.audience.map((item) => (
          <li key={item} className="border-t border-linea py-4 text-lead text-pretty last:border-b">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Paso siguiente: de "cómo funciona" a "qué puedo contratar". Une Online con Packs. */
function PacksBridge({ onlinePackSlug, className }: { onlinePackSlug?: string; className?: string }) {
  return (
    <div className={cn("border-t border-linea pt-8 lg:flex lg:items-end lg:justify-between lg:gap-10", className)}>
      <div>
        <p className="label text-acento">Siguiente paso</p>
        <p className="font-heading mt-3 max-w-[24ch] text-h3 text-balance">
          Elige cómo quieres empezar, desde casa o en mi sala.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-1 lg:mt-0 lg:shrink-0">
        <a href="#packs" className={cn(textLinkClasses(), "group")}>
          Ver los packs
          <ArrowDown
            aria-hidden
            className="size-4 transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-y-0.5"
          />
        </a>
        {onlinePackSlug && (
          <Link to={`/packs/${onlinePackSlug}`} className={textLinkClasses()}>
            Ver el pack online
          </Link>
        )}
      </div>
    </div>
  );
}
