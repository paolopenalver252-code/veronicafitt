// Tras el build: página 404 real para Vercel y sitemap si hay dominio definitivo.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const out = "build/client";
const url = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");

if (existsSync(`${out}/404/index.html`)) {
  copyFileSync(`${out}/404/index.html`, `${out}/404.html`);
  console.log("✓ 404.html");
}

if (url) {
  const routes = ["/", "/entrena-conmigo"];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${url}${r}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  writeFileSync(`${out}/sitemap.xml`, xml);
  const robots = readFileSync(`${out}/robots.txt`, "utf8");
  if (!robots.includes("Sitemap:")) writeFileSync(`${out}/robots.txt`, `${robots.trimEnd()}\n\nSitemap: ${url}/sitemap.xml\n`);
  console.log("✓ sitemap.xml");
} else {
  console.log("· Sin VITE_SITE_URL: no se genera sitemap.xml (dominio pendiente de confirmar)");
}
