import { index, route, type RouteConfig } from "@react-router/dev/routes";

/*
 * Rutas públicas (prerenderizadas). Futuras rutas de la plataforma, ver
 * docs/FASE-4-PACKS-ONLINE.md: compra (/packs/:slug → pago → acceso), /cuenta, /biblioteca.
 */
export default [
  index("routes/home.tsx"),
  route("entrena-conmigo", "routes/entrena-conmigo.tsx"),
  route("packs/:slug", "routes/pack.tsx"),
  route("aviso-legal", "routes/aviso-legal.tsx"),
  route("privacidad", "routes/privacidad.tsx"),
  route("cookies", "routes/cookies.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
