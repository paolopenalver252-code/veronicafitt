# Verónica Calabuch — web

Marca personal de entrenamiento + base para la futura plataforma online.
Plan completo: [docs/PLAN-FASE-1.md](docs/PLAN-FASE-1.md).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo con recarga en caliente |
| `npm run build` | Build de **demo** (con notas de revisión) en `build/client` |
| `npm run preview` | Sirve el build en http://localhost:4173 |
| `npm run typecheck` | Comprobación de TypeScript |
| `npm run test:e2e` | Pruebas de humo con Playwright (escritorio y móvil) |
| `npm run check:pending` | Lista todos los datos pendientes de confirmar |
| `npm run build:production` | Build final: **se bloquea si queda algún pendiente** y oculta las notas |

## Dónde se edita cada cosa

- **Textos de la home**: `src/data/home.ts`
- **Contacto, redes, navegación**: `src/data/site.ts` (al poner el número de WhatsApp, todos los CTA pasan a WhatsApp con mensaje prerrellenado)
- **Fotos y vídeos**: `src/data/media.ts` + archivos en `public/assets/veronica/` (ver su README)
- **Online (ejemplos)**: `src/data/online.ts`
- **Colores, tipografía, espaciado**: `src/styles/app.css` (bloque `@theme`)
- **Conexión de formularios**: `src/lib/contact.ts`

Los datos no confirmados se escriben con `pending("qué falta")`: nunca se inventan.

## Variables de entorno

Ver `.env.example`. `VITE_SITE_URL` (dominio, pendiente) activa canonical, `og:url`, `og:image` y `sitemap.xml`.

## Despliegue

Vercel lee `vercel.json` (build, carpeta de salida y cabeceras de seguridad).
