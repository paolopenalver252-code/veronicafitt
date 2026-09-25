/**
 * Marca un dato que Verónica todavía no ha confirmado.
 *
 * Nunca se inventa un valor: se guarda qué falta y los componentes lo muestran
 * como pendiente. `npm run check:pending` lista todos los `pending(...)` del
 * proyecto y `npm run build:production` se niega a publicar si queda alguno.
 */
export type Pending = { readonly __pending: true; readonly note: string };

export type Maybe<T> = T | Pending;

export const pending = (note: string): Pending => ({ __pending: true, note });

export function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && "__pending" in value;
}

export function resolved<T>(value: Maybe<T>): T | null {
  return isPending(value) ? null : value;
}
