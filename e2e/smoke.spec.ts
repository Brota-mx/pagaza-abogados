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
  test("arriba solo muestra Inicio | Newsletter | Equipo, sin hamburguesa", async ({
    page,
  }) => {
    await page.goto("/es");
    const header = page.locator("header");
    await expect(header.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Newsletter" }),
    ).toBeVisible();
    // "Equipo" se sumó en agosto de 2026, a petición del cliente, junto a Newsletter.
    await expect(header.getByRole("link", { name: "Equipo" })).toBeVisible();
    // Petición explícita del cliente: fuera el icono de tres líneas en la primera pantalla.
    await expect(header.getByRole("button", { name: /menú/i })).toHaveCount(0);
    await expect(header.getByText("PAGAZA")).toHaveCount(0);
  });

  test("la barra de portada no desborda en pantallas estrechas", async ({
    page,
  }) => {
    // Con tres enlaces + dos separadores + el selector de idioma, la barra iba justa. Playwright
    // da por "visible" un elemento que desborda, así que hay que MEDIRLO: la visibilidad sola no
    // habría detectado el scroll horizontal.
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/es");
    const desborda = await page
      .locator("header")
      .evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(desborda).toBe(false);
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
  test("están las secciones que pidió el cliente, en orden", async ({
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
      "equipo",
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

  test("el nombre del socio sólo aparece en la sección de equipo", async ({
    page,
  }) => {
    // El cliente pidió el 19-jul-2026 que su nombre no figurara "en contacto, sólo el despacho"
    // mientras definía la sección de equipo. En agosto confirmó la sección, así que el nombre
    // vuelve — pero SÓLO ahí: el contacto sigue siendo institucional, que era el fondo de la
    // petición. Antes este test comprobaba que no aparecía en ningún sitio.
    await page.goto("/es");
    await expect(page.locator("#equipo")).toContainText("Alfonso Pagaza");
    await expect(page.locator("#contacto")).not.toContainText("Alfonso");
    await expect(page.locator("footer")).not.toContainText("Alfonso");
  });

  test("las semblanzas del equipo siguen marcadas como provisionales", async ({
    page,
  }) => {
    // Trinquete deliberado: cuando el cliente entregue las semblanzas reales este test se pondrá
    // rojo y obligará a quitar el marcador a conciencia, en vez de que se quede olvidado en
    // producción pasando por texto real. Ver la regla dura en src/content/equipo.ts.
    await page.goto("/es");
    await expect(page.locator("#equipo")).toContainText("Texto provisional");
  });

  test("cada <li> cuelga de su propia lista", async ({ page }) => {
    await page.goto("/es");
    // `Reveal` metía un <div> entre <ul>/<ol> y sus <li> en Compromiso, Pilares y Alianzas:
    // HTML inválido que dejaba 15 ítems fuera de su lista y hacía que un lector de pantalla
    // anunciara "lista, 0 elementos" (auditoría del 1-ago-2026).
    const desconectados = await page.evaluate(
      () =>
        [...document.querySelectorAll("li")].filter(
          (li) => !["UL", "OL"].includes(li.parentElement?.tagName ?? ""),
        ).length,
    );
    expect(desconectados).toBe(0);
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

  test("el header nace sólido: sin hero navy detrás, nada de texto blanco", async ({
    page,
  }) => {
    await page.goto("/es/aviso-de-privacidad");
    // El wordmark solo se pinta en el estado sólido. Su ausencia significaba header transparente
    // con texto blanco sobre #F5F6F8 —contraste 1.08:1, invisible— hasta que el visitante bajaba.
    await expect(page.locator("header").getByText("PAGAZA")).toBeVisible();
  });

  test("los enlaces de sección del pie llevan a la home, no a un ancla muerta", async ({
    page,
  }) => {
    await page.goto("/es/aviso-legal");
    await page
      .locator("footer")
      .getByRole("link", { name: "Capacidades" })
      .click();
    await expect(page).toHaveURL(/\/es#capacidades$/);
    await expect(page.locator("#capacidades")).toBeInViewport();
  });
});

test.describe("rutas y datos estructurados", () => {
  test("una URL inexistente da el 404 del sitio, en su idioma", async ({
    page,
  }) => {
    // Sin el catch-all de [locale], la ruta moría en el router antes del layout y Next servía su
    // 404 interno en inglés, dejando not-found.tsx sin usar (auditoría del 1-ago-2026).
    const es = await page.goto("/es/ruta-que-no-existe");
    expect(es?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Página no encontrada/i,
    );

    await page.goto("/en/no-such-page");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Page not found/i,
    );
  });

  test("el JSON-LD declara las dos sedes", async ({ page }) => {
    await page.goto("/es");
    const crudo = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const datos = JSON.parse(crudo ?? "{}");
    expect(datos.address).toHaveLength(2);
    expect(JSON.stringify(datos.address)).toContain("Ciudad Juárez");
  });

  test("el JSON-LD publica el socio fundador y los perfiles sociales", async ({
    page,
  }) => {
    await page.goto("/es");
    const crudo = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const datos = JSON.parse(crudo ?? "{}");
    expect(datos.founder?.name).toBe("Alfonso Pagaza");
    // La semblanza de la sección es un marcador de posición: no debe filtrarse al dato estructurado.
    expect(datos.founder?.description).toBeUndefined();
    expect(datos.sameAs).toContain("https://www.instagram.com/pagaza_abogados");
  });
});

test.describe("redes sociales", () => {
  test("el footer enlaza sólo las redes con URL real", async ({ page }) => {
    await page.goto("/es");
    const footer = page.locator("footer");
    await expect(
      footer.locator('a[href*="instagram.com/pagaza_abogados"]'),
    ).toHaveCount(1);
    // Facebook y X aún no los ha pasado el cliente: no debe haber iconos muertos.
    await expect(footer.locator('a[href="#"]')).toHaveCount(0);
    await expect(footer.locator('a[href*="facebook"]')).toHaveCount(0);
  });
});

test.describe("formulario de contacto", () => {
  test("submit vacío muestra errores de validación", async ({ page }) => {
    await page.goto("/es");
    const form = page.locator("#contacto");
    // El captcha se monta cuando el formulario se acerca a pantalla, y hasta que resuelve el botón
    // sigue deshabilitado. Playwright da por "visible" un elemento fuera de pantalla y no desplaza
    // hasta poder pulsar, así que sin este scroll se queda esperando un botón que nunca se habilita.
    // Una persona no puede pulsar un botón que no ha visto: esto reproduce el gesto real.
    await form.scrollIntoViewIfNeeded();
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

  test('"Otro" cierra el desplegable de sector', async ({ page }) => {
    await page.goto("/es");
    const opciones = page.locator('#contacto select[name="sector"] option');
    await expect(opciones.last()).toHaveAttribute("value", "otro");
  });

  test('enviar con sector "Otro" no se cae en silencio', async ({ page }) => {
    // Éste es el guardián del fallo silencioso: si alguien añade una opción al desplegable sin
    // añadirla a SECTOR_IDS, el z.enum la rechaza, RHF no dispara el submit y el botón parece
    // muerto — sin ningún mensaje de error que lo delate.
    await page.goto("/es");
    const form = page.locator("#contacto");
    await form.locator('input[name="nombre"]').fill("Prueba Cliente");
    await form.locator('input[name="email"]').fill("prueba@example.com");
    await form.locator('select[name="sector"]').selectOption("otro");
    await form
      .locator('textarea[name="mensaje"]')
      .fill("Mensaje de prueba E2E con el sector Otro seleccionado.");
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
