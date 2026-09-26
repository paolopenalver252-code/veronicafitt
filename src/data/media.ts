import { pending } from "~/lib/pending";
import type { HeroBackground, MediaSlot } from "~/types/content";

/**
 * Registro central de fotos y vídeos.
 *
 * Cada hueco ya tiene su proporción final. Para usar el material real de
 * Verónica basta con copiarlo en public/assets/veronica/<carpeta>/ y cambiar
 * `src` (y `poster` en los vídeos). El layout no se toca.
 */
/**
 * Fondo del hero. Cuando llegue el material, copiarlo en
 * public/assets/veronica/hero/ y sustituir cada pending() por su ruta:
 *   video         → "/assets/veronica/hero/veronica-hero.mp4"
 *   videoPortrait → "/assets/veronica/hero/veronica-hero-vertical.mp4" (opcional)
 *   poster        → "/assets/veronica/hero/veronica-hero.jpg"
 *   posterMobile  → "/assets/veronica/hero/veronica-hero-movil.jpg"
 * Después, ajustar `focal` mirando el recorte en tablet y móvil.
 */
export const heroBackground: HeroBackground = {
  video: pending(
    "Vídeo horizontal 16:9 de Verónica entrenando: 8–15 s en bucle, movimiento pausado, sin sonido ni textos (MP4 H.264, 1080p, ≤ 4 MB)",
  ),
  videoPortrait: pending("Opcional: versión vertical del mismo vídeo para tablet en vertical (4:5, 1080×1350, ≤ 3 MB)"),
  poster: pending("Fotograma del vídeo del hero en alta calidad (1920×1080, ≤ 250 KB)"),
  posterMobile: pending("Foto vertical de la misma escena para móvil (1080×1350, ≤ 200 KB)"),
  // Verónica en la mitad derecha del encuadre: a la izquierda queda el texto.
  focal: { mobile: "50% 30%", tablet: "65% 30%", desktop: "70% 40%" },
  alt: "Verónica Calabuch entrenando en su sala",
  brief:
    "Verónica en movimiento en su sala, luz natural, ritmo tranquilo. Ella en la mitad derecha del plano; la izquierda despejada para el texto.",
};

export const media = {
  about: {
    id: "about",
    kind: "image",
    // Provisional: captura de 419×554 px. Sustituir por el original (≥ 1200 px de ancho) con el mismo nombre.
    src: "/assets/veronica/about/veronica-sobre-mi.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/about/veronica-sobre-mi.webp" }],
    width: 419,
    height: 554,
    alt: "Verónica Calabuch sonriendo durante un entrenamiento al aire libre, al atardecer",
    focal: "58% 22%",
    brief: "Retrato cercano, mirada a cámara, luz natural. Transmite personalidad.",
  },
  aboutDetail: {
    id: "about-detail",
    kind: "image",
    src: "/assets/veronica/about/veronica-retrato.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/about/veronica-retrato.webp" }],
    width: 418,
    height: 548,
    alt: "Retrato en blanco y negro de Verónica Calabuch sonriendo, con las manos en el pelo",
    focal: "50% 25%",
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
    // Provisional: captura de 523×394 px. Sustituir por el original (≥ 1500 px de ancho) con el mismo nombre.
    src: "/assets/veronica/training/grupos-reducidos.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/training/grupos-reducidos.webp" }],
    width: 523,
    height: 394,
    alt: "Entrenamiento en grupo reducido al aire libre, sobre césped",
    // En móvil (vertical) se recorta: centrado en el grupo principal.
    focal: "70% 50%",
    brief: "Grupo reducido entrenando en la sala. Todas las personas con consentimiento.",
  },
  online: {
    id: "online",
    kind: "video",
    src: pending("Vídeo corto de Verónica guiando una sesión frente a cámara (vertical 4:5, sin sonido)"),
    poster: pending("Fotograma del vídeo online (4:5, 1080×1350)"),
    width: 1080,
    height: 1350,
    alt: "Verónica guiando una sesión online frente a la cámara",
    focal: "50% 30%",
    brief: "Verónica frente a cámara, como la ve quien entrena desde casa: plano medio, mirada a cámara, luz natural.",
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
