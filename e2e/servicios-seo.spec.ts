import { test, expect } from "@playwright/test";
import { serviciosSeo } from "../src/content/servicios-seo";
import { capacidades } from "../src/content/capacidades";
import { routing } from "../src/i18n/routing";

test("el servicio y su menú caben a 375, 768, 1024 y 1440 px", async ({
  page,
}, testInfo) => {
  await page.goto("/en/article-69b-defense");
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const header = page.locator("body > header");
    const toggle = header.getByRole("button", {
      name: "Open menu",
      exact: true,
    });
    if (width < 1280) {
      await toggle.click();
      await expect(
        header.getByRole("link", { name: "Tax defense", exact: true }),
      ).toBeVisible();
      await expect(
        header.getByRole("link", { name: "en", exact: true }),
      ).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      ),
    ).toBe(false);
    const enlacesFuera = await header
      .locator("a:visible, button:visible")
      .evaluateAll((els) =>
        els.some((el) => {
          const box = el.getBoundingClientRect();
          return box.left < 0 || box.right > window.innerWidth;
        }),
      );
    expect(enlacesFuera).toBe(false);
    if (width < 1280) await page.keyboard.press("Escape");
    await page.screenshot({
      path: testInfo.outputPath(`servicio-${width}.png`),
      fullPage: false,
    });
  }
});

test("el contenido SEO conserva el alcance y las relaciones del plan", () => {
  expect(serviciosSeo).toHaveLength(12);
  expect(new Set(serviciosSeo.map((s) => s.id)).size).toBe(12);
  for (const servicio of serviciosSeo) {
    expect(routing.pathnames[servicio.slug.es]).toEqual(servicio.slug);
    expect(servicio.secciones.length).toBeGreaterThanOrEqual(2);
    expect(servicio.faq.length).toBeGreaterThanOrEqual(2);
    expect(servicio.serviciosRelacionados.length).toBeGreaterThanOrEqual(2);
    expect(servicio.serviciosRelacionados.length).toBeLessThanOrEqual(4);
    for (const id of servicio.serviciosRelacionados) {
      expect(serviciosSeo.some((s) => s.id === id && id !== servicio.id)).toBe(
        true,
      );
    }
    if (servicio.capacidadRelacionada) {
      expect(
        capacidades.areas.some((a) => a.id === servicio.capacidadRelacionada),
      ).toBe(true);
    }
    for (const locale of routing.locales) {
      expect(servicio.metaDescription[locale].length).toBeLessThanOrEqual(180);
      for (const seccion of servicio.secciones) {
        const palabras = seccion.parrafos
          .map((p) => p[locale])
          .join(" ")
          .trim()
          .split(/\s+/).length;
        expect(
          palabras,
          `${servicio.id}/${locale}/${seccion.titulo[locale]}`,
        ).toBeGreaterThanOrEqual(150);
        expect(palabras).toBeLessThanOrEqual(250);
      }
    }
  }
});

for (const servicio of serviciosSeo) {
  for (const locale of routing.locales) {
    test(`${locale}: ${servicio.id} publica contenido, metadata y schemas propios`, async ({
      page,
    }) => {
      const url = `/${locale}${servicio.slug[locale]}`;
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(url);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        servicio.titulo[locale],
      );
      await expect(page).toHaveTitle(
        `${servicio.titulo[locale]} · Pagaza Abogados Tributarios`,
      );
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toBeTruthy();
      const origin = new URL(canonical!).origin;
      expect(canonical).toBe(`${origin}${url}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        servicio.metaDescription[locale],
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        canonical!,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        servicio.titulo[locale],
      );
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
        "content",
        servicio.titulo[locale],
      );
      await expect(
        page.locator('meta[property="og:image"]').first(),
      ).toHaveAttribute("content", new RegExp(`/${locale}/opengraph-image`));
      const imageUrl = new URL(
        (await page
          .locator('meta[property="og:image"]')
          .first()
          .getAttribute("content"))!,
      );
      await expect(
        page.locator('meta[name="twitter:image"]').first(),
      ).toHaveAttribute("content", imageUrl.href);
      const imageResponse = await page.request.get(
        `${imageUrl.pathname}${imageUrl.search}`,
      );
      expect(imageResponse.status()).toBe(200);
      expect(imageResponse.headers()["content-type"]).toContain("image/png");
      const image = await imageResponse.body();
      expect(image.readUInt32BE(16)).toBe(1200);
      expect(image.readUInt32BE(20)).toBe(630);
      for (const alt of routing.locales) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${alt}"]`),
        ).toHaveAttribute("href", `${origin}/${alt}${servicio.slug[alt]}`);
      }
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
        "href",
        `${origin}/es${servicio.slug.es}`,
      );
      const schemas = await page
        .locator('article script[type="application/ld+json"]')
        .evaluate((el) => JSON.parse(el.textContent ?? "[]"));
      expect(schemas.map((s: { "@type": string }) => s["@type"])).toEqual([
        "Service",
        "BreadcrumbList",
        "FAQPage",
      ]);
      expect(schemas[0].url).toBe(canonical);
      expect(schemas[0].provider["@id"]).toBe(`${origin}/#organization`);
      expect(schemas[1].itemListElement[1].item).toBe(canonical);
      expect(schemas[2].mainEntity).toEqual(
        servicio.faq.map((f) => ({
          "@type": "Question",
          name: f.pregunta[locale],
          acceptedAnswer: { "@type": "Answer", text: f.respuesta[locale] },
        })),
      );
      const firstFaq = page.locator("article details").first();
      await firstFaq.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(firstFaq.locator("p")).toBeVisible();
      for (const id of servicio.serviciosRelacionados) {
        const relacionado = serviciosSeo.find((s) => s.id === id)!;
        await expect(
          page.locator("article nav").last().getByRole("link", {
            name: relacionado.titulo[locale],
            exact: true,
          }),
        ).toHaveAttribute("href", `/${locale}${relacionado.slug[locale]}`);
      }
      await expect(
        page
          .locator("article")
          .getByRole("link", {
            name: /agendar consulta|schedule a consultation/i,
          })
          .first(),
      ).toHaveAttribute("href", `/${locale}#contacto`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      ).toBe(false);
    });
  }
}

test("el selector conserva el servicio al cambiar ES → EN → ES", async ({
  page,
}, testInfo) => {
  await page.goto("/es/acuerdos-conclusivos-prodecon");
  const header = page.locator("body > header");
  if (testInfo.project.name === "mobile")
    await header.getByRole("button", { name: "Abrir menú" }).click();
  await header.getByRole("link", { name: "en", exact: true }).click();
  await expect(page).toHaveURL("/en/prodecon-settlement-agreements");
  if (testInfo.project.name === "mobile")
    await header.getByRole("button", { name: "Open menu" }).click();
  await header.getByRole("link", { name: "es", exact: true }).click();
  await expect(page).toHaveURL("/es/acuerdos-conclusivos-prodecon");
});

for (const locale of routing.locales) {
  test(`${locale}: la home enlaza los doce servicios desde Capacidades y el footer`, async ({
    page,
  }, testInfo) => {
    await page.goto(`/${locale}`);
    for (const servicio of serviciosSeo) {
      await expect(
        page
          .locator("#capacidades")
          .locator(`a[href="/${locale}${servicio.slug[locale]}"]`),
      ).toHaveCount(1);
      await expect(
        page
          .locator("footer")
          .locator(`a[href="/${locale}${servicio.slug[locale]}"]`),
      ).toHaveCount(1);
    }
    await page.evaluate(() => window.scrollTo(0, 600));
    const header = page.locator("body > header");
    if (testInfo.project.name === "mobile")
      await header
        .getByRole("button", { name: /abrir menú|open menu/i })
        .click();
    await header
      .getByRole("link", {
        name: locale === "es" ? "Defensa fiscal" : "Tax defense",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(`/${locale}${serviciosSeo[0].slug[locale]}`);
  });
}

test("el sitemap incluye 24 servicios con hreflang y sin fechas de build", async ({
  request,
  page,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect(xml).not.toContain("<lastmod>");
  const urls = await page.evaluate((xml) => {
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    return Array.from(doc.getElementsByTagName("url")).map((url) => ({
      loc: url.getElementsByTagName("loc")[0].textContent!,
      alternates: Array.from(
        url.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "link"),
      ).map((link) => ({
        locale: link.getAttribute("hreflang"),
        href: link.getAttribute("href"),
      })),
    }));
  }, xml);
  expect(urls).toHaveLength(33);
  expect(new Set(urls.map((url) => url.loc)).size).toBe(33);
  const origin = new URL(urls[0].loc).origin;
  for (const servicio of serviciosSeo) {
    for (const locale of routing.locales) {
      const entry = urls.find(
        (url) => url.loc === `${origin}/${locale}${servicio.slug[locale]}`,
      );
      expect(entry?.alternates).toEqual([
        { locale: "es", href: `${origin}/es${servicio.slug.es}` },
        { locale: "en", href: `${origin}/en${servicio.slug.en}` },
        { locale: "x-default", href: `${origin}/es${servicio.slug.es}` },
      ]);
    }
  }
});
