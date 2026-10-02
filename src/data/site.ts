import { pending, type Maybe } from "~/lib/pending";
import type { NavItem } from "~/types/content";

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || null;

export const site = {
  name: "Verónica Calabuch",
  role: "Entrenadora personal",
  /** Demo: muestra las notas de revisión y el conmutador. VITE_DEMO=false las oculta. */
  demo: import.meta.env.VITE_DEMO !== "false",
  /** Dominio definitivo: PENDIENTE. Sin él no se emiten canonical, og:url ni sitemap. */
  url: siteUrl,
  locale: "es_ES",

  instagram: {
    handle: "@veronica_calabuch",
    url: "https://www.instagram.com/veronica_calabuch/",
  },

  contact: {
    /** Formato internacional sin "+" ni espacios, p. ej. 34600111222. Al rellenarlo, todos los CTA pasan a WhatsApp. */
    whatsapp: pending("Número de WhatsApp de contacto") as Maybe<string>,
    email: pending("Email de contacto") as Maybe<string>,
    city: pending("Ciudad") as Maybe<string>,
    address: pending("Dirección de la sala") as Maybe<string>,
    hours: pending("Horario de la sala y de atención") as Maybe<string>,
    responseTime: pending("Plazo real de respuesta") as Maybe<string>,
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Sobre mí", anchor: "sobre-mi" },
  { label: "Presencial", anchor: "entrenamientos" },
  { label: "Online", anchor: "online" },
  // Espacio completo del entrenamiento a distancia (directo + sesiones grabadas): su propia página.
  { label: "Entrena conmigo", to: "/entrena-conmigo" },
  { label: "Packs", anchor: "packs" },
  { label: "Cómo trabajo", anchor: "como-trabajo" },
  { label: "Preguntas", anchor: "preguntas" },
];
