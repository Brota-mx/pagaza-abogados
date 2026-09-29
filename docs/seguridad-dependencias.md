# Parche de seguridad de dependencias

Actor: Codex · 2026-09-29. Base: `main` en `a3f0c6e` (PR #29).
Rama: `codex/parche-seguridad-dependencias`.

## Auditoría y alcance

La auditoría guardada en `work/verification/audit-blog.json` tenía 14 alertas
de producción: 2 críticas, 6 altas y 6 moderadas. La auditoría completa de esta
sesión confirmó esas 14 y seis altas adicionales de desarrollo (20 entradas,
18 avisos únicos; brace-expansion aparece en dos versiones).

Los 18 avisos se consultaron mediante la API oficial de GitHub y se guardaron
en `work/verification/security-official-advisories.json`. Sus rangos corregidos
se contrastaron con las versiones del registro npm y el lockfile.

| Paquete | Antes | Después | Motivo |
| --- | --- | --- | --- |
| next | 15.5.20 | 15.5.26 | Último parche publicado de 15.5; diez avisos, incluidas dos RCE |
| eslint-config-next | 15.5.4 | 15.5.26 | Mantener la configuración oficial alineada con Next |
| sharp | 0.34.5 | 0.35.5 | libvips y libheif corregidos; versión admitida por Next |
| postcss | 8.5.19 | 8.5.28 | Lectura de archivos mediante sourceMappingURL |
| nanoid | 3.3.16 | 3.3.19 | Bucle ilimitado en generadores personalizados |
| brace-expansion | 1.1.16 / 5.0.7 | 1.1.21 / 5.0.12 | Dos avisos de seguridad en dependencias del linter |
| js-yaml | 4.3.0 | 4.3.2 | Dos avisos en dependencias del linter |

El override existente de PostCSS pasa a `>=8.5.23 <9`: impide resolver la
versión vulnerable fijada por Next y evita saltar de major. Las otras
transitivas se actualizan dentro de los rangos de sus consumidores. El
lockfile incluye los binarios SWC/sharp de cada plataforma y sus dependencias.
No se añadieron dependencias directas ni se cambió código de la aplicación.

La RCE de Windows aplica a servidores alojados sobre un filesystem Windows;
el entorno local usa Windows. La otra RCE depende del procesamiento de AVIF
en el optimizador de imágenes, configurado en este proyecto. Los avisos
de Server Actions o servidores personalizados tienen condiciones que no
equivalen al flujo actual del sitio. Se actualiza el paquete completo;
la auditoría identifica versiones vulnerables, no demuestra explotación.

## Fuentes oficiales

- Next, corrección desde 15.5.24:
  [Windows](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36),
  [AVIF](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4).
- Next, corrección desde 15.5.21:
  [DoS Server Actions](https://github.com/vercel/next.js/security/advisories/GHSA-m99w-x7hq-7vfj),
  [SSRF servidor personalizado](https://github.com/vercel/next.js/security/advisories/GHSA-89xv-2m56-2m9x),
  [caché con cuerpos](https://github.com/vercel/next.js/security/advisories/GHSA-68g3-v927-f742),
  [caché UTF-8](https://github.com/vercel/next.js/security/advisories/GHSA-4633-3j49-mh5q),
  [payload Edge](https://github.com/vercel/next.js/security/advisories/GHSA-4c39-4ccg-62r3),
  [SSRF rewrites](https://github.com/vercel/next.js/security/advisories/GHSA-p9j2-gv94-2wf4),
  [DoS SVG](https://github.com/vercel/next.js/security/advisories/GHSA-q8wf-6r8g-63ch),
  [endpoints internos](https://github.com/vercel/next.js/security/advisories/GHSA-955p-x3mx-jcvp).
- sharp: [libvips, >=0.35.0](https://github.com/lovell/sharp/security/advisories/GHSA-f88m-g3jw-g9cj),
  [libheif, >=0.35.4](https://github.com/lovell/sharp/security/advisories/GHSA-rgj7-g3m4-5g8c).
- [PostCSS, >=8.5.23](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp).
- [nanoid, >=3.3.18 en la rama 3](https://api.github.com/advisories/GHSA-2v37-7h3g-55p8).
- brace-expansion:
  [primer aviso](https://api.github.com/advisories/GHSA-mh99-v99m-4gvg),
  [corrección adicional, >=1.1.18 / >=5.0.9](https://api.github.com/advisories/GHSA-rgw5-rvv9-x895).
- js-yaml:
  [>=4.3.1](https://api.github.com/advisories/GHSA-5p4m-2wfm-xmqj),
  [>=4.3.2](https://api.github.com/advisories/GHSA-2883-xcg3-v3hh).

## Verificación

Entorno: Node 24.14.1, pnpm 11.13.0, Playwright 1.61.1, Windows.
Se reconstruyó `node_modules` por el cambio del almacén pnpm v10 → v11;
no se modificó configuración global. Instalación con scripts ya autorizados
en `pnpm-workspace.yaml` y políticas de dependencias verificadas por pnpm.

- `pnpm audit`: 0 vulnerabilidades, salida 0.
- `pnpm audit --prod`: 0 vulnerabilidades, salida 0.
- `pnpm install --frozen-lockfile`: salida 0, sin resolver nuevas versiones.
- `pnpm build`: salida 0, 42 páginas generadas; se conserva SSG.
- `pnpm typecheck`: salida 0.
- `pnpm lint`: salida 0, sin errores ni advertencias de ESLint. Next informa
  la deprecación de `next lint`; no se migra el comando en este parche.
- `pnpm test:e2e e2e/blog.spec.ts e2e/servicios-seo.spec.ts --workers=2`:
  74/74 casos pasan contra `pnpm start --port 3100`, producción local.
- Optimizador de imágenes de producción: solicitudes a `/_next/image` con
  `hero-arquitectura.jpg`, ancho 640 y calidad 75. WebP: HTTP 200, 56 040 bytes;
  AVIF: HTTP 200, 58 231 bytes; tipos de contenido correctos.
- `pnpm test:e2e e2e/smoke.spec.ts e2e/mapa.spec.ts --workers=2`:
  69 aprobados, dos skips existentes según viewport y un timeout inicial
  del mapa de escritorio a 768 px (30 s esperando la imagen).
- `pnpm test:e2e e2e/mapa.spec.ts --project=desktop --grep '768px' --workers=1`:
  el caso fallido pasa en 13.4 s, sin modificar aplicación ni pruebas.

Cobertura de los cuatro archivos E2E: 144 casos únicos aprobados y dos skips,
mediante dos tandas y la repetición del timeout. No es una única ejecución
completa verde. Contacto y newsletter pasan con llaves de prueba de Turnstile
y Resend vacío; el correo se simula en desarrollo.
Durante la compilación inicial concurrente de `/es`, el servidor de desarrollo
registró `Unexpected end of JSON input`. La repetición aislada no lo registró;
se conserva el log de la primera ejecución y no se oculta el fallo inicial.

Las rutas de blog inexistentes devuelven 404 en las pruebas. Next registró
`Internal: NoFallbackError` para esas peticiones en el servidor de producción;
no se afirma ausencia total de logs de error. No hubo fallos en los 74 E2E.

Evidencia local, fuera de Git: `work/verification/audit-security-before.json`,
`audit-security-after.json`, `audit-security-prod-after.json`,
`security-official-advisories.json`, `security-images.json` y logs
`security-*.log`, incluidos `security-e2e-production.log`,
`security-e2e-development.log` y `security-e2e-map-recheck.log`.

Sin cambios de DNS, hosting, variables de entorno ni envío de leads reales.
