# Pagaza Abogados Tributarios

Sitio institucional bilingüe (ES/EN) de un despacho fiscalista de élite (CDMX). Proyecto de **Brota Mx**, standalone. **La fuente de verdad de la arquitectura y el orden de construcción es `BLUEPRINT.md` — léelo antes de construir.**

## Commands

- `pnpm dev` — Servidor de desarrollo (http://localhost:3000 → redirige a `/es`)
- `pnpm build` — Build de producción
- `pnpm start` — Servir el build
- `pnpm lint` — Linter
- `pnpm format` — Prettier

## Tech Stack

Next.js 15 (App Router) + TypeScript strict + Tailwind CSS v4 + next-intl (ES/EN) + React Hook Form + Zod + Resend + Upstash Ratelimit + Vercel.

## Architecture

### Directory Structure

- `src/app/(sitio)/[locale]/` — Home one-page, legales y 12 páginas de servicio por idioma. `layout.tsx` renderiza `<html>`, fuentes y providers.
- `src/app/api/` — Route handlers (p.ej. `contact/route.ts`). Única superficie dinámica.
- `src/components/{layout,sections,ui,forms}/` — UI por dominio.
- `src/content/` — **Contenido tipado y bilingüe** (`{ es, en }`): pilares, sectores, alianzas, site. Sin CMS.
- `src/content/blog/` — Registro de artículos bilingües y slugs traducidos; rutas estáticas en `[locale]/blog`. Ejemplos con aviso + `noindex`, fuera del sitemap. Autor/fecha sólo verificados; guía en `docs/seo-blog.md`.
- `src/content/servicios-seo.ts` — Registro de servicios SEO; copy por servicio en `servicios-seo/`. Fuentes y revisión editorial en `docs/seo-servicios.md`.
- `src/messages/{es,en}.json` — Textos de UI/chrome (nav, formulario, aria) para next-intl.
- `src/i18n/` — Config de next-intl (`routing`, `request`, `navigation`).
- `src/lib/` — `resend`, `ratelimit`, `validation` (Zod), `reporter` (Torre), `seo`, `utils`.
- `src/styles/globals.css` — Tailwind v4 + tokens de marca en `@theme`.
- `public/` — Fotografía B/N optimizada, logo/marca en `brand/`.

### Data Flow

Todo es **estático (SSG)**: las páginas leen `src/content/*` en el server y renderizan. La **única** pieza dinámica es el formulario: cliente → `POST /api/contact` (Zod + rate-limit + honeypot + Turnstile + sanitización → Resend) → respuesta. **Sin base de datos.**

### Key Patterns

- **Server Components por defecto.** `"use client"` sólo en componentes interactivos hoja (Header, Sectores tabs, ContactForm, StatBlock, Reveal).
- **Contenido nunca hardcodeado:** todo vía `content/*` (dominio) o `messages/*` (UI). Bilingüe real.
- **Validación del formulario siempre en el servidor** con Zod; el cliente valida por UX, no por seguridad.

## Code Organization Rules

1. **Un componente por archivo.** Máx ~300 líneas; si crece, extrae subcomponentes.
2. **Alias `@/`** para `src/`. Sin barrel exports (importa directo del origen).
3. **Server Components por defecto**; añade `"use client"` sólo si necesita interactividad.
4. **Coloca** los componentes específicos de una sección junto a su sección.
5. **TypeScript strict, cero `any`.** Todo texto de contenido es `LocalizedText = { es: string; en: string }`.

## Design System

### Colors (tokens en `globals.css` → utilidades Tailwind `bg-navy`, `text-brand`, `text-steel`, etc.)

- Navy `#16243b` · Navy-2 `#1e2f4a` · Navy-ink `#101b2d`
- Brand `#203870` (azul de marca, muestreado del logo — wordmark, titulares de acento, CTAs sobre claro)
- Steel `#6890a8` · Steel-soft `#8fb0c4` (acero de la paleta aprobada por el cliente — hairlines, subrayados, eyebrows sobre navy)
- Bg `#F5F6F8` · Surface `#FFFFFF` · Line `#E6E8EB`
- Ink `#1C1D1F` · Muted `#55606E`
- Success `#15803D` · Error `#B91C1C`

> El bronce (`#B0894E`/`#C9A96A`) que documentaba esta sección se removió del sistema (era una invención sin respaldo en el logo real, ver `Wordmark.tsx`). Los tokens vigentes son brand + steel.

### Typography

- Títulos: **EB Garamond** (serif), 500–600. Hero 64–80px.
- Cuerpo/UI: **Inter**, 400–500, 16–18px. Eyebrows: Inter UPPERCASE tracking 0.14em.
- Cargadas con `next/font` (self-hosted). `font-serif` / `font-sans` vía tokens.

### Style

- Radios: 2px (botones), 4px (tarjetas). Hairlines 1px `#E6E8EB` en vez de sombras fuertes.
- Espaciado base 4px. Max-width 1200–1280px. Mucho whitespace.
- Motion con propósito: fade-up on-scroll, hover con subrayado que crece o cambia de color. **Respeta `prefers-reduced-motion`.**
- Estética: sobria, premium, institucional. Iconos SVG (lucide), **nunca emojis**. Fotografía B/N alto contraste.

## Environment Variables

Ver `.env.example`. Claves: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL/TOKEN`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_SITE_URL`, `TORRE_REPORTER_URL`. Servicios en cuentas **Brota**.

## Reglas No Negociables

1. **TypeScript strict, cero `any`.** Contenido tipado y bilingüe.
2. **Seguridad del formulario:** Zod server-side + rate-limit + honeypot + Turnstile + anti header-injection. Errores genéricos.
3. **Secretos sólo en env.** Nunca commitear `.env.local` ni claves.
4. **WCAG AA:** foco, teclado, `alt`, labels, contraste; `prefers-reduced-motion`. Color nunca como único indicador.
5. **Bilingüe real ES/EN** con hreflang; nada hardcodeado. Mobile-first (375/768/1024/1440).
6. **Reporter fail-open** a la Torre desde el día 1. Todo Brota separado de Galarza/Personal.
