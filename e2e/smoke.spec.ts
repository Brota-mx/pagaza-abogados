import { test, expect, type Page } from "@playwright/test";

/** Baja lo suficiente para que el header cambie a su estado sólido y espera al re-render. */
async function bajar(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(page.locator("header").getByText("PAGAZA")).toBeVisible();
}

test.describe("puerta de entrada", () => {
  test("`/` no redirige: ofrece elegir idioma", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("link", { name: "Entrar", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Enter", exact: true }),
    ).toBeVisible();
  });

  test("ENTRAR abre el sitio completo en español", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Entrar", exact: true }).click();
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /estrategia correcta/i,
    );
  });

  test("ENTER abre el sitio completo en inglés", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Enter", exact: true }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /right strategy/i,
    );
  });

  test("con reduced-motion el logo se ve, no queda invisible", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const marca = page.locator(".animate-entrada-marca");
    await expect(marca).toBeVisible();
    // La animación de entrada arranca en opacity 0; con reduced-motion debe quedar en el estado
    // final, no atrapada en el inicial.
    await expect(marca).toHaveCSS("opacity", "1");
  });
});

test.describe("header de dos capas", () => {
  test("arriba solo muestra Inicio | Newsletter, sin hamburguesa", async ({
    page,
  }) => {
    await page.goto("/es");
    const header = page.locator("header");
    await expect(header.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Newsletter" }),
    ).toBeVisible();
    // Petición explícita del cliente: fuera el icono de tres líneas en la primera pantalla.
    await expect(header.getByRole("button", { name: /menú/i })).toHaveCount(0);
    await expect(header.getByText("PAGAZA")).toHaveCount(0);
  });

  test("al bajar aparece el menú completo", async ({ page }) => {
    await page.goto("/es");
    await bajar(page);
    await expect(page.locator("header").getByText("PAGAZA")).toBeVisible();
  });

  test("el menú móvil abre tras bajar", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "solo en viewport móvil");
    await page.goto("/es");
    await bajar(page);
    await page.getByRole("button", { name: /abrir menú/i }).click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "Experiencias" }),
    ).toBeVisible();
  });

  test("el switcher lleva ES → EN (desktop)", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "el switcher va en la barra");
    await page.goto("/es");
    await page
      .locator("header")
      .getByRole("group", { name: /idioma|language/i })
      .getByRole("link", { name: "en", exact: true })
      .click();
    await expect(page).toHaveURL(/\/en$/);
  });
});

test.describe("secciones", () => {
  test("están las 7 secciones que pidió el cliente, en orden", async ({
    page,
  }) => {
    await page.goto("/es");
    const ids = await page
      .locator("main > section")
      .evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual([
      "inicio",
      "compromiso",
      "servicios",
      "pilares",
      "capacidades",
      "sectores",
      "alianzas",
      "newsletter",
      "contacto",
    ]);
  });

  test("hay 12 sectores y sus casos están en el HTML aunque estén cerrados", async ({
    page,
  }) => {
    await page.goto("/es");
    await expect(page.locator("#sectores details")).toHaveCount(12);
    // La razón de haber dejado Radix: el contenido cerrado debe seguir siendo indexable.
    const html = await page.locator("#sectores").innerHTML();
    expect(html).toContain("12,000,000");
    expect(html).toContain("Energético");
    expect(html).toContain("Servicios Financieros");
  });

  test("un sector abre y muestra su caso", async ({ page }) => {
    await page.goto("/es");
    await page
      .locator("#sectores summary")
      .filter({ hasText: "Inmobiliario" })
      .click();
    await expect(
      page
        .locator("#sectores")
        .getByText(/12,000,000/)
        .first(),
    ).toBeVisible();
  });

  test("las 11 capacidades se despliegan", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("#capacidades details")).toHaveCount(11);
    const primera = page.locator("#capacidades details").first();
    await primera.locator("summary").click();
    await expect(primera.locator("p")).toBeVisible();
  });

  test("el nombre del socio ya no aparece", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("body")).not.toContainText("Alfonso");
  });
});

test.describe("páginas legales", () => {
  test("el aviso de privacidad abre en español", async ({ page }) => {
    await page.goto("/es/aviso-de-privacidad");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Aviso de Privacidad/i,
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  test("el aviso de privacidad abre en inglés con su URL traducida", async ({
    page,
  }) => {
    await page.goto("/en/privacy-notice");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Privacy Notice/i,
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("el aviso legal matiza las cifras de resultados", async ({ page }) => {
    await page.goto("/es/aviso-legal");
    await expect(page.locator("body")).toContainText(
      /no garantizan ni predicen/i,
    );
  });

  test("se llega al aviso desde el pie de página", async ({ page }) => {
    await page.goto("/es");
    await page
      .locator("footer")
      .getByRole("link", { name: /Aviso de Privacidad/i })
      .click();
    await expect(page).toHaveURL(/\/es\/aviso-de-privacidad$/);
  });
});

test.describe("formulario de contacto", () => {
  test("submit vacío muestra errores de validación", async ({ page }) => {
    await page.goto("/es");
    const form = page.locator("#contacto");
    await form.getByRole("button", { name: /^Enviar mensaje$/ }).click();
    await expect(form.getByText(/Ingresa tu nombre/i)).toBeVisible();
    await expect(form.getByText(/correo electrónico válido/i)).toBeVisible();
  });

  test("sin aceptar el aviso no envía", async ({ page }) => {
    await page.goto("/es");
    // Acotado a #contacto: el newsletter tiene su propio input[name="email"] y consentimiento.
    const form = page.locator("#contacto");
    await form.locator('input[name="nombre"]').fill("Prueba Cliente");
    await form.locator('input[name="email"]').fill("prueba@example.com");
    await form
      .locator('textarea[name="mensaje"]')
      .fill("Mensaje de prueba E2E con longitud suficiente para pasar Zod.");
    // A propósito NO se marca el checkbox de consentimiento.
    await form.getByRole("button", { name: /^Enviar mensaje$/ }).click();
    await expect(
      form.getByText(/Debes aceptar el Aviso de Privacidad/i),
    ).toBeVisible();
    await expect(
      form.getByRole("heading", { name: /Mensaje enviado/i }),
    ).toHaveCount(0);
  });

  test("submit completo muestra el estado de éxito", async ({ page }) => {
    await page.goto("/es");
    const form = page.locator("#contacto");
    await form.locator('input[name="nombre"]').fill("Prueba Cliente");
    await form.locator('input[name="email"]').fill("prueba@example.com");
    await form
      .locator('textarea[name="mensaje"]')
      .fill("Mensaje de prueba E2E para verificar el flujo completo.");
    await form.locator('input[name="consentimiento"]').check();
    await form.getByRole("button", { name: /^Enviar mensaje$/ }).click();
    await expect(
      form.getByRole("heading", { name: /Mensaje enviado/i }),
    ).toBeVisible({ timeout: 20_000 });
  });
});

test.describe("newsletter", () => {
  test("sin aceptar el aviso no suscribe", async ({ page }) => {
    await page.goto("/es");
    const seccion = page.locator("#newsletter");
    await seccion.locator('input[name="email"]').fill("prueba@example.com");
    await seccion.getByRole("button", { name: /Suscribirme/i }).click();
    await expect(
      seccion.getByText(/Debes aceptar el Aviso de Privacidad/i),
    ).toBeVisible();
  });

  test("suscripción válida confirma", async ({ page }) => {
    await page.goto("/es");
    const seccion = page.locator("#newsletter");
    await seccion.locator('input[name="email"]').fill("prueba@example.com");
    await seccion.locator('input[name="consentimiento"]').check();
    await seccion.getByRole("button", { name: /Suscribirme/i }).click();
    await expect(seccion.getByRole("status")).toBeVisible({ timeout: 20_000 });
  });
});
