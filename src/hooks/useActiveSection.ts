import { useEffect, useState } from "react";
import { useLocation } from "react-router";

/**
 * Sección de la home que cruza el centro de la pantalla. Solo en la home;
 * en otras rutas devuelve null.
 */
export function useActiveSection(ids: string[]): string | null {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // Franja estrecha en el centro de la pantalla: solo una sección a la vez.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, key]);

  return active;
}
