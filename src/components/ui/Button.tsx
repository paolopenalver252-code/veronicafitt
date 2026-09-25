import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "inverse-outline";

const base =
  "inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-6 text-[1rem] font-semibold leading-none " +
  "select-none transition-[background-color,color,border-color,transform] duration-(--duration-ui) ease-(--ease-out-soft) " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cobalto text-white hover:bg-cobalto-hover",
  secondary: "border-[1.5px] border-grafito text-grafito hover:bg-grafito hover:text-tiza",
  inverse: "bg-tiza text-grafito hover:bg-white",
  "inverse-outline": "border-[1.5px] border-tiza/70 text-tiza hover:border-tiza hover:bg-tiza hover:text-grafito",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
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
      {children}
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
        {children}
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
      {children}
      {icon}
    </a>
  );
}

/** Enlace de texto con subrayado que se desplaza. Para CTAs contextuales. */
export function textLinkClasses(className?: string) {
  return cn(
    "inline-flex items-center gap-1.5 font-semibold text-cobalto underline decoration-[1.5px] underline-offset-[0.3em] " +
      "decoration-cobalto/35 transition-[text-decoration-color,text-underline-offset] duration-(--duration-ui) " +
      "hover:decoration-cobalto hover:underline-offset-[0.2em]",
    className,
  );
}
