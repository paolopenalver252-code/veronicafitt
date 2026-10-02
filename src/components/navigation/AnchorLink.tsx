import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

/**
 * Enlace de navegación. A una sección de la home: ancla nativa en la home,
 * navegación desde otras páginas. Con `to`: a una página propia (p. ej. /entrena-conmigo).
 */
export function AnchorLink({
  anchor,
  to,
  children,
  className,
  current = false,
  onClick,
}: {
  anchor?: string;
  to?: string;
  children: ReactNode;
  className?: string;
  /** Sección visible ahora mismo (se anuncia a lectores de pantalla). */
  current?: boolean;
  onClick?: () => void;
}) {
  const { pathname } = useLocation();
  const ariaCurrent = current ? ("location" as const) : undefined;
  if (to || !anchor) {
    to ??= "/";
    return (
      <Link to={to} className={className} aria-current={pathname === to ? "page" : ariaCurrent} onClick={onClick}>
        {children}
      </Link>
    );
  }
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
