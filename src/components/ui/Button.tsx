import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "inverse-outline";

/*
 * Botón de la marca (adaptación del Animated Button de Vengeance UI):
 * - pulsar (ratón o dedo): se hunde a 0,97 y vuelve con un muelle corto;
 * - pasar el ratón o recibir foco de teclado: el texto rueda una vez hacia arriba.
 * Sin brillo en bucle ni animación constante. Solo CSS.
 */
const base =
  "group/btn inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 text-[1rem] font-semibold leading-none " +
  "select-none [transition:background-color_200ms,color_200ms,border-color_200ms,transform_350ms_var(--ease-press)] " +
  "active:scale-[0.97] active:duration-100 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-acento text-white hover:bg-acento-hover",
  secondary: "border-[1.5px] border-grafito text-grafito hover:bg-grafito hover:text-tiza",
  inverse: "bg-tiza text-grafito hover:bg-white",
  "inverse-outline": "border-[1.5px] border-tiza/70 text-tiza hover:border-tiza hover:bg-tiza hover:text-grafito",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

const roll = "block transition-transform duration-[450ms] ease-(--ease-out-soft)";

/** Texto que rueda: el original sube y una copia (oculta al lector) entra desde abajo. */
export function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden py-[0.2em] leading-[1.15]">
      <span className={cn(roll, "group-hover/btn:-translate-y-[130%] group-focus-visible/btn:-translate-y-[130%]")}>
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          roll,
          "absolute inset-x-0 top-[0.2em] translate-y-[130%] group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0",
        )}
      >
        {children}
      </span>
    </span>
  );
}

type CommonProps = { variant?: ButtonVariant; icon?: ReactNode; className?: string; children: ReactNode };

export function Button({
  variant,
  icon,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={buttonClasses(variant, className)} {...props}>
      <RollLabel>{children}</RollLabel>
      {icon}
    </button>
  );
}

/** Enlace con aspecto de botón. Rutas internas con <Link>; anclas y externas con <a>. */
export function ButtonLink({
  href,
  variant,
  icon,
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const classes = buttonClasses(variant, className);
  const isInternalRoute = href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link to={href} className={classes} {...props}>
        <RollLabel>{children}</RollLabel>
        {icon}
      </Link>
    );
  }

  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <RollLabel>{children}</RollLabel>
      {icon}
    </a>
  );
}

/** Enlace de texto con subrayado que se desplaza. Para CTAs contextuales. */
export function textLinkClasses(className?: string) {
  return cn(
    "inline-flex min-h-11 items-center gap-1.5 font-semibold text-acento underline decoration-[1.5px] underline-offset-[0.3em] " +
      "decoration-acento/35 transition-[text-decoration-color,text-underline-offset] duration-200 " +
      "hover:decoration-acento hover:underline-offset-[0.2em]",
    className,
  );
}
