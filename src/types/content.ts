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

export type PricingPlan = {
  id: string;
  service: ServiceId;
  name: string;
  description: string;
  price: Maybe<string>;
  unit: Maybe<string>;
  includes: Maybe<string[]>;
  status: ContentStatus;
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

export type Pack = {
  id: string;
  slug: string;
  name: string;
  hook: string;
  workoutIds: string[];
  sessionMinutes: string;
  level: string;
  weeks?: number;
  sessionsPerWeek?: number;
  equipment: string[];
  price: Maybe<string>;
  expires: Maybe<boolean>;
  status: ContentStatus;
  isExample: boolean;
};

export type NavItem = { label: string; anchor: string };
