import { pending } from "~/lib/pending";
import type { HeroVideo, MediaSlot } from "~/types/content";

/**
 * Vídeo del hero: el Reel vertical de Verónica. Cuando llegue, copiarlo en
 * public/assets/veronica/hero/ y sustituir cada pending() por su ruta:
 *   video  → "/assets/veronica/hero/veronica-hero.mp4"
 *   poster → "/assets/veronica/hero/veronica-hero.jpg"
 *   posterMobile (opcional) → "/assets/veronica/hero/veronica-hero-movil.jpg"
 */
export const heroVideo: HeroVideo = {
  // Reel de Verónica (22 s): bandas negras recortadas, sin audio, comprimido para web (576×1024, 1,5 MB).
  video: "/assets/veronica/hero/veronica-hero.mp4",
  // Primer fotograma del vídeo: el paso de la imagen al vídeo no se nota.
  poster: "/assets/veronica/hero/veronica-hero.jpg",
  focal: "50% 50%",
  // Móvil: el bloque es casi cuadrado y se ve ~58 % de la altura del vídeo.
  // A media altura se le ve la cara en todos los ejercicios (comprobado fotograma a fotograma).
  focalMobile: "50% 55%",
  alt: "Verónica Calabuch entrenando en su sala",
  brief: "Reel vertical de Verónica entrenando: ella completa en el plano, sin textos ni stickers.",
};

/**
 * Registro central de fotos y vídeos.
 *
 * Cada hueco ya tiene su proporción final. Para usar el material real de
 * Verónica basta con copiarlo en public/assets/veronica/<carpeta>/ y cambiar
 * `src` (y `poster` en los vídeos). El layout no se toca.
 */
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
    kind: "video",
    // Vídeo de una sesión uno a uno en la sala (21 s, sin audio, 576×1008, 1,1 MB).
    src: "/assets/veronica/training/entrenamiento-personal.mp4",
    // Primer fotograma: el paso de la imagen al vídeo no se nota.
    poster: "/assets/veronica/training/entrenamiento-personal-video.jpg",
    width: 576,
    height: 1008,
    alt: "Sesión de entrenamiento personal en la sala: sentadilla con peso y corrección de la técnica",
    // El hueco es 4:5: se recorta sobre todo el techo, no los pies.
    focal: "50% 85%",
    brief: "Ejercicio de fuerza donde se entienda bien el movimiento.",
  },
  funcional: {
    id: "funcional",
    kind: "video",
    // Vídeo de Verónica en la sala (28 s, sin audio, 576×992, 1,9 MB).
    src: "/assets/veronica/training/fuerza-funcional.mp4",
    // Primer fotograma: el paso de la imagen al vídeo no se nota.
    poster: "/assets/veronica/training/fuerza-funcional.jpg",
    width: 576,
    height: 992,
    alt: "Verónica realizando ejercicios de fuerza funcional",
    // El hueco es 4:5 (3:4 en escritorio): centrado, entran los brazos en alto y las rodillas.
    focal: "50% 50%",
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
    // Vista general generada con IA (Gemini) a partir de las fotos reales de la sala. Sustituir por una foto real cuando la haya.
    src: "/assets/veronica/studio/sala-general.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/studio/sala-general.webp" }],
    width: 1376,
    height: 768,
    alt: "Vista general de la sala de entrenamiento, con la barra de dominaciones, la estantería de material y el fitball",
    // Móvil (4:5): barra, fitball y estantería. Escritorio (21:9): se recorta sobre todo el techo.
    focal: "40% 65%",
    brief: "Plano general de la sala, sin textos ni stickers de Instagram.",
  },
  studioDetailA: {
    id: "studio-detail-a",
    kind: "image",
    // Provisional: captura de 368×487 px. Sustituir por el original con el mismo nombre.
    src: "/assets/veronica/studio/sala-material.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/studio/sala-material.webp" }],
    width: 368,
    height: 487,
    alt: "Rincón de la sala con barra de dominaciones, estantería de mancuernas y cajón de salto",
    brief: "Detalle del espacio o del material real (no inventar equipamiento).",
  },
  studioDetailB: {
    id: "studio-detail-b",
    kind: "image",
    // Provisional: captura de 311×448 px. Sustituir por el original con el mismo nombre.
    src: "/assets/veronica/studio/sala-rincon.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/studio/sala-rincon.webp" }],
    width: 311,
    height: 448,
    alt: "Zona de entrenamiento de la sala con esterilla, discos y un rincón con plantas",
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
    // Se usa en la tarjeta del pack (5:4 en móvil, 3:4 desde tablet) y en su ficha (4:5).
    src: "/assets/veronica/packs/entrenamiento-personal.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/packs/entrenamiento-personal.webp" }],
    width: 1080,
    height: 1786,
    alt: "Sesión de entrenamiento personal en la sala: explicación de un ejercicio con mancuerna",
    // Prioriza las caras: en la tarjeta móvil (5:4) se recortan las piernas; en la ficha y desde tablet se ven casi enteras.
    focal: "50% 48%",
    brief: "Verónica con una persona en sesión individual, en la sala.",
  },
  packGrupos: {
    id: "pack-grupos",
    kind: "image",
    // Provisional: captura de Instagram de 406×392 px (sin los puntos del carrusel). Sustituir por el original con el mismo nombre.
    // Se usa en la tarjeta del pack (5:4 en móvil, 3:4 desde tablet) y en su ficha (4:5).
    src: "/assets/veronica/packs/grupos-reducidos.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/packs/grupos-reducidos.webp" }],
    width: 406,
    height: 392,
    alt: "Entrenamiento en grupo reducido al aire libre: varias personas haciendo plancha sobre el césped",
    // Encuadre en la franja del grupo (la instructora de pie y las planchas); se recorta cielo y césped.
    focal: "45% 48%",
    brief: "Grupo reducido entrenando con Verónica. Con consentimiento de imagen.",
  },
  packOnline: {
    id: "pack-online",
    kind: "image",
    // Recortada: sin el techo vacío ni el icono de Instagram de la esquina.
    // Se usa en la tarjeta del pack (5:4 en móvil, 3:4 desde tablet) y en su ficha (4:5).
    src: "/assets/veronica/packs/online-en-directo.jpg",
    sources: [{ type: "image/webp", srcSet: "/assets/veronica/packs/online-en-directo.webp" }],
    width: 1038,
    height: 1408,
    alt: "Verónica Calabuch entrenando con barra de discos en su sala",
    // Prioriza la cara y el ejercicio: en la tarjeta móvil (5:4) se recortan las piernas.
    focal: "50% 10%",
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
