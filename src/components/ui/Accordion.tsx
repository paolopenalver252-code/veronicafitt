import { useId, useState, type ReactNode } from "react";
import { cn } from "~/lib/cn";

export type AccordionItem = { id: string; title: string; content: ReactNode };

/**
 * Acordeón accesible (patrón WAI-ARIA), solo con filetes: pregunta y línea.
 * La altura se anima con CSS (grid-template-rows 0fr → 1fr) y el contenido
 * cerrado queda fuera del orden de tabulación y del lector de pantalla.
 */
export function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="border-t border-linea">
      {items.map((item) => {
        const isOpen = open === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-linea">
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex min-h-18 w-full items-center justify-between gap-8 py-6 text-left"
              >
                <span
                  className={cn(
                    "text-[1.3125rem] leading-snug font-medium tracking-[-0.01em] text-pretty transition-colors duration-300 lg:text-[1.5rem]",
                    isOpen ? "text-acento" : "group-hover:text-acento",
                  )}
                >
                  {item.title}
                </span>
                {/* Más que se convierte en menos */}
                <span aria-hidden className="relative size-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                  <span
                    className={cn(
                      "absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-500 ease-(--ease-out-soft)",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-500 ease-(--ease-out-soft)",
                isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-[40rem] pr-10 pb-8 text-piedra">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
