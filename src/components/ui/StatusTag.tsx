import { cn } from "~/lib/cn";

type Tone = "soon" | "light" | "example" | "neutral";

const tones: Record<Tone, string> = {
  soon: "bg-acento-suave text-acento",
  light: "bg-tiza/90 text-grafito",
  example: "border border-dashed border-pendiente-line bg-pendiente-bg text-pendiente",
  neutral: "bg-tiza-deep text-grafito",
};

/** Etiqueta de estado discreta: "Próximamente", "En preparación"… */
export function StatusTag({ children, tone = "neutral", className }: { children: string; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-micro font-semibold tracking-[0.01em] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
