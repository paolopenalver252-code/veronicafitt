import { useEffect, useState } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const SLOW_CONNECTIONS = new Set(["slow-2g", "2g", "3g"]);

/**
 * ¿Podemos reproducir vídeo decorativo? No si el usuario pide menos
 * movimiento, tiene activado el ahorro de datos o la conexión es lenta.
 * En el primer render (y en el HTML prerenderizado) siempre es false:
 * primero se ve la imagen.
 */
export function useAutoplayAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const slow = Boolean(connection?.saveData) || SLOW_CONNECTIONS.has(connection?.effectiveType ?? "");

    const update = () => setAllowed(!reduced.matches && !slow);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  return allowed;
}
