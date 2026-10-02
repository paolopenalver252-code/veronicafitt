import type { Config } from "@react-router/dev/config";
import { packSlugs } from "./src/data/pack-slugs";

/**
 * Web estática prerenderizada: cada ruta pública se genera como HTML en build
 * (SEO) y React hidrata en el cliente. Cuando llegue la plataforma online,
 * basta con activar `ssr: true` para las rutas privadas sin cambiar de stack.
 */
export default {
  appDirectory: "src",
  ssr: false,
  prerender: [
    "/",
    "/entrena-conmigo",
    ...packSlugs.map((slug) => `/packs/${slug}`),
    "/aviso-legal",
    "/privacidad",
    "/cookies",
    "/404",
  ],
} satisfies Config;
