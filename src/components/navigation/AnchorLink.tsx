import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

/** Enlace a una sección de la home: ancla nativa en la home, navegación desde otras páginas. */
export function AnchorLink({
  anchor,
  children,
  className,
  current = false,
  onClick,
}: {
  anchor: string;
  children: ReactNode;
  className?: string;
  /** Sección visible ahora mismo (se anuncia a lectores de pantalla). */
  current?: boolean;
  onClick?: () => void;
}) {
  const { pathname } = useLocation();
  const ariaCurrent = current ? ("location" as const) : undefined;
  if (pathname === "/") {
    return (
      <a href={`#${anchor}`} className={className} aria-current={ariaCurrent} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={`/#${anchor}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
