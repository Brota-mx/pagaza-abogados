# Páginas de servicio: SEO de Pagaza

Redacción e implementación: **Codex, 2026-09-28**. Alcance: PR #28 de `Plan SEO - Pagaza`.

## Contenido y revisión del cliente

La arquitectura y las keywords provienen del estudio entregado por el cliente:
`work/ESTUDIO SEO/Reporte_SEO_Pagaza_Abogados_Tributarios.docx` (secciones 2–5).
Las áreas y el alcance del despacho se toman de `src/content/capacidades.ts` y
`src/content/servicios.ts`. Los textos nuevos son redacción de Codex, no citas ni
texto aprobado por el cliente. Queda pendiente su revisión editorial y jurídica.

Cada página tiene una introducción, dos secciones de 150–250 palabras por idioma,
dos preguntas frecuentes, enlaces a 2–4 servicios relacionados y acceso al contacto.
No se añadieron resultados de casos, credenciales, sedes ni garantías de éxito.

| Servicio             | URL ES                              | URL EN                               |
| -------------------- | ----------------------------------- | ------------------------------------ |
| Abogado fiscalista   | `/es/abogado-fiscalista`            | `/en/tax-attorney`                   |
| Auditorías SAT       | `/es/auditorias-sat`                | `/en/sat-audits`                     |
| Acuerdos conclusivos | `/es/acuerdos-conclusivos-prodecon` | `/en/prodecon-settlement-agreements` |
| Créditos fiscales    | `/es/creditos-fiscales`             | `/en/tax-credits-defense`            |
| Materialidad         | `/es/materialidad-fiscal`           | `/en/fiscal-materiality`             |
| Artículo 69-B        | `/es/69-b-operaciones-inexistentes` | `/en/article-69b-defense`            |
| Sellos digitales     | `/es/restriccion-sellos-digitales`  | `/en/digital-seal-restrictions`      |
| Devolución de IVA    | `/es/devolucion-iva`                | `/en/vat-refund`                     |
| IMSS                 | `/es/defensa-imss`                  | `/en/imss-defense`                   |
| Comercio exterior    | `/es/comercio-exterior`             | `/en/foreign-trade`                  |
| PLD                  | `/es/pld`                           | `/en/anti-money-laundering`          |
| Amparo fiscal        | `/es/amparo-fiscal`                 | `/en/tax-amparo`                     |

Las URLs EN son nombres de ruta del plan. En el texto jurídico se traduce
`crédito fiscal` como `tax assessment`, para evitar confundirlo con un beneficio
tributario. `Amparo` conserva su nombre y se explica como defensa constitucional.

## Fuentes oficiales consultadas

Se consultaron el 28-sep-2026 para contrastar referencias y distinguir procedimientos:

- [Código Fiscal de la Federación](https://www.diputados.gob.mx/LeyesBiblio/pdf/CFF.pdf):
  comprobación, créditos, devolución, artículos 17-H Bis y 69-B, acuerdos conclusivos.
- [Acuerdos conclusivos, PRODECON](https://www.gob.mx/prodecon/acciones-y-programas/acuerdos-conclusivos).
- [Certificado de sello digital, SAT](https://sat.gob.mx/portal/public/tramites/certificado-de-sello-digital).
- [Ley del Seguro Social](https://www.diputados.gob.mx/LeyesBiblio/pdf/LSS.pdf).
- [Ley Aduanera](https://www.diputados.gob.mx/LeyesBiblio/pdf/LAdua.pdf).
- [LFPIORPI](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPIORPI.pdf).
- [Ley de Amparo](https://www.diputados.gob.mx/LeyesBiblio/pdf/LAmp.pdf).

Pase editorial Humanizalo: 47/60 (directo 9, ritmo 7, confianza 8, autenticidad 8,
densidad 8, voz 7). Se mantuvo el registro técnico del despacho y se eliminaron
promesas de resultado, afirmaciones de superioridad y plazos generales sin expediente.

## Implementación

- Registro en `src/content/servicios-seo.ts`; contenido por servicio en
  `src/content/servicios-seo/` para mantener archivos cortos y facilitar la revisión.
- 12 rutas internas con slugs ES/EN en `routing.pathnames`, renderizadas con el
  Server Component `ServicioPage`. El selector de idioma conserva el servicio.
- Metadata propia, canonical y hreflang ES/EN; `x-default` señala la versión ES del
  mismo servicio. OG y Twitter heredan la imagen de marca que Next resuelve por idioma,
  incluido el sufijo de su ruta de metadata.
- JSON-LD `Service`, `BreadcrumbList` y `FAQPage`. El proveedor apunta al `@id` de la
  organización existente; las FAQs proceden del mismo contenido que muestra la página.
- Sitemap con 31 URLs: entrada, dos homes, cuatro legales y 24 servicios. Se omite
  `lastModified` porque no hay fechas verificadas por página; un build no es una edición.
- Home: enlace general y enlaces por capacidad, sin cambiar su copy ni su orden.
  Header: acceso a Defensa fiscal. Footer: columna de los doce servicios.

## Verificación reproducible

```powershell
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e --workers=1
```

Los E2E del proyecto usan puerto 3100 y las credenciales de prueba ya configuradas
en `playwright.config.ts`. `e2e/servicios-seo.spec.ts` comprueba las 24 URLs,
metadata, hreflang, relación de proveedor, breadcrumbs, FAQs con teclado, cambio de
idioma, enlaces desde la home y sitemap, además de la extensión y referencias del contenido.
Las imágenes OG deben responder 200 como PNG de 1200×630; el menú se comprueba a
375, 768, 1024 y 1440 px.

Resultado del 28-sep-2026: typecheck, lint y build sin errores; 70 casos existentes
en desarrollo y 60 casos SEO en el build de producción local (ejecuciones separadas).
Los dos skips existentes corresponden a pruebas exclusivas de desktop/móvil.
El build con `NEXT_PUBLIC_SITE_URL=https://pagaza.mx` verificó canonical, hreflang,
schemas e imágenes de las 24 URLs. Una primera pasada tuvo un 404 transitorio de
desarrollo; la repetición de ese caso y toda la suite SEO en producción pasaron.

Lighthouse 13.5.0: **SEO 100/100** en `/es/abogado-fiscalista` y `/en/tax-attorney`,
sobre un build local con `NEXT_PUBLIC_SITE_URL=http://localhost:3100`. Con origen
local y canonical de producción mezclados, Lighthouse marcaba 92 por el hreflang
del header HTTP que genera next-intl; no se cambió el middleware para esa medición.
Reportes locales en `work/verification/lighthouse-{es,en}-local.json` (no versionados).
Es una medición representativa de la plantilla compartida, no una auditoría del dominio público.

Rich Results Test por código: [resultado del 28-sep-2026](https://search.google.com/test/rich-results/result?id=Scbw5WiUB6JIDd-NWTDzbQ).
Tres elementos válidos: breadcrumbs, negocio local y organización. Aviso no crítico
del schema global previo: falta `image` (opcional). La prueba utilizó las URLs locales
del entorno de desarrollo; no fue una comprobación de rastreo del dominio de producción.
`Service` y `FAQPage` se comprueban en los E2E; no aparecen como tipos de resultado en esa prueba.

El blog corresponde al PR #29. Google Business Profile, Search Console y medición
siguen como tareas operativas del plan en el vault.
