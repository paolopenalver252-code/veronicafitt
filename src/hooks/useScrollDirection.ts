import { useEffect, useState } from "react";

/** Dirección del scroll y si se ha pasado del umbral superior. */
export function useScrollDirection(threshold = 8) {
  const [state, setState] = useState({ direction: "up" as "up" | "down", scrolled: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < threshold && y > 0) return;
      setState((prev) => {
        const direction = y <= 0 ? "up" : delta > 0 ? "down" : "up";
        const scrolled = y > 24;
        return prev.direction === direction && prev.scrolled === scrolled ? prev : { direction, scrolled };
      });
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
