import { pending, type Maybe } from "~/lib/pending";
import { workoutThumb } from "~/data/media";
import type { Level, Workout, WorkoutCategory } from "~/types/content";

/*
 * ENTRENAMIENTO ONLINE EN DIRECTO (nuevo servicio de Verónica)
 * Confirmado: sesiones en directo en las que entrena con los clientes, corrige
 * la técnica, motiva y acompaña; y grabaciones para quien no pueda conectarse.
 * Pendiente (no inventar): precio, horarios, sesiones por semana, plataforma,
 * duración de las grabaciones y sistema de membresía.
 */
export const liveTraining = {
  /** "coming-soon" mientras no haya fecha ni condiciones; "available" al lanzarlo. */
  status: "coming-soon" as "available" | "coming-soon",
  title: "Entrena conmigo, estés donde estés.",
  lead: "Entrenamientos online en directo para que puedas entrenar conmigo aunque el trabajo, los hijos o la falta de tiempo te impidan ir al gimnasio.",
  difference: ["No estás siguiendo un vídeo.", "Estás entrenando conmigo."],
  pillars: [
    { title: "En directo", body: "Entrenas conmigo en tiempo real y recibes correcciones durante la sesión." },
    { title: "Corrección", body: "Te observo y te ayudo a hacer cada ejercicio correctamente, a tu nivel." },
    { title: "Motivación", body: "No entrenas a solas frente a una pantalla. Estoy contigo durante toda la sesión." },
    { title: "Si no puedes conectarte", body: "Tendrás acceso a la sesión grabada para entrenar cuando tengas tiempo." },
  ],
  /** Elementos del marco de la sesión en directo (la foto de Verónica "en pantalla"). */
  session: {
    trainer: "Verónica",
    you: "Tú, desde casa",
    /** Solo se muestra cuando esté confirmado (p. ej. "6:00"). */
    time: pending(
      "Hora de los directos para el marco de la sesión (idea inicial: primera hora, sobre las 6:00)",
    ) as Maybe<string>,
  },
  audienceTitle: "Pensado para ti si…",
  audience: [
    "Empiezas a trabajar temprano y no llegas al gimnasio.",
    "Tienes hijos y el tiempo libre no te cuadra con ningún horario.",
    "No puedes desplazarte, o prefieres entrenar en casa con alguien que te guíe.",
    "Te cuesta ser constante cuando entrenas por tu cuenta.",
  ],
  steps: [
    { title: "Te conectas", body: "Entras a la sesión en directo desde casa, con lo que necesites a mano." },
    { title: "Entrenamos a la vez", body: "Hacemos la sesión en directo: te guío, te observo y te corrijo." },
    { title: "Si no llegas, la grabación", body: "Cuando no puedas conectarte, entrenas con la sesión grabada." },
  ],
  cta: "Quiero entrenar online",
  notes: [
    pending("Horario de los directos (idea inicial de Verónica: primera hora, sobre las 6:00)"),
    pending("Número de sesiones por semana"),
    pending("Plataforma de los directos"),
    pending("Duración y tiempo de acceso a las grabaciones"),
    pending("Precio y sistema de membresía"),
    pending("Fecha de lanzamiento"),
  ],
};

/*
 * BIBLIOTECA DE SESIONES GRABADAS: TODO LO QUE SIGUE ES DE EJEMPLO.
 * Muestra cómo podrán organizarse las grabaciones (categorías, duración,
 * nivel). Cada elemento lleva `isExample: true`.
 */

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

export const durationFilters = [
  { id: "todas", label: "Cualquier duración" },
  { id: "corta", label: "Hasta 30 min", test: (min: number) => min <= 30 },
  { id: "larga", label: "Unos 45 min", test: (min: number) => min > 30 },
] as const;
