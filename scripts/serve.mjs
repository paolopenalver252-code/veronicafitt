// Servidor estático mínimo para revisar el build tal y como se desplegará (sin dependencias).
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = "build/client";
const absRoot = resolve(root);
const port = Number(process.env.PORT) || 4173;
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json",
};

// Las mismas redirecciones que Vercel (solo rutas exactas, conservando la query).
const redirects = JSON.parse(readFileSync("vercel.json", "utf8")).redirects ?? [];

createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  const redirect = redirects.find((r) => r.source === url.pathname);
  if (redirect) {
    res.writeHead(redirect.permanent ? 308 : 307, { location: redirect.destination + url.search });
    return res.end();
  }
  const path = normalize(decodeURIComponent(url.pathname));
  const candidates = [join(root, path), join(root, path, "index.html"), join(root, `${path}.html`)];
  // Nunca servir nada fuera de build/client
  const file = candidates.find((f) => resolve(f).startsWith(absRoot) && existsSync(f) && statSync(f).isFile());
  if (!file) {
    res.writeHead(404, { "content-type": types[".html"] });
    return createReadStream(join(root, "404.html")).pipe(res);
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Build servido en http://localhost:${port}`));
