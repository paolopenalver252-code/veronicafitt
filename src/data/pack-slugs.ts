/**
 * Slugs de los packs (URL /packs/<slug>). Archivo sin dependencias para que
 * react-router.config.ts pueda leerlo y prerenderizar cada ficha.
 * Para añadir un pack: añadir aquí su slug y su objeto en packs.ts
 * (TypeScript obliga a que coincidan).
 */
export const packSlugs = ["entrenamiento-personal", "grupos-reducidos", "online-en-directo"] as const;

export type PackSlug = (typeof packSlugs)[number];
