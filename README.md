# Pagaza Abogados Tributarios

Sitio institucional bilingüe (ES/EN) del despacho fiscalista **Pagaza Abogados Tributarios**.
Proyecto de **Brota Mx**. Standalone.

**Borrador en vivo (Vercel):** https://pagaza-abogados-jegonvas-projects.vercel.app

> ⚠️ Ahora mismo el deploy tiene **Vercel Deployment Protection** activo (pide login de Vercel). Para
> que el cliente pueda verlo, desactívala en Vercel → Settings → Deployment Protection.

## Stack

Next.js 15 (App Router, SSG) · TypeScript strict · Tailwind CSS v4 · next-intl (ES/EN) ·
React Hook Form + Zod · Resend · Upstash Ratelimit · Cloudflare Turnstile · Vercel.

## Requisitos

- Node.js ≥ 20 (Vercel usa 24.x)
- pnpm ≥ 9 (recomendado 11)

## Setup

```bash
pnpm install
cp .env.example .env.local   # rellenar valores (ver .env.example; trae llaves de test)
pnpm dev                     # http://localhost:3000  → redirige a /es
```

En dev, sin credenciales reales el formulario funciona igual: el rate-limit hace fail-open,
Turnstile se omite y Resend simula el envío (ver `.env.example`).

## Scripts

| Comando          | Qué hace                                                                                |
| ---------------- | --------------------------------------------------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo                                                                  |
| `pnpm build`     | Build de producción                                                                     |
| `pnpm start`     | Servir el build                                                                         |
| `pnpm lint`      | Linter                                                                                  |
| `pnpm typecheck` | `tsc --noEmit`                                                                          |
| `pnpm test:e2e`  | E2E Playwright (desktop + mobile). Requiere `npx playwright install chromium` la 1ª vez |
| `pnpm format`    | Prettier                                                                                |

## Arquitectura (resumen)

Home one-page bilingüe, **100% estática (SSG)** salvo una única superficie dinámica:
`POST /api/contact` (formulario seguro). Secciones: Hero · Compromiso · Pilares · Metodología ·
Sectores (acordeón) · Alianzas + Cobertura · Contacto. Contenido tipado y bilingüe en
`src/content/*`; UI/chrome en `src/messages/{es,en}.json`. Ver **`BLUEPRINT.md`** para el detalle.

## Deploy (Vercel)

- **CI/CD:** cada **push a `main` → producción**; cada **PR → preview URL** automática.
- **Root Directory** del proyecto Vercel = carpeta que contiene este `package.json`.
- Producción: `https://pagaza-abogados-jegonvas-projects.vercel.app` (dominio `pagaza.mx` pendiente
  de DNS del cliente).

### Variables de entorno (cargar en Vercel → Production + Preview)

Los **secretos** se cargan en el dashboard de Vercel (nunca en el repo). Ver `.env.example` para
la lista completa y las llaves de test de dev.

| Variable                                                  | Necesaria para                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `RESEND_API_KEY`                                          | Envío real de correos del formulario                                     |
| `CONTACT_TO_EMAIL`                                        | Destino de leads (`a@pagaza.mx`)                                         |
| `CONTACT_FROM_EMAIL`                                      | Remitente **verificado** (sandbox de Resend hasta verificar `pagaza.mx`) |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN`                       | Rate-limit por IP                                                        |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Anti-bot (verificación + widget)                                         |
| `NEXT_PUBLIC_SITE_URL`                                    | URL canónica (SEO/hreflang)                                              |
| `TORRE_REPORTER_URL`                                      | Reporter fail-open a la Torre                                            |

### Checklist de go-live (pasos que dependen del cliente/operador)

- [ ] **Desactivar Vercel Deployment Protection** para que el borrador sea público (Settings →
      Deployment Protection → Vercel Authentication → Disabled o solo Preview).
- [ ] Crear los servicios en **cuentas de Brota** (Resend, Upstash, Turnstile) y cargar sus llaves
      en Vercel (Production + Preview).
- [ ] **Verificar el dominio `pagaza.mx` en Resend** (SPF/DKIM/DMARC) **antes** de cambiar
      `CONTACT_FROM_EMAIL` de `onboarding@resend.dev` a `no-reply@pagaza.mx`.
- [ ] Configurar el dominio `pagaza.mx` en Vercel cuando el cliente entregue el DNS; actualizar
      `NEXT_PUBLIC_SITE_URL`.
- [ ] Correr **`/security-review`** sobre `POST /api/contact` y los headers antes de exponer el form.
- [ ] Prueba E2E real: un lead llega a `a@pagaza.mx`; cada modo de falla (A–K) responde su status.
- [ ] Lighthouse ≥ 95 (Performance/SEO/Best Practices/Accessibility, mobile) sobre el deploy.

## Documentación

- **`BLUEPRINT.md`** — arquitectura completa y orden de construcción numerado.
- **`docs/BUILD-NOTES.md`** — auditoría, plan por fases, trampas del stack y checklist.
- **`docs/contenido-fuente.md`** — contenido canónico del despacho (fuente de `src/content`).
- **`docs/glosario-es-en.md`** — terminología jurídico-fiscal ES→EN fija.
- **`CLAUDE.md`** — guía para trabajar con Claude Code en este repo.

## Notas de organización (Brota)

Todo separado de Galarza/Personal: repo en la org **Brota-mx**; servicios (Resend, Upstash,
Turnstile) en cuentas de Brota. El proyecto Vercel actual está en el team `jegonvas-projects`;
si se requiere, puede transferirse al **Team Brota**.

## Estado

Fases 1–10 completas: chrome + SEO, contenido tipado bilingüe, las 7 secciones (Hero, Compromiso,
Pilares, Metodología, Sectores interactivo, Alianzas + Cobertura, Contacto), formulario seguro
(`/api/contact`), JSON-LD + OG dinámico, CSP + security headers, y E2E Playwright. Falta la
**Fase 11** operativa: cargar secretos reales en Vercel, dominio y verificación de Resend.
