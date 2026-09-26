import { createContext, useContext, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { buttonClasses, RollLabel, type ButtonVariant } from "~/components/ui/Button";
import { whatsappUrl } from "~/lib/whatsapp";
import type { ServiceId } from "~/types/content";

type Service = ServiceId | "no-lo-se";
/** Desde dónde llega la persona: servicio y, si viene de un pack, su nombre. */
export type Intent = { service: Service; pack?: string };

const ContactIntentContext = createContext<{ intent: Intent | null; setIntent: (i: Intent | null) => void }>({
  intent: null,
  setIntent: () => {},
});

/** Recuerda el servicio o pack de origen para preparar el formulario (o el WhatsApp). */
export function ContactIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<Intent | null>(null);
  return <ContactIntentContext.Provider value={{ intent, setIntent }}>{children}</ContactIntentContext.Provider>;
}

export const useContactIntent = () => useContext(ContactIntentContext);

type ContactCtaProps = {
  children: ReactNode;
  service?: ServiceId;
  /** Nombre del pack: se menciona en el mensaje de WhatsApp o del formulario. */
  pack?: string;
  variant?: ButtonVariant | "text";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

/**
 * CTA de contacto único para toda la web.
 * - Con número de WhatsApp confirmado: abre WhatsApp con el mensaje del servicio o pack.
 * - Sin número (hoy): lleva al formulario con el servicio preseleccionado y el pack indicado.
 */
export function ContactCta({ children, service, pack, variant = "primary", className, icon, onClick }: ContactCtaProps) {
  const { setIntent } = useContactIntent();
  const { pathname } = useLocation();
  const wa = whatsappUrl(service ?? "general", pack);
  const classes = variant === "text" ? className : buttonClasses(variant, className);
  const label = variant === "text" ? children : <RollLabel>{children}</RollLabel>;

  const handleClick = () => {
    if (service) setIntent({ service, pack });
    onClick?.();
  };

  if (wa) {
    return (
      <a href={wa} target="_blank" rel="noopener noreferrer" className={classes} onClick={handleClick}>
        {label}
        {icon}
      </a>
    );
  }

  if (pathname === "/") {
    return (
      <a href="#contacto" className={classes} onClick={handleClick}>
        {label}
        {icon}
      </a>
    );
  }

  return (
    <Link to="/#contacto" className={classes} onClick={handleClick}>
      {label}
      {icon}
    </Link>
  );
}
