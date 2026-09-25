import { ContactCta } from "~/components/contact/ContactIntent";
import { useElementVisible } from "~/hooks/useElementVisible";
import { useScrollDirection } from "~/hooks/useScrollDirection";
import { cn } from "~/lib/cn";

/**
 * CTA fijo en móvil. Se turna con la cabecera (que también tiene CTA): aparece
 * cuando la cabecera se oculta al bajar, así siempre hay un único CTA a la vista.
 * No aparece sobre el hero, el contacto ni el footer, ni con el menú abierto.
 */
export function MobileCTABar({ hidden }: { hidden: boolean }) {
  const { direction, scrolled } = useScrollDirection();
  const heroVisible = useElementVisible("inicio");
  const contactVisible = useElementVisible("contacto");
  const footerVisible = useElementVisible("site-footer");
  const headerHidden = direction === "down" && scrolled;
  const show = headerHidden && heroVisible !== true && !contactVisible && !footerVisible && !hidden;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 border-t border-linea bg-tiza/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm",
        "transition-transform duration-300 ease-(--ease-out-soft) lg:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <ContactCta className="w-full">Escríbeme</ContactCta>
    </div>
  );
}
