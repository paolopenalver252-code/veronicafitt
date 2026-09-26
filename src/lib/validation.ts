/**
 * Validación de los formularios. Es la misma lógica que usará la función de
 * servidor cuando se conecte (la validación del servidor es la que manda).
 */

export type ContactInput = {
  name: string;
  contact: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot: los humanos no lo ven; si llega relleno, es un bot. */
  company: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s-]{9,16}$/;

export const serviceOptions = [
  { value: "personal", label: "Entrenamiento personal" },
  { value: "funcional", label: "Fuerza funcional" },
  { value: "grupos", label: "Grupos reducidos" },
  { value: "online", label: "Entrenamiento online en directo" },
  { value: "no-lo-se", label: "Todavía no lo sé" },
] as const;

export function validateContact(input: ContactInput): FieldErrors<ContactInput> {
  const errors: FieldErrors<ContactInput> = {};
  const name = input.name.trim();
  const contact = input.contact.trim();

  if (name.length < 2) errors.name = "Escribe tu nombre.";
  else if (name.length > 80) errors.name = "El nombre es demasiado largo (máximo 80 caracteres).";

  if (!contact) errors.contact = "Escribe un email o un teléfono para poder responderte.";
  else if (!EMAIL.test(contact) && !PHONE.test(contact))
    errors.contact = "Revisa el formato: debe ser un email o un teléfono válido.";

  if (!serviceOptions.some((o) => o.value === input.service)) errors.service = "Elige una opción.";

  if (input.message.length > 1000) errors.message = "El mensaje es demasiado largo (máximo 1000 caracteres).";

  if (!input.consent) errors.consent = "Necesito tu consentimiento para poder responderte.";

  return errors;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return "Escribe tu email.";
  if (!EMAIL.test(value) || value.length > 254) return "Revisa el formato del email.";
  return null;
}
