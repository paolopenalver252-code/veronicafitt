import { CircleAlert } from "lucide-react";
import { site } from "~/data/site";
import { cn } from "~/lib/cn";
import { isPending, type Maybe } from "~/lib/pending";

/**
 * Nota interna de revisión: explica qué falta confirmar.
 * Solo existe en la demo y se oculta con el conmutador "Modo revisión".
 */
export function PendingNote({
  value,
  className,
  tone = "light",
}: {
  value: Maybe<unknown> | undefined;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!site.demo || !isPending(value)) return null;
  return (
    <span
      className={cn(
        "review-only inline-flex max-w-full items-start gap-1.5 rounded-md border px-2 py-1 text-micro font-medium",
        tone === "light"
          ? "border-pendiente-line bg-pendiente-bg text-pendiente"
          : "border-pendiente-line/50 bg-pendiente-bg/10 text-pendiente-line",
        className,
      )}
    >
      <CircleAlert aria-hidden className="mt-px size-3.5 shrink-0" strokeWidth={2.25} />
      <span>
        <span className="font-semibold">Pendiente de confirmar:</span> {value.note}
      </span>
    </span>
  );
}

/**
 * Muestra un dato confirmado, o un texto neutro visible para el público
 * ("Pendiente de confirmar") más la nota interna si estamos en demo.
 */
export function PendingValue({
  value,
  fallback = "Pendiente de confirmar",
  className,
}: {
  value: Maybe<string>;
  fallback?: string;
  className?: string;
}) {
  if (!isPending(value)) return <span className={className}>{value}</span>;
  return (
    <span className={cn("inline-flex flex-col items-start gap-1.5", className)}>
      <span className="text-piedra">{fallback}</span>
      <PendingNote value={value} />
    </span>
  );
}
