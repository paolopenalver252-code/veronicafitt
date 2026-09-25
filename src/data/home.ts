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
  name: "Verónica Calabuch",
  role: "Entrenadora personal",
  headline: ["Empieza", "desde donde", "estás."],
  subtitle:
    "Entrenamiento personal, fuerza funcional y grupos reducidos en mi propia sala. Tu nivel es el punto de partida, no un requisito.",
  primaryCta: "Escríbeme",
  secondaryCta: { label: "Cómo trabajo", anchor: "como-trabajo" },
};

export const manifesto = {
  statement: "El entrenamiento se adapta a ti. No al revés.",
  body: "Cada persona llega con un nivel, un ritmo y una historia distintos. Por eso no hay rutinas copiadas: cada sesión parte de cómo llegas y tiene en cuenta cualquier lesión o limitación.",
  forWhomTitle: "Para ti, si…",
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
  lead: "Entrenadora personal y monitora de fitness. Trabajo el entrenamiento personal y la fuerza funcional, en sesiones individuales y en grupos reducidos, en mi propia sala.",
  body: [
    "Creo en un entrenamiento que se adapta a la persona: a su nivel, a su ritmo y a lo que su cuerpo necesita. Tengo en cuenta tus lesiones o limitaciones, y no hace falta experiencia para empezar conmigo.",
  ],
  principles: [
    { title: "Tu nivel", body: "El punto de partida." },
    { title: "Tu ritmo", body: "Marca cómo avanzamos." },
    { title: "Tu cuerpo", body: "Siempre en cuenta." },
  ],
  copyNote: pending("Texto provisional redactado a partir del brief: validar con Verónica y ajustar a su voz"),
  storyNote: pending("Historia personal: por qué se dedica al entrenamiento (con sus palabras)"),
  credentialsNote: pending("Formación, titulaciones y años de experiencia"),
  quote: pending("Una frase de Verónica que la represente"),
  cta: { label: "Cómo trabajo", anchor: "como-trabajo" },
};

export const services: Service[] = [
  {
    id: "personal",
    title: "Entrenamiento personal",
    summary:
      "Sesiones individuales con toda la atención puesta en ti. Cada ejercicio se adapta a tu nivel, a tu ritmo y a cualquier limitación.",
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
      "Fuerza construida con movimientos completos del cuerpo. Útil para tu día a día y adaptada a tu punto de partida.",
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
      "Entrena en compañía sin perder la atención personal. Grupos pequeños donde cada persona trabaja a su nivel.",
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
      "La misma forma de entrenar, desde casa. Sesiones grabadas de unos 45 minutos, organizadas en packs.",
    forWhom: "Para quien tiene poco tiempo, prefiere no ir al gimnasio o vive lejos.",
    media: media.online,
    status: "coming-soon",
    cta: { label: "Apuntarme a la lista de espera", href: "#online" },
  },
];

export const process = {
  title: "Cómo trabajo",
  intro: "Cuatro pasos sencillos, pensados para que empezar sea fácil.",
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
  size: "45",
  lines: ["Pocas personas.", "Toda la atención."],
  lead: "Una sala propia y tranquila, de unos 45 metros cuadrados, donde se entrena en sesiones individuales y en grupos reducidos. Aquí nadie se pierde entre la gente.",
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
    "Estoy terminando de definir las tarifas. Si quieres conocerlas ya, escríbeme y te cuento las opciones.",
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
  title: "Tu punto de partida es suficiente.",
  body: "Cuéntame desde dónde empiezas y vemos qué entrenamiento encaja contigo. Te responderé personalmente.",
};
