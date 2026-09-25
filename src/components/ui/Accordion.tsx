import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "~/lib/cn";

export type AccordionItem = { id: string; title: string; content: ReactNode };

/**
 * Acordeón accesible (patrón WAI-ARIA): botón con aria-expanded que controla
 * una región. La altura se anima solo con CSS (grid-template-rows 0fr → 1fr)
 * y el contenido cerrado queda fuera del orden de tabulación y del lector.
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
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[1.125rem] font-semibold lg:text-[1.25rem]"
              >
                <span className="text-pretty">{item.title}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border transition-[rotate,background-color,border-color,color] duration-300 ease-(--ease-out-soft)",
                    isOpen ? "rotate-45 border-cobalto bg-cobalto text-white" : "border-linea group-hover:border-grafito",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2.25} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-300 ease-(--ease-out-soft)",
                isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-[42rem] pr-12 pb-6 text-piedra">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
