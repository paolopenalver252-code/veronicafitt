import { pending } from "~/lib/pending";
import type { MediaSlot } from "~/types/content";

/**
 * Registro central de fotos y vídeos.
 *
 * Cada hueco ya tiene su proporción final. Para usar el material real de
 * Verónica basta con copiarlo en public/assets/veronica/<carpeta>/ y cambiar
 * `src` (y `poster` en los vídeos). El layout no se toca.
 */
export const media = {
  hero: {
    id: "hero",
    kind: "video",
    src: pending("Vídeo vertical 6–10 s de Verónica entrenando en su sala (MP4 H.264, 720p, ≤ 1,5 MB)"),
    poster: pending("Fotograma del vídeo del hero en alta calidad (1080×1920)"),
    width: 1080,
    height: 1920,
    alt: "Verónica Calabuch entrenando en su sala",
    focal: "50% 35%",
    brief: "Vídeo vertical: Verónica en movimiento, cara visible, parte de la sala al fondo.",
  },
  about: {
    id: "about",
    kind: "image",
    src: pending("Retrato cercano de Verónica (4:5, ≥ 1200 px)"),
    width: 1200,
    height: 1500,
    alt: "Retrato de Verónica Calabuch",
    focal: "50% 30%",
    brief: "Retrato cercano, mirada a cámara, luz natural. Transmite personalidad.",
  },
  aboutDetail: {
    id: "about-detail",
    kind: "image",
    src: pending("Foto de Verónica guiando a una persona (4:5)"),
    width: 1000,
    height: 1250,
    alt: "Verónica corrigiendo un ejercicio durante una sesión",
    brief: "Verónica acompañando o corrigiendo a alguien. Con consentimiento de imagen.",
  },
  personal: {
    id: "personal",
    kind: "image",
    src: pending("Foto de Verónica haciendo un ejercicio de fuerza (4:5)"),
    width: 1200,
    height: 1500,
    alt: "Verónica realizando un ejercicio de fuerza",
    brief: "Ejercicio de fuerza donde se entienda bien el movimiento.",
  },
  funcional: {
    id: "funcional",
    kind: "video",
    src: pending("Vídeo corto de ejercicios funcionales (sin textos de Instagram)"),
    poster: pending("Fotograma del vídeo de fuerza funcional"),
    width: 1080,
    height: 1350,
    alt: "Verónica realizando ejercicios de fuerza funcional",
    brief: "Movimiento dinámico de fuerza funcional, con el material real de la sala.",
  },
  grupos: {
    id: "grupos",
    kind: "image",
    src: pending("Foto de varias personas entrenando (o sala preparada para grupo)"),
    width: 1500,
    height: 1000,
    alt: "Entrenamiento en grupo reducido en la sala",
    brief: "Grupo reducido entrenando en la sala. Todas las personas con consentimiento.",
  },
  online: {
    id: "online",
    kind: "video",
    src: pending("Vídeo de Verónica en una sesión online en directo, frente a cámara (16:9)"),
    poster: pending("Fotograma del vídeo online"),
    width: 1920,
    height: 1080,
    alt: "Verónica entrenando frente a cámara",
    brief: "Verónica guiando una sesión online en directo frente a cámara, en horizontal.",
  },
  studio: {
    id: "studio",
    kind: "image",
    src: pending("Plano general limpio de la sala (≈ 45 m²)"),
    width: 1800,
    height: 1200,
    alt: "Vista general de la sala de entrenamiento",
    brief: "Plano general de la sala, sin textos ni stickers de Instagram.",
  },
  studioDetailA: {
    id: "studio-detail-a",
    kind: "image",
    src: pending("Detalle de la sala: zona de trabajo"),
    width: 1000,
    height: 1250,
    alt: "Detalle de la zona de entrenamiento",
    brief: "Detalle del espacio o del material real (no inventar equipamiento).",
  },
  studioDetailB: {
    id: "studio-detail-b",
    kind: "image",
    src: pending("Detalle de la sala: material"),
    width: 1000,
    height: 1250,
    alt: "Detalle del material de entrenamiento",
    brief: "Segundo detalle: luz, suelo, material o rincón característico.",
  },
  closing: {
    id: "closing",
    kind: "image",
    src: pending("Foto cálida de Verónica para el cierre (4:5)"),
    width: 1200,
    height: 1500,
    alt: "Verónica Calabuch sonriendo en su sala",
    brief: "Foto cercana y cálida: sonrisa, gesto de bienvenida.",
  },
  packPersonal: {
    id: "pack-personal",
    kind: "image",
    src: pending("Foto para el pack de entrenamiento personal (4:5)"),
    width: 1200,
    height: 1500,
    alt: "Verónica durante una sesión de entrenamiento personal",
    brief: "Verónica con una persona en sesión individual, en la sala.",
  },
  packGrupos: {
    id: "pack-grupos",
    kind: "image",
    src: pending("Foto para el pack de grupos reducidos (4:5)"),
    width: 1200,
    height: 1500,
    alt: "Entrenamiento en grupo reducido con Verónica",
    brief: "Grupo reducido entrenando con Verónica. Con consentimiento de imagen.",
  },
  packOnline: {
    id: "pack-online",
    kind: "image",
    src: pending("Foto para el pack online (4:5): Verónica frente a cámara"),
    width: 1200,
    height: 1500,
    alt: "Verónica entrenando frente a la cámara en una sesión online",
    brief: "Verónica entrenando frente a la cámara, como en una sesión en directo.",
  },
} satisfies Record<string, MediaSlot>;

/** Miniaturas de la futura plataforma (todas de ejemplo). */
export function workoutThumb(id: string, alt: string): MediaSlot {
  return {
    id: `workout-${id}`,
    kind: "image",
    src: pending(`Miniatura del entrenamiento "${alt}"`),
    width: 1600,
    height: 1000,
    alt,
    brief: "Fotograma horizontal del entrenamiento grabado.",
  };
}
