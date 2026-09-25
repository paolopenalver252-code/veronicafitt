import { pending } from "~/lib/pending";
import { media } from "~/data/media";
import type { FAQItem, PricingPlan, ProcessStep, Service, Testimonial } from "~/types/content";

/*
 * Copy provisional de la home.
 * Todo lo que aparece aquí sin `pending()` sale del brief confirmado:
 * entrenadora personal y monitora de fitness, entrenamiento personal, fuerza
 * funcional, grupos reducidos, sala propia de ~45 m², entrenamiento adaptado a
 * cada nivel, ritmo y posibles lesiones o limitaciones, sin experiencia previa.
 */

export const hero = {
  kicker: "Verónica Calabuch, entrenadora personal",
  headline: ["Empieza", "desde donde", "estás."],
  subtitle:
    "Entrenamiento personal, fuerza funcional y grupos reducidos en mi propia sala. Adaptado a tu nivel y a tu ritmo, también si nunca has entrenado.",
  primaryCta: "Escríbeme",
  secondaryCta: { label: "Ver cómo trabajo", anchor: "como-trabajo" },
};

export const manifesto = {
  lines: ["45 metros cuadrados.", "Pocas personas.", "Toda la atención."],
  body: "Aquí no hay rutinas copiadas ni prisa. Cada sesión parte de cómo llegas: tu nivel, tu ritmo y cualquier lesión o limitación que haya que tener en cuenta.",
  forWhomTitle: "Esto es para ti si…",
  forWhom: [
    "Nunca has entrenado o hace tiempo que lo dejaste.",
    "Los gimnasios grandes te imponen o te pierdes en ellos.",
    "Tienes alguna molestia o limitación y quieres entrenar con cuidado.",
    "Quieres ganar fuerza con un plan pensado para ti.",
  ],
  forWhomNote: pending("Validar con Verónica que estos perfiles corresponden a sus clientes reales"),
};

export const about = {
  title: "Verónica Calabuch",
  lead: "Soy entrenadora personal y monitora de fitness. Trabajo el entrenamiento personal y la fuerza funcional, en sesiones individuales y en grupos reducidos, en mi propia sala.",
  body: [
    "Entiendo el entrenamiento de una forma sencilla: cada persona llega con un nivel, un ritmo y una historia distintos, y es el entrenamiento el que tiene que adaptarse a eso, no al revés.",
    "Por eso tengo en cuenta tus posibles lesiones o limitaciones, y por eso no necesitas experiencia previa para empezar conmigo.",
  ],
  principles: [
    { title: "Tu nivel", body: "Es el punto de partida, no un requisito." },
    { title: "Tu ritmo", body: "Marca cómo avanzamos." },
    { title: "Tu cuerpo", body: "Las lesiones y limitaciones se tienen en cuenta." },
  ],
  copyNote: pending("Texto provisional redactado a partir del brief: validar con Verónica y ajustar a su voz"),
  storyNote: pending("Historia personal: por qué se dedica al entrenamiento (con sus palabras)"),
  credentialsNote: pending("Formación, titulaciones y años de experiencia"),
  quote: pending("Una frase de Verónica que la represente"),
  cta: { label: "Ver cómo trabajo", anchor: "como-trabajo" },
};

export const services: Service[] = [
  {
    id: "personal",
    title: "Entrenamiento personal",
    summary:
      "Sesiones individuales con toda la atención puesta en ti. Cada ejercicio se adapta a tu nivel, a tu ritmo y a cualquier limitación que haya que tener en cuenta.",
    forWhom: "Para empezar con seguridad o avanzar con un plan hecho a tu medida.",
    media: media.personal,
    status: "available",
    cta: { label: "Preguntar por el entrenamiento personal", href: "#contacto" },
    notes: [pending("Duración de la sesión, frecuencia y qué incluye")],
  },
  {
    id: "funcional",
    title: "Fuerza funcional",
    summary:
      "Trabajo de fuerza basado en movimientos completos del cuerpo. Fuerza útil para tu día a día, construida desde tu punto de partida.",
    forWhom: "Para ganar fuerza y control, tengas o no experiencia con pesos.",
    media: media.funcional,
    status: "available",
    cta: { label: "Preguntar por la fuerza funcional", href: "#contacto" },
    notes: [pending("¿Es un servicio independiente o la forma de trabajar dentro de los demás?")],
  },
  {
    id: "grupos",
    title: "Grupos reducidos",
    summary:
      "Entrena en compañía sin perder la atención personal. Grupos pequeños en los que cada persona trabaja a su nivel.",
    forWhom: "Para quien disfruta entrenando con otras personas y quiere seguir teniendo corrección.",
    media: media.grupos,
    status: "available",
    cta: { label: "Preguntar por los grupos", href: "#contacto" },
    notes: [pending("Número máximo de personas por grupo y horarios")],
  },
  {
    id: "online",
    title: "Entrenamiento online",
    summary:
      "Entrenamientos grabados de unos 45 minutos, organizados en packs, para entrenar desde casa cuando te venga bien.",
    forWhom: "Para quien tiene poco tiempo, prefiere no ir al gimnasio o vive lejos.",
    media: media.online,
    status: "coming-soon",
    cta: { label: "Apuntarme a la lista de espera", href: "#online" },
  },
];

export const process = {
  title: "Cómo trabajo",
  intro: "Un proceso sencillo, pensado para que dar el primer paso sea fácil.",
  steps: [
    {
      title: "Primer contacto",
      body: "Me escribes y hablamos de lo que buscas, de tu experiencia y de tu disponibilidad.",
      note: pending("¿Hay primera sesión de prueba o valoración? ¿Es gratuita?"),
    },
    {
      title: "Conocemos tus objetivos",
      body: "Vemos tu punto de partida: cómo te mueves, qué te gustaría conseguir y si hay alguna lesión o limitación que tener en cuenta.",
      note: pending("Cómo hace Verónica la valoración inicial"),
    },
    {
      title: "Adaptamos el entrenamiento",
      body: "Las sesiones se diseñan a tu nivel y a tu ritmo, con corrección y acompañamiento en cada ejercicio.",
    },
    {
      title: "Evolucionamos contigo",
      body: "Cuando avanzas, el entrenamiento avanza contigo. Revisamos y ajustamos lo que haga falta.",
      note: pending("Cada cuánto se revisa el plan"),
    },
  ] satisfies ProcessStep[],
};

export const studio = {
  title: "La sala",
  lead: "Un espacio propio de unos 45 m² donde se entrena en sesiones individuales y en grupos reducidos. Pequeño, para que nadie se pierda entre la gente.",
  facts: [
    { label: "Superficie", value: "Aprox. 45 m²" },
    { label: "Formato", value: "Individual y grupos reducidos" },
    { label: "Ubicación", value: pending("Dirección y zona") },
    { label: "Horario", value: pending("Horario de la sala") },
    { label: "Material", value: pending("Material disponible (según fotos reales)") },
  ],
};

export const pricing = {
  title: "Tarifas",
  intro:
    "Quiero que sepas lo que cuesta antes de empezar. Estoy cerrando las tarifas; mientras tanto, escríbeme y te cuento las opciones.",
  plans: [
    {
      id: "personal",
      service: "personal",
      name: "Entrenamiento personal",
      description: "Sesiones individuales adaptadas a ti.",
      price: pending("Precio por sesión"),
      unit: pending("Unidad: sesión, bono o mes"),
      includes: pending("Qué incluye (duración, seguimiento, plan)"),
      status: "available",
    },
    {
      id: "grupos",
      service: "grupos",
      name: "Grupos reducidos",
      description: "Entrena en compañía, a tu nivel.",
      price: pending("Precio por sesión o mensual"),
      unit: pending("Unidad"),
      includes: pending("Frecuencia, tamaño del grupo y condiciones"),
      status: "available",
    },
    {
      id: "online",
      service: "online",
      name: "Entrenamiento online",
      description: "Packs de entrenamientos para hacer en casa.",
      price: pending("Precio de los packs"),
      unit: pending("Pago único o suscripción"),
      includes: pending("Contenido de cada pack"),
      status: "coming-soon",
    },
  ] satisfies PricingPlan[],
  conditionsNote: pending("Condiciones: IVA, bonos, caducidad, cancelaciones y formas de pago"),
};

/**
 * Solo testimonios reales, con consentimiento firmado.
 * Mientras esté vacío, la sección muestra un espacio reservado en la demo
 * y desaparece en producción.
 */
export const testimonials: Testimonial[] = [];

export const faq: FAQItem[] = [
  {
    id: "experiencia",
    question: "¿Necesito experiencia para empezar?",
    answer:
      "No. El entrenamiento parte de tu nivel actual, tanto si nunca has entrenado como si vienes de hacer deporte.",
  },
  {
    id: "nivel",
    question: "¿El entrenamiento se adapta a mi nivel?",
    answer:
      "Sí. Cada sesión se ajusta a tu nivel y a tu ritmo, y se tienen en cuenta posibles lesiones o limitaciones.",
  },
  {
    id: "limitaciones",
    question: "¿Puedo entrenar si tengo alguna lesión o limitación?",
    answer:
      "Cuéntamelo en la primera conversación y lo tendremos en cuenta al plantear el entrenamiento. Ante cualquier lesión o condición médica, consulta primero con tu profesional sanitario.",
    note: pending("Validar con Verónica qué tipo de casos atiende"),
  },
  {
    id: "modalidades",
    question: "¿Hay entrenamientos individuales y en grupo?",
    answer: "Sí. Hay entrenamiento personal individual y entrenamientos en grupos reducidos.",
    note: pending("Número de plazas y horarios de los grupos"),
  },
  {
    id: "primer-contacto",
    question: "¿Cómo funciona el primer contacto?",
    answer: "Me escribes, hablamos de lo que buscas y vemos qué opción encaja mejor contigo.",
    note: pending("¿Hay sesión de prueba o valoración? ¿Tiene coste?"),
  },
  {
    id: "donde",
    question: "¿Dónde se realizan los entrenamientos?",
    answer: "En mi sala de entrenamiento propia, de unos 45 m².",
    note: pending("Dirección de la sala"),
  },
  {
    id: "online",
    question: "¿Habrá entrenamientos online?",
    answer:
      "Sí, están en preparación: vídeos de unos 45 minutos organizados en packs para entrenar desde casa. Si te apuntas a la lista de espera, te aviso cuando estén disponibles.",
    note: pending("Fecha de lanzamiento, precios y formato de acceso"),
  },
];

export const closing = {
  title: "Cuéntame desde dónde partes.",
  body: "Escríbeme y vemos qué tipo de entrenamiento encaja contigo. Te responderé personalmente.",
};
