import { test, expect } from "@playwright/test";

test.describe("home + i18n", () => {
  test("root redirige a /es y renderiza el hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /estrategia correcta/i,
    );
  });

  test("/en renderiza en inglés", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /right strategy/i,
    );
  });

  test("el switcher lleva ES → EN (desktop)", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile",
      "en desktop el switcher está en la barra",
    );
    await page.goto("/es");
    await page
      .locator("header")
      .getByRole("group", { name: /idioma|language/i })
      .getByRole("link", { name: "en", exact: true })
      .click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("el menú móvil abre y navega (mobile)", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile",
      "solo aplica en viewport móvil",
    );
    await page.goto("/es");
    await page.getByRole("button", { name: /abrir menú/i }).click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Sectores" })).toBeVisible();
  });
});

test.describe("secciones", () => {
  test("el acordeón de sectores abre y muestra el caso", async ({ page }) => {
    await page.goto("/es");
    await page.getByRole("button", { name: /Retail/ }).click();
    await expect(
      page.locator("#sectores").getByText(/grupo papelero/i),
    ).toBeVisible();
  });
});

test.describe("formulario de contacto", () => {
  test("submit vacío muestra errores de validación", async ({ page }) => {
    await page.goto("/es");
    await page.getByRole("button", { name: /^Enviar mensaje$/ }).click();
    await expect(page.getByText(/Ingresa tu nombre/i)).toBeVisible();
    await expect(page.getByText(/correo electrónico válido/i)).toBeVisible();
  });

  test("submit válido muestra el estado de éxito (bypass Turnstile en dev)", async ({
    page,
  }) => {
    await page.goto("/es");
    await page.locator('input[name="nombre"]').fill("Prueba Cliente");
    await page.locator('input[name="email"]').fill("prueba@example.com");
    await page
      .locator('textarea[name="mensaje"]')
      .fill(
        "Mensaje de prueba E2E para verificar el flujo completo del formulario.",
      );
    await page.getByRole("button", { name: /^Enviar mensaje$/ }).click();
    await expect(
      page.getByRole("heading", { name: /Mensaje enviado/i }),
    ).toBeVisible({
      timeout: 15_000,
    });
  });
});
