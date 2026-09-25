# Auditoría Fase 3 — Mobile-first, componentes y microinteracciones

Fecha: 25/09/2026 · Base: dirección artística v2 (commit `405823d`)

---

## 1. Diagnóstico general

La dirección v2 funciona: tipografía editorial (Bodoni Moda + Archivo), paleta granate sobria, composición asimétrica y ninguna nota interna visible por defecto. En escritorio ya se lee como una marca personal cuidada.

**En móvil, en cambio, todavía no es la experiencia principal:**
- **El primer pantallazo no vende.** El CTA del hero cae por debajo del pliegue en los tres tamaños medidos.
- **La cabecera está saturada.** Con logo, botón grande y menú, a 375 px el logo se parte en dos líneas.
- **El CTA fijo pesa demasiado.** Es una barra de ancho completo que compite con el contenido.
- **Algunas piezas no están pensadas para el dedo:** objetivos táctiles pequeños, principios en tres columnas estrechas.
- **Quedan restos de "demo técnica" en la interfaz pública:** los mensajes de los formularios dicen "Esto es una demo…".

**Sin assets reales, la fotografía todavía no puede hacer su trabajo.** Todo lo que sigue deja los huecos preparados para que, cuando llegue el material, las fotos sean las protagonistas sin tocar el layout.

---

## 2. Auditoría mobile (medida con Playwright)

| Medida | 375 × 812 | 390 × 844 | 430 × 932 |
|---|---|---|---|
| Final del H1 del hero | 808 px | 830 px | 888 px |
| Inicio del CTA del hero | **987 px (bajo el pliegue)** | **1008 px** | **1037 px** |
| Logo de cabecera | **2 líneas** | 1 línea, 18 px de alto | 1 línea, 20 px |
| Scroll horizontal | 0 | 0 | 0 |
| Altura total de la home | 17 421 px | 17 448 px | 17 415 px |

Objetivos táctiles por debajo de 44 px:
- el logo (18–36 px de alto);
- el enlace "Pregúntame" (28 px);
- las casillas de consentimiento (20 px, aunque su etiqueta también es pulsable).

Los enlaces dentro de un texto, como "política de privacidad", están exentos por WCAG 2.5.8.

| Sección | Observación móvil |
|---|---|
| **Navbar** | Logo + botón granate + menú: demasiado para 375 px. Poco elegante. |
| **Hero** | La imagen ocupa el 58 % del alto; el titular y el CTA quedan abajo; no hay CTA en el primer pantallazo (salvo el de la cabecera). |
| **Manifiesto** | Funciona bien: gran declaración y mucho aire. |
| **Sobre mí** | La imagen a sangre funciona; los 3 principios en columnas se aprietan ("Tu cuerpo" se parte). |
| **Entrenamientos** | Imagen a sangre + texto: buen ritmo. El efecto al pasar el ratón es decorativo, así que en táctil no se pierde nada. |
| **45 m²** | A 375 px el "45" mide unos 176 px: el momento visual principal podría tener más escala. |
| **Cómo trabajo** | La línea y los números funcionan; se lee como una historia. |
| **Online** | Vídeo 4:5 a sangre y carrusel de tarjetas sin indicación de posición: no queda claro que se puede deslizar. |
| **Tarifas** | Filas limpias, lectura correcta. |
| **FAQ** | Limpio; objetivos táctiles de 72 px. |
| **Contacto** | Formulario legible. El mensaje tras enviar suena a demo técnica. |
| **Footer** | La firma grande funciona a 38 px. |
| **CTA fijo** | Barra de ancho completo, pesada. |

---

## 3. Problemas encontrados

1. **P0:** CTA del hero fuera del primer pantallazo en móvil.
2. **P0:** cabecera móvil saturada; el logo se parte a 375 px.
3. **P0:** los vídeos en bucle (cuando lleguen) no tienen control de pausa. WCAG 2.2.2 lo exige para movimiento automático de más de 5 s.
4. **P0:** mensajes de formulario con lenguaje de demo ("Esto es una demo…").
5. **P1:** CTA fijo móvil pesado (barra de ancho completo).
6. **P1:** principios de "Sobre mí" apretados en 3 columnas.
7. **P1:** el "45" puede ganar escala y un gesto propio.
8. **P1:** objetivos táctiles pequeños (logo, "Pregúntame").
9. **P1:** la navegación no indica en qué sección estás.
10. **P2:** el carrusel de entrenos no indica que se puede deslizar ni cuántos hay.
11. **P2:** sin WhatsApp confirmado, no hay ningún canal de contacto real. Instagram sí está confirmado y puede servir de puente.

---

## 4. Componentes candidatos

| Sección | Componente candidato | Biblioteca | Objetivo | Mobile | Rendimiento | ¿Implementar? |
|---|---|---|---|---|---|---|
| Hero | Revelado por líneas | Propio (Motion), concepto SplitText de React Bits | Entrada de "Empieza desde donde estás." | ✓ | Muy bajo | **Sí** (ya existe) |
| Hero | Animated Button | Vengeance UI (adaptado) | CTA con respuesta refinada | ✓ solo pulsación | Bajo | **Sí, adaptado** |
| Hero | Revelado de imagen o vídeo | Propio (Motion) | Presentar a Verónica | ✓ | Bajo | **Sí** (ya existe) |
| Hero | Indicador de scroll | — | Invitar a bajar | Innecesario: el contenido ya asoma | — | **No** |
| Navbar | Menú móvil | Propio | Navegación limpia | ✓ | Bajo | **Sí, simplificado** |
| Navbar | Estado de sección activa | Propio (IntersectionObserver) | Orientación | ✓ en el menú | Muy bajo | **Sí** |
| Navbar | Transiciones del menú | Motion | Continuidad | ✓ | Bajo | **Sí** (ya existe) |
| About | Revelado de imagen | Propio | Protagonismo de la foto | ✓ | Bajo | **Sí** |
| About | Composición editorial | — | Aire, relato corto | ✓ | — | **Sí, principios apilados en móvil** |
| Entrenamientos | Image Reveal List | Vengeance UI | Lista con miniatura al pasar el ratón | ✗ depende del ratón | Bajo | **No** |
| Entrenamientos | Hover Members | Skiper UI (skiper6) | Nombres con imagen y cursor | ✗ depende del ratón y del cursor | Medio | **No** |
| Entrenamientos | Bloques expandibles | — | Más detalle | Añade toques sin contenido que mostrar | — | **No** (no hay datos) |
| Entrenamientos | Secciones editoriales alternas | Propio | Ritmo visual | ✓ | — | **Sí** (ya existe) |
| 45 m² | Animated Number | Vengeance UI (cifras que giran, adaptado) | Gesto propio del "45" | ✓ | Bajo | **Sí** |
| 45 m² | Revelado de tipografía grande | Propio | "Pocas personas. Toda la atención." | ✓ | Muy bajo | **Sí** |
| 45 m² | Composición ligada al scroll | Propio (ScrollSettle) | La foto de la sala se asienta | ✓ | Bajo | **Sí** (ya existe) |
| Cómo trabajo | Timeline + línea de progreso | Propio | Historia que acompaña al scroll | ✓ | Bajo | **Sí** (ya existe) |
| Cómo trabajo | Transición de números | Propio | Encender cada paso | ✓ | Muy bajo | **Sí** (ya existe) |
| Online | Control del vídeo | Propio | Pausa/reproducción accesible | ✓ | Muy bajo | **Sí** |
| Online | Tarjetas de entreno | Propio (concepto FFITCOCO) | Vista previa de la plataforma | ✓ carrusel | Bajo | **Sí** + indicador de posición |
| Online | Botón animado en la lista de espera | Propio | Coherencia de los CTA | ✓ | Bajo | **Sí** |
| Tarifas | Bloques expandibles | — | Detalle por tarifa | Sin datos todavía | — | **No por ahora** (queda preparado en los datos) |
| FAQ | FAQ Accordion | Vengeance UI | Acordeón | ✓ | — | **No**: el nuestro es equivalente y ya es accesible |
| CTA final | Animated Button | Propio | Cierre | ✓ | Bajo | **Sí** |
| Global | Magnet | React Bits | Botón magnético | ✗ no existe en táctil | Bajo | **No** |
| Global | Brillo en bucle | Vengeance UI | Brillo del botón | Animación constante | Bajo | **No** |
| Global | Cursor seguidor | Skiper UI | Efecto de cursor | ✗ | Medio | **No** |
| Global | Anime.js | anime.js | Timelines y SVG | — | +JS | **No**: Motion cubre todo lo necesario |

---

## 5. Componentes recomendados

1. **`RollButton`** (Animated Button de Vengeance, adaptado):
   - **Al pasar el ratón o con el foco del teclado:** el texto sube y una copia entra desde abajo. Ocurre una vez, en 450 ms.
   - **Al pulsar (también en táctil):** el botón se hunde un poco con un muelle, como en el original (escala 0,97; rigidez 500, amortiguación 30).
   - **Sin brillo en bucle.** Solo en CSS, sin JavaScript adicional.
2. **`OdometerNumber`** (Animated Number de Vengeance, adaptado): las cifras del "45" giran una sola vez al entrar en pantalla, con escalonado y sin rebote. El lector de pantalla lee "45 metros cuadrados".
3. **`useActiveSection`**: marca la sección visible en la navegación de escritorio y en el menú móvil.
4. **CTA flotante móvil**: una píldora compacta centrada, en lugar de la barra de ancho completo.
5. **`VideoToggle`**: botón de pausa/reproducción discreto sobre cualquier vídeo en bucle, solo cuando hay vídeo.
6. **Indicador del carrusel** ("1 / 3") en las tarjetas online en móvil.

---

## 6. Componentes descartados (y por qué)

| Componente | Motivo |
|---|---|
| Image Reveal List (Vengeance) | Solo funciona con ratón; curva con rebote |
| Hover Members + cursor (Skiper 6) | Depende del ratón y del cursor; efecto por efecto |
| Magnet (React Bits) | No existe en táctil; en escritorio se lee como truco |
| Brillo en bucle del Animated Button | Animación constante |
| FAQ Accordion (Vengeance) | No aporta nada sobre el acordeón actual |
| Gooey text, Flip text, Glitch | Estética ajena a la marca |
| Anime.js | Motion resuelve todos los casos; sería un segundo motor |
| Framer / Strauss | **Requiere iniciar sesión**: no se ha podido inspeccionar y no se usa como referencia |

---

## 7. Animaciones recomendadas

| Sección | Animación | Técnica | Objetivo |
|---|---|---|---|
| Hero | Máscara del medio + escala 1,1 → 1; líneas del titular | Motion | Portada que se "abre" |
| Todos los CTA principales | Texto que rueda (hover y foco) y muelle al pulsar | CSS | Microinteracción premium, táctil |
| Manifiesto | Palabras que se encienden con el scroll | Motion (ya existe) | Declaración de marca |
| Sobre mí / servicios | Revelado de imagen | Motion (ya existe) | Protagonismo de la foto |
| 45 m² | Cifras que giran + revelado de líneas | Motion | Momento visual principal |
| Cómo trabajo | Línea de progreso + números que se encienden | Motion (ya existe) | Historia al hacer scroll |
| Online | Entrada escalonada de tarjetas | Motion (ya existe) | Vista previa de la plataforma |
| FAQ | Altura con CSS, "+" que pasa a "−" | CSS (ya existe) | Respuesta directa a la acción |
| Menú móvil | Fundido + enlaces en cascada | Motion (ya existe) | Continuidad |
| CTA flotante | Entra desde abajo (transform) | CSS | Aparece cuando hace falta |

Todas se ejecutan una vez, solo animan `transform`, `opacity` o `clip-path`, y respetan `prefers-reduced-motion`.

## 8. Animaciones descartadas

Brillo en bucle, rebotes, giros, glitch, partículas, parallax grande, cursores, marquesinas, contadores de cifras inventadas y *smooth scroll* con secuestro del scroll.

---

## 9. Cambios de composición

- **Hero móvil:** imagen a sangre al 48 % del alto. En móvil el orden pasa a ser nombre → titular → CTA → texto, para que **el CTA entre en el primer pantallazo**. En escritorio no cambia.
- **Cabecera móvil:** solo logo en una línea y botón "Menú". El CTA pasa a la píldora flotante y al hero.
- **Sobre mí:** principios apilados en filas en móvil (título a la izquierda, texto a la derecha).
- **45 m²:** "45" a unos 230 px en móvil, con el m² como superíndice y las dos líneas debajo.

---

## 10. Cambios por sección

| Bloque | Sección | Cambio | Prioridad |
|---|---|---|---|
| 1 | Navbar | Móvil limpio (logo + "Menú"), objetivo táctil del logo, sección activa, CTA flotante compacto | P0 / P1 |
| 1 | Hero | CTA en el primer pantallazo en móvil, `RollButton`, control de vídeo | P0 |
| 2 | Sobre mí | Principios apilados en móvil | P1 |
| 2 | Entrenamientos | `RollButton` no aplica (son enlaces de texto); se revisan los objetivos táctiles | P2 |
| 3 | 45 m² | `OdometerNumber`, escala móvil | P1 |
| 3 | Cómo trabajo | `RollButton` en "Dar el primer paso" | P1 |
| 4 | Online | Control de vídeo, indicador del carrusel, `RollButton` en la lista de espera, mensajes sin lenguaje de demo | P0 / P2 |
| 4 | Tarifas | Sin cambios de estructura | — |
| 5 | FAQ | "Pregúntame" con objetivo táctil de 44 px | P1 |
| 5 | CTA final | `RollButton`, mensaje de envío elegante, Instagram como canal real | P0 / P2 |
| 5 | Footer | Sin cambios | — |
| 6 | Global | Prueba en 375, 390, 430, 1280, 1440 y 1920; movimiento reducido; tests | P0 |

## 11. Prioridad

- **P0 (imprescindible):**
  - CTA del hero visible en móvil;
  - cabecera móvil limpia;
  - control de pausa en vídeos;
  - mensajes de formulario sin lenguaje de demo.
- **P1 (importante):**
  - CTA flotante compacto;
  - `RollButton`;
  - `OdometerNumber`;
  - sección activa;
  - principios apilados;
  - objetivos táctiles.
- **P2 (mejora):**
  - indicador del carrusel;
  - Instagram como canal de contacto mientras no haya WhatsApp;
  - revisión del peso de JavaScript (173 KB comprimidos en total, pendiente de optimizar).

## 12. Plan de implementación

Por bloques, con capturas en móvil y escritorio y pruebas tras cada uno:

1. **Bloque 1:** Mobile / Navbar / Hero (`RollButton`, CTA flotante, sección activa, control de vídeo).
2. **Bloque 2:** Sobre mí / Entrenamientos.
3. **Bloque 3:** 45 m² (`OdometerNumber`) / Cómo trabajo.
4. **Bloque 4:** Online / Tarifas (indicador del carrusel, mensajes).
5. **Bloque 5:** FAQ / CTA final / Footer.
6. **Bloque 6:** microinteracciones y detalles finales; pruebas en 375, 390, 430, 1280, 1440 y 1920; movimiento reducido; tests.

**Límites que se mantienen:** no se inventa información, no se añaden dependencias y el copy solo cambia donde elimina lenguaje de demo.

---

## 13. Resultado de la implementación

| Bloque | Implementado | Verificación |
|---|---|---|
| 1 | Cabecera móvil limpia (logo en una línea y botón "Menú"), `RollButton`, CTA flotante compacto, sección activa (`aria-current`), CTA del hero en el primer pantallazo, control de pausa de vídeo | CTA visible en 375, 390 y 430 (pruebas automáticas); vídeo de prueba temporal: carga tras `load`, pausa, se mantiene pausado al hacer scroll, sin descarga con movimiento reducido ni ahorro de datos |
| 2 | Principios de "Sobre mí" en filas en móvil | Capturas en 390 |
| 3 | `OdometerNumber` en "45 m²" (cifras en `::before`: el texto del H2 queda limpio), "45" más grande en móvil, líneas sin cortes en escritorio | HTML prerenderizado: "45 metros cuadrados. Pocas personas. Toda la atención." |
| 4 | Indicador "1 / 3" en el carrusel online, mensajes de formulario sin lenguaje de demo (siguen siendo honestos: no se envía nada) | Pruebas del formulario |
| 5 | Instagram como canal real en el cierre; "Pregúntame" y enlaces de texto con objetivo táctil de 44 px | — |
| 6 | Token `--duration-ui` recuperado (algunas transiciones eran instantáneas), titular con tamaño máximo de 116 px (a 1920 se partía en 4 líneas) | 30 pruebas en verde; sin scroll horizontal ni errores de consola en 375, 390, 430, 1280, 1440 y 1920 |

**Queda pendiente:**
- los assets reales de Verónica;
- conectar el formulario y la lista de espera;
- reducir el peso de JavaScript (unos 173 KB comprimidos en total).
