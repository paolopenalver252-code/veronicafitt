import { defineConfig, devices } from "@playwright/test";

/** Pruebas de humo sobre el build estático (npm run build && npm run test:e2e). */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:4173" },
  webServer: { command: "node scripts/serve.mjs", port: 4173, reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
