import { test, expect } from "@playwright/test";

/**
 * Geometría de los pines del mapa de cobertura (`CoverageMap`).
 *
 * Existe por un bug reportado por el cliente en agosto de 2026: en móvil el pin de Ciudad Juárez se
 * dibujaba del lado estadounidense de la frontera. Las coordenadas de `PINES_OFICINAS` eran
 * correctas; lo que fallaba era el ancla del render — `-translate-y-1/2` centraba el conjunto
 * punto+etiqueta sobre la coordenada, así que el punto quedaba ~14.5px por encima de su posición
 * real. Ese offset en píxeles fijos es ~1.4 puntos porcentuales sobre un mapa de escritorio y ~5.1
 * sobre uno de móvil, de ahí que solo se notara en pantallas chicas.
 *
 * Por eso el test recorre varios anchos: lo que se verifica no es "el pin está en su sitio" sino
 * "el pin está en su sitio INDEPENDIENTEMENTE del ancho de la pantalla". Con el código anterior,
 * 1440 pasaba y 375 fallaba.
 */

/** Debe coincidir con `PINES_OFICINAS` en src/components/ui/CoverageMap.tsx. */
const PINES = [
  { ciudad: "Ciudad de México", x: 58.0, y: 74.3 },
  { ciudad: "Ciudad Juárez", x: 35.9, y: 19.5 },
];

/** A 375px de ancho el mapa mide ~282px de alto, así que 0.5pp ≈ 1.4px. El bug medía 5.1pp. */
const TOLERANCIA_PP = 0.5;

for (const width of [375, 768, 1440]) {
  test(`los pines caen sobre sus coordenadas a ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/es");

    const img = page.locator('#alianzas img[src*="mapa-mexico"]');
    await img.scrollIntoViewIfNeeded();
    // Sin esperar a la decodificación, boundingBox() devuelve la caja del placeholder y el test
    // mide contra una altura que no es la final.
    await img.evaluate((el) => (el as HTMLImageElement).decode());
    const mapa = await img.boundingBox();
    expect(mapa).not.toBeNull();
    if (!mapa) return;

    for (const [i, pin] of PINES.entries()) {
      const punto = page.locator(`#alianzas [data-punto="${i}"]`);
      const caja = await punto.boundingBox();
      expect(caja, `${pin.ciudad}: el punto no se encontró`).not.toBeNull();
      if (!caja) continue;

      const centroX = caja.x + caja.width / 2;
      const centroY = caja.y + caja.height / 2;
      const xPct = ((centroX - mapa.x) / mapa.width) * 100;
      const yPct = ((centroY - mapa.y) / mapa.height) * 100;

      expect(xPct, `${pin.ciudad}: x a ${width}px`).toBeCloseTo(pin.x, 0);
      expect(
        Math.abs(yPct - pin.y),
        `${pin.ciudad}: y a ${width}px (esperado ${pin.y}%, medido ${yPct.toFixed(1)}%)`,
      ).toBeLessThanOrEqual(TOLERANCIA_PP);
    }
  });
}
