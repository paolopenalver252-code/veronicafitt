import { cn } from "~/lib/cn";
import type { MediaSlot } from "~/types/content";

function ratio(w: number, h: number) {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

const tones = {
  light: "bg-tiza-deep",
  deep: "bg-arena",
  soft: "bg-acento-suave",
  dark: "bg-grafito-soft",
  accent: "bg-acento-profundo",
} as const;

export type PlaceholderTone = keyof typeof tones;

/**
 * Hueco reservado para una foto o vídeo real de Verónica.
 * Vista de cliente: un bloque tonal limpio con la proporción final, como un
 * bloque de color en una maqueta editorial. Sin textos técnicos.
 * Notas internas (?notas=1): qué plano necesitamos y en qué formato.
 */
export function MediaPlaceholder({
  slot,
  tone = "light",
  className,
}: {
  slot: MediaSlot;
  tone?: PlaceholderTone;
  className?: string;
}) {
  const dark = tone === "dark" || tone === "accent";

  return (
    <div role="img" aria-label={slot.alt} className={cn("@container absolute inset-0 overflow-hidden", tones[tone], className)}>
      <div
        aria-hidden
        className={cn(
          "dev-only absolute inset-x-3 bottom-3 max-w-[26rem] rounded-md border px-3 py-2 text-micro",
          "border-pendiente-line bg-pendiente-bg/95 text-pendiente",
          dark && "border-pendiente-line/60",
        )}
      >
        <p className="font-semibold">
          {slot.kind === "video" ? "Vídeo pendiente" : "Foto pendiente"} ({ratio(slot.width, slot.height)})
        </p>
        <p className="mt-0.5 hidden @min-[14rem]:block">{slot.brief}</p>
      </div>
    </div>
  );
}
