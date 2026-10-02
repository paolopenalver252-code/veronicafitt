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
    for (const id of ["inicio", "manifiesto", "sobre-mi", "entrenamientos", "como-trabajo", "sala", "online", "packs", "preguntas", "contacto"]) {
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

  test("el vídeo del hero no compite con la carga inicial", async ({ page }) => {
    // Se pide solo después del evento load (en móvil, nunca: ver "Hero con vídeo vertical").
    let loaded = false;
    const early: string[] = [];
    page.on("load", () => (loaded = true));
    page.on("request", (r) => r.resourceType() === "media" && !loaded && early.push(r.url()));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(early).toEqual([]);
  });

  test("navegación por anclas", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "En móvil se prueba el menú");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Packs" }).click();
    await expect(page).toHaveURL(/#packs$/);
    await expect(page.locator("#packs-title")).toBeInViewport();
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

  test("formulario: validación, sin datos de salud y mensaje honesto", async ({ page }) => {
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
    await expect(form.getByRole("status")).not.toContainText("demo");
  });

  test("el CTA de un servicio preselecciona el formulario", async ({ page }) => {
    await page.goto("/#entrenamientos");
    await page.getByRole("link", { name: "Preguntar por los grupos" }).click();
    await expect(page.locator("#contacto form").getByLabel("¿Qué te interesa?")).toHaveValue("grupos");
  });
});

test.describe("Entrena conmigo", () => {
  test("filtros sincronizados con la URL", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/entrena-conmigo");
    await expect(page.locator("h1")).toHaveCount(1);
    const status = page.locator("#entrenos-title").locator("xpath=../..").getByRole("status");
    await expect(status).toHaveText("6 entrenamientos");
    await page.getByRole("group", { name: "Nivel" }).getByRole("button", { name: "Avanzado" }).click();
    await expect(page).toHaveURL(/nivel=avanzado/);
    await expect(status).toHaveText("1 entrenamiento");
    await page.goto("/entrena-conmigo?tipo=movilidad");
    await expect(status).toHaveText("1 entrenamiento");
    expect(errors).toEqual([]);
  });

  test("presenta el directo, las grabaciones y el pack, sin compras reales", async ({ page }) => {
    await page.goto("/entrena-conmigo");
    await expect(page.locator("h1")).toContainText("Entrena conmigo");
    await expect(page.getByText("No estás siguiendo un vídeo.", { exact: false })).toBeVisible();
    for (const id of ["en-directo", "sesiones-grabadas", "pack-online", "aviso"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
      await expect(page.getByRole("navigation", { name: "En esta página" }).locator(`a[href="#${id}"]`)).toHaveCount(1);
    }
    await expect(page.locator("#pack-online").getByText("Próximamente").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /comprar/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /comprar/i })).toHaveCount(0);
  });

  test("/online redirige a /entrena-conmigo conservando los filtros", async ({ page }) => {
    await page.goto("/online?tipo=movilidad");
    await expect(page).toHaveURL(/\/entrena-conmigo\?tipo=movilidad$/);
    await expect(page.locator("#entrenos-title").locator("xpath=../..").getByRole("status")).toHaveText("1 entrenamiento");
  });

  test("«Online» sigue llevando a la sección de la home y «Entrena conmigo» a su página", async ({ page }, info) => {
    await page.goto("/");
    const footer = page.getByRole("navigation", { name: "Secciones" });
    await expect(footer.getByRole("link", { name: "Online" })).toHaveAttribute("href", "#online");
    await expect(footer.getByRole("link", { name: "Entrena conmigo" })).toHaveAttribute("href", "/entrena-conmigo");

    if (isMobile(info.project.name)) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
      const menu = page.getByRole("dialog", { name: "Menú" });
      await expect(menu.getByRole("list").first().getByRole("link")).toHaveText(["Sobre mí", "Presencial", "Online", "Entrena conmigo", "Packs", "Cómo trabajo", "Preguntas"]);
      await menu.getByRole("link", { name: "Entrena conmigo" }).click();
    } else {
      const nav = page.getByRole("navigation", { name: "Principal" });
      await expect(nav.getByRole("link")).toHaveText(["Sobre mí", "Presencial", "Online", "Entrena conmigo", "Packs", "Cómo trabajo", "Preguntas"]);
      await nav.getByRole("link", { name: "Online" }).click();
      await expect(page).toHaveURL(/#online$/);
      // Al bajar hasta la sección, la cabecera se oculta (comportamiento previsto): se vuelve arriba.
      await page.goto("/");
      await nav.getByRole("link", { name: "Entrena conmigo" }).click();
    }
    await expect(page).toHaveURL(/\/entrena-conmigo$/);
    await expect(page.locator("h1")).toContainText("Entrena conmigo");
    if (!isMobile(info.project.name)) {
      await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Entrena conmigo" })).toHaveAttribute("aria-current", "page");
    }

    await page.goto("/#entrenamientos");
    await page.locator("#entrenamientos").getByRole("link", { name: "Entrena conmigo" }).click();
    await expect(page).toHaveURL(/\/entrena-conmigo$/);
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

  await page.goto("/?notas=1#packs");
  await expect(page.locator("html")).toHaveAttribute("data-notes", "on");
  await expect(page.locator("#packs").getByText("Pendiente de confirmar:").first()).toBeVisible();

  await page.getByRole("button", { name: "Ocultar notas internas" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-notes", "on");
  await page.goto("/");
  await expect(page.getByText("Pendiente de confirmar:").first()).toBeHidden();
});

test("paleta alternativa para comparar", async ({ page }) => {
  await page.goto("/?paleta=granate");
  await expect(page.locator("html")).toHaveAttribute("data-palette", "granate");
  await page.goto("/?paleta=verde");
  await expect(page.locator("html")).not.toHaveAttribute("data-palette", /.+/);
});

test.describe("Mobile-first", () => {
  for (const [width, height] of [[375, 812], [390, 844], [430, 932]] as const) {
    test(`${width}×${height}: CTA del hero en el primer pantallazo y cabecera limpia`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true });
      const page = await context.newPage();
      await page.goto("/");
      const cta = page.locator("#inicio").getByRole("link", { name: "Escríbeme" });
      await expect(cta).toBeInViewport();
      const box = await cta.boundingBox();
      expect(box!.y + box!.height).toBeLessThanOrEqual(height);
      await expect(page.locator("header").getByRole("link", { name: "Escríbeme" })).toBeHidden();
      await context.close();
    });
  }
});

test.describe("Packs", () => {
  test("la home lista los packs desde los datos, sin pagos simulados", async ({ page }) => {
    await page.goto("/#packs");
    const section = page.locator("#packs");
    await expect(section.getByRole("article")).toHaveCount(3);
    await expect(section.getByRole("link", { name: "Solicitar este pack" })).toHaveCount(2);
    await expect(section.getByRole("link", { name: "Avísame cuando empiece" })).toHaveCount(1);
    await expect(section.getByText(/Comprar pack/)).toHaveCount(0);
  });

  test("cada ficha de pack existe y su CTA prepara el formulario", async ({ page }) => {
    for (const slug of ["entrenamiento-personal", "grupos-reducidos", "online-en-directo"]) {
      const res = await page.goto(`/packs/${slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    }
    await page.goto("/packs/grupos-reducidos");
    await page.locator("article").first().getByRole("link", { name: "Solicitar este pack" }).click();
    await expect(page).toHaveURL(/\/#contacto$/);
    const form = page.locator("#contacto form");
    await expect(form.getByLabel("¿Qué te interesa?")).toHaveValue("grupos");
    await expect(form.getByLabel("Mensaje (opcional)")).toHaveValue(/Grupos reducidos/);
  });

  test("un pack inexistente muestra la página de error", async ({ page }) => {
    await page.goto("/packs/no-existe");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta página no existe.");
  });
});

test.describe("Hero con vídeo vertical", () => {
  for (const [label, width, height] of [["escritorio", 1440, 900], ["tablet", 820, 1180]] as const) {
    test(`${label}: marco 9:16 sin deformar, con alternativa visible y CTA en pantalla`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage();
      await page.goto("/");
      const media = page.locator("[data-hero-media]");
      const box = await media.boundingBox();
      // Misma proporción que el Reel: el vídeo nunca se recorta ni se estira.
      expect(box!.width / box!.height).toBeCloseTo(9 / 16, 2);
      await expect(media.locator('img, [role="img"]').filter({ visible: true })).toHaveCount(1);
      await expect(page.locator("#inicio").getByRole("link", { name: "Escríbeme" })).toBeInViewport();
      await context.close();
    });
  }

  test("móvil: el hero de siempre, a sangre, con el vídeo después de la carga", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    let loaded = false;
    const early: string[] = [];
    page.on("load", () => (loaded = true));
    page.on("request", (r) => r.resourceType() === "media" && !loaded && early.push(r.url()));
    await page.goto("/", { waitUntil: "networkidle" });
    const box = await page.locator("[data-hero-media]").boundingBox();
    expect(Math.round(box!.width)).toBe(390);
    await expect(page.locator("[data-hero-media] img")).toBeVisible();
    expect(early).toEqual([]);
    await context.close();
  });
});

test("móvil: las imágenes respiran (margen lateral) sin cambiar en escritorio", async ({ browser }) => {
  const edges = async (width: number) => {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto("/");
    const box = await page.locator("#sobre-mi .media-inset").first().boundingBox();
    await context.close();
    return { left: Math.round(box!.x), right: Math.round(width - box!.x - box!.width) };
  };
  expect(await edges(390)).toEqual({ left: 20, right: 20 });
  expect((await edges(820)).left).toBe(0);
});

test("la cabecera de escritorio cabe entera (7 enlaces + botón) desde 1024 px", async ({ browser }) => {
  for (const width of [1024, 1100, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await context.newPage();
    await page.goto("/");
    const cta = await page.locator("header").getByRole("link", { name: "Escríbeme" }).boundingBox();
    expect(cta!.x + cta!.width, `botón a ${width}px`).toBeLessThanOrEqual(width);
    const links = page.getByRole("navigation", { name: "Principal" }).getByRole("link");
    for (const box of await links.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height))) expect(box).toBeLessThan(50);
    await context.close();
  }
});

test("sin scroll horizontal en móvil, tablet y escritorio", async ({ browser }) => {
  for (const width of [375, 820, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const path of ["/", "/entrena-conmigo", "/packs/online-en-directo"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} a ${width}px`).toBe(0);
    }
    await context.close();
  }
});

test.describe("Online → Packs", () => {
  test("la sesión en directo se explica y lleva a los packs", async ({ page }) => {
    await page.goto("/#online");
    const section = page.locator("#online");
    await expect(section.getByText("En directo", { exact: true }).first()).toBeVisible();
    await expect(section.locator("ol > li")).toHaveCount(4);
    await expect(section.getByText("Estás entrenando conmigo.", { exact: false })).toBeVisible();
    await section.getByRole("link", { name: "Ver los packs" }).click();
    await expect(page).toHaveURL(/#packs$/);
    await expect(page.locator("#packs-title")).toBeInViewport();
  });

  test("cada pack muestra para quién es antes del precio", async ({ page }) => {
    await page.goto("/#packs");
    const cards = page.locator("#packs article");
    for (let i = 0; i < 3; i++) {
      await expect(cards.nth(i).getByText("Para quién")).toBeVisible();
      await expect(cards.nth(i).getByText("Precio", { exact: true })).toBeVisible();
    }
    await expect(cards.nth(2).getByText("Online en directo", { exact: true })).toBeVisible();
  });
});
