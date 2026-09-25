import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

/** Encabezado de sección: etiqueta de navegación opcional + H2 + entradilla. */
export function SectionHeading({
  id,
  label,
  title,
  intro,
  tone = "light",
  className,
  children,
}: {
  id: string;
  label?: string;
  title: ReactNode;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {label && (
        <p className={cn("mb-4 text-small font-semibold", tone === "light" ? "text-cobalto" : "text-cobalto-light")}>
          {label}
        </p>
      )}
      <h2 id={id} className="font-heading text-h2 text-balance">
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 max-w-[34rem] text-lead text-pretty", tone === "light" ? "text-piedra" : "text-tiza/75")}>
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
