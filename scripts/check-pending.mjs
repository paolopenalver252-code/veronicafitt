// Lista todos los datos pendientes de confirmar (llamadas a pending("...")).
// --strict: termina con error si queda alguno (lo usa build:production).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const strict = process.argv.includes("--strict");
const root = "src";
const found = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|tsx)$/.test(name) && !path.endsWith(join("lib", "pending.ts"))) {
      readFileSync(path, "utf8")
        .split("\n")
        .forEach((line, i) => {
          for (const m of line.matchAll(/pending\(\s*[`"']([^`"']+)[`"']/g)) {
            found.push({ file: relative(".", path), line: i + 1, note: m[1] });
          }
        });
    }
  }
}

walk(root);

const byFile = Object.groupBy(found, (f) => f.file);
for (const [file, items] of Object.entries(byFile)) {
  console.log(`\n${file}`);
  for (const item of items) console.log(`  ${String(item.line).padStart(4)}  ${item.note}`);
}
console.log(`\n${found.length} datos pendientes de confirmar.`);

if (strict && found.length > 0) {
  console.error("Build de producción bloqueado: quedan datos pendientes. Usa `npm run build` para la demo.");
  process.exit(1);
}
