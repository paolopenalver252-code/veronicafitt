import { cn } from "~/lib/cn";

type Tone = "soon" | "example" | "neutral" | "dark";

const tones: Record<Tone, string> = {
  soon: "bg-cielo text-cobalto",
  example: "border border-dashed border-piedra/60 text-piedra bg-tiza/80",
  neutral: "bg-tiza-deep text-grafito",
  dark: "bg-grafito/85 text-tiza",
};

/** Etiqueta de estado: "Próximamente", "Ejemplo", nivel… */
export function StatusTag({ children, tone = "neutral", className }: { children: string; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-micro font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
