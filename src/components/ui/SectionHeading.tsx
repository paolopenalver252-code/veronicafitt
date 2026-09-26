import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

/** Encabezado de sección de la marca: rótulo discreto + titular editorial + entradilla. */
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
      {label && <p className={cn("label", tone === "light" ? "text-acento" : "text-acento-claro")}>{label}</p>}
      <h2 id={id} className="font-display mt-5 text-h2 text-balance">
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-6 max-w-[34rem] text-lead text-pretty", tone === "light" ? "text-piedra" : "text-tiza/80")}>
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
