# Blog bilingüe de Pagaza

Implementación y redacción: **Codex, 2026-09-29**. Alcance: PR #29 de Plan SEO - Pagaza.

## Rutas y contenido

- Índices: /es/blog y /en/blog.
- Ejemplo ES: /es/blog/que-hacer-si-el-sat-me-esta-auditando.
- Ejemplo EN: /en/blog/what-to-do-if-the-sat-is-auditing-me.
- Server Components y generación estática por locale y slug. Las rutas desconocidas,
  incluidos los slugs de otro idioma, devuelven 404.
- El selector conserva el artículo al cambiar de idioma. Sólo importa identidad y
  slugs desde content/blog/routes.ts; el cuerpo permanece en el servidor.
- Menú completo y footer enlazan al índice. La portada de la home conserva sus enlaces.
- Cada artículo enlaza al servicio asociado, al contacto y al índice.

El tema procede del estudio SEO del cliente (sección 5). El texto es una muestra
redactada por Codex, pendiente de revisión editorial y jurídica del despacho.
Tiene un aviso visible y no se atribuye a ningún integrante de su equipo.

## Datos editoriales y SEO

BlogPost conserva los campos del plan. Autor y fecha son opcionales para no
inventarlos en la muestra; tags es LocalizedText[] para mostrar temas bilingües.
Se añaden ejemplo y fuentes para distinguir la muestra y documentar las referencias.

El ejemplo tiene noindex, follow y se excluye del sitemap. Los índices son indexables.
El sitemap pasa de 31 a 33 URLs y conserva hreflang ES/EN y x-default. No se añaden
fechas de build como lastModified.

Metadata propia, canonical, hreflang, OG tipo article y Twitter con la imagen
heredada de marca que Next resuelve por idioma (1200 × 630). Schemas Article y
BreadcrumbList, derivados del contenido visible, con escape de < en JSON-LD.
Article omite autor y datePublished en la muestra. Estos campos son recomendados,
no deben rellenarse con datos inventados para eliminar avisos de un validador.

Para agregar una publicación real:

1. Añadir id y slugs ES/EN a content/blog/routes.ts.
2. Crear el archivo tipado de contenido e incorporarlo a blogPosts en content/blog/index.ts.
3. Añadir autor real y fecha ISO verificada (YYYY-MM-DD); retirar ejemplo sólo tras
   aprobación editorial. La misma entrada alimenta UI, metadata y Article.
4. Verificar los enlaces y ambos idiomas. El sitemap incluye automáticamente los
   artículos que no son ejemplo. Publicar con rama, revisión y autorización de merge.

## Fuentes y revisión editorial

Consultadas el 28-sep-2026. Los extractos del buscador respaldan las referencias;
la apertura directa de gob.mx devuelve 403 en este entorno.

- [PRODECON: documentación ante facultades de comprobación](https://www.gob.mx/prodecon/articulos/prodecon-te-informa-acerca-de-la-documentacion-que-debes-tener-disponible-en-caso-de-que-la-autoridad-ejerza-sus-facultades-de-comprobacion?idiom=es).
- [PRODECON: asesoría](https://www.gob.mx/prodecon/acciones-y-programas/asesoria-27466).

La guía no fija plazos, promete resultados ni recomienda una vía sin expediente.
Pase Humanizalo: directo 9, ritmo 7, confianza 8, autenticidad 8, densidad 8, voz 7;
total 47/60. Se revisaron las frases genéricas y la atribución de las fuentes;
se mantuvo el registro formal sin fingir una voz personal del despacho.

## Verificación reproducible

Usar puerto 3100. Detener el dev server antes del build.

- pnpm exec eslint src e2e/blog.spec.ts
- pnpm typecheck
- pnpm build
- pnpm test:e2e --workers=1

Los tests usan llaves de prueba y Resend simulado de playwright.config.ts.
e2e/blog.spec.ts cubre navegación índice → artículo → servicio, idioma con slugs
traducidos, 404, contenido, schemas, autor/fecha ausentes, noindex, sitemap e imágenes OG.
También comprueba menú y ausencia de desbordamiento a 375/768/1024/1440 px.

Rich Results Test por código: [dos items válidos, Article y BreadcrumbList](https://search.google.com/test/rich-results/result?id=Gzy0oN3JpRE68vm9rBeJxQ).
Avisos no críticos de Article: faltan image y author (opcionales). La imagen de marca
sí está en OG/Twitter; el schema no incorpora una imagen editorial inexistente.
La prueba usó el JSON-LD del entorno local, no un rastreo de producción.

Resultados (Codex, 2026-09-29):

- Build SSG, TypeScript y lint limpios; formato y diff sin errores.
- 70 casos previos + 60 SEO de servicios verificados en desarrollo, con dos skips
  existentes. El caso móvil de consentimiento expiró esperando Turnstile en la primera
  pasada y pasó en la repetición; no se modificó el formulario.
- 14/14 casos del blog en producción local. Se verificaron cuatro URLs, metadata,
  schemas, 404, cambio de idioma, sitemap, enlaces, responsive e imágenes OG.
- En desarrollo, Next 15 mantiene metadata del índice en el DOM tras la navegación
  cliente al post. En producción el canonical es único. Los tests comprueban primero
  navegación y luego la metadata de una carga completa, como la recibe un rastreador.
- Lighthouse 13.5.0: SEO 100/100 en /es/blog y /en/blog, con origen local coherente
  en el build de prueba. La muestra tiene noindex intencional y no se puntúa como
  publicación indexable. No es una medición de pagaza.mx ni del preview.
- Producción local: cero errores de JavaScript. Captura en
  work/verification/blog-preview-es.png; Lighthouse en lighthouse-blog-{es,en}.json.

## Auditoría de dependencias preexistentes

pnpm audit --prod detectó 14 vulnerabilidades: 2 críticas, 6 altas y 6 moderadas.
Este PR no modifica package.json ni el lockfile; el hallazgo corresponde a la base.
El reporte local completo queda en work/verification/audit-blog.json.

Las dos críticas reportadas afectan a Next 15.5.20:

- [RCE en servidores Windows](https://github.com/advisories/GHSA-p293-qw3h-jr36):
  afecta al servidor local sobre Windows; la aplicabilidad al hosting debe distinguirse.
- [RCE al optimizar AVIF](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4):
  depende de procesar AVIF en la API de optimización de imágenes.

Los avisos señalan corrección desde 15.5.24 para estas dos críticas. Queda pendiente
actualizar Next y revisar las demás alertas en un cambio de seguridad separado.
No se afirma que la auditoría esté limpia ni que el sitio haya sido comprometido.
