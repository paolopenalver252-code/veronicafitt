import { ContactCta } from "~/components/contact/ContactIntent";
import { useElementVisible } from "~/hooks/useElementVisible";
import { cn } from "~/lib/cn";

/**
 * CTA flotante en móvil: una píldora compacta (no una barra) que aparece al
 * dejar atrás el hero y se retira donde ya hay CTA (contacto, footer) o con
 * el menú abierto. La cabecera móvil no lleva CTA: así nunca hay dos a la vez.
 */
export function MobileCTABar({ hidden }: { hidden: boolean }) {
  const heroVisible = useElementVisible("inicio");
  const contactVisible = useElementVisible("contacto");
  const footerVisible = useElementVisible("site-footer");
  const show = heroVisible === false && !contactVisible && !footerVisible && !hidden;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex justify-center sm:hidden",
        "transition-[translate,opacity] duration-500 ease-(--ease-out-soft)",
        show ? "translate-y-0 opacity-100" : "translate-y-[140%] opacity-0",
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <ContactCta className="pointer-events-auto min-w-44 shadow-float">Escríbeme</ContactCta>
    </div>
  );
}
