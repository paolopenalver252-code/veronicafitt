import { CircleAlert } from "lucide-react";
import { site } from "~/data/site";
import { cn } from "~/lib/cn";
import { isPending, type Maybe } from "~/lib/pending";

/**
 * NOTA INTERNA DE DESARROLLO (nunca contenido de cliente).
 * Explica qué falta confirmar. Solo existe en la demo y solo se ve con
 * ?notas=1 en la URL. La vista por defecto es la que verá Verónica.
 */
export function DevNote({
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
        "dev-only inline-flex max-w-full items-start gap-1.5 rounded-md border px-2 py-1 text-micro font-medium",
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
