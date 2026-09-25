import { Clapperboard, Image as ImageIcon } from "lucide-react";
import { cn } from "~/lib/cn";
import type { MediaSlot } from "~/types/content";

function ratio(w: number, h: number) {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

/**
 * Hueco reservado para un asset real de Verónica que todavía no tenemos.
 * Ocupa exactamente la proporción final, así que al sustituirlo no cambia nada.
 * Es un contenedor de consulta: la descripción solo aparece si hay sitio.
 */
export function MediaPlaceholder({
  slot,
  tone = "light",
  compact = false,
  className,
}: {
  slot: MediaSlot;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  const Icon = slot.kind === "video" ? Clapperboard : ImageIcon;
  const corner = cn("absolute size-4", tone === "light" ? "border-piedra/40" : "border-tiza/30");

  return (
    <div
      role="img"
      aria-label={`${slot.alt} (imagen pendiente)`}
      className={cn(
        "@container absolute inset-0 flex flex-col justify-end overflow-hidden p-4 sm:p-5",
        tone === "light" ? "bg-tiza-deep text-piedra" : "bg-grafito-soft text-tiza/70",
        className,
      )}
    >
      {!compact && (
        <>
          <span aria-hidden className={cn(corner, "top-3 left-3 border-t border-l")} />
          <span aria-hidden className={cn(corner, "top-3 right-3 border-t border-r")} />
          <span aria-hidden className={cn(corner, "bottom-3 left-3 border-b border-l")} />
          <span aria-hidden className={cn(corner, "right-3 bottom-3 border-r border-b")} />
        </>
      )}

      <Icon
        aria-hidden
        strokeWidth={1.25}
        className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 opacity-40"
      />

      {!compact && (
        <div aria-hidden className="relative hidden max-w-[26rem] @min-[11rem]:block">
          <p className="text-micro font-semibold">
            {slot.kind === "video" ? "Vídeo pendiente" : "Foto pendiente"} ({ratio(slot.width, slot.height)})
          </p>
          <p className="review-only mt-1 hidden text-micro text-pretty @min-[16rem]:block">{slot.brief}</p>
        </div>
      )}
    </div>
  );
}
