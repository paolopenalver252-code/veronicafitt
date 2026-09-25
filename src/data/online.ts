import { pending } from "~/lib/pending";
import { workoutThumb } from "~/data/media";
import type { Level, Pack, Workout, WorkoutCategory } from "~/types/content";

/*
 * TODO ESTE ARCHIVO ES DE EJEMPLO.
 * Verónica todavía no ha definido categorías, entrenamientos ni packs.
 * Sirve para demostrar la arquitectura de la futura plataforma; cada elemento
 * lleva `isExample: true` y se muestra con la etiqueta "Ejemplo".
 */

export const onlineIntro = {
  status: "En preparación",
  title: "Entrena conmigo desde casa.",
  body: "Estoy preparando entrenamientos grabados de unos 45 minutos, organizados en packs, para que puedas entrenar donde y cuando quieras, estés donde estés.",
  audience: ["Si tienes poco tiempo", "Si prefieres no ir al gimnasio", "Si buscas flexibilidad"],
  launchNote: pending("Fecha aproximada de lanzamiento del online"),
  formatNote: pending("Formato de acceso, precios y si habrá pago único o suscripción"),
};

export const levelLabel: Record<Level, string> = {
  inicial: "Inicial",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const categories: WorkoutCategory[] = [
  {
    id: "full-body",
    slug: "full-body",
    name: "Full body",
    description: "Todo el cuerpo en una sesión.",
    media: workoutThumb("cat-full-body", "Full body"),
    isExample: true,
  },
  {
    id: "fuerza",
    slug: "fuerza",
    name: "Fuerza",
    description: "Ganar fuerza de forma progresiva.",
    media: workoutThumb("cat-fuerza", "Fuerza"),
    isExample: true,
  },
  {
    id: "movilidad",
    slug: "movilidad",
    name: "Movilidad",
    description: "Moverte mejor y con más control.",
    media: workoutThumb("cat-movilidad", "Movilidad"),
    isExample: true,
  },
  {
    id: "sin-material",
    slug: "sin-material",
    name: "Sin material",
    description: "Solo necesitas tu cuerpo y un poco de espacio.",
    media: workoutThumb("cat-sin-material", "Sin material"),
    isExample: true,
  },
];

function example(
  w: Omit<Workout, "media" | "status" | "isExample" | "access" | "packIds"> & { packIds?: string[] },
): Workout {
  return {
    ...w,
    packIds: w.packIds ?? [],
    access: "pack",
    media: workoutThumb(w.id, w.title),
    status: "coming-soon",
    isExample: true,
  };
}

export const workouts: Workout[] = [
  example({
    id: "w1",
    slug: "full-body-fuerza-base",
    title: "Full body de fuerza",
    categoryIds: ["full-body", "fuerza"],
    durationMin: 45,
    level: "inicial",
    goal: "Fuerza general",
    equipment: ["Mancuernas"],
    packIds: ["p1"],
  }),
  example({
    id: "w2",
    slug: "movilidad-completa",
    title: "Movilidad completa",
    categoryIds: ["movilidad"],
    durationMin: 45,
    level: "inicial",
    goal: "Moverte mejor",
    equipment: ["Sin material"],
    packIds: ["p1"],
  }),
  example({
    id: "w3",
    slug: "fuerza-tren-inferior",
    title: "Fuerza de tren inferior",
    categoryIds: ["fuerza"],
    durationMin: 45,
    level: "intermedio",
    goal: "Piernas y glúteos",
    equipment: ["Mancuernas"],
  }),
  example({
    id: "w4",
    slug: "full-body-sin-material",
    title: "Full body sin material",
    categoryIds: ["full-body", "sin-material"],
    durationMin: 30,
    level: "inicial",
    goal: "Activación general",
    equipment: ["Sin material"],
    packIds: ["p1"],
  }),
  example({
    id: "w5",
    slug: "fuerza-y-control",
    title: "Fuerza y control del core",
    categoryIds: ["fuerza", "sin-material"],
    durationMin: 20,
    level: "intermedio",
    goal: "Estabilidad",
    equipment: ["Sin material"],
  }),
  example({
    id: "w6",
    slug: "full-body-avanzado",
    title: "Full body intenso",
    categoryIds: ["full-body"],
    durationMin: 45,
    level: "avanzado",
    goal: "Fuerza y resistencia",
    equipment: ["Mancuernas", "Banda elástica"],
  }),
];

export const packs: Pack[] = [
  {
    id: "p1",
    slug: "empieza-en-casa",
    name: "Empieza en casa",
    hook: "Un primer pack para crear el hábito de entrenar desde casa, a tu ritmo.",
    workoutIds: ["w1", "w2", "w4"],
    sessionMinutes: "30–45 min",
    level: "Inicial",
    weeks: 4,
    sessionsPerWeek: 2,
    equipment: ["Sin material", "Mancuernas opcionales"],
    price: pending("Precio del pack"),
    expires: pending("¿El acceso caduca?"),
    status: "coming-soon",
    isExample: true,
  },
];

export const durationFilters = [
  { id: "todas", label: "Cualquier duración" },
  { id: "corta", label: "Hasta 30 min", test: (min: number) => min <= 30 },
  { id: "larga", label: "Unos 45 min", test: (min: number) => min > 30 },
] as const;
