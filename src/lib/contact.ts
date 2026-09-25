import type { ContactInput } from "~/lib/validation";

/**
 * PUNTO DE CONEXIÓN DEL CONTACTO (pendiente de definir con Verónica).
 *
 * Hoy no se envía nada: la demo lo dice claramente al usuario.
 * Para conectarlo, sustituir el cuerpo de estas funciones por un POST a una
 * Vercel Function (/api/contact, /api/waitlist) que:
 *   1. vuelva a validar con `validateContact` / `validateEmail`,
 *   2. descarte envíos con honeypot relleno o enviados en menos de 3 s,
 *   3. limite peticiones por IP,
 *   4. envíe el email con Resend (o el proveedor elegido) / alta en la lista.
 * Ver docs/PLAN-FASE-1.md, apartado 12.
 */

export type SubmitResult = { status: "sent" } | { status: "not-connected" } | { status: "error"; message: string };

export async function sendContactMessage(_input: ContactInput): Promise<SubmitResult> {
  return { status: "not-connected" };
}

export async function joinWaitlist(_email: string): Promise<SubmitResult> {
  return { status: "not-connected" };
}
