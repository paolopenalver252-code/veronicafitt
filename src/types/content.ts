import type { PackSlug } from "~/data/pack-slugs";
import type { Maybe } from "~/lib/pending";

/** Estado de publicación de cualquier pieza de contenido. */
export type ContentStatus = "available" | "coming-soon" | "draft";

export type MediaSlot = {
  id: string;
  kind: "image" | "video";
  /** Ruta dentro de /public (p. ej. /assets/veronica/hero/hero.mp4) */
  src: Maybe<string>;
  /** Solo vídeo: imagen que se ve antes de que cargue (y en conexiones lentas). */
  poster?: Maybe<string>;
  /** Formatos modernos opcionales para imágenes: AVIF/WebP. */
  sources?: Array<{ type: "image/avif" | "image/webp"; srcSet: string }>;
  srcSet?: string;
  /** Dimensiones intrínsecas: fijan la proporción y evitan saltos de layout. */
  width: number;
  height: number;
  alt: string;
  /** object-position para que los recortes en móvil no corten la cara. */
  focal?: string;
  /** Qué plano necesitamos: se muestra en el marcador mientras falta el asset. */
  brief: string;
};

/**
 * Vídeo del hero: vertical 9:16 (un Reel de Instagram). Se muestra en un marco
 * de su misma proporción, así que nunca se recorta ni se deforma.
 */
export type HeroVideo = {
  /** Vídeo vertical 9:16, sin sonido (se reproduce silenciado). */
  video: Maybe<string>;
  /** Fotograma del vídeo (9:16): se ve al instante y queda si el vídeo no puede reproducirse. */
  poster: Maybe<string>;
  /** object-position por si el archivo no es exactamente 9:16. */
  focal?: string;
  alt: string;
  brief: string;
};

export type ServiceId = "personal" | "funcional" | "grupos" | "online";

export type Service = {
  id: ServiceId;
  title: string;
  summary: string;
  forWhom: string;
  media: MediaSlot;
  status: ContentStatus;
  cta: { label: string; href: string };
  notes?: Maybe<string>[];
};

export type ProcessStep = {
  title: string;
  body: string;
  note?: Maybe<string>;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  note?: Maybe<string>;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  service: ServiceId;
  since?: string;
  photo?: MediaSlot;
  /** Solo resultados reales y autorizados por la persona. */
  result?: string;
  /** Consentimiento de uso firmado. Sin él, el testimonio no se publica. */
  consent: boolean;
};

/* ---------- Plataforma online (preparado, aún sin usar en producción) ---------- */

export type Level = "inicial" | "intermedio" | "avanzado";

export type WorkoutCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  media: MediaSlot;
  /** true = categoría de ejemplo para la demo, no definida por Verónica. */
  isExample: boolean;
};

export type WorkoutAccess = "free" | "pack" | "subscription";

export type Workout = {
  id: string;
  slug: string;
  title: string;
  categoryIds: string[];
  durationMin: number;
  level: Level;
  goal: string;
  equipment: string[];
  media: MediaSlot;
  /** Identificador en el proveedor de vídeo (Mux/Bunny). Nunca una URL pública. */
  videoAssetId?: string;
  access: WorkoutAccess;
  packIds: string[];
  status: ContentStatus;
  isExample: boolean;
};

/* ---------- Packs (venta) ---------- */

/**
 * Cómo se compra un pack. Permite pasar de "se solicita por contacto" a un
 * enlace de pago o a un checkout propio sin tocar la interfaz.
 */
export type PackPurchase =
  /** Hoy: el botón abre WhatsApp o el formulario con el pack indicado. */
  | { type: "contact" }
  /** Enlace de pago externo (p. ej. Stripe Payment Link). */
  | { type: "external"; url: string }
  /** Futuro: checkout propio (Stripe Checkout + acceso). */
  | { type: "checkout"; priceId: string };

export type Pack = {
  id: string;
  slug: PackSlug;
  /** Nombre comercial del pack. */
  name: string;
  /** Vía a la que pertenece: se muestra como etiqueta discreta. */
  channel: "Presencial" | "Online";
  service: ServiceId;
  summary: string;
  /** Para quién es: ayuda a elegir antes de llegar al precio. */
  forWhom: string;
  description: string;
  includes: Maybe<string[]>;
  /** Duración o validez del pack ("4 semanas", "10 sesiones"…). */
  duration?: Maybe<string>;
  price: Maybe<string>;
  /** Unidad o condición del precio ("/ mes", "bono de 10 sesiones"…). */
  priceNote?: Maybe<string>;
  media: MediaSlot;
  /** Información adicional: duración, validez, plazas… */
  details: Array<{ label: string; value: Maybe<string> }>;
  purchase: PackPurchase;
  status: ContentStatus;
  /** Notas internas: qué falta para publicar el pack. */
  notes?: Maybe<string>[];
};

export type NavItem = { label: string; anchor: string };
