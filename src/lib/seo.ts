import type { MetaDescriptor } from "react-router";
import { site } from "~/data/site";

type MetaInput = { title: string; description: string; path: string; noindex?: boolean };

/**
 * Meta por ruta. canonical, og:url y og:image solo se emiten cuando existe el
 * dominio definitivo (VITE_SITE_URL): nunca inventamos una URL.
 */
export function buildMeta({ title, description, path, noindex }: MetaInput): MetaDescriptor[] {
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: site.locale },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
  ];

  if (noindex) tags.push({ name: "robots", content: "noindex" });

  if (site.url) {
    const url = `${site.url}${path}`;
    tags.push(
      { tagName: "link", rel: "canonical", href: url },
      { property: "og:url", content: url },
      { property: "og:image", content: `${site.url}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    );
  }

  return tags;
}
