import { expect, test, type Page } from "@playwright/test";

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

const isMobile = (name: string) => name === "mobile";

test.describe("Home", () => {
  test("carga sin errores, con un único H1 y todas las secciones", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(/entrenadora personal/i);
    for (const id of ["inicio", "manifiesto", "sobre-mi", "entrenamientos", "como-trabajo", "sala", "online", "tarifas", "preguntas", "contacto"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page).toHaveTitle(/Verónica Calabuch/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{80,}/);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test("el contenido animado es visible con movimiento reducido", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const transform = await page.locator("#hero-title [data-motion]").first().evaluate((el) => getComputedStyle(el).transform);
    expect(transform).toBe("none");
    await context.close();
  });

  test("no descarga vídeo en la carga inicial", async ({ page }) => {
    const videos: string[] = [];
    page.on("request", (r) => r.resourceType() === "media" && videos.push(r.url()));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(videos).toEqual([]);
  });

  test("navegación por anclas", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "En móvil se prueba el menú");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Tarifas" }).click();
    await expect(page).toHaveURL(/#tarifas$/);
    await expect(page.locator("#tarifas-title")).toBeInViewport();
  });

  test("menú móvil accesible", async ({ page }, info) => {
    test.skip(!isMobile(info.project.name), "Solo móvil");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Menú" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();

    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.getByRole("dialog", { name: "Menú" }).getByRole("link", { name: "Preguntas" }).click();
    await expect(page.getByRole("dialog", { name: "Menú" })).toBeHidden();
    await expect(page).toHaveURL(/#preguntas$/);
    await expect(page.locator("#preguntas-title")).toBeInViewport();
  });

  test("acordeón de preguntas", async ({ page }) => {
    await page.goto("/#preguntas");
    const button = page.getByRole("button", { name: "¿Necesito experiencia para empezar?" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("region", { name: "¿Necesito experiencia para empezar?" })).toContainText("nivel actual");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("formulario: validación, sin datos de salud y aviso de demo", async ({ page }) => {
    await page.goto("/#contacto");
    const form = page.locator("#contacto form");
    await expect(form.getByText(/lesi[oó]n/i)).toHaveCount(1); // solo el aviso de no incluir información médica
    await form.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(form.getByText("Escribe tu nombre.")).toBeVisible();
    await expect(form.getByLabel("Nombre")).toBeFocused();

    await form.getByLabel("Nombre").fill("Prueba");
    await form.getByLabel("Email o teléfono").fill("prueba@example.com");
    await form.getByLabel("¿Qué te interesa?").selectOption("personal");
    await form.getByRole("checkbox").check();
    await page.waitForTimeout(3100); // antispam: envíos de menos de 3 s se descartan
    await form.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(form.getByRole("status")).toContainText("no se ha enviado");
  });

  test("el CTA de un servicio preselecciona el formulario", async ({ page }) => {
    await page.goto("/#entrenamientos");
    await page.getByRole("link", { name: "Preguntar por los grupos" }).click();
    await expect(page.locator("#contacto form").getByLabel("¿Qué te interesa?")).toHaveValue("grupos");
  });
});

test.describe("Online", () => {
  test("filtros sincronizados con la URL", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/online");
    await expect(page.locator("h1")).toHaveCount(1);
    const status = page.locator("#entrenos-title").locator("xpath=../..").getByRole("status");
    await expect(status).toHaveText("6 entrenamientos");
    await page.getByRole("group", { name: "Nivel" }).getByRole("button", { name: "Avanzado" }).click();
    await expect(page).toHaveURL(/nivel=avanzado/);
    await expect(status).toHaveText("1 entrenamiento");
    await page.goto("/online?tipo=movilidad");
    await expect(status).toHaveText("1 entrenamiento");
    expect(errors).toEqual([]);
  });

  test("no ofrece compras reales", async ({ page }) => {
    await page.goto("/online");
    await expect(page.getByRole("button", { name: /comprar/i })).toHaveCount(0);
    await expect(page.getByText("La compra todavía no está disponible.")).toBeVisible();
  });
});

test("rutas legales y 404", async ({ page }) => {
  for (const path of ["/aviso-legal", "/privacidad", "/cookies"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  const res = await page.goto("/esta-pagina-no-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta página no existe.");
});

test("vista de cliente sin notas internas; ?notas=1 las muestra", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Pendiente de confirmar:").first()).toBeHidden();
  await expect(page.getByText(/Foto pendiente|Vídeo pendiente/).first()).toBeHidden();
  await expect(page.getByRole("button", { name: "Ocultar notas internas" })).toHaveCount(0);

  await page.goto("/?notas=1#tarifas");
  await expect(page.locator("html")).toHaveAttribute("data-notes", "on");
  await expect(page.locator("#tarifas").getByText("Pendiente de confirmar:").first()).toBeVisible();

  await page.getByRole("button", { name: "Ocultar notas internas" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-notes", "on");
  await page.goto("/");
  await expect(page.getByText("Pendiente de confirmar:").first()).toBeHidden();
});

test("paleta alternativa para comparar", async ({ page }) => {
  await page.goto("/?paleta=cobalto");
  await expect(page.locator("html")).toHaveAttribute("data-palette", "cobalto");
  await page.goto("/?paleta=granate");
  await expect(page.locator("html")).not.toHaveAttribute("data-palette", /.+/);
});
