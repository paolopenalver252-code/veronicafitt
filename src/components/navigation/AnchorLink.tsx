import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

/** Enlace a una sección de la home: ancla nativa en la home, navegación desde otras páginas. */
export function AnchorLink({
  anchor,
  children,
  className,
  onClick,
}: {
  anchor: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <a href={`#${anchor}`} className={className} onClick={onClick}>
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
