import { useEffect, useState } from "react";

/** Observa si un elemento (por id) está en pantalla. */
export function useElementVisible(id: string, rootMargin = "0px"): boolean | null {
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, rootMargin]);

  return visible;
}
