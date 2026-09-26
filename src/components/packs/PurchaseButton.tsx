import { ContactCta } from "~/components/contact/ContactIntent";
import { ButtonLink, type ButtonVariant } from "~/components/ui/Button";
import type { Pack } from "~/types/content";

/**
 * Botón de compra de un pack. Su texto y su acción dependen de `pack.purchase`:
 * - contact  → "Solicitar este pack" (WhatsApp o formulario con el pack indicado). Hoy.
 * - external → "Comprar pack" (enlace de pago, p. ej. Stripe Payment Link).
 * - checkout → reservado para un checkout propio; mientras no exista, se solicita por contacto.
 * Si el pack aún no está disponible, pide aviso en lugar de vender.
 * Nunca simula un pago.
 */
export function PurchaseButton({
  pack,
  variant = "primary",
  className,
}: {
  pack: Pack;
  variant?: ButtonVariant;
  className?: string;
}) {
  if (pack.status === "coming-soon") {
    return (
      <ContactCta service={pack.service} pack={pack.name} variant={variant} className={className}>
        Avísame cuando empiece
      </ContactCta>
    );
  }

  if (pack.purchase.type === "external") {
    return (
      <ButtonLink href={pack.purchase.url} variant={variant} className={className}>
        Comprar pack
      </ButtonLink>
    );
  }

  return (
    <ContactCta service={pack.service} pack={pack.name} variant={variant} className={className}>
      Solicitar este pack
    </ContactCta>
  );
}

/** Texto del precio para la vista de cliente cuando aún no está confirmado. */
export function priceLabel(pack: Pack): string {
  return pack.status === "coming-soon" ? "Próximamente" : "A consultar";
}
