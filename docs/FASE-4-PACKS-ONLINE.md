# Fase 4 — Packs, entrenamiento online en directo y paleta natural

Fecha: 25/09/2026 · Base: commit `19044fc` (fase 3), publicado en veronicafitt.vercel.app

---

## 1. Análisis del estado actual

| Área | Estado | Decisión |
|---|---|---|
| **Arquitectura** | React Router 7 prerenderizado; contenido en `src/data`; `pending()` para datos sin confirmar; notas internas ocultas por defecto | Se mantiene. Los packs se añaden como datos + rutas prerenderizadas |
| **Componentes** | `RollButton`, `ContactCta` (WhatsApp o formulario con el servicio preseleccionado), `Media` con huecos tonales, revelados, `OdometerNumber`, acordeón, menú móvil | Se reutilizan todos. Se crean `SectionHeading`, `PackCard`, `PackGrid`, `PurchaseButton` y `OnlineTraining` |
| **Tipografía** | Bodoni Moda (titulares) + Archivo (texto) | Se mantiene: encaja con "elegante, natural, cuidado" |
| **Paleta** | Granate + neutros fríos (provisional) | **Cambia a verde salvia + blanco roto + beige**, preferencia expresa de Verónica. El granate queda disponible en `?paleta=granate` |
| **Fotografías** | **No hay ninguna foto real** (ni en el repositorio ni en la web publicada) | Los huecos siguen preparados; la paleta se elige para armonizar con piel y luz natural y se valida cuando lleguen |
| **Online** | Planteado como vídeos grabados en packs ("próximamente") | **Pasa a entrenamiento online en directo + sesiones grabadas**, la nueva propuesta de Verónica |
| **Tarifas** | 3 filas con precio "A consultar" | **Se sustituyen por Packs**, generados desde datos y preparados para venta |
| **CTA** | "Escríbeme" → formulario (sin WhatsApp confirmado) | Se mantiene. Los packs añaden su propio CTA según cómo se compren |
| **Mobile** | CTA del hero en el primer pantallazo, píldora flotante, 30 pruebas | Se mantiene; los nuevos bloques se diseñan primero para 375–430 px |

---

## 2. Paleta: por qué este verde

Verónica pide colores neutros, elegancia, tonos suaves, verde, blanco roto y beige. Criterios:

- **El verde tiene que funcionar junto a la piel y la luz natural.** Un salvia oscuro y desaturado es casi complementario de los tonos cálidos de la piel: los hace resaltar sin competir. Un verde saturado ("de gimnasio") o uno pastel competirían con ella.
- **Beige gris (greige), no amarillo.** Así no amarillea las fotos ni parece papel viejo.
- **Blanco roto ligeramente cálido** de fondo; nunca blanco puro ni negro puro dominante.
- **Texto en grafito cálido**, no negro.

| Token | Hex | Uso |
|---|---|---|
| `tiza` (blanco roto) | `#F4F2ED` | Fondo principal |
| `tiza-deep` (beige claro) | `#EAE5DC` | Secciones alternas |
| `arena` (beige) | `#D9D0C3` | Huecos de imagen, detalles |
| `grafito` | `#2B2B27` | Texto |
| `piedra` | `#66625A` | Texto secundario |
| `acento` (verde salvia profundo) | `#48584A` | CTA, enlaces, estados |
| `acento-profundo` | `#2F3B31` | Sección de cierre |
| `acento-suave` | `#E3E7DE` | Etiquetas |
| `acento-claro` | `#C7D1C0` | Texto sobre verde profundo |

Todos los pares de texto se verifican con WCAG AA.

---

## 3. Arquitectura de la home (decisión UX)

La propuesta del brief se toma como base, con dos cambios razonados:

1. Hero
2. Propuesta de valor (manifiesto)
3. **Sobre Verónica, antes que en el brief**: la marca es ella; la confianza en la persona va antes que el catálogo.
4. Entrenamiento presencial (servicios) + la sala (45 m²)
5. **Entrenamiento online en directo** (nuevo)
6. **Packs** (nuevo): aquí convergen las dos vías, presencial y online
7. Cómo trabajo: responde a "¿y después de elegir, qué pasa?"
8. Testimonios (aparecen solos cuando haya reales)
9. Preguntas frecuentes (con preguntas del online)
10. Contacto / CTA final
11. Footer

**Recorrido de compra preparado:** Web → Pack (`/packs/:slug`) → Compra → Acceso / información para empezar.

---

## 4. Packs: arquitectura de venta sin pago ficticio

Cada pack es un objeto en `src/data/packs.ts` (nombre, resumen, descripción, qué incluye, precio, imagen, detalles, estado y **modo de compra**):

| `purchase.type` | Qué hace el botón | Cuándo |
|---|---|---|
| `contact` | "Solicitar este pack" → WhatsApp o formulario, con el pack indicado en el mensaje | **Hoy** |
| `external` | "Comprar pack" → enlace externo (p. ej. Stripe Payment Link) | Cuando Verónica tenga el enlace de pago |
| `checkout` | Checkout propio (futuro: Stripe + acceso) | Plataforma propia |

Añadir un pack = añadir un objeto al array y su slug en `src/data/pack-slugs.ts` (el tipo obliga a que coincidan). La ficha `/packs/:slug` se prerenderiza sola.

**No se inventan packs.** Los tres packs iniciales corresponden a los tres servicios confirmados (personal, grupos reducidos, online en directo). Lo que incluyen describe el servicio confirmado, no cantidades. Precio, número de sesiones, validez y nombre comercial quedan pendientes (notas internas).

---

## 5. Entrenamiento online en directo

- **Mensaje central:** "No estás siguiendo un vídeo. Estoy contigo."
- **Cuatro ideas:** en directo conmigo, técnica, motivación y "¿no puedes conectarte?" (grabación).
- **Para quién:** trabajo temprano, hijos, poco tiempo, preferencia por entrenar en casa.
- **Estado:** "Próximamente" (configurable en los datos). No se publica como disponible.
- **Pendiente, sin inventar:**
  - precio;
  - horarios (la idea de las 6:00 queda solo como nota interna);
  - sesiones por semana;
  - plataforma;
  - duración de las grabaciones;
  - sistema de membresía.

---

## 6. Qué se elimina o transforma (sin perder funcionalidad)

| Antes | Después |
|---|---|
| Sección "Tarifas" | Sección "Packs" (misma función, preparada para vender) |
| Sección online de vídeos grabados en la home | Sección de online en directo |
| `/online` como vista previa de una plataforma de vídeos | `/online`: el servicio en directo + la biblioteca de sesiones grabadas (vista previa) + packs online + lista de espera |
| Pack de ejemplo "Empieza en casa" | Eliminado: ahora los packs son los reales (pendientes de datos) |
| "Vídeos de unos 45 minutos" | Se retira del texto público: la duración de las grabaciones no está confirmada |

---

## 7. Jerarquía de CTA

| Nivel | Dónde | Estilo |
|---|---|---|
| 1. Escríbeme | Hero, cabecera, píldora móvil, cierre | Verde macizo |
| 2. Ver el pack | Tarjeta de pack | Enlace de texto |
| 3. Solicitar / comprar | Tarjeta de pack | Contorno (tres botones macizos seguidos se leían como tabla de precios) |
| 3. Solicitar / comprar | Ficha `/packs/:slug`, donde se decide | Verde macizo |

Mientras no haya precio, la tarjeta muestra «A consultar» (o «Próximamente» en el online).

---

## 8. Verificación (26/09/2026)

- `npm run typecheck` y `npm run build` sin errores; 9 rutas prerenderizadas.
- 36 pruebas de humo en verde (escritorio y Pixel 7).
- Recorrido de las 8 páginas públicas a 375 px y a 1440 px: sin overflow horizontal, sin errores de consola y sin enlaces internos ni anclas rotas.
- Las imágenes siguen siendo huecos tonales: **no hay fotos reales de Verónica en el proyecto**. Cuando lleguen, colocarlas en `public/assets/veronica/` y sustituir los `pending()` de `src/data/media.ts`; después, validar la paleta con ellas.
