import { index, route, type RouteConfig } from "@react-router/dev/routes";

/*
 * Rutas públicas (prerenderizadas). Futuras rutas de la plataforma, ver
 * docs/PLAN-FASE-1.md apartado 03: /online/entrenamientos, /online/packs/:slug,
 * /cuenta, /biblioteca.
 */
export default [
  index("routes/home.tsx"),
  route("online", "routes/online.tsx"),
  route("aviso-legal", "routes/aviso-legal.tsx"),
  route("privacidad", "routes/privacidad.tsx"),
  route("cookies", "routes/cookies.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
