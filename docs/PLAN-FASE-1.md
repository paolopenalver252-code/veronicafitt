# Verónica Calabuch — Plan de proyecto (Fase 1)

**Análisis, dirección creativa, arquitectura y plan de implementación**
Estado: borrador para revisión · Fecha: 25/09/2026 · Sin código

---

## 00 — Antes de empezar: bloqueos y decisiones que cuestionamos

### Bloqueo 1: el material visual de Instagram no está en el proyecto

El brief dice que en el proyecto hay material visual de Instagram. **No está.** La carpeta solo contiene configuración de skills (`.claude/`, `.agents/`, `skills-lock.json`). Tampoco he encontrado fotos o vídeos de Verónica en Escritorio, Descargas, Imágenes ni Vídeos. Y el perfil `@veronica_calabuch` no se puede consultar sin iniciar sesión.

**Consecuencia:** todo lo que sigue sobre estética, color y selección de imágenes es una **hipótesis de trabajo**. Hay que validarla con el material real antes de construir. En el apartado 14 dejo los criterios para asignar cada foto y vídeo a su sección, para aplicarlos en cuanto llegue el material.

**Qué hacer:** crear `assets/raw/instagram/` y dejar ahí los originales, idealmente los archivos del móvil y no descargas de Instagram, que vienen recomprimidas a 1080 px.

### Bloqueo 2: el público objetivo no está definido

No sabemos si Verónica trabaja sobre todo con mujeres, con un público mixto, con un rango de edad concreto o con personas en recuperación. Esto cambia el copy de raíz: el género gramatical, los ejemplos y el tono. Mientras no se confirme, el copy usará formulaciones neutras ("No necesitas experiencia", "Empieza desde tu nivel"). **PENDIENTE DE CONFIRMAR.**

### Decisiones del brief que proponemos cambiar

| Decisión del brief | Propuesta | Por qué |
|---|---|---|
| React + Vite como SPA | **React + Vite con React Router v7 en modo framework y prerender** | Una SPA pura entrega HTML vacío y perjudica el SEO local, que es de donde vendrán los clientes presenciales. Con React Router v7 seguimos en React + Vite, pero cada ruta sale como HTML estático. Y cuando llegue la plataforma online, el mismo proyecto admite SSR y loaders para la zona privada, sin migrar. |
| Una landing larga | **Home con secciones + rutas propias desde el día 1** (`/online`, páginas legales) y páginas de servicio cuando se confirme la ubicación | Las páginas por servicio y ciudad posicionan mucho mejor que las anclas. La zona online necesita su propia URL para crecer. |
| El online como una sección más | **El online como "lista de espera" desde hoy** | El activo más valioso para lanzar packs es una lista de emails de gente interesada. Si empezamos a recogerla ahora, el día del lanzamiento ya hay audiencia. |
| Construir la plataforma a medida más adelante | **Validar primero con una solución ligera** y construir a medida después | Ver apartado 13. Construir auth, pagos y vídeo protegido antes de saber si los packs se venden es caro. |
| Metodología 01–04 tal como está | **Reformularla para que el paso 01 sea el primer contacto** | Así la sección explica el método y a la vez quita miedo a dar el primer paso. Ver apartado 03. |
| Formulario con "lesiones o limitaciones" | **No pedir datos de salud en el formulario web** | Las lesiones son datos de salud, una categoría especial del RGPD (art. 9). Pedirlos exige consentimiento explícito y más obligaciones. Mejor tratarlos en la primera conversación. Ver apartado 12. |

---

## 01 — Dirección creativa

### Concepto: "A tu medida"

La idea central de Verónica es que **el entrenamiento se adapta a la persona**. En vez de decirlo con una frase, proponemos que el diseño lo haga visible:

1. **La tipografía se adapta.** Usamos una tipografía variable con eje de anchura. Los titulares clave pasan de condensados (esfuerzo, energía) a su anchura natural (calma, control) en un único momento de animación. Es el gesto memorable de la web, y solo se usa en dos o tres sitios.
2. **La escala humana como argumento.** 45 m² y grupos reducidos no son una limitación: son la prueba de que habrá atención personal. El diseño trata la sala como un lugar íntimo, lejos de la imagen de gimnasio.
3. **Verónica siempre en primer plano.** Fotografía grande, honesta y con luz natural. Los efectos quedan en segundo plano.

### Estética propuesta: editorial deportivo luminoso

- **Luminosa, no oscura.** Fondo claro y neutro (color tiza), texto grafito y un único acento de color.
- **Editorial, no plantilla.** Composiciones asimétricas, fotos a sangre alternadas con fotos enmarcadas, mucho aire y texto alineado a la izquierda. Nada de rejillas de tarjetas idénticas.
- **Energía controlada.** El movimiento lo aportan la fotografía (cuerpos en acción) y la tipografía, no los efectos.
- **Cercana.** Frases cortas en segunda persona y fotos con clientes reales (si hay consentimiento), nada de stock.

### Lo que evitamos a propósito

- Estética de gimnasio: negro con rojo o amarillo, tipografías stencil, texturas metálicas.
- Los tópicos actuales de las webs generadas: fondo crema con serif y acento terracota; fondo casi negro con verde ácido; rótulos en mayúsculas espaciadas sobre cada título; flechas "→" en todos los botones; tarjetas iguales con la misma sombra gris.
- Partículas, 3D, fondos animados, cursores personalizados, glassmorphism y degradados decorativos.

### Revisión honesta de la propuesta

Mi primer borrador de paleta era "hueso + tinta + arcilla": fondo crema, serif de alto contraste y acento terracota. Al revisarlo contra el brief vi que es exactamente la combinación por defecto que hoy produce cualquier generador para "marca personal premium". **La he descartado** y la he sustituido por tiza + grafito + cobalto (apartado 05). Esa paleta no se confunde con un gimnasio (negro, rojo, amarillo), tampoco con la estética "wellness" genérica (crema, beige, terracota), y deja que los tonos cálidos de la piel y de la luz natural resalten por contraste.

**Condición:** si el material de Instagram tiene un color dominante propio (ropa, pared de la sala, material), ese color manda sobre el cobalto.

---

## 02 — Influencia de las referencias

### Instagram de Verónica (fuente principal de verdad visual)

| Tomamos | No hacemos |
|---|---|
| Su cara, su cuerpo, su sala y su manera de moverse como material principal | Inventar una estética que ella no tiene (por ejemplo, un lujo frío si su contenido es cercano y espontáneo) |
| La luz y los colores reales de su espacio para ajustar la paleta | Usar capturas de Instagram a baja resolución en formatos grandes de escritorio |
| El formato vertical de los reels, que funciona de forma natural en el hero móvil | Usar a clientes que aparecen en sus vídeos sin un consentimiento de imagen firmado |
| Su tono de voz en los textos (a extraer de captions: PENDIENTE) | Mezclar contenido personal no deportivo sin un criterio claro |

*Análisis detallado PENDIENTE: requiere el material (ver Bloqueo 1).*

### FFITCOCO (referencia principal de producto)

He analizado `/workouts-menu/`, `/workouts/`, `/packs-premium/` y la home.

**Cómo funciona:**
- **Menú visual de categorías**, un mosaico de imágenes donde cada una lleva al catálogo filtrado: Sin material, Brazos, Glúteos y piernas, Abs, Combo, Lateral, Total body, Cardio, Estiramientos, Slow, Clases enteras (35 min – 1 h 10), Directos, The Club, ffitfuerza y "Todos los vídeos".
- **Catálogo con cuatro filtros combinables:** Modalidad, Material (mancuernas, sliders, goma, silla, tobilleras…), Duración (5–10, 10–15, 30, 45 min, 1 h) e Intensidad (básico, intermedio, avanzado).
- **Tarjeta de workout mínima:** número de serie, categoría, descripción corta y duración (por ejemplo, "03 ffitfuerza – total body · 43:00").
- **Packs con ficha fija:** nombre de marca, una frase gancho, número de entrenos, duración por sesión, nivel, estructura temporal ("reto 4 semanas", "3 entrenos por semana") y condiciones ("no caduca"), más un botón "Ir a pack".
- **Plataforma:** "Mi cuenta" y carrito, con compra de packs individuales.
- **Confianza:** un bloque de prensa muy potente en la home.

**Principios que extraemos:**
1. **Taxonomía por facetas.** Cada workout se describe con datos (tipo, material, duración, nivel), no solo con un título. Nuestro modelo de datos debe nacer así.
2. **La ficha de pack como producto.** Qué incluye, cuánto dura, para qué nivel y si caduca. Es justo la información que evita dudas antes de comprar.
3. **Entrada visual y catálogo después.** Primero se inspira con imágenes y luego se deja filtrar.
4. **"Sin material" como categoría de entrada.** Encaja con el público de "entrenar en casa".
5. **Packs con narrativa** (un reto, una etapa de vida). Da ideas para los packs de Verónica, siempre que ella los defina.

**No copiamos:** su identidad visual (Montserrat, taupe, verde), sus nombres de marca ("ffit…"), su estructura de packs concreta ni la maquetación en rejilla densa de WordPress. Tampoco el bloque de prensa: no sabemos si Verónica tiene apariciones en medios (PENDIENTE).

### Anabel Barriel (referencia de narrativa)

**Estructura observada:** hero con CTA a WhatsApp → problema emocional → programa → lista para identificarse ("¿Te reconoces?") → causa → visión del después → proceso en fases → qué incluye → resultados → garantía → testimonios en vídeo → CTA final.

**Tomamos:**
- **El espejo antes de la oferta:** una lista breve en la que el visitante se reconoce ("Crees que necesitas estar en forma para empezar", "Has probado el gimnasio y te has sentido perdido"). Es la sección "¿Para quién es?".
- **CTA de baja fricción y repetido** ("Reserva tu llamada gratuita"), vía WhatsApp.
- **El proceso en fases** como forma de hacer tangible un servicio.
- **Ritmo:** frases cortas, pausas y alternancia entre bloques emocionales y prácticos.

**No tomamos:**
- El lenguaje terapéutico ("herida", "sistema nervioso"). No encaja con el fitness y roza afirmaciones de salud.
- La ausencia de fotografía: la web de Verónica tiene que ser muy visual.
- Las garantías de devolución, salvo que Verónica las ofrezca (PENDIENTE).
- Promesas de transformación que no podamos respaldar.

### React Bits

Biblioteca de componentes animados para copiar y pegar (JS/TS, CSS/Tailwind), con dependencias variables: GSAP, Motion, Three.js u OGL.
- **Tomamos:** el concepto de *split text* (revelado por líneas), *scroll reveal* y *magnet* (botón magnético). **Los reimplementamos con Motion** para no meter GSAP ni Three.
- **No tomamos:** fondos animados (Aurora, Particles, Threads…), efectos 3D o WebGL, cursores y textos con glitch.

### Framer Marketplace

- **Tomamos:** estudiar el ritmo de las plantillas de marca personal y fitness bien valoradas: escala tipográfica, proporción entre imagen y texto, densidad de las secciones.
- **No tomamos:** ninguna plantilla ni estructura literal. El riesgo principal del proyecto es precisamente parecer una plantilla de Framer.

### Skiper UI (skiper6)

Es un componente de "Hover Members": sobre una lista de nombres, al pasar el ratón se revela la foto y el texto se anima. Depende de Framer Motion.
- **Tomamos:** la mecánica de **lista editorial con foto revelada al pasar el ratón**, aplicada a **servicios en escritorio**. Es una alternativa a las tarjetas mucho más editorial.
- **No tomamos:** el cursor seguidor. En móvil no hay hover, así que ahí la lista muestra las fotos en línea.

### Vengeance UI (animated button)

Botón CTA con brillo, `whileTap` a escala 0,97 y transición spring, sobre Motion + Tailwind.
- **Tomamos:** la **respuesta táctil al pulsar** (escala 0,97). Es sutil y mejora la sensación en móvil.
- **No tomamos:** el brillo en bucle (es una animación constante) ni el resto de su catálogo "espectacular" (liquid metal, glitch, aurora, solar system).

### Animmaster

Colección de pago (4,99–8 $) de unos 300 componentes: 60 % HTML/CSS/JS, 30 % React, 10 % Next. Incluye muchos efectos 3D y WebGL. Se entrega en una carpeta de Google Drive.
- **Tomamos:** solo como **inspiración** para patrones de revelado de imagen y scroll.
- **No tomamos:** código. Mezcla de stacks, calidad y licencia no verificables, y un peso incompatible con nuestro objetivo de rendimiento.

### Anime.js

Motor de animación ligero y modular (v4), con buen control de timelines y SVG.
- **Decisión: no lo añadimos.** Motion ya cubre todo lo que necesitamos y es la dependencia común de Skiper y Vengeance. Dos motores de animación duplican peso y criterios.
- **Cuándo lo reconsideraríamos:** si en el futuro hiciera falta una animación SVG compleja con timeline (por ejemplo, un logotipo animado).

---

## 03 — Arquitectura completa

### Mapa de rutas

**Fase demo / lanzamiento:**
```
/                     Home (todas las secciones)
/online               Entrenamiento online: vista previa del catálogo + lista de espera
/aviso-legal          Obligatorio (LSSI)
/privacidad           Obligatorio (RGPD)
/cookies              Obligatorio si hay cookies no técnicas
/404
```

**Cuando se confirme la ubicación (SEO local):**
```
/entrenamiento-personal-[ciudad]
/entrenamiento-grupos-reducidos-[ciudad]
/fuerza-funcional-[ciudad]
/tarifas              (si crece más allá de la sección de la home)
```

**Plataforma futura (ver apartado 13):**
```
/online/entrenamientos            Catálogo con filtros
/online/entrenamientos/[slug]     Ficha del workout (pública con avance, vídeo privado)
/online/packs                     Listado de packs
/online/packs/[slug]              Ficha de pack + compra
/cuenta                           Login, registro, perfil
/biblioteca                       Contenido comprado + progreso
```

### Orden de secciones de la Home

| # | Sección | Trabajo que hace | Etapa del recorrido |
|---|---|---|---|
| 0 | **Navbar** | Orientación + CTA siempre accesible | — |
| 1 | **Hero** | Quién es, qué ofrece, para quién y qué hacer | Visita |
| 2 | **Propuesta de valor** (bloque editorial) | La idea central en una frase potente | Interés |
| 3 | **¿Para quién es?** (espejo) | Que el visitante se reconozca: "esto es para mí" | Interés |
| 4 | **Sobre Verónica** | Persona, motivo, filosofía | Confianza |
| 5 | **Servicios** | Personal · Fuerza funcional · Grupos reducidos · Online | Servicio |
| 6 | **La sala** | 45 m² como argumento de atención personal | Confianza |
| 7 | **Cómo trabajamos** (método) | Proceso claro que empieza por el primer contacto | Confianza → CTA |
| 8 | **Testimonios** | Prueba social (solo si hay testimonios reales) | Confianza |
| 9 | **Entrena online** (avance) | La visión de plataforma + lista de espera | Futuro |
| 10 | **Tarifas** | Precios claros, sin sorpresas | Decisión |
| 11 | **Preguntas frecuentes** | Eliminar las últimas objeciones | Decisión |
| 12 | **Contacto / CTA final** | WhatsApp + formulario + ubicación | Contacto |
| 13 | **Footer** | Legal, redes, datos de contacto, NAP (nombre, dirección y teléfono) para SEO local | — |
| — | **Barra CTA móvil fija** | Aparece tras el hero y se oculta en Contacto | Todo el recorrido |

**Por qué este orden:**
- El **espejo (3) va antes de "Sobre Verónica" (4)**: primero el visitante siente que la web habla de él, y luego le interesa quién le habla.
- **La sala (6) después de servicios**: hace de puente de confianza entre "qué ofrece" y "cómo lo hace".
- **El online (9) después de testimonios y antes de tarifas**: la prueba social del presencial respalda el proyecto online, y así las tarifas pueden incluir la fila de online como "Próximamente".
- **Tarifas tarde**: cuando llegan, el visitante ya entiende el valor.

**Si faltan testimonios**, la sección 8 no se muestra en producción. En la demo aparece con un marcador PENDIENTE claramente visible.

### Detalle de cada sección

**1. Hero.** Ver la estrategia completa en "Hero: análisis de opciones", más abajo.

**2. Propuesta de valor: direcciones de copy** (no son definitivas; las cerraremos con la skill de copywriting cuando tengamos su tono real)

| Dirección | Ejemplo de titular | Refuerza |
|---|---|---|
| A. Punto de partida | "Tu nivel es el punto de partida, no un requisito." | Accesibilidad, sin miedo a empezar |
| B. Escala humana | "45 metros cuadrados. Pocas personas. Toda la atención." | Personalización, un dato real y diferenciador |
| C. Fuerza para todos | "La fuerza no es para unos pocos. Es para ti, a tu ritmo." | Fuerza + adaptación |
| D. Acompañamiento | "No se trata de aguantar. Se trata de avanzar con alguien que te guía." | Confianza, acompañamiento |
| E. Empezar | "Empieza desde donde estás." | Accesibilidad máxima, brevedad |

**Recomendación:** B como bloque de propuesta de valor, porque es concreta, verificable y nadie más puede decirla, y A o E como mensaje del hero. "El entrenamiento debe adaptarse a ti" queda como idea de fondo, no como frase literal.

**3. ¿Para quién es?** Entre 4 y 6 frases en las que reconocerse, formuladas con cuidado de no hacer afirmaciones médicas. Por ejemplo: "Nunca has entrenado y no sabes por dónde empezar"; "Te intimidan los gimnasios grandes"; "Tienes alguna molestia y quieres entrenar con cuidado" (*redacción para validar con Verónica*); "Quieres ganar fuerza sin rutinas genéricas". **PENDIENTE: validar los perfiles reales de sus clientes.**

**4. Sobre Verónica: estructura** (sin inventar contenido)
- Frase de apertura con su filosofía, en su voz. *Necesitamos una cita suya real.*
- **Por qué se dedica a esto:** *PENDIENTE (su historia real).*
- **Cómo entiende el entrenamiento:** adaptación, niveles, lesiones, accesibilidad. *Esto sí está confirmado en el brief.*
- **Formación y trayectoria:** *PENDIENTE (titulaciones, años, especialidades).* Se presenta como una lista discreta, no como un muro de logos.
- 2 o 3 fotos: un retrato, una foto entrenando y una foto guiando a alguien.
- Formato: texto corto en bloques y cita destacada. Nada de "Hola, soy Verónica y desde pequeña…".

**5. Servicios: formato recomendado**
- **Escritorio:** lista editorial de 4 filas grandes (nombre + una línea descriptiva + para quién). Al pasar el ratón se revela la foto de ese servicio en un marco fijo lateral (principio de skiper6).
- **Móvil:** bloques apilados, cada uno con su foto en formato 4:5, título, descripción corta y enlace. Sin carrusel horizontal: esconde contenido y funciona peor.
- **Online:** misma fila, con la etiqueta **"Próximamente"** y un CTA "Apúntate a la lista de espera" en lugar de "Reservar". Si en el lanzamiento ya estuviera disponible, se cambia el estado en los datos y listo.
- **Por qué no usamos tarjetas:** cuatro tarjetas iguales es el patrón más de plantilla que existe, y una lista editorial transmite más "marca personal".

**6. La sala**
- Una foto amplia del espacio y 2 o 3 detalles (material, zona de trabajo).
- Datos: aproximadamente 45 m²; ubicación *PENDIENTE*; número máximo de personas por grupo *PENDIENTE*.
- Mensaje: "No es un gimnasio. Es un espacio pensado para entrenar con atención."

**7. Método: análisis de la propuesta 01–04**

Propuesta original: "Conocemos tus necesidades → Adaptamos tu entrenamiento → Entrenas según tu nivel → Evolucionamos contigo".

**Problemas que vemos:**
- Los pasos 2 y 3 dicen casi lo mismo (adaptar = según tu nivel).
- No explica cómo se empieza, que es la duda que frena el contacto.
- El 04 es genérico.

**Propuesta revisada** (numerada, porque aquí sí hay una secuencia real):
1. **Hablamos.** Me escribes y conversamos sobre tus objetivos, tu experiencia y cualquier limitación. *¿Es gratis? ¿Hay sesión de prueba? PENDIENTE.*
2. **Valoramos tu punto de partida.** Primera sesión para conocer tu nivel y tu forma de moverte. *PENDIENTE: ¿cómo lo hace realmente Verónica?*
3. **Entrenamos a tu medida.** Sesiones adaptadas, con corrección y acompañamiento en cada ejercicio.
4. **Ajustamos sobre la marcha.** Revisamos tu progreso y cambiamos el plan cuando lo necesitas. *PENDIENTE: ¿cada cuánto revisa?*

Así, el paso 1 funciona también como CTA ("Hablamos" lleva directamente a WhatsApp).

**8. Testimonios:** ver apartado 06 (`TestimonialCard`) y apartado 15. La estructura incluye cita, nombre (o nombre e inicial), servicio, tiempo entrenando con ella (opcional), foto (opcional, con consentimiento) y un resultado (opcional y verificable, nunca inventado).

**9. Entrena online (avance):** ver el apartado "Online / Workouts" más abajo.

**10. Tarifas: estructura**
- **Selector por modalidad:** Personal · Grupos reducidos · Online. En móvil son pestañas; en escritorio, columnas.
- Cada tarifa tiene nombre, qué incluye, precio (*PENDIENTE*), unidad (sesión, mes, bono), condiciones (*PENDIENTE*) y CTA.
- Online: "Próximamente", con la lista de espera.
- Una línea bajo la tabla: "¿Dudas sobre qué opción encaja contigo? Escríbeme". Es una salida para quien aún no se decide.
- **Los precios nunca se inventan.** En la demo se muestran como `— €` con la etiqueta PENDIENTE.

**11. FAQ**

| Pregunta | Borrador de respuesta | Estado |
|---|---|---|
| ¿Necesito experiencia? | No. El entrenamiento parte de tu nivel actual. | Confirmado en el brief (tono por validar) |
| ¿Puedo empezar desde cero? | Sí. Empezamos por lo básico y avanzamos a tu ritmo. | Confirmado (tono por validar) |
| ¿Se adapta a mi nivel? | Sí. Cada sesión se ajusta a tu nivel y a cómo te encuentras. | Confirmado |
| ¿Puedo entrenar si tengo una lesión o limitación? | Coméntalo en la primera conversación. Se tienen en cuenta en el diseño del entrenamiento. Si tienes una lesión o condición médica, consulta antes con tu profesional sanitario. | **PENDIENTE**: validar con Verónica los límites de lo que atiende. Sin afirmaciones médicas. |
| ¿Hay entrenamientos en grupo? | Sí, en grupos reducidos. | Tamaño, horarios y precio: **PENDIENTE** |
| ¿Puedo entrenar desde casa? | Estamos preparando entrenamientos online. Apúntate a la lista de espera. | **PENDIENTE**: ¿ofrece ya algo online o por videollamada? |
| ¿Cómo funcionarán los entrenamientos online? | Vídeos de unos 45 minutos organizados en packs. | Formato, precio y acceso: **PENDIENTE** |
| ¿Hay sesión de prueba? | — | **PENDIENTE** |
| ¿Qué tengo que llevar? | — | **PENDIENTE** |
| ¿Cómo cancelo o cambio una sesión? | — | **PENDIENTE** |

**12. Contacto / CTA final:** WhatsApp como botón principal, con mensaje prerrellenado, formulario corto como alternativa, dirección y mapa (PENDIENTE) y horario (PENDIENTE).

### Hero: análisis de opciones

**Hecho clave:** el material de Instagram es casi siempre **vertical (9:16 o 4:5)**. Esto condiciona el diseño más que cualquier preferencia estética.

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Vídeo a pantalla completa** | Vídeo en bucle de fondo con texto encima | Muy impactante | El material vertical no llena un escritorio horizontal; hay que usar overlays oscuros (más negro); penaliza el LCP; el texto sobre vídeo se lee peor |
| **B. Foto a pantalla completa** | Retrato grande con texto superpuesto | Rápido y claro | Necesita una foto horizontal de muy alta calidad, que probablemente no exista en Instagram |
| **C. Composición partida con marco vertical** ✅ | Escritorio: texto a la izquierda y un **marco vertical alto** a la derecha con vídeo o foto. Móvil: el marco vertical ocupa el primer plano y el texto va debajo o superpuesto en la parte baja | **Usa el formato vertical real sin recortarlo**; el texto sobre fondo claro se lee perfecto; el póster puede ser el LCP y el vídeo carga después; es menos genérico que el vídeo a sangre | Requiere un buen fragmento de vídeo de 6 a 10 segundos |
| **D. Tipográfico con foto pequeña** | Titular gigante y foto secundaria | Muy editorial | Resta protagonismo a Verónica, lo contrario del brief |

**Recomendación: opción C, con una foto como base y el vídeo como mejora.**
- **Póster (foto)** = elemento LCP, cargado con prioridad.
- **Vídeo** (6–10 s, en silencio, en bucle, `playsinline`) que sustituye al póster **solo** si la conexión lo permite y el usuario no tiene activado *reduced motion* ni *Save-Data*.
- Si el material de vídeo no tiene calidad suficiente, se usa solo la foto. La composición funciona igual.

```
ESCRITORIO                                   MÓVIL
┌──────────────────────────────────────┐     ┌──────────────────┐
│ Logo            Nav         [CTA]    │     │ Logo       ☰     │
│                                      │     │ ┌──────────────┐ │
│  Entrenadora personal · [Ciudad]     │     │ │              │ │
│                        ┌──────────┐  │     │ │  Vídeo/foto  │ │
│  Titular grande        │          │  │     │ │  vertical    │ │
│  (2–3 líneas, anchura  │  Vídeo/  │  │     │ │  (≈ 60–65 %  │ │
│   variable animada)    │  foto    │  │     │ │  del alto)   │ │
│                        │  vertical│  │     │ └──────────────┘ │
│  Subtítulo: qué + para │  9:16    │  │     │ Titular          │
│  quién (1–2 líneas)    │          │  │     │ Subtítulo corto  │
│                        │          │  │     │ [ CTA principal ]│
│  [CTA principal] [CTA 2]          │  │     │ CTA secundario   │
│                        └──────────┘  │     └──────────────────┘
└──────────────────────────────────────┘
```

**Contenido del hero (estrategia, no copy final):**
- **Quién:** nombre + "Entrenadora personal" + ciudad (PENDIENTE). El H1 incluye la palabra clave.
- **Qué y para quién:** entrenamiento personal y en grupos reducidos, adaptado a tu nivel.
- **Qué hacer:**
  - **CTA principal:** "Reserva tu primera sesión" si existe una sesión inicial o de prueba; si no, "Escríbeme por WhatsApp". **Depende de un PENDIENTE.**
  - **CTA secundario:** "Ver cómo trabajo" (ancla a Método) o "Entrenamiento online", que lleva a `/online`.

### Online / Workouts (sección 9 y ruta `/online`)

**En la home (avance):**
- Titular sobre la visión: entrenar desde casa, con poco tiempo y con Verónica. *Copy PENDIENTE.*
- 3 o 4 **tarjetas de categoría EJEMPLO**, visibles como vista previa de la plataforma.
- Formulario de lista de espera: solo email + consentimiento.
- Etiqueta visible: **"Próximamente"**.

**En `/online`:**
- Hero propio: qué será, para quién (poco tiempo, sin gimnasio, flexibilidad) y la lista de espera.
- **Menú visual de categorías** (principio de FFITCOCO): mosaico con imagen y nombre.
- **Demo del catálogo** con filtros simulados: tipo, duración, nivel y material.
- **Demo de pack** con su ficha completa.
- **Todo lo simulado lleva la marca "Ejemplo"**, más un aviso en la cabecera de la demo: "Vista previa. Los entrenamientos todavía no están disponibles".

**Categorías de ejemplo** (EJEMPLO / PENDIENTE DE DEFINIR, solo para arquitectura):
Full body · Fuerza · Fuerza funcional · Movilidad · Sin material · Sesiones cortas · Clases completas (~45 min)

**Anatomía de la tarjeta de workout:**
```
┌─────────────────────────┐
│  [imagen 4:5 o 16:9]    │  ← avance en vídeo al pasar el ratón (solo escritorio)
│  ▶ 45 min     [Nivel]   │  ← duración + nivel sobre la imagen
├─────────────────────────┤
│  Título del entreno     │
│  Objetivo · Material    │
│  [Incluido en: Pack X]  │  ← o "Gratis" / "Con suscripción"
│  🔒 Acceso   | Precio   │  ← estado de acceso
└─────────────────────────┘
Estados: Disponible · Próximamente · Ejemplo (demo) · Bloqueado · Comprado
```

**Anatomía de la ficha de pack:**
Nombre · frase gancho · nº de entrenos · duración por sesión · nivel · estructura (semanas × sesiones por semana) · material necesario · caducidad del acceso · precio · CTA · lista de workouts incluidos.

---

## 04 — UX: recorrido del usuario

### Perfiles de visitante (hipótesis para validar con Verónica)

| Perfil | Qué necesita saber | Dónde lo encuentra | Conversión |
|---|---|---|---|
| **Principiante con miedo** | "¿Puedo hacerlo yo?" | Hero → espejo → método → FAQ | WhatsApp |
| **Con molestias o limitación** | "¿Me va a hacer daño? ¿Me entiende?" | Espejo → Sobre Verónica → FAQ (lesiones) | WhatsApp (conversación privada) |
| **Busca grupo reducido** | Horarios, precio, ambiente | Servicios → sala → tarifas | WhatsApp o formulario |
| **Ya entrena y quiere fuerza** | Metodología, nivel técnico | Servicios (fuerza funcional) → método | Reservar |
| **Quiere entrenar en casa (España u otro país)** | ¿Hay online? ¿Cuándo? | Hero secundario → `/online` | Lista de espera |
| **Compara precios** | Precio y condiciones | Nav → Tarifas | WhatsApp |

### Recorrido principal
```
VISITA ─── Hero: "es entrenadora personal, en [ciudad], para gente como yo"
  ↓
INTERÉS ── Propuesta de valor + espejo: "esto es para mí"
  ↓
CONFIANZA ─ Sobre Verónica + sala + método + testimonios
  ↓
SERVICIO ─ Servicios + tarifas: "sé qué quiero y cuánto cuesta"
  ↓
CTA ────── Barra fija móvil / CTAs contextuales en cada bloque
  ↓
CONTACTO ─ WhatsApp (prerrellenado) · formulario · lista de espera online
```

### Principios de UX
- **Cada sección tiene una salida**: un CTA contextual y discreto, no un botón gigante repetido.
- **Nada importante escondido** en carruseles, pestañas en escritorio o acordeones, salvo en la FAQ.
- **Anclas con desplazamiento suave** y `scroll-margin-top` para que la barra de navegación no tape los títulos.
- **Estados honestos**: "Próximamente" y "Ejemplo" siempre visibles donde corresponda.
- **Accesibilidad**: contraste AA como mínimo, foco visible, navegación completa con teclado, textos alternativos, `prefers-reduced-motion` y objetivos táctiles de al menos 44 px.

---

## 05 — Sistema visual

> Hipótesis pendiente de validar con el material de Instagram. Si su contenido tiene un color dominante propio, este sistema se ajusta.

### Color

| Token | Hex | Uso |
|---|---|---|
| `tiza` | `#F1F1EE` | Fondo principal. Neutro, ni crema ni amarillento |
| `blanco` | `#FFFFFF` | Superficies elevadas (formularios, tarjetas del catálogo) |
| `grafito` | `#23272A` | Texto principal y bloques oscuros puntuales. No es un negro "casi negro" |
| `piedra` | `#6B7073` | Texto secundario, metadatos |
| `cobalto` | `#2E44C8` | Acento único: CTA, enlaces, estados activos. Enérgico, pero no de gimnasio |
| `cielo` | `#DDE3F6` | Fondo alternativo de secciones y etiquetas; el cobalto en versión suave |
| `linea` | `#D9D9D4` | Separadores y bordes |

**Reglas:**
- El cobalto aparece poco (CTA y detalles). Si todo es azul, nada destaca.
- Como mucho **una sección oscura** (grafito) en toda la home, para dar ritmo: por ejemplo, el CTA final o el método.
- Contrastes que hay que verificar: cobalto sobre tiza ≥ 4,5:1 para texto normal, y blanco sobre cobalto en los botones.
- WhatsApp: se usa el icono estándar, **pero el botón mantiene el color de la marca** (cobalto o grafito), no verde WhatsApp. Así no rompe la paleta y se sigue reconociendo por el icono.
- Sin degradados decorativos. Como mucho, un velo sutil sobre la foto cuando haga falta legibilidad.

**Alternativa B** (si su material pide más calidez): tiza + grafito + **mora `#7A2E4A`** como acento.

### Tipografía

**Una sola familia:** **Archivo** (variable, ejes de peso 100–900 y anchura 62–125, licencia libre OFL).
- **Por qué:** su eje de anchura permite el concepto "tipografía que se adapta". Condensada transmite energía y titulares con fuerza; la anchura normal da legibilidad. Con un archivo resolvemos titulares, texto y UI, lo que ayuda al rendimiento.
- **Titulares:** Archivo, anchura condensada (~75), peso 700–800, interlineado 0,95–1,05 y tracking ligeramente negativo.
- **Texto:** Archivo, anchura 100, peso 400, 17–18 px en móvil y 18–19 px en escritorio, interlineado 1,55, líneas de 60–75 caracteres como máximo.
- **UI y metadatos:** Archivo, anchura 100, peso 500–600, 14–15 px. **Sin mayúsculas espaciadas** en rótulos.
- **Opción a valorar tras ver el material:** una segunda familia serif solo para las citas de Verónica. Por ahora no, porque añade peso y es el tópico actual.

**Escala tipográfica** (móvil → escritorio, fluida con `clamp()`):

| Nivel | Móvil | Escritorio |
|---|---|---|
| Display (hero) | 44 px | 96–112 px |
| H2 de sección | 32 px | 56–64 px |
| H3 | 22 px | 28 px |
| Texto grande (entradillas) | 19 px | 22 px |
| Texto | 17 px | 18 px |
| Pequeño / metadatos | 14 px | 14 px |

**Carga:** autoalojada con `@fontsource-variable/archivo`, subconjunto latino (español), `font-display: swap` y precarga del archivo de titulares.

### Espaciado y rejilla
- Base de 4 px; escala de 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
- Separación entre secciones: 80–96 px en móvil y 128–160 px en escritorio. El aire forma parte de lo "premium".
- Márgenes laterales: 20 px en móvil, 32 px en tablet y un contenedor de máximo 1280 px en escritorio, con alguna foto a sangre.
- **Rejilla:** 4 columnas en móvil, 8 en tablet y 12 en escritorio. Composiciones **asimétricas** (texto en 5 columnas, imagen en 6, desplazada).
- Alineación: **siempre a la izquierda**. Centrado solo en el CTA final.

### Botones

| Variante | Estilo | Uso |
|---|---|---|
| **Principal** | Fondo cobalto, texto blanco, forma de píldora, 52 px de alto en móvil | Un único CTA principal por pantalla |
| **Secundario** | Borde grafito de 1,5 px, fondo transparente | CTA alternativo |
| **Enlace** | Texto con subrayado que se desplaza al pasar el ratón | CTAs contextuales dentro del texto |
| **WhatsApp** | Principal o secundario + icono | Contacto |

- Estados: hover (escritorio), pulsado (escala 0,97), foco visible (anillo cobalto con separación de 2 px), deshabilitado y cargando.
- **Texto del botón = lo que ocurre al pulsarlo** ("Escríbeme por WhatsApp", "Apúntate a la lista"). Sin flechas decorativas.

### Radios y superficies (jerarquía intencionada, no un radio único)
- Fotos editoriales: **0 px** (a sangre) o **4 px** (enmarcadas).
- Tarjetas del catálogo online: **12 px**, porque es una interfaz de producto y se diferencia a propósito de la parte editorial.
- Botones: píldora. Inputs: 10 px.
- Sombras: casi ninguna. La separación viene del color de fondo y del espacio. Solo el menú móvil y la barra fija llevan una sombra suave.

### Imágenes
- **Tratamiento:** color natural, sin filtros fuertes; corrección ligera para unificar la temperatura entre fotos de distintos momentos.
- **Formatos por uso:** 4:5 (retratos y servicios en móvil), 9:16 (hero y vídeo), 3:2 o 16:9 (sala y catálogo online), 1:1 (testimonios).
- Siempre con `width`/`height` o `aspect-ratio` fijos para evitar saltos de maquetación (CLS 0).
- Punto focal definido por imagen (`object-position`) para que los recortes móviles no corten la cara.

### Vídeo
- Hero: 6–10 s, sin audio, en bucle, 720 p vertical, ≤ 1,5 MB (H.264 MP4 + WebM/AV1 como alternativa), con póster.
- Avances de workouts (futuro): 3–5 s, solo al pasar el ratón en escritorio, cargados bajo demanda.
- **Vídeos completos (plataforma):** nunca servidos desde Vercel. Siempre desde un servicio de streaming (apartado 13).

---

## 06 — Componentes reutilizables

### Estructura
| Componente | Descripción |
|---|---|
| `Container` | Ancho máximo + márgenes laterales responsive |
| `Section` | Semántica `<section>` + `id` de ancla + variante de fondo (tiza, cielo, grafito) + espaciado vertical |
| `SectionHeader` | H2 + entradilla opcional; admite animación de revelado |
| `Grid` / `Split` | Composiciones asimétricas texto/imagen predefinidas |

### Primitivas de UI
| Componente | Descripción |
|---|---|
| `Button` | Variantes principal, secundario y enlace; tamaños; `as` enlace o botón; estados |
| `WhatsAppButton` | Construye la URL `wa.me` con un mensaje prerrellenado según el contexto (servicio, tarifa) |
| `Badge` / `StatusTag` | "Próximamente", "Ejemplo", "Nuevo", nivel |
| `Pending` | **Marcador visual de contenido PENDIENTE.** Visible en la demo; en producción un chequeo de build impide publicar con PENDIENTES |
| `Icon` | Envoltorio de Lucide con tamaños coherentes |
| `Accordion` | FAQ accesible (`<details>`/`<summary>` o ARIA), altura animada |
| `Tabs` | Selector de tarifas en móvil |
| `Field`, `TextArea`, `Checkbox`, `FormStatus` | Formularios accesibles con errores en línea |

### Medios
| Componente | Descripción |
|---|---|
| `ResponsiveImage` | `<picture>` AVIF/WebP/JPEG + `srcset`/`sizes` + `loading` + `fetchpriority` + punto focal |
| `HeroMedia` | Póster LCP + vídeo cargado de forma condicional (conexión, *reduced motion*, *Save-Data*) |
| `LazyVideo` | Vídeo que se carga y reproduce solo cuando entra en pantalla y se pausa al salir |

### Navegación
| Componente | Descripción |
|---|---|
| `Navbar` | Se oculta al bajar y aparece al subir; fondo sólido tras el hero; CTA a la derecha |
| `MobileMenu` | Pantalla completa, foco atrapado, cierre con Esc, enlaces grandes + CTA + redes |
| `MobileCTABar` | Barra fija inferior (WhatsApp + Reservar); aparece tras el hero y se oculta en Contacto y el footer; respeta `safe-area-inset-bottom` |
| `Footer` | NAP, legal, redes, créditos |

### Secciones de la home
`Hero` · `ValueStatement` · `ForWhom` · `About` · `ServicesList` (+ `ServiceRow`) · `Studio` · `Method` (+ `MethodStep`) · `Testimonials` (+ `TestimonialCard`) · `OnlinePreview` · `Pricing` (+ `PricingPlan`) · `FAQ` · `Contact` (+ `ContactForm`)

### Plataforma online (preparados desde la demo)
| Componente | Descripción |
|---|---|
| `CategoryTile` | Mosaico de categoría con imagen |
| `WorkoutCard` | Anatomía del apartado 03; estados de acceso |
| `WorkoutFilters` | Filtros por facetas; estado reflejado en la URL (`?nivel=basico&duracion=45`) |
| `PackCard` / `PackDetail` | Ficha de pack |
| `WaitlistForm` | Email + consentimiento |
| `AccessGate` (futuro) | Envuelve el contenido privado; hoy solo muestra "Próximamente" |

### Utilidades y hooks
`useReducedMotion` (de Motion) · `useScrollDirection` · `useInView` (de Motion) · `useConnectionQuality` (Network Information API + Save-Data, con alternativa segura) · `buildWhatsAppUrl()` · `seo()` (meta por ruta) · `jsonLd()`.

---

## 07 — Animaciones

**Principios:**
- **Un único momento orquestado** (la carga del hero) y el resto muy sobrio.
- No ponemos un *fade-up* en cada sección: es el patrón genérico que delata una plantilla.
- La animación responde a acciones del usuario (abrir, pulsar, filtrar) o tiene un propósito narrativo concreto.
- Todas se ejecutan **una sola vez** y nunca en bucle. Todas respetan `prefers-reduced-motion`: sin movimiento, solo opacidad, o nada.
- Solo se animan `transform` y `opacity` (y `clip-path` puntualmente). Nunca propiedades que fuercen a recalcular la maquetación.
- Duraciones: 150–250 ms para la UI y 500–900 ms para los revelados narrativos. Curvas *ease-out* suaves; spring para las respuestas al pulsar.

**Librería única: Motion** (`motion/react`, con `LazyMotion` + `domAnimation` para reducir peso). Lo que se puede hacer con CSS puro se hace con CSS.

| Sección | Animación | Librería / técnica | Objetivo |
|---|---|---|---|
| **Hero** | Revelado del titular por líneas (máscara) + **transición del eje de anchura** de condensado a normal. Una vez, en la carga | Motion (animación de `font-variation-settings` o de la variable CSS `--wdth`) | **El momento memorable.** Hace visible "se adapta a ti" |
| **Hero** | Revelado del marco de imagen o vídeo (`clip-path` de abajo arriba), escalonado respecto al titular | Motion | Presentar a Verónica como protagonista |
| **Hero** | Parallax muy sutil del medio (≤ 6 %) al hacer scroll. **Solo escritorio** | Motion `useScroll` + `useTransform` | Profundidad sin distraer. Desactivado en móvil y con *reduced motion* |
| **Hero** | Transición póster → vídeo con fundido cruzado cuando el vídeo está listo | CSS (opacidad) | Evitar el salto visual al cargar el vídeo |
| **Navbar** | Se oculta al bajar y aparece al subir; el fondo pasa a sólido tras el hero | Motion + `useScrollDirection` | Más espacio de lectura en móvil sin perder la navegación |
| **Menú móvil** | Apertura a pantalla completa + enlaces en cascada (40 ms) | Motion `AnimatePresence` | Dejar claro qué ha cambiado al abrirlo |
| **Propuesta de valor** | Revelado de la frase por líneas al entrar en pantalla, repitiendo el gesto de anchura de forma más contenida | Motion `whileInView` (una vez) | Dar peso editorial a la idea central. **Es el segundo y último uso del gesto de anchura** |
| **¿Para quién es?** | Sin animación de entrada. Solo estados estáticos | — | Contención: no todo tiene que moverse |
| **Sobre Verónica** | Revelado de imagen con `clip-path` al entrar en pantalla | Motion `whileInView` | Momento humano, "abrir el telón" a la persona |
| **Servicios (escritorio)** | Al pasar el ratón por una fila, la foto correspondiente aparece con fundido cruzado y escala leve (1,02 → 1) en un marco lateral fijo | Motion `AnimatePresence` (principio de skiper6, sin cursor) | Asociar cada servicio a una imagen real sin usar tarjetas |
| **Servicios (móvil)** | Sin hover. Fotos estáticas en línea | — | El hover no existe en táctil |
| **La sala** | Nada, o un único revelado de imagen si la sección lo pide al verla montada | Motion | Evitar repetir el recurso |
| **Método (escritorio)** | **Sección fija**: título y línea de progreso fijos a la izquierda, pasos a la derecha; la línea avanza (`scaleY`) con el scroll y el paso activo se resalta | Motion `useScroll` + CSS `position: sticky` | Hacer tangible que es un proceso en fases |
| **Método (móvil)** | Lista vertical con la línea de progreso estática. Sin sticky | CSS | El sticky en móvil consume demasiada pantalla |
| **Testimonios** | Sin carrusel automático. En móvil, desplazamiento horizontal nativo con `scroll-snap` y opción manual | CSS | Nunca movimiento constante |
| **Online: tarjetas** | Hover en escritorio: avance en vídeo en silencio + elevación mínima | Motion + `LazyVideo` | Sensación de plataforma de vídeo |
| **Online: filtros** | Reordenación de la rejilla al filtrar (animación de layout) | Motion `layout` + `AnimatePresence` | Mostrar qué ha cambiado al filtrar |
| **Tarifas (móvil)** | Indicador de la pestaña activa que se desliza | Motion `layoutId` | Continuidad visual entre modalidades |
| **FAQ** | Altura del acordeón + rotación del icono | CSS (`grid-template-rows: 0fr → 1fr`) | Respuesta directa a la acción, sin JS de animación |
| **CTA final** | **Botón magnético sutil (desplazamiento ≤ 6 px). Solo escritorio y solo aquí** | Motion (principio de Magnet de React Bits) | Un último gesto de invitación. **Es opcional: si se nota como truco, se quita** |
| **Todos los botones** | Escala 0,97 al pulsar | Motion `whileTap` o CSS `:active` | Respuesta táctil |
| **Enlaces** | Subrayado que se desplaza al pasar el ratón | CSS | Indicación de interactividad |
| **Cambio de ruta** (`/` ↔ `/online`) | Fundido corto (150–200 ms). Evaluar la View Transitions API nativa | CSS / View Transitions | Continuidad sin coste |

**Descartadas de forma explícita:** partículas, 3D, cursores personalizados, marquesinas en bucle, contadores animados (no tenemos cifras reales), brillos en bucle, texto glitch, fondos animados y *smooth scroll* con secuestro del scroll (Lenis): en móvil perjudica más de lo que aporta.

---

## 08 — Responsive

**Enfoque:** mobile first de verdad. Se diseña y construye primero a 375 px y después se amplía. No se "encoge" el escritorio.

**Breakpoints:** base 0–639 (móvil) · `sm` 640 · `md` 768 (tablet) · `lg` 1024 · `xl` 1280 · `2xl` 1536.

| Elemento | Móvil (375–639) | Tablet (768–1023) | Escritorio (≥ 1024) |
|---|---|---|---|
| **Navbar** | Logo + botón de menú (44 px). 56–64 px de alto. Se oculta al bajar | Igual que móvil + CTA visible | Enlaces visibles + CTA; 72–80 px |
| **Menú** | Pantalla completa con enlaces grandes (28–32 px), CTA de WhatsApp abajo y redes | Igual | No aplica |
| **Hero** | Medio vertical al 60–65 % del alto (`svh`, no `vh`), titular y CTA debajo; el CTA siempre visible sin scroll | Medio y texto lado a lado, con proporción ajustada | Composición partida (texto en 6–7 columnas, marco vertical en 4–5) |
| **Vídeo hero** | Solo con buena conexión y sin Save-Data; si no, póster. 720 p vertical | 720 p | 1080 p vertical (el marco no supera ~70 % del alto) |
| **Imágenes** | 4:5 a todo el ancho del contenedor; `srcset` con tope de 828 px | 2 columnas cuando tenga sentido | Composiciones asimétricas, alguna a sangre |
| **Servicios** | Bloques apilados con foto | 2 columnas | Lista editorial + foto con hover |
| **Método** | Lista vertical | Lista vertical con más aire | Sticky con línea de progreso |
| **Testimonios** | Desplazamiento horizontal con `scroll-snap` (la tarjeta siguiente asoma) | 2 columnas | 3 columnas o composición editorial |
| **Catálogo online** | 1 columna (o 2 compactas); filtros en *bottom sheet* | 2–3 columnas | 3–4 columnas + filtros en fila |
| **Tarifas** | Pestañas por modalidad | Pestañas o 2 columnas | 3 columnas |
| **Botones** | Mínimo 48–52 px de alto; CTA principal a ancho completo en el hero | Ancho automático | Ancho automático |
| **Tipografía** | Display a 44 px; texto a 17 px (inputs a 16 px como mínimo para evitar el zoom de iOS) | Intermedia (fluida) | Display a 96–112 px |
| **Espaciado** | Secciones a 80–96 px; márgenes de 20 px | 96–128 px; márgenes de 32 px | 128–160 px |
| **Barra CTA fija** | Sí | Sí | No (el CTA ya está en la navbar) |
| **Animaciones** | Solo revelados sencillos y respuestas al pulsar; sin parallax, sticky ni hover | Como móvil + algún revelado | Todas las de la tabla |

**Detalles de móvil nativo** (skill `mobile-native`): `100svh`/`dvh` en lugar de `100vh`; `env(safe-area-inset-*)`; `-webkit-tap-highlight-color: transparent` con un estado `:active` propio; hover solo dentro de `@media (hover: hover)`; `theme-color` en el meta; `touch-action` adecuado en los carruseles; nada de hover "pegado" tras tocar.

**Pruebas en dispositivos reales:** iPhone (Safari) y Android de gama media (Chrome) como mínimo. Los emuladores no reproducen bien ni el vídeo ni el rendimiento.

---

## 09 — Conversión

### Jerarquía de CTAs

| Nivel | CTA | Destino | Dónde |
|---|---|---|---|
| **Principal** | "Escríbeme por WhatsApp" / "Reserva tu primera sesión" (según el PENDIENTE de la sesión de prueba) | WhatsApp con mensaje prerrellenado | Hero, navbar, barra móvil, método (paso 1), tarifas y CTA final |
| **Secundario** | "Ver cómo trabajo" / "Ver tarifas" | Anclas | Hero, servicios |
| **Alternativo** | Formulario de contacto | Email a Verónica | Sección Contacto |
| **Futuro** | "Apúntate a la lista de espera" | Email + consentimiento | Servicios (online), sección online, `/online`, tarifas (online) |

### ¿Por qué WhatsApp como canal principal?
- En España es el canal más directo y con menos fricción para un servicio local y personal.
- Da paso a una **conversación**, que es justo la etapa que Verónica necesita para convertir ("contactos → conversaciones → reservas").
- **Mensaje prerrellenado según el contexto:** "Hola Verónica, me interesa el entrenamiento en grupo reducido…". Ella sabe de dónde viene cada contacto y el usuario no tiene que pensar qué escribir.
- **Riesgo:** el número queda expuesto a spam. Se recomienda WhatsApp Business (PENDIENTE: ¿lo usa?).

### ¿Formulario o reserva online?
- **Formulario corto** (nombre, email o teléfono, modalidad de interés, mensaje opcional y consentimiento) para quien no quiere usar WhatsApp.
- **Reserva con calendario (Cal.com, Calendly…): no por ahora.** Un entrenamiento personal necesita una conversación previa. Se reconsidera para las clases de grupo con horario fijo (PENDIENTE: ¿tiene horarios de grupo fijos?).

### Reducir fricción
- El CTA siempre está a un toque en móvil (barra fija).
- Precios visibles, porque esconderlos genera desconfianza.
- La FAQ resuelve las objeciones típicas antes del contacto.
- "Sin experiencia necesaria" se repite en tres puntos clave (hero, espejo y FAQ).
- El formulario tiene 4 campos como máximo y ninguno de salud.
- Microcopy de confianza bajo el CTA, por ejemplo: "Te respondo personalmente" (*PENDIENTE: plazo real de respuesta*).

### Medición
- Eventos: clic en WhatsApp (con origen), envío del formulario, alta en la lista de espera, visita a `/online` y clic en tarifas.
- Herramienta: **Vercel Web Analytics** (sin cookies, así que no necesita banner) o Plausible. **PENDIENTE:** ¿Google Analytics? Si se usa GA, hace falta banner de consentimiento.

### Lo que no hacemos (vender sin agresividad)
Popups de entrada, contadores de urgencia falsos, "¡solo quedan 2 plazas!" sin que sea verdad, chat bots ni CTAs parpadeantes.

---

## 10 — SEO

### Palabras clave (sin ubicación hasta que se confirme)

| Intención | Palabras clave principales | Página |
|---|---|---|
| Local, transaccional | entrenadora personal [ciudad] · entrenamiento personal [ciudad] | Home (después, página de servicio) |
| Local, servicio | entrenamiento funcional [ciudad] · fuerza funcional · entrenamiento en grupos reducidos [ciudad] | Home → páginas de servicio |
| Nacional, online | entrenamiento online · entrenar en casa · entrenamientos de fuerza en casa · entrenadora personal online | `/online` |
| Informacional (futuro blog) | empezar a entrenar desde cero · entrenamiento de fuerza para principiantes | Blog (fase posterior) |

### Metadatos iniciales (plantillas; los textos finales se cierran con copywriting y SEO)
- **Title (home):** `Verónica Calabuch | Entrenadora personal en [CIUDAD]`, ≤ 60 caracteres.
- **Meta description:** unos 150 caracteres con entrenamiento personal, fuerza funcional, grupos reducidos, "adaptado a tu nivel" y una llamada a la acción.
- **Title (`/online`):** `Entrenamiento online con Verónica Calabuch`.
- **Canonical** en todas las rutas, `lang="es"`, `og:locale=es_ES`.

### Estructura de encabezados (home)
- **H1** (uno solo): contiene "entrenadora personal" y, cuando se confirme, la ciudad, combinado con el mensaje del hero.
- **H2**: una por sección (Propuesta de valor, Para quién, Sobre Verónica, Servicios, La sala, Cómo trabajamos, Testimonios, Online, Tarifas, Preguntas frecuentes, Contacto).
- **H3**: servicios concretos, pasos del método, preguntas de la FAQ y planes de tarifas.

### HTML semántico
`<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<article>` (testimonios), `<footer>`, `<address>` (contacto), `<details>` (FAQ), `<figure>`/`<figcaption>`, enlaces reales (`<a href>`) y no `onClick`.

### Schema.org (JSON-LD)
- **Home:** `Person` (Verónica: nombre, `jobTitle`, `sameAs` con Instagram) + negocio local (`SportsActivityLocation` o `HealthClub`, con dirección, geo, horario, teléfono y `priceRange`), todo **PENDIENTE de los datos** + `Service` para cada servicio.
- **Tarifas:** `Offer` dentro de cada `Service` cuando haya precios.
- **FAQ:** `FAQPage`. *Aviso: desde 2023 Google solo muestra resultados enriquecidos de FAQ para sitios gubernamentales y de salud. El marcado sigue siendo válido, pero no hay que esperar ese resultado visual.*
- **Futuro:** `Product` u `Offer` para los packs, `VideoObject` para los avances públicos, `Course` si los packs se estructuran como programas.
- **No se inventan** valoraciones (`AggregateRating`) ni reseñas en el marcado.

### Open Graph y redes
Imagen OG de 1200×630 con su foto y su nombre (una por ruta principal), `og:title`, `og:description` y `twitter:card=summary_large_image`. Importante porque la web se compartirá mucho por WhatsApp e Instagram.

### Imágenes y texto alternativo
- Nombres de archivo descriptivos (`veronica-calabuch-entrenamiento-fuerza-funcional.avif`).
- El texto alternativo describe la escena, no repite palabras clave. Por ejemplo: "Verónica corrige la postura de una alumna durante una sentadilla con kettlebell" (*solo si eso es lo que se ve*).
- Las imágenes decorativas llevan `alt=""`.

### Técnico
Prerender de todas las rutas públicas, `sitemap.xml`, `robots.txt`, URLs limpias en español, página 404 real (con estado 404), Core Web Vitals en verde y ninguna ruta pública renderizada solo en cliente.

### SEO local (cuando se confirme la ubicación)
1. **Perfil de empresa en Google** (Google Business Profile). Es el factor más importante para "entrenadora personal [ciudad]". **PENDIENTE: ¿tiene uno?**
2. NAP idéntico en web, perfil de Google e Instagram.
3. Páginas de servicio por ciudad (y barrios o municipios cercanos solo si realmente atiende allí).
4. Reseñas en Google, pedidas a clientes reales tras unas semanas de entrenamiento.
5. Mapa embebido *con carga diferida* (tras un clic o al entrar en pantalla) para no penalizar el rendimiento ni cargar cookies de Google.

---

## 11 — Performance

### Objetivos (móvil 4G de gama media, percentil 75)

| Métrica | Objetivo |
|---|---|
| LCP | < 2,0 s (el límite de Google es 2,5 s) |
| CLS | < 0,05 |
| INP | < 150 ms |
| JS inicial (gzip) | < 120 KB en la home |
| Peso total de la home (sin vídeo) | < 1,2 MB |
| Lighthouse móvil | ≥ 95 en Performance, Accessibility, Best Practices y SEO |

### Imágenes
- **Pipeline en build** con `vite-imagetools`: de un original de alta resolución genera AVIF + WebP + JPEG en varios anchos (400, 640, 828, 1080, 1440, 1920).
- `<picture>` con `srcset` y `sizes` correctos para cada composición.
- **Hero:** `fetchpriority="high"`, sin `loading="lazy"` y con `<link rel="preload">` en su ruta.
- **Resto:** `loading="lazy"` + `decoding="async"`.
- Dimensiones o `aspect-ratio` siempre fijos.
- Marcador borroso o de color dominante (LQIP) opcional solo en las imágenes grandes.
- Calidad AVIF ~50–60 y WebP ~70–75, a validar visualmente con la piel (los degradados de piel son lo primero que se estropea).

### Vídeo
- El vídeo del hero **nunca es el elemento LCP**: lo es el póster.
- Se carga después del evento `load` o en `requestIdleCallback`, y solo si la conexión es buena, sin Save-Data ni *reduced motion*.
- `preload="none"`, `muted`, `playsinline` y `loop`; se pausa fuera de pantalla (IntersectionObserver).
- Codificación: H.264 (compatibilidad) + AV1 o VP9 en WebM (tamaño), 720 p en móvil. Objetivo ≤ 1,5 MB por bucle.
- Los vídeos de la plataforma, por streaming adaptativo (HLS) desde un proveedor, nunca como MP4 directo.

### Fuentes
- Un único archivo variable de Archivo en woff2 con subconjunto latino (~35–60 KB), autoalojado y precargado.
- Fallback con métricas ajustadas (`size-adjust`, `ascent-override`) para evitar el salto al cargar la fuente.

### JavaScript
- React Router con prerender: HTML real e hidratación.
- **Código dividido por ruta**: `/online` y su lógica de filtros no se cargan en la home.
- Motion con `LazyMotion` + `domAnimation` (~15–20 KB) en lugar del paquete completo.
- Lucide con importaciones individuales (tree-shaking).
- Sin librerías de carrusel (se usa `scroll-snap` nativo), sin jQuery y sin widgets de terceros bloqueantes.
- Mapa, Instagram embebido (si se usa) y analítica: carga diferida o después de interactuar.

### Animaciones
Solo `transform`, `opacity` y `clip-path`. `will-change` solo durante la animación. Nada animándose fuera de pantalla. Parallax y sticky desactivados en móvil.

### Vercel
CDN con caché inmutable para los assets con hash, compresión Brotli y cabeceras de caché correctas. **Límite de presupuesto en CI** (opcional): Lighthouse CI en cada preview.

---

## 12 — Seguridad

### Ahora (web comercial)

**Formularios (contacto y lista de espera)**
- Envío a una **Vercel Function** (`/api/contact`, `/api/waitlist`). Nunca exponer credenciales en el cliente.
- **Validación doble** con el mismo esquema `zod`: en el cliente para la experiencia de uso y en el servidor como fuente de verdad. Longitudes máximas y tipos estrictos; el HTML no se interpreta.
- **Antispam por capas:** campo honeypot oculto + tiempo mínimo de envío (menos de 3 s = bot) + límite de peticiones por IP (reglas del firewall de Vercel o un contador en Upstash). **Cloudflare Turnstile** solo si aparece spam real: es invisible y respeta la privacidad, pero añade un script de terceros.
- **Correo:** envío con Resend (u otro proveedor). El mensaje llega a Verónica y, opcionalmente, al usuario con una confirmación. **Sin base de datos al principio**: menos datos guardados, menos riesgo.
- Escapar el contenido del usuario en la plantilla del correo (evitar inyección de HTML y de cabeceras).

**Datos personales (RGPD + LOPDGDD + LSSI)**
- **Aviso legal** (LSSI): titular, NIF, domicilio y contacto. **PENDIENTE**.
- **Política de privacidad:** responsable, finalidad, base legal (consentimiento), destinatarios (proveedor de email y de hosting, que es de EE. UU. → transferencias internacionales con cláusulas contractuales tipo o el EU-US Data Privacy Framework), conservación y derechos.
- **Casilla de consentimiento sin marcar** en cada formulario, con enlace a la política.
- **Minimización:** no pedimos datos de salud en la web. Si un usuario los escribe en el campo libre, se añade un aviso: "No incluyas información médica; lo hablamos en persona".
- **Lista de espera:** doble confirmación (double opt-in) recomendada y posibilidad de darse de baja en cada envío. Proveedor de email marketing, preferiblemente con servidores en la UE (Brevo, MailerLite…). **PENDIENTE: elegir.**
- **Cookies:** con analítica sin cookies y el mapa cargado tras un clic, **puede no hacer falta banner**. Si se añade GA, Meta Pixel o YouTube embebido, hace falta un banner con rechazo tan fácil como aceptar.
- **Derechos de imagen:** consentimiento firmado de cualquier cliente que aparezca en fotos, vídeos o testimonios.

**Cabeceras HTTP** (`vercel.json`)
`Content-Security-Policy` (estricta: solo nuestro dominio + los proveedores necesarios) · `Strict-Transport-Security` · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy` (cámara, micro y geolocalización desactivados) · `frame-ancestors 'none'`.

**Otros:** dependencias mínimas y auditadas (`npm audit`, Dependabot), variables de entorno solo en el servidor y enlaces externos con `rel="noopener noreferrer"`.

### Futuro (plataforma)

| Área | Enfoque |
|---|---|
| **Autenticación** | Proveedor gestionado (Supabase Auth, Clerk o similar), nunca propio. Login con email mágico o contraseña + Google. Sesiones en cookies `HttpOnly`, `Secure` y `SameSite`. Verificación de email |
| **Autorización** | Tabla de **entitlements** (qué usuario tiene acceso a qué pack) comprobada **en el servidor** (loaders de React Router + Row Level Security en la base de datos). El cliente nunca decide el acceso |
| **Pagos** | **Stripe Checkout** (página alojada por Stripe): nunca tocamos datos de tarjeta (PCI SAQ-A). Webhooks con **firma verificada** e idempotencia. El acceso se concede por webhook, no por la redirección del navegador. IVA: Stripe Tax o revisión con su gestoría (OSS si vende a la UE) |
| **Vídeos protegidos** | Streaming HLS desde **Mux** o **Bunny Stream** con **URLs o tokens firmados de corta duración**, generados en el servidor solo para usuarios con acceso, y restricción por dominio. **Aviso honesto:** ningún sistema impide del todo una grabación de pantalla; el objetivo es impedir la descarga directa y que se compartan enlaces. DRM solo si el volumen lo justifica |
| **Cuentas compartidas** | Límite de sesiones o dispositivos simultáneos si se detecta abuso |
| **Datos de progreso** | Datos de actividad, no de salud. Si en el futuro se registraran lesiones o datos físicos, habría que hacer una evaluación de impacto (EIPD) |
| **Administración** | Panel de gestión con autenticación en dos pasos para Verónica |

---

## 13 — Arquitectura futura: evolución hacia la plataforma online

### Principio: "los datos primero, la plataforma después"

Desde el día 1, **todo el contenido vive como datos tipados** separados de los componentes. Hoy son archivos TypeScript en el repositorio. Mañana podrán ser un CMS o una base de datos, **con la misma forma**, sin tocar los componentes.

### Modelo de datos (conceptual; se tipará en la fase 2)

```
Service        id, slug, nombre, descripción, paraQuién, imagen, estado (disponible | próximamente), ctaTipo
PricingPlan    id, servicioId, nombre, incluye[], precio?, unidad, condiciones?, estado
Testimonial    id, cita, nombre, servicio, desde?, foto?, resultado?, consentimiento (bool), estado
FAQItem        id, pregunta, respuesta, categoría, estado (confirmado | pendiente)

Category       id, slug, nombre, descripción, imagen, orden, esEjemplo (bool)
Workout        id, slug, título, categoríaIds[], duraciónMin, nivel, objetivo[], material[],
               miniatura, avanceUrl?, videoAssetId?, acceso (gratis | pack | suscripción),
               packIds[], estado (ejemplo | próximamente | disponible), publicadoEn?
Pack           id, slug, nombre, gancho, descripción, workoutIds[], precio?, moneda,
               semanas?, sesionesPorSemana?, nivel, material[], caduca (bool), estado
--- futuro ---
User           id, email, nombre, creadoEn
Entitlement    userId, packId | planId, origen (stripe), desde, hasta?
Progress       userId, workoutId, completadoEn, segundosVistos
Order          id, userId, stripeSessionId, importe, estado
```

**Campos clave desde ya:** `estado` y `esEjemplo`. Permiten que la demo muestre contenido simulado de forma honesta y que en producción se filtre sin tocar el código.

### Capa de acceso a datos
Los componentes nunca importan los datos directamente. Llaman a funciones como `getServices()`, `getWorkouts(filtros)` o `getPack(slug)`. Hoy leen archivos locales; mañana consultan el CMS o la base de datos. **Solo cambia la implementación de esas funciones.**

### Fases de evolución

| Fase | Qué | Tecnología | Cuándo |
|---|---|---|---|
| **1. Web comercial** | Home, `/online` con demo y lista de espera, legal | React Router v7 (prerender) + Vercel + Resend | Ahora |
| **2. Validación online (MVP)** | Vender los 2 o 3 primeros packs con el mínimo desarrollo | Opción A: **plataforma alojada** (Hotmart, Teachable, Podia, Kajabi, Uscreen…) enlazada desde `/online`. Opción B: **Stripe Payment Links + vídeo privado en Bunny o Vimeo** con acceso sencillo | Cuando Verónica tenga packs grabados y una lista de espera |
| **3. Plataforma propia** | Catálogo real, cuentas, compra integrada, biblioteca, progreso | React Router v7 con SSR en las rutas privadas + Supabase (Auth + Postgres + RLS) + Stripe Checkout y webhooks + Mux o Bunny Stream + CMS (Sanity o Payload) o panel propio | Cuando la fase 2 demuestre demanda |
| **4. Crecimiento** | Suscripción, retos, directos, varios idiomas (ES → EN), comunidad | i18n con rutas `/en/…`, precios en varias monedas | Según el negocio |

**Por qué recomiendo validar primero (fase 2):** construir la fase 3 cuesta semanas de desarrollo y tiene costes fijos (vídeo, base de datos, mantenimiento). Una plataforma alojada o Payment Links permiten comprobar precio, formato y demanda en días. Si funciona, la fase 3 se construye con datos reales. Si no, se ha ahorrado todo ese coste. **Es una decisión de negocio de Verónica: PENDIENTE.**

**Por qué la elección de React Router v7 importa ya:** la web comercial y la futura zona privada comparten proyecto, diseño, componentes y dominio. Las rutas públicas se prerenderizan y las privadas se sirven con SSR y loaders que comprueban el acceso en el servidor. No hay migración de framework a mitad del camino.

### Modelo de negocio online: preguntas que condicionan la arquitectura
- ¿Packs de pago único (como FFITCOCO, "no caduca"), suscripción mensual o un modelo mixto?
- ¿Acceso para siempre o con caducidad?
- ¿Solo vídeo o también calendario, PDF o seguimiento?
- ¿Solo España o también otros países desde el principio (IVA, idioma, moneda)?

---

## 14 — Assets

### Criterios para seleccionar el material de Instagram (a aplicar cuando llegue)

| Sección | Qué buscar | Formato | Calidad mínima |
|---|---|---|---|
| **Hero** | Verónica en acción o guiando, con la cara visible, luz buena, movimiento claro y fondo limpio. **Vídeo:** fragmento de 6–10 s que se pueda poner en bucle sin corte visible | 9:16 vertical | Vídeo 1080×1920 original; foto de 1500 px o más en el lado largo |
| **Sobre mí** | Retrato cercano (mirada a cámara) + foto entrenando + foto con un cliente | 4:5 | 1200 px o más |
| **Entrenamiento personal** | Verónica corrigiendo o acompañando a una persona (uno a uno) | 4:5 / 3:2 | 1200 px o más |
| **Fuerza funcional** | Ejercicios de fuerza con el material real de la sala | 4:5 | 1200 px o más |
| **Grupos** | 2–5 personas entrenando juntas en la sala (con consentimiento) | 3:2 | 1600 px o más |
| **La sala** | Plano general del espacio + 2 o 3 detalles | 3:2 / 4:5 | 1600 px o más |
| **Método** | Detalles: manos corrigiendo, una conversación, una libreta o plan… (si existe) | 4:5 | 1000 px o más |
| **Testimonios** | Foto del cliente (opcional, con consentimiento) o foto entrenando con Verónica | 1:1 | 600 px o más |
| **Online** | Verónica entrenando en un espacio tipo "casa" o frente a cámara, en horizontal | **16:9** | 1920 px o más |
| **CTA final** | Foto cálida y cercana (sonrisa, gesto de bienvenida) | 4:5 / 3:2 | 1500 px o más |
| **OG / redes** | Retrato con espacio para el texto | 1200×630 | — |

### Problemas previsibles del material de Instagram
- **Resolución:** las descargas de Instagram vienen a 1080 px y recomprimidas. Sirven para móvil, pero se quedan cortas para las composiciones de escritorio. **Pedir los originales del móvil.**
- **Formato:** casi todo es vertical. Por eso proponemos el hero con marco vertical (apartado 03).
- **Coherencia:** fotos de distintas épocas y con distinta luz. Hay que hacer una corrección de color ligera para unificarlas.
- **Texto incrustado** en los reels (subtítulos, stickers): hay que elegir fragmentos limpios.
- **Derechos:** clientes que aparecen sin consentimiento documentado.

### Recomendación: una sesión de fotos y vídeo profesional (medio día)

**Lista de planos:**
1. Retratos (3 o 4): mirada a cámara, luz natural, con la ropa de entrenar habitual.
2. Verónica entrenando: 4 o 5 ejercicios representativos de fuerza funcional.
3. Uno a uno: guiando y corrigiendo a una persona (idealmente un cliente real con consentimiento).
4. Grupo reducido en acción.
5. La sala: plano general limpio + detalles de material.
6. **Vídeo del hero:** 3 o 4 tomas verticales de 10–15 s, trípode, sin cámara en mano.
7. **Horizontal 16:9** para el online: ya de paso, sirve como prueba de formato para los futuros vídeos de 45 minutos.
8. Espacio libre en el encuadre para poner texto encima (hero y OG).

**Consejo para el futuro online:** los entrenamientos de 45 minutos deberían grabarse en **horizontal (16:9)**, con buena iluminación, audio limpio (micro de solapa) y un encuadre donde se vea el cuerpo entero. Así sirven en ordenador, tele y móvil girado.

### Identidad
- **Logo:** ¿existe? **PENDIENTE.** Si no existe, en la fase 1 se usa un logotipo tipográfico con su nombre en Archivo. Un logo definitivo sería un encargo aparte.
- **Favicon y icono de app:** se derivan del logotipo.

---

## 15 — Información pendiente (lista para enviar a Verónica)

### A. Datos básicos y legales
- [ ] Nombre comercial exacto (¿"Verónica Calabuch"? ¿tiene marca propia?)
- [ ] Dirección de la sala (calle, ciudad, código postal) y si quiere mostrarla completa
- [ ] Zona que cubre (¿solo en su sala? ¿también a domicilio o al aire libre?)
- [ ] Teléfono o WhatsApp de contacto (¿WhatsApp Business?)
- [ ] Email de contacto
- [ ] Horario de atención y horario de la sala
- [ ] Titular legal y NIF/CIF (para el aviso legal)
- [ ] ¿Tiene dominio? ¿Cuál quiere?
- [ ] ¿Tiene perfil de empresa en Google?
- [ ] Otras redes (TikTok, YouTube, Facebook)

### B. Sobre ella
- [ ] Titulaciones y certificaciones (nombre exacto, entidad, año)
- [ ] Años de experiencia
- [ ] Especialidades o formaciones complementarias
- [ ] **Por qué se dedica a esto** (su historia real, con sus palabras; se puede hacer como mini entrevista de 5 preguntas)
- [ ] Cómo describiría su forma de entrenar en 3 palabras
- [ ] Una frase suya que la represente
- [ ] ¿Ha aparecido en medios, colaboraciones o eventos?

### C. Público
- [ ] ¿Con qué perfiles trabaja más? (edad, género, nivel, objetivos)
- [ ] ¿Con qué perfiles **no** trabaja o prefiere derivar?
- [ ] Lesiones y limitaciones: ¿qué tipo de casos atiende? ¿Colabora con fisioterapeutas o médicos?
- [ ] ¿Trabaja con embarazo o postparto, personas mayores o adolescentes? (solo si aplica)

### D. Servicios
- [ ] **Entrenamiento personal:** duración de la sesión, frecuencia habitual, qué incluye (¿plan? ¿seguimiento fuera de la sesión?)
- [ ] **Fuerza funcional:** ¿es un servicio aparte o una forma de trabajar dentro de los otros?
- [ ] **Grupos reducidos:** número máximo de personas, horarios fijos, niveles, tipo de sesiones
- [ ] ¿Hay sesión de prueba o valoración inicial? ¿Es gratuita?
- [ ] ¿Qué material tiene la sala?
- [ ] ¿Qué debe llevar el cliente?
- [ ] ¿Ofrece algo online hoy (videollamada, planes por escrito)?

### E. Tarifas y condiciones
- [ ] Precio por sesión de entrenamiento personal
- [ ] Bonos o paquetes de sesiones (número de sesiones, precio, caducidad)
- [ ] Precio de grupo reducido (por sesión o mensual)
- [ ] ¿Precios con IVA incluido?
- [ ] Política de cancelación y cambios
- [ ] Formas de pago
- [ ] ¿Quiere mostrar todos los precios o solo "desde X €"?

### F. Testimonios
- [ ] 3–6 testimonios reales (texto; mejor aún si hay vídeo)
- [ ] Nombre (completo o nombre e inicial) y servicio de cada persona
- [ ] Foto (opcional) + **autorización firmada**
- [ ] Resultados concretos, solo si son reales y el cliente lo autoriza
- [ ] ¿Reseñas en Google que podamos enlazar?

### G. Online (visión)
- [ ] ¿Fecha aproximada de lanzamiento?
- [ ] Categorías reales de entrenamiento que quiere grabar
- [ ] Niveles previstos
- [ ] ¿Duración fija de unos 45 min o también sesiones cortas?
- [ ] ¿Material necesario? (sin material, mancuernas, bandas…)
- [ ] ¿Packs de pago único, suscripción o ambos?
- [ ] ¿Acceso para siempre o con caducidad?
- [ ] Precio orientativo de los packs
- [ ] ¿Solo España o también otros países? ¿Idiomas?
- [ ] ¿Nombre para la línea online (una marca como "ffitpilates")?
- [ ] ¿Quiere empezar ya con la lista de espera? ¿Con qué herramienta de email?

### H. Material visual
- [ ] Fotos y vídeos originales (no descargados de Instagram)
- [ ] Consentimientos de imagen de los clientes que aparecen
- [ ] Logo (si existe) y colores que considere "suyos"
- [ ] ¿Disponibilidad para una sesión de fotos y vídeo?

### I. Herramientas y preferencias
- [ ] ¿Quiere analítica? ¿Google Analytics o una opción sin cookies?
- [ ] ¿Dónde quiere recibir los formularios (email, WhatsApp)?
- [ ] ¿Algún color, estilo o web que **no** le guste?
- [ ] ¿Quién mantendrá los contenidos (precios, horarios) cuando la web esté publicada?

---

## 16 — Dependencias

### Necesarias

| Paquete | Por qué | Coste aproximado (gzip, cliente) |
|---|---|---|
| `react`, `react-dom` | Base | ~45 KB |
| `react-router` + `@react-router/dev` (v7, modo framework) | Rutas, **prerender** para el SEO, meta por ruta, SSR y loaders para la plataforma futura | ~15–20 KB |
| `vite`, `typescript` | Stack acordado | Solo desarrollo |
| `tailwindcss` v4 + `@tailwindcss/vite` | Estilos con tokens en `@theme` | CSS, ~10–20 KB |
| `lucide-react` | Iconos (importación individual) | ~1 KB por icono |
| `motion` | **Única** librería de animación (con `LazyMotion`) | ~15–20 KB |
| `@fontsource-variable/archivo` | Fuente autoalojada (rendimiento, privacidad, sin Google Fonts externo) | Solo fuente |
| `zod` | Validación compartida entre cliente y servidor de formularios + esquema del contenido | ~12 KB (solo donde se use) |
| `vite-imagetools` | Genera AVIF, WebP y `srcset` en build | Solo desarrollo |
| `resend` (o `fetch` directo a su API) | Envío de emails desde la función de servidor | Solo servidor |

### Desarrollo y calidad
`eslint` + `typescript-eslint` + `eslint-plugin-jsx-a11y` · `prettier` + `prettier-plugin-tailwindcss` · `@playwright/test` + `@axe-core/playwright` (pruebas end-to-end y de accesibilidad) · `vitest` (utilidades y validaciones) · `@vercel/analytics` (si se elige).

### Opcionales (solo si se justifican)
| Paquete | Cuándo |
|---|---|
| `clsx` + `tailwind-merge` | Si las variantes de componentes lo piden (son muy pequeñas) |
| Cloudflare Turnstile | Solo si aparece spam real |

### Descartadas y por qué
| Paquete | Motivo |
|---|---|
| GSAP | Motion cubre nuestras necesidades; dos motores duplican peso |
| Anime.js | Mismo motivo (ver apartado 02) |
| Lenis / Locomotive | El *smooth scroll* secuestrado perjudica en móvil y en accesibilidad |
| Three.js / OGL / R3F | 3D descartado por el brief |
| Librerías de carrusel (Swiper, Embla) | `scroll-snap` nativo es suficiente |
| `react-helmet` | React Router v7 ya gestiona `meta` y `links` |
| Librerías de formularios (React Hook Form) | Dos formularios de 4 campos no lo justifican; se reconsidera en la plataforma |
| shadcn/ui completo | Solo necesitamos unas pocas primitivas; lo que sirva se copia puntualmente |
| Código de Animmaster, React Bits o Vengeance tal cual | Se toman los principios y se reimplementan con Motion para controlar peso y coherencia |

---

## 17 — Plan de construcción

### Fase 0: preparación (antes del segundo prompt)
1. Recibir el material visual (Bloqueo 1) y las respuestas del apartado 15 (como mínimo los bloques A, D y E).
2. Validar la dirección visual (paleta y tipografía) con 2 o 3 fotos reales, en un tablero de referencia sencillo.
3. Cerrar con Verónica: CTA principal (¿sesión de prueba?) y estado del online.
4. Decidir el proveedor de email y la analítica.

### Fase 1: base del proyecto
1. Crear el proyecto con React Router v7 (modo framework, prerender) + TypeScript estricto + Tailwind v4.
2. Tokens de diseño en `@theme`: colores, tipografía fluida, espaciado, radios.
3. Fuente autoalojada + fallback con métricas ajustadas.
4. ESLint, Prettier y alias de rutas.
5. `vercel.json` con cabeceras de seguridad; deploy de preview conectado.

### Fase 2: capa de contenido
1. Tipos TypeScript del modelo (apartado 13) + esquemas `zod`.
2. Archivos de contenido con estados (`pendiente`, `ejemplo`, `disponible`).
3. Funciones de acceso a datos (`getServices()`…).
4. Componente `Pending` + **chequeo de build que lista todos los PENDIENTES** (bloquea producción, permite la demo).

### Fase 3: primitivas y medios
`Container`, `Section`, `SectionHeader`, `Button`, `WhatsAppButton`, `Badge`, `Icon`, `ResponsiveImage` (con el pipeline de imágenes), `HeroMedia`, `LazyVideo`, `Accordion`, `Tabs` y campos de formulario.

### Fase 4: estructura global
`Navbar`, `MobileMenu`, `MobileCTABar`, `Footer`, layout raíz, 404 y páginas legales (con textos base y datos PENDIENTES).

### Fase 5: home, sección a sección (mobile first, **primero sin animaciones**)
Hero → Propuesta de valor → ¿Para quién? → Sobre Verónica → Servicios → La sala → Método → Testimonios → Online (avance) → Tarifas → FAQ → Contacto.
Revisión visual en 375 px, 768 px y 1280 px al terminar cada sección.

### Fase 6: `/online`
Hero + lista de espera · mosaico de categorías (EJEMPLO) · catálogo demo con filtros en la URL · demo de pack · avisos de "Vista previa".

### Fase 7: formularios y funciones de servidor
`/api/contact` y `/api/waitlist`: validación con zod, honeypot, tiempo mínimo, límite de peticiones y envío de email. Estados de éxito y error en la interfaz. Pruebas con datos maliciosos.

### Fase 8: capa de animación
Aplicar la tabla del apartado 07 sobre la web ya terminada en estático. Revisar `prefers-reduced-motion`. Revisar las animaciones con la skill `review-animations`.

### Fase 9: SEO
Meta por ruta, JSON-LD, imágenes OG, `sitemap.xml`, `robots.txt`, canonical y revisión de encabezados.

### Fase 10: rendimiento
Lighthouse en móvil, análisis del bundle, ajuste de las calidades AVIF y WebP, verificación de LCP, CLS e INP en un dispositivo real.

### Fase 11: QA y revisión
Pruebas con Playwright (navegación, formularios, menú móvil, anclas, filtros) en viewports de móvil, tablet y escritorio · axe (accesibilidad) · prueba en iPhone y Android reales · revisión de código · revisión de seguridad.

### Fase 12: entrega
Preview para Verónica → ronda de cambios → sustitución de los PENDIENTES → chequeo de build limpio → dominio → producción → alta en Google Search Console y en el perfil de empresa en Google.

### Reparto de agentes y skills

| Área | Skills relevantes | Uso |
|---|---|---|
| **Planificación** | `senior-architect`, `copywriting`, `seo-optimizer` | Arquitectura (este documento), mensajes y palabras clave |
| **Diseño** | `frontend-design` (lidera), `ui-ux-pro-max` (contraste y revisión) | Sistema visual y composición |
| **Móvil** | **`mobile-native`** (está en el proyecto) | *Nota:* `mobile-design` está orientada a apps nativas (React Native, Flutter). Para la web móvil encaja mejor `mobile-native` |
| **Animación** | `animate`, `review-animations`, `emil-design-eng` (están en el proyecto) | Son más específicas que las genéricas para implementar y revisar el movimiento |
| **Desarrollo** | `senior-frontend` (principal), `senior-fullstack` (funciones de servidor y formularios) | Fases 1–8 |
| **SEO** | `seo-optimizer` | Fase 9 |
| **Seguridad** | `senior-security` | Fase 7 (formularios, cabeceras) y fase 11 |
| **Testing** | `webapp-testing` | Fase 11 |
| **Revisión final** | `code-reviewer`, `review-animations` | Fase 11 |
| **No necesarias ahora** | `senior-backend` (hasta la plataforma, fase 3 del apartado 13), `agent-development` y `senior-prompt-engineer` (el proyecto no tiene funciones de IA) | — |

---

## 18 — Checklist antes de construir

### Contenido
- [ ] Material visual real en `assets/raw/` (originales, no capturas)
- [ ] Consentimientos de imagen de los clientes que aparecen
- [ ] Bloques A (datos básicos), D (servicios) y E (tarifas) del apartado 15, respondidos o marcados conscientemente como PENDIENTES para la demo
- [ ] Decisión sobre la sesión de prueba (define el CTA principal)
- [ ] Estado del online confirmado (próximamente, con o sin fecha)
- [ ] Público objetivo confirmado (define el tono y el género gramatical del copy)

### Diseño
- [ ] Paleta validada contra 3 fotos reales (o ajustada a su color)
- [ ] Tipografía Archivo aprobada (o alternativa)
- [ ] Opción de hero confirmada (C: marco vertical) según el material disponible
- [ ] Dirección de copy de la propuesta de valor elegida (A–E)

### Técnica
- [ ] React Router v7 con prerender aprobado (en lugar de SPA pura)
- [ ] Lista de dependencias aprobada (apartado 16)
- [ ] Proveedor de email (formularios + lista de espera) elegido
- [ ] Analítica elegida (define si hace falta banner de cookies)
- [ ] Cuenta de Vercel y dominio

### Legal
- [ ] Datos del titular para el aviso legal
- [ ] Decisión confirmada de no recoger datos de salud en el formulario

### Criterios de aceptación de la demo
- [ ] Todo lo simulado lleva "Ejemplo" o "PENDIENTE", visible
- [ ] No hay ningún precio, testimonio, titulación ni dato inventado
- [ ] Lighthouse móvil ≥ 95 en las cuatro categorías
- [ ] Funciona con teclado y con `prefers-reduced-motion`
- [ ] Probado en un iPhone y un Android reales
