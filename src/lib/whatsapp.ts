import { site } from "~/data/site";
import { resolved } from "~/lib/pending";
import type { ServiceId } from "~/types/content";

const messages: Record<ServiceId | "general", string> = {
  general: "Hola Verónica, me gustaría información sobre tus entrenamientos.",
  personal: "Hola Verónica, me interesa el entrenamiento personal.",
  funcional: "Hola Verónica, me interesa el entrenamiento de fuerza funcional.",
  grupos: "Hola Verónica, me interesan los entrenamientos en grupo reducido.",
  online: "Hola Verónica, me interesan los entrenamientos online.",
};

/**
 * URL de WhatsApp con un mensaje ya escrito según el servicio.
 * Devuelve null mientras el número no esté confirmado: los CTA llevan
 * entonces al formulario de contacto.
 */
export function whatsappUrl(service: ServiceId | "general" = "general"): string | null {
  const number = resolved(site.contact.whatsapp);
  if (!number) return null;
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(messages[service])}`;
}
