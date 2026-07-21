# Pagaza Abogados Tributarios — Blueprint

> Generado por **The Architect** (en-sesión) el 2026-07-16
> Arquetipo: **Marketing / Landing Site** (one-page, bilingüe)
> Cliente: Pagaza Abogados Tributarios · Agencia: **Brota Mx** · Relación: **Standalone**
> Repo destino: `Brota-mx/pagaza-abogados` · Hosting: **Vercel (Team Brota)**

Este documento es **100% autocontenido**. Una instancia de Claude Code sin contexto previo debe poder construir el sitio completo siguiendo el **Orden de Construcción (§9)** sin hacer preguntas. Todo el contenido real del despacho está en `work/complemento pdf.md` y resumido aquí.

---

## 1. Visión del Proyecto

### Visión

Sitio web institucional de **Pagaza Abogados Tributarios**, un despacho fiscalista boutique de élite en Lomas de Chapultepec (CDMX), fundado por **Alfonso Pagaza**. El sitio debe transmitir **seriedad, autoridad, confianza fiscal y discreción de alto patrimonio**, y convertir visitantes de alto perfil (directores, empresarios, PEPs) en consultas agendadas. Reemplaza un primer borrador (referencia de contenido, no de diseño) que se sentía "administrativo": el objetivo es **elevar el nivel** a un sitio premium, sobrio y con jerarquía real, destacando las **cifras de impacto** del despacho.

### Objetivos

- Comunicar los **3 pilares de servicio** y la especialidad fiscal con claridad y peso.
- Exhibir **credibilidad cuantificable**: casos de éxito por sector con cifras (Textil **98%** sobre $25M MXN; Retail **$55M MXN**).
- Capturar leads calificados vía **formulario seguro** + canales directos (WhatsApp/tel/correo).
- Cubrir público nacional e **internacional** (bilingüe ES/EN).
- **SEO local + temático** fuerte ("abogados tributarios CDMX", "litigio fiscal México", etc.).

### Métricas de Éxito

- Lighthouse ≥ 95 en Performance/SEO/Best Practices/Accessibility (mobile).
- Formulario funcional con entregabilidad verificada y 0 spam pasando los filtros.
- WCAG 2.1 **AA** en todo el sitio.
- Tiempo de carga (LCP) < 2.0s en 4G.

---

## 2. Tech Stack

| Capa               | Tecnología                                                           | Por qué                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | **Next.js 15** (App Router, SSG/RSC)                                 | Consistencia con el ecosistema (todo Brota/Galarza es Next+Vercel) y necesitamos backend para el formulario. Estático por defecto = rendimiento máximo. |
| Lenguaje           | **TypeScript** (strict)                                              | Regla no negociable. Cero `any`.                                                                                                                        |
| Estilo             | **Tailwind CSS v4** + CSS custom properties (design tokens)          | Estándar marketing; tokens para el sistema de marca.                                                                                                    |
| Componentes        | Propios + **Radix UI** (primitivas headless)                         | Sitio a medida; Radix para Tabs/Accordion/Dialog accesibles.                                                                                            |
| i18n               | **next-intl**                                                        | Rutas `/es` y `/en`, hreflang, mensajes por locale.                                                                                                     |
| Contenido          | **Data files TypeScript tipados** (sin CMS)                          | Gestión por código (decisión del cliente). Cada texto es bilingüe `{ es, en }`.                                                                         |
| Formulario         | **Resend** + **React Hook Form** + **Zod**                           | Envío real de correo con validación cliente y servidor.                                                                                                 |
| Anti-abuso         | **@upstash/ratelimit** (Redis) + honeypot + **Cloudflare Turnstile** | Rate limit por IP, trampa anti-bot, captcha invisible.                                                                                                  |
| Fuentes            | **next/font** (self-hosted) — EB Garamond + Inter                    | Sin FOUT, sin llamadas a Google en runtime.                                                                                                             |
| Analytics          | **@vercel/analytics** + **@vercel/speed-insights**                   | Gratis, en el ecosistema.                                                                                                                               |
| Iconos             | **lucide-react**                                                     | SVG consistentes (nunca emojis como iconos).                                                                                                            |
| Animación          | **CSS + IntersectionObserver** (o `motion` si hace falta)            | Motion con propósito, respeta `prefers-reduced-motion`.                                                                                                 |
| Observabilidad     | **Reporter fail-open** a la Torre de Control                         | Regla del protocolo, desde el día 1.                                                                                                                    |
| Hosting            | **Vercel** (Team **Brota**, separado de Galarza/Personal)            | Link público automático + backend + dominio custom futuro.                                                                                              |
| Gestor de paquetes | **pnpm**                                                             | —                                                                                                                                                       |

---

## 3. Estructura de Directorios

```
pagaza-abogados/
  src/
    app/
      [locale]/
        layout.tsx            # Layout raíz por locale (fuentes, <html lang>, providers, analytics)
        page.tsx              # Home one-page: compone todas las secciones
        opengraph-image.tsx   # OG image dinámica (o og estática en /public)
      api/
        contact/route.ts      # POST — valida (Zod), rate-limit, honeypot, Turnstile, Resend
      sitemap.ts              # Sitemap con hreflang ES/EN
      robots.ts               # robots.txt
      layout.tsx              # Raíz mínimo (redirige a locale por defecto)
    components/
      layout/
        Header.tsx            # Navbar + selector de idioma + CTA (client, scroll-aware)
        Footer.tsx            # Footer con nav, datos, marca de agua "P"
        LocaleSwitcher.tsx    # ES/EN
      sections/
        Hero.tsx              # Hero + slogan + cifras de impacto destacadas
        Compromiso.tsx        # Filosofía / propuesta de valor
        Pilares.tsx           # 3 pilares de servicio
        Metodologia.tsx       # Análisis técnico + estrategia + gestión documental
        Sectores.tsx          # 10 sectores interactivos (tabs/accordion) + casos + cifras
        Alianzas.tsx          # 10 materias + cobertura geográfica (mapa)
        Contacto.tsx          # Formulario + canales directos
      ui/
        Button.tsx            # Variantes: primary (navy), ghost, link-bronce
        StatBlock.tsx         # Cifra de impacto (count-up) — el diferenciador clave
        SectionHeading.tsx    # Eyebrow + título serif
        Reveal.tsx            # Wrapper fade-up on-scroll (respeta reduced-motion)
        CoverageMap.tsx       # SVG mapa MX + pins internacionales
      forms/
        ContactForm.tsx       # Client component: RHF + Zod + Turnstile + estados
    content/
      site.ts                 # Datos globales: contacto, slogan, nav, redes
      pilares.ts              # 3 pilares (bilingüe)
      sectores.ts             # 10 sectores con casos y cifras (bilingüe)
      alianzas.ts             # 10 materias + cobertura (bilingüe)
      types.ts                # LocalizedText y tipos de contenido
    i18n/
      routing.ts              # locales: ['es','en'], defaultLocale: 'es'
      request.ts              # next-intl request config
    messages/
      es.json                 # UI chrome en español (nav, labels, form, aria)
      en.json                 # UI chrome en inglés
    lib/
      resend.ts               # Cliente Resend + plantilla del correo
      ratelimit.ts            # Upstash ratelimit (fail-open si no configurado en dev)
      validation.ts           # Esquemas Zod (contact)
      reporter.ts             # Reporter fail-open a la Torre de Control
      seo.ts                  # Helpers de metadata + JSON-LD (LegalService/LocalBusiness)
      utils.ts                # cn(), formateadores
    styles/
      globals.css             # Tailwind v4 + @theme tokens + base
    middleware.ts             # next-intl middleware (negociación de locale)
  public/
    fonts/                    # (si no se usa next/font/google) EB Garamond, Inter
    images/                   # Fotografía B/N optimizada (WebP/AVIF)
    brand/                    # Logo PAGAZA (SVG), marca de agua "P"
    og-image.png              # OG por defecto
    favicon.svg
  .env.example
  .env.local                  # (git-ignored) secretos reales
  next.config.ts              # next-intl plugin + security headers
  tailwind.config.ts          # (o config vía @theme en CSS con Tailwind v4)
  tsconfig.json               # strict, path alias @/*
  CLAUDE.md                   # Guía del proyecto (ver §15)
  README.md                   # Setup + link Vercel
```

---

## 4. Modelo de Contenido (sin base de datos)

No hay base de datos. El contenido es **estático, tipado y bilingüe**, en `src/content/`. Tipo base:

```ts
// src/content/types.ts
export type LocalizedText = { es: string; en: string };

export interface Pilar {
  id: string; // 'proteccion' | 'consultoria' | 'litigio'
  numero: "01" | "02" | "03";
  titulo: LocalizedText;
  descripcion: LocalizedText;
  puntos: LocalizedText[];
}

export interface CasoExito {
  descripcion: LocalizedText;
  cifra?: { valor: string; etiqueta: LocalizedText }; // p.ej. { valor: '98%', etiqueta: {...} }
}

export interface Sector {
  id: string; // 'automotriz', 'manufactura', ...
  numero: string; // '01'..'10'
  nombre: LocalizedText;
  resumen: LocalizedText;
  casos: CasoExito[];
  destacado?: boolean; // Textil y Retail => badge de cifra
}

export interface Alianza {
  id: string;
  nombre: LocalizedText;
}
export interface Cobertura {
  region: LocalizedText;
  tipo: "nacional" | "internacional";
}
```

### Datos a cargar (fuente: `work/complemento pdf.md`)

- **Pilares (3):** Protección Patrimonial · Consultoría y Transaccional · Controversia y Litigio Público y Fiscal.
- **Sectores (10):** Automotriz · Manufactura y Transformación · Inmobiliario y Construcción · **Textil** (destacado: 98% sobre $25M MXN) · **Retail y Comercio** (destacado: $55M MXN) · Educativo · Defensa de PEPs · Suplementos y Consumo · Farmacéutico · Dimensión Social (pro-bono). Cada uno con su resumen y casos textuales del `.md`.
- **Alianzas por materia (10):** contable/financiero, laboral, corporativo/societario, ciencias de la vida/publicidad, penal (penal-fiscal), regulatorio/compliance, precios de transferencia/avalúos, traducción, civil/mercantil, financiero/mercado de capitales.
- **Cobertura:** Nacional (estados clave) · EE.UU. · Europa · Latinoamérica.
- **Contacto/site:** Alfonso Pagaza (Socio Fundador) · Tel `(55) 78-91-88-65` · `a@pagaza.mx` · Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, CDMX · Slogan: _"La estrategia correcta siempre gana. Con esta definición de éxito, nunca perdemos."_

> **Traducción EN:** el `.md` está en español. El builder debe **traducir profesionalmente** cada campo a inglés (registro formal-legal). No usar traducción literal automática sin revisar terminología jurídica (p.ej. "Juicio de Amparo" → "Amparo (constitutional relief)").

---

## 5. Diseño de la API

Un único endpoint dinámico. Todo lo demás es estático.

### `POST /api/contact`

**Request body (JSON):**

```ts
{
  nombre: string;        // 2–120
  empresa?: string;      // 0–160
  email: string;         // email válido
  telefono?: string;     // 0–40
  sector?: string;       // uno de los 10 ids
  mensaje: string;       // 10–2000
  _hp?: string;          // honeypot: DEBE venir vacío
  turnstileToken: string;// token de Cloudflare Turnstile
  locale: 'es' | 'en';
}
```

**Pipeline del handler (en orden):**

1. **Rate limit** por IP (`@upstash/ratelimit`, p.ej. 5 req / 10 min). Si excede → `429`.
2. **Honeypot**: si `_hp` no está vacío → responder `200` falso-positivo (no enviar) para no informar al bot.
3. **Turnstile**: verificar `turnstileToken` contra el endpoint de Cloudflare (server-side). Falla → `400`.
4. **Validación Zod** (`src/lib/validation.ts`). Falla → `400` con `details`.
5. **Sanitización anti header-injection**: rechazar `\n`/`\r` en `nombre`, `email`, `empresa` antes de armar el correo.
6. **Resend**: enviar a `a@pagaza.mx` (reply-to = email del prospecto). Falla → `500` genérico (sin filtrar detalles).
7. Responder shape consistente `{ success: boolean, error?: {...} }`.

**Reglas:** validar SIEMPRE en el servidor (nunca confiar en el cliente). Nunca exponer stack traces ni claves. El endpoint no toca disco ni DB.

---

## 6. Arquitectura Frontend

### Rutas

| Ruta                          | Página   | Descripción                                 |
| ----------------------------- | -------- | ------------------------------------------- |
| `/`                           | redirect | Redirige a `/es` (o negociación de idioma). |
| `/es`, `/en`                  | Home     | One-page con todas las secciones ancladas.  |
| `/api/contact`                | API      | Envío del formulario.                       |
| `/sitemap.xml`, `/robots.txt` | SEO      | Generados.                                  |

### Composición (Home)

```
[locale]/page.tsx (Server Component)
  <Header/>                       (client — scroll-aware, locale switcher)
  <main>
    <Hero/>                       (StatBlocks de impacto)
    <Compromiso/>
    <Pilares/>                    (3 columnas 01/02/03)
    <Metodologia/>
    <Sectores/>                   (client — Tabs Radix + casos + badges de cifra)
    <Alianzas/>                   (grid materias + <CoverageMap/>)
    <Contacto/>                   (<ContactForm/> client + directos)
  </main>
  <Footer/>
```

### Estado y renderizado

- **Server Components por defecto** (todo el contenido es estático → SSG). Sólo son client components: `Header`, `LocaleSwitcher`, `Sectores` (tabs), `ContactForm`, `Reveal`, `StatBlock` (count-up).
- El contenido se importa de `src/content/*` y se resuelve por `locale` en el server.
- Sin fetching de datos externos en runtime salvo el POST del formulario.

---

## 7. Sistema de Diseño

> Estilo **Trust & Authority**: sobrio, premium, institucional. Radios casi rectos, hairlines en vez de sombras, mucho whitespace, motion con propósito. Validado para **WCAG AA**.

### Colores (tokens → `@theme` en `globals.css`)

| Rol                   | Hex       | Uso                                            |
| --------------------- | --------- | ---------------------------------------------- |
| `--color-navy`        | `#16243b` | Primary: fondos hero/footer, títulos, CTA      |
| `--color-navy-2`      | `#1e2f4a` | Degradados, hover de superficies navy          |
| `--color-navy-ink`    | `#101b2d` | Navy más profundo (fondos de sección)          |
| `--color-bronze`      | `#B0894E` | Acento prestigio: hairlines, hover, **cifras** |
| `--color-bronze-soft` | `#C9A96A` | Bronce claro sobre navy                        |
| `--color-bg`          | `#F5F6F8` | Fondo de página                                |
| `--color-surface`     | `#FFFFFF` | Tarjetas/paneles                               |
| `--color-line`        | `#E6E8EB` | Hairlines 1px                                  |
| `--color-ink`         | `#1C1D1F` | Texto cuerpo                                   |
| `--color-muted`       | `#55606E` | Texto secundario (AA ✓ sobre bg)               |
| `--color-success`     | `#15803D` | Estado OK del formulario                       |
| `--color-error`       | `#B91C1C` | Estado error del formulario                    |

**Contraste:** verificar AA (≥4.5:1 texto normal, ≥3:1 grande). `#55606E` sobre `#F5F6F8` ✓. Texto sobre navy = `#F5F6F8`/`#C9A96A`. Nunca usar color como único indicador.

### Tipografía

| Rol              | Fuente                        | Escala (desktop)                     | Peso    |
| ---------------- | ----------------------------- | ------------------------------------ | ------- |
| Display/Hero     | **EB Garamond**               | 64–80px / lh 1.05 / tracking -0.01em | 500     |
| H1–H4            | EB Garamond                   | 48 / 36 / 28 / 22px                  | 500–600 |
| Cifra de impacto | EB Garamond (o Inter tabular) | 56–72px, color bronce                | 500     |
| Eyebrow/caption  | Inter                         | 13–14px, UPPERCASE, tracking 0.14em  | 500–600 |
| Body             | **Inter**                     | 16–18px / lh 1.65                    | 400     |
| UI/labels/form   | Inter                         | 14–16px                              | 400–500 |

Cargar con `next/font/google` (EB Garamond, Inter), `display: swap`, subsets latin. Body móvil mínimo 16px. Line-length 65–75ch.

### Espaciado, layout y motion

- Escala base **4px**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Radios: 2px (botones), 4px (tarjetas). **Nada de rounded-2xl.**
- Sombras: mínimas; elevación sutil al hover `0 1px 2px rgba(16,36,59,.06)`.
- Max-width contenido **1200–1280px**; grid 12 col; márgenes generosos.
- Breakpoints: 375 / 768 / 1024 / 1440.
- Motion: fade-up 16–24px, 400–600ms ease-out (IntersectionObserver); **count-up** en `StatBlock`; hover = transición de color 200ms + subrayado bronce que crece. **Respetar `prefers-reduced-motion`** (sin transform, sin count-up).
- Fotografía **B/N alto contraste** (SCJN, libros, mármol), optimizada AVIF/WebP, con `alt` descriptivo. Marca de agua "P" serif sutil de fondo.

### Cifras de impacto (`StatBlock`) — el diferenciador

Número XXL en bronce + etiqueta pequeña uppercase. Ej.: **98%** · "reducción sobre una contingencia de $25M MXN — Sector Textil". **$55M** · "beneficio fiscal — Grupo papelero". Aparecen en Hero y como _badges_ en los sectores destacados. Count-up al entrar en viewport.

---

## 8. Autenticación y Seguridad

**No hay autenticación** (sitio público sin cuentas). La seguridad se concentra en el formulario y en las cabeceras:

- **Sin base de datos** → sin superficie de SQL injection.
- **Formulario:** validación Zod server-side, rate limit por IP, honeypot, Turnstile, anti header-injection, respuestas de error genéricas.
- **Security headers** (en `next.config.ts` o `middleware.ts`): `Content-Security-Policy` (permitir Turnstile/Vercel), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`, `Permissions-Policy` restrictiva.
- **Secretos** sólo en env (Vercel env vars). Nunca en el repo. `.env.local` git-ignored.
- **Dependencias mínimas**; correr `pnpm audit` antes de deploy.
- **Datos personales:** el formulario no persiste datos (solo los envía por correo). No meter PII en URLs/analytics.

---

## 9. Orden de Construcción (SECCIÓN CRÍTICA)

Construir **sección por sección**, verificando que compila y se ve bien en cada paso. Usar `/frontend-design` en cada sección de UI y `/ui-ux-pro-max` para consistencia.

**Paso 0 — Scaffold y base** _(ya hecho por The Architect)_
Next.js 15 + TS strict + Tailwind v4 + next-intl (es/en) + estructura de carpetas + tokens en `globals.css` + fuentes (EB Garamond/Inter) + `CLAUDE.md`. `pnpm dev` arranca con una home mínima.

**Paso 1 — Layout + SEO base**
`Header` (nav bilingüe, scroll-aware, `LocaleSwitcher`, CTA "Agendar consulta") + `Footer` (nav, datos de contacto, marca de agua "P") + metadata base por locale + `sitemap.ts` + `robots.ts` + hreflang. Componentes `ui/` base (`Button`, `SectionHeading`, `Reveal`, `Container`).

**Paso 2 — Contenido tipado**
Poblar `src/content/*` con los 3 pilares, 10 sectores (con casos y cifras), 10 alianzas, cobertura y `site.ts`. **Traducir EN** con registro legal formal. Poblar `messages/es.json` y `en.json` (chrome/UI).

**Paso 3 — Hero + Compromiso**
`Hero`: slogan, subtítulo, CTA, y **StatBlocks de impacto** (98%, $55M, +nacional/internacional) con count-up. `Compromiso`: filosofía (excelencia técnica · atención humana · enfoque práctico). Imagen B/N (SCJN).

**Paso 4 — Pilares + Metodología**
`Pilares`: 3 columnas 01/02/03 con hover bronce. `Metodologia`: análisis técnico-fiscal + estrategia jurídica + gestión documental; subservicios (litigio, auditorías, acompañamiento).

**Paso 5 — Sectores (interactivo)**
`Sectores`: Tabs/Accordion Radix con los 10 sectores; panel con resumen + casos; **badges de cifra** en Textil ($25M→98%) y Retail ($55M). Accesible por teclado.

**Paso 6 — Alianzas + Cobertura**
`Alianzas`: grid de 10 materias (iconos lucide). `CoverageMap`: SVG de México con pins + representación internacional (EE.UU./Europa/LatAm).

**Paso 7 — Contacto (formulario seguro + backend)**
`ContactForm` (RHF + Zod + Turnstile + estados loading/success/error) + canales directos (WhatsApp/tel/mail). `POST /api/contact` con todo el pipeline de §5 (`lib/validation.ts`, `lib/ratelimit.ts`, `lib/resend.ts`). Probar envío real end-to-end.

**Paso 8 — SEO completo + JSON-LD + OG**
Metadata por sección/locale, `JSON-LD` `LegalService` + `LocalBusiness` (dirección, geo, horarios), OG images, hreflang, canonical. Keywords del brief.

**Paso 9 — Reporter Torre + Analytics + Security headers**
`lib/reporter.ts` fail-open a la Torre de Control (env `TORRE_REPORTER_URL`). `@vercel/analytics` + `speed-insights`. Security headers en `next.config.ts`.

**Paso 10 — QA**
Accesibilidad (WCAG AA, foco, teclado, `alt`, `prefers-reduced-motion`), responsive (375/768/1024/1440), Lighthouse ≥95, E2E smoke con Playwright (todas las secciones cargan, idioma cambia, formulario envía).

**Paso 11 — Deploy**
Team **Brota** en Vercel → importar `Brota-mx/pagaza-abogados` → env vars → deploy → link público en el README. Dominio `pagaza.mx` cuando el cliente lo entregue (verificar Resend con ese dominio).

---

## 10. Setup del Entorno

### Prerrequisitos

- Node.js ≥ 20 (hay v24 en la máquina) · pnpm ≥ 9 (hay v11).

### Variables de Entorno

| Variable                         | Descripción                                                                 | Dónde se obtiene                            |
| -------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| `RESEND_API_KEY`                 | Envío de correo del formulario                                              | resend.com (proyecto **Brota**, no Galarza) |
| `CONTACT_TO_EMAIL`               | Destino de leads (`a@pagaza.mx`)                                            | Cliente                                     |
| `CONTACT_FROM_EMAIL`             | Remitente verificado (p.ej. `no-reply@pagaza.mx` o dominio Resend temporal) | Resend                                      |
| `UPSTASH_REDIS_REST_URL`         | Rate limiting                                                               | upstash.com (proyecto Brota)                |
| `UPSTASH_REDIS_REST_TOKEN`       | Rate limiting                                                               | upstash.com                                 |
| `TURNSTILE_SECRET_KEY`           | Verificación captcha (server)                                               | Cloudflare Turnstile                        |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Widget captcha (cliente)                                                    | Cloudflare Turnstile                        |
| `NEXT_PUBLIC_SITE_URL`           | URL canónica (Vercel o pagaza.mx)                                           | Vercel                                      |
| `TORRE_REPORTER_URL`             | Endpoint de la Torre de Control (fail-open)                                 | Torre de Control Galarza                    |

> Todos los servicios (Resend, Upstash, Turnstile, Vercel) deben crearse/organizarse en **cuentas/teams de Brota**, separados de Galarza y Personal.

### Comandos iniciales

```bash
pnpm install
cp .env.example .env.local   # y rellenar
pnpm dev                     # http://localhost:3000
```

---

## 11. Dependencias

### Core

| Paquete                                                                       | Propósito               |
| ----------------------------------------------------------------------------- | ----------------------- |
| `next`, `react`, `react-dom`                                                  | Framework               |
| `next-intl`                                                                   | i18n ES/EN              |
| `tailwindcss` (v4), `@tailwindcss/postcss`                                    | Estilos                 |
| `react-hook-form`, `zod`, `@hookform/resolvers`                               | Formulario + validación |
| `resend`                                                                      | Envío de correo         |
| `@upstash/ratelimit`, `@upstash/redis`                                        | Rate limiting           |
| `lucide-react`                                                                | Iconos                  |
| `@radix-ui/react-tabs`, `@radix-ui/react-accordion`, `@radix-ui/react-dialog` | Primitivas accesibles   |
| `@vercel/analytics`, `@vercel/speed-insights`                                 | Métricas                |
| `clsx`, `tailwind-merge`                                                      | `cn()` utility          |

### Dev

| Paquete                                   | Propósito |
| ----------------------------------------- | --------- |
| `typescript`, `@types/*`                  | Tipos     |
| `eslint`, `eslint-config-next`            | Lint      |
| `prettier`, `prettier-plugin-tailwindcss` | Formato   |
| `@playwright/test`                        | E2E smoke |

---

## 12. Estrategia de Deployment

- **Hosting:** Vercel, **Team "Brota"** (crear si no existe; NO usar el scope personal de Galarza). Importar repo `Brota-mx/pagaza-abogados`.
- **CI/CD:** cada push a `main` → producción; cada PR → preview URL automática (el "link para ver el borrador" que pidió el cliente/Brota).
- **Env vars:** cargar las de §10 en el proyecto Vercel (Production + Preview).
- **Dominio:** temporal `*.vercel.app`; migrar a **`pagaza.mx`** cuando el cliente entregue DNS (configurar dominio en Vercel + verificar dominio en Resend para envío profesional).
- **Ambientes:** Preview (PRs) y Production (main). Sin staging dedicado en v1.

---

## 13. Estrategia de Testing

- **Unit:** validación Zod (`lib/validation.ts`) y helpers (formateadores, `cn`). Vitest opcional.
- **Integración:** `POST /api/contact` — casos: válido, honeypot lleno, rate-limit excedido, Turnstile inválido, payload inválido.
- **E2E (Playwright):** la home carga en ES y EN; el `LocaleSwitcher` cambia idioma; los tabs de sectores funcionan por teclado; el formulario valida y muestra success/error; todos los anchors de nav saltan a su sección.
- Correr E2E + Lighthouse antes de cada deploy a producción.

---

## 14. Skills a Usar Durante el Build

| Skill                    | En qué paso           | Para qué                                                   |
| ------------------------ | --------------------- | ---------------------------------------------------------- |
| `/frontend-design`       | 1, 3–7 (cada sección) | UI distintiva, premium, no-plantilla                       |
| `/ui-ux-pro-max`         | 0–7                   | Consistencia del sistema (tokens, tipografía, componentes) |
| `/humanizalo`            | 2 (copy)              | Que el texto ES/EN no suene a IA                           |
| `/product-design`        | 3–6                   | Refinar jerarquía visual y flows                           |
| `/dataviz`               | 6 (mapa/cifras)       | Si se visualiza cobertura/impacto con datos                |
| `/verify`                | 7, 10                 | Verificar el formulario end-to-end                         |
| `/security-review`       | 7, 9                  | Revisar el endpoint y headers antes de deploy              |
| `/seo-audit` (si existe) | 8, 10                 | Auditoría SEO final                                        |

---

## 15. CLAUDE.md del Proyecto

> El archivo `CLAUDE.md` completo se crea en la raíz del proyecto durante el scaffold. Su contenido está en el propio repo (`pagaza-abogados/CLAUDE.md`) y cubre: comandos, stack en una línea, arquitectura y data-flow, reglas de organización de código, sistema de diseño con valores, variables de entorno y reglas no negociables. Es la fuente de verdad para cualquier sesión que construya sobre este scaffold.

---

## 16. Reglas No Negociables

1. **TypeScript strict, cero `any`.** Todo el contenido tipado (`LocalizedText`).
2. **Server Components por defecto**; `"use client"` sólo en componentes interactivos hoja.
3. **Validar SIEMPRE en el servidor** (Zod) el formulario; nunca confiar en el cliente. Rate-limit + honeypot + Turnstile obligatorios.
4. **Secretos sólo en env.** Nunca commitear `.env.local` ni claves.
5. **WCAG AA**: foco visible, teclado, `alt`, labels, contraste; color nunca como único indicador; respetar `prefers-reduced-motion`.
6. **Mobile-first, responsive** en 375/768/1024/1440. Sin scroll horizontal.
7. **Bilingüe real ES/EN**: nada hardcodeado; todo vía `content/*` o `messages/*`. hreflang correcto.
8. **Iconos SVG (lucide), nunca emojis.** Fuentes self-hosted (`next/font`).
9. **Reporter fail-open** a la Torre desde el día 1 (si el endpoint falla, el sitio no se cae).
10. **Sistema de marca**: navy `#16243b`, bronce `#B0894E`, EB Garamond + Inter, radios ≤4px, hairlines. Nada experimental ni "administrativo".
11. **Todo Brota separado** de Galarza/Personal: repo (org Brota.mx), Vercel (Team Brota), servicios (cuentas Brota).
12. Un componente por archivo, máx ~300 líneas; alias `@/` para `src/`.

```

```
