import { media } from "~/data/media";
import { packSlugs, type PackSlug } from "~/data/pack-slugs";
import { pending } from "~/lib/pending";
import type { Pack } from "~/types/content";

/*
 * PACKS DE VERÓNICA
 *
 * No se inventan packs ni precios. Los tres packs iniciales corresponden a los
 * tres servicios confirmados; lo que "incluye" describe el servicio confirmado,
 * no cantidades. Nombre comercial, precio, nº de sesiones y validez: pendientes.
 *
 * Para vender un pack con enlace de pago, cambiar `purchase` por
 * { type: "external", url: "https://…" }: el botón pasa a "Comprar pack".
 */
export const packs: Pack[] = [
  {
    id: "personal",
    slug: "entrenamiento-personal",
    name: "Entrenamiento personal",
    channel: "Presencial",
    service: "personal",
    summary: "Sesiones individuales en mi sala, con toda la atención puesta en ti.",
    description:
      "Entrenamos uno a uno en mi sala. Partimos de tu nivel y de cómo te mueves, tenemos en cuenta cualquier lesión o limitación y ajustamos cada ejercicio a tu ritmo.",
    includes: [
      "Sesiones individuales en la sala",
      "Entrenamiento adaptado a tu nivel y a tu ritmo",
      "Atención a lesiones y limitaciones",
    ],
    price: pending("Precio del pack de entrenamiento personal"),
    priceNote: pending("Unidad del precio: sesión, bono o mes"),
    media: media.packPersonal,
    details: [
      { label: "Dónde", value: "En la sala (aprox. 45 m²)" },
      { label: "Sesiones", value: pending("Número de sesiones del pack") },
      { label: "Duración", value: pending("Duración de cada sesión") },
      { label: "Validez", value: pending("Validez del pack") },
    ],
    purchase: { type: "contact" },
    status: "available",
    notes: [pending("Nombre comercial definitivo del pack")],
  },
  {
    id: "grupos",
    slug: "grupos-reducidos",
    name: "Grupos reducidos",
    channel: "Presencial",
    service: "grupos",
    summary: "Entrena en compañía sin perder la atención personal.",
    description:
      "Grupos pequeños en mi sala, donde cada persona trabaja a su nivel. Tienes el ambiente de entrenar con otras personas y la atención de entrenar conmigo.",
    includes: [
      "Entrenamiento en grupo reducido en la sala",
      "Cada persona trabaja a su nivel",
      "Atención personal dentro del grupo",
    ],
    price: pending("Precio del pack de grupos reducidos"),
    priceNote: pending("Unidad del precio: sesión, bono o mes"),
    media: media.packGrupos,
    details: [
      { label: "Dónde", value: "En la sala (aprox. 45 m²)" },
      { label: "Plazas por grupo", value: pending("Número máximo de personas por grupo") },
      { label: "Horarios", value: pending("Horarios de los grupos") },
      { label: "Validez", value: pending("Validez del pack") },
    ],
    purchase: { type: "contact" },
    status: "available",
    notes: [pending("Nombre comercial definitivo del pack")],
  },
  {
    id: "online",
    slug: "online-en-directo",
    name: "Entrenamiento online en directo",
    channel: "Online",
    service: "online",
    summary: "Entrena conmigo en directo desde casa. Y si no puedes conectarte, con la grabación.",
    description:
      "Sesiones en directo en las que entreno contigo, te corrijo la técnica y te acompaño. Pensado para quien tiene el día lleno: trabajo, hijos, horarios. Si un día no puedes conectarte, tienes la sesión grabada.",
    includes: [
      "Sesiones en directo con Verónica",
      "Corrección de la técnica durante la sesión",
      "Acceso a las sesiones grabadas",
    ],
    price: pending("Precio del entrenamiento online"),
    priceNote: pending("Modelo: mensual, bono o membresía"),
    media: media.packOnline,
    details: [
      { label: "Dónde", value: "Desde casa, en directo" },
      { label: "Horario", value: pending("Horario de los directos (idea inicial: primera hora, sobre las 6:00)") },
      { label: "Sesiones por semana", value: pending("Número de sesiones semanales") },
      { label: "Plataforma", value: pending("Plataforma de los directos") },
      { label: "Grabaciones", value: pending("Duración y acceso a las grabaciones") },
    ],
    purchase: { type: "contact" },
    status: "coming-soon",
    notes: [pending("Sistema de membresía o compra del online")],
  },
];

export function getPack(slug: string | undefined): Pack | undefined {
  return packs.find((p) => p.slug === slug);
}

// Garantía en desarrollo: cada slug declarado tiene su pack y viceversa.
const declared = new Set<PackSlug>(packSlugs);
if (import.meta.env.DEV && (packs.length !== declared.size || packs.some((p) => !declared.has(p.slug)))) {
  console.warn("packs.ts y pack-slugs.ts no coinciden: revisa los slugs.");
}
