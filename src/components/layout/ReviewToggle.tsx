import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "~/data/site";
import { useElementVisible } from "~/hooks/useElementVisible";
import { cn } from "~/lib/cn";

const KEY = "vc-review";

/** Script en <head>: aplica la preferencia antes de pintar para evitar parpadeos. */
export const reviewModeScript = `try{var v=localStorage.getItem("${KEY}");if(v==="off")document.documentElement.dataset.review="off"}catch(e){}`;

/**
 * Solo en la demo: muestra u oculta las notas internas "Pendiente de confirmar"
 * y las descripciones de los huecos de imagen. Útil para enseñar la web a
 * Verónica en versión limpia o anotada.
 */
export function ReviewToggle({ variant }: { variant: "floating" | "inline" }) {
  const [on, setOn] = useState(true);
  const footerVisible = useElementVisible("site-footer");

  useEffect(() => {
    setOn(document.documentElement.dataset.review !== "off");
  }, []);

  if (!site.demo) return null;

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.review = next ? "on" : "off";
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      /* almacenamiento no disponible: la preferencia dura solo esta visita */
    }
  };

  const Icon = on ? Eye : EyeOff;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className={cn(
        "min-h-11 items-center gap-2 rounded-full text-small font-semibold transition-colors",
        variant === "floating"
          ? "fixed bottom-5 left-5 z-30 hidden border border-pendiente-line bg-pendiente-bg px-4 text-pendiente shadow-float"
          : "inline-flex border border-linea-dark px-4 text-tiza/80 hover:text-tiza",
        variant === "floating" && !footerVisible && "lg:inline-flex",
      )}
    >
      <Icon aria-hidden className="size-4" />
      Notas de revisión: {on ? "visibles" : "ocultas"}
    </button>
  );
}
