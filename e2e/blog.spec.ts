import { test, expect } from "@playwright/test";
import { blogPosts, getBlogPost } from "../src/content/blog";
import { blogRoutes } from "../src/content/blog/routes";
import { routing } from "../src/i18n/routing";
import { serviciosSeo } from "../src/content/servicios-seo";

const post = blogPosts[0];
const servicio = serviciosSeo.find(
  (entry) => entry.id === post.servicioRelacionado,
)!;
for (const locale of routing.locales) {
  test(
    locale + ": índice → artículo → servicio y metadata bilingüe",
    async ({ page }) => {
      test.setTimeout(60_000);
      const index = "/" + locale + "/blog";
      const url = index + "/" + post.slug[locale];
      expect((await page.goto(index))?.status()).toBe(200);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(index + "$"),
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "index, follow",
      );
      await page
        .locator("main")
        .getByRole("link", { name: post.titulo[locale], exact: true })
        .click();
      await expect(page).toHaveURL(url, { timeout: 30_000 });
      // La metadata SEO se comprueba sobre la respuesta completa, como la recibe un rastreador.
      // Next 15 en dev conserva temporalmente metadata de la ruta anterior tras navegación cliente.
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        post.titulo[locale],
      );
      await expect(page).toHaveTitle(
        post.titulo[locale] + " · Pagaza Abogados Tributarios",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      const canonical = (await page
        .locator('link[rel="canonical"]')
        .getAttribute("href"))!;
      const origin = new URL(canonical).origin;
      expect(canonical).toBe(origin + url);
      for (const alt of routing.locales) {
        await expect(
          page.locator('link[hreflang="' + alt + '"]'),
        ).toHaveAttribute(
          "href",
          origin + "/" + alt + "/blog/" + post.slug[alt],
        );
      }
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        post.metaDescription[locale],
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        canonical,
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
        "content",
        "article",
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        post.titulo[locale],
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, follow",
      );
      await expect(page.locator("main time")).toHaveCount(0);
      await expect(
        page.locator('meta[property="article:published_time"]'),
      ).toHaveCount(0);
      const schemas = await page
        .locator('article script[type="application/ld+json"]')
        .evaluate((el) => JSON.parse(el.textContent!));
      expect(schemas.map((s: { "@type": string }) => s["@type"])).toEqual([
        "Article",
        "BreadcrumbList",
      ]);
      expect(schemas[0].url).toBe(canonical);
      expect(schemas[0].author).toBeUndefined();
      expect(schemas[0].datePublished).toBeUndefined();
      expect(
        schemas[1].itemListElement.map((item: { item: string }) => item.item),
      ).toEqual([origin + "/" + locale, origin + index, canonical]);
      const imageUrl = new URL(
        (await page
          .locator('meta[property="og:image"]')
          .first()
          .getAttribute("content"))!,
      );
      await expect(
        page.locator('meta[name="twitter:image"]').first(),
      ).toHaveAttribute("content", imageUrl.href);
      const image = await page.request.get(imageUrl.pathname + imageUrl.search);
      expect(image.status()).toBe(200);
      const png = await image.body();
      expect(png.readUInt32BE(16)).toBe(1200);
      expect(png.readUInt32BE(20)).toBe(630);
      await expect(
        page
          .locator("main")
          .getByText(
            locale === "es" ? "Entrada de ejemplo" : "Sample article",
            { exact: true },
          ),
      ).toBeVisible();
      for (const seccion of post.secciones)
        for (const parrafo of seccion.parrafos)
          await expect(
            page.locator("main").getByText(parrafo[locale], { exact: true }),
          ).toBeVisible();
      await expect(
        page.locator("main").getByRole("link", {
          name:
            locale === "es" ? "Agendar consulta" : "Schedule a consultation",
        }),
      ).toHaveAttribute("href", "/" + locale + "#contacto");
      await page
        .locator("main")
        .getByRole("link", {
          name: servicio.titulo[locale],
          exact: true,
        })
        .click();
      await expect(page).toHaveURL(
        "/" + locale + (locale === "es" ? "/auditorias-sat" : "/sat-audits"),
      );
    },
  );

  test(
    locale + ": home enlaza el blog y rutas desconocidas devuelven 404",
    async ({ page }) => {
      await page.goto("/" + locale);
      await page
        .locator("footer")
        .getByRole("link", { name: "Blog", exact: true })
        .click();
      await expect(page).toHaveURL("/" + locale + "/blog");
      expect(
        (await page.goto("/" + locale + "/blog/no-existe"))?.status(),
      ).toBe(404);
      expect(
        (
          await page.goto(
            "/" + locale + "/blog/" + post.slug[locale === "es" ? "en" : "es"],
          )
        )?.status(),
      ).toBe(404);
    },
  );
}

test("selector conserva el post ES → EN → ES y el índice", async ({
  page,
}, info) => {
  await page.goto("/es/blog/" + post.slug.es);
  const header = page.locator("body > header");
  for (const locale of ["en", "es"] as const) {
    if (info.project.name === "mobile")
      await header
        .getByRole("button", { name: /abrir menú|open menu/i })
        .click();
    await header.getByRole("link", { name: locale, exact: true }).click();
    await expect(page).toHaveURL("/" + locale + "/blog/" + post.slug[locale]);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      post.titulo[locale],
    );
  }
  await page.goto("/es/blog");
  if (info.project.name === "mobile")
    await header.getByRole("button", { name: "Abrir menú" }).click();
  await header.getByRole("link", { name: "en", exact: true }).click();
  await expect(page).toHaveURL("/en/blog");
});

test("blog y menú caben a 375, 768, 1024 y 1440 px", async ({ page }, info) => {
  for (const path of ["/en/blog", "/en/blog/" + post.slug.en]) {
    await page.goto(path);
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const header = page.locator("body > header");
      if (width < 1280)
        await header.getByRole("button", { name: "Open menu" }).click();
      await expect(
        header.getByRole("link", { name: "Blog", exact: true }),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      expect(
        await header.locator("a:visible, button:visible").evaluateAll((els) =>
          els.some((el) => {
            const box = el.getBoundingClientRect();
            return box.left < 0 || box.right > innerWidth;
          }),
        ),
      ).toBe(false);
      if (width < 1280) await page.keyboard.press("Escape");
      if (width === 375 || width === 1440)
        await page.screenshot({
          path: info.outputPath(
            (path === "/en/blog" ? "index" : "post") + "-" + width + ".png",
          ),
          fullPage: true,
        });
    }
  }
});

test("sitemap incluye índices y excluye la muestra; registro bilingüe consistente", async ({
  request,
}) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("/es/blog</loc>");
  expect(xml).toContain("/en/blog</loc>");
  expect(xml).not.toContain(post.slug.es);
  expect(xml).not.toContain(post.slug.en);
  expect(xml).not.toContain("<lastmod>");
  expect(blogPosts.map(({ id, slug }) => ({ id, slug }))).toEqual(blogRoutes);
  for (const locale of routing.locales) {
    expect(new Set(blogPosts.map((p) => p.slug[locale])).size).toBe(
      blogPosts.length,
    );
    expect(getBlogPost(post.slug[locale], locale)).toBe(post);
    expect(
      getBlogPost(post.slug[locale === "es" ? "en" : "es"], locale),
    ).toBeUndefined();
  }
});
