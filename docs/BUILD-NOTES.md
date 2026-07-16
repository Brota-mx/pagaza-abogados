# BUILD-NOTES - Pagaza Abogados

Este documento consolida en un solo lugar la auditoría del `BLUEPRINT.md`/scaffold, el plan de la Fase 1, el mapa de riesgo de la pieza crítica (formulario seguro, Fase 7) y las trampas del stack con sus mitigaciones. Está pensado para que una sesión de construcción fresca de Claude Code lo lea **junto a `BLUEPRINT.md` antes de escribir código**. Regla operativa: primero resolver los hallazgos de la auditoría (son decisiones/bloqueadores que cambian tokens, contenido y contratos), luego arrancar por la Fase 1, y tener a la vista la Fase 7 y las trampas del stack durante todo el desarrollo. **Repo raíz:** `C:\Users\jesus\Desktop\Brota\Pagaza Abogados` — todas las rutas debajo son relativas a esa raíz.

---

## Hallazgos de la auditoria - resolver primero

Revisado el `BLUEPRINT.md`, todo el scaffold en `src/`, los configs raíz y la fuente de contenido `work/complemento pdf.md`. Priorizado por impacto. Los ítems marcados "→ se resuelve en …" ya tienen su implementación aguas abajo en este documento; aquí queda la **decisión**.

### ALTO

**A1. El blueprint NO es "100% autocontenido": el contenido detallado vive solo en `work/`, que está git-ignored.**
`work/` está excluido en `.gitignore` (líneas 41-42, `/work`). El intro (línea 8) y §4 (línea 166) delegan los textos reales de los casos a `work/complemento pdf.md` (caso Manufactura de doble tributación, Farmacéutico/CSD, Automotriz/IVA exportación, etc.). Un clone fresco **no tiene** ese `.md` y pierde todo el contenido del Paso 2, contradiciendo la premisa "una instancia sin contexto previo debe poder construir siguiendo el blueprint".
**Fix:** (a) mover la fuente a una ruta versionada (`docs/contenido-fuente.md`, fuera del ignore), **o** (b) embeber los textos completos de los 10 sectores dentro del blueprint/`src/content` spec. No dejar el contenido canónico en una carpeta ignorada.

**A2. El bronce como TEXTO sobre fondo claro reprueba WCAG AA — incluye cifras del Hero que YA están en el scaffold.**
`--color-bronze #B0894E` sobre `--color-bg #F5F6F8` da ≈**2.93:1**: reprueba incluso texto grande (3.0:1) y muy lejos de normal (4.5:1). `page.tsx` ya renderiza las cifras con `text-bronze` sobre `bg` (líneas 29 y 35) → **reprueba AA hoy**. §7 usa bronce para hover, "link-bronce" y eyebrows sobre claro. Sobre navy el bronce sí pasa (≈4.55:1).
**Fix:** definir un token separado para bronce-sobre-claro (`--color-bronze-ink ≈ #7A5C2E`, ~5.6:1) en el `@theme` de `globals.css` y usarlo en **toda** tipografía sobre `bg`/`surface`; reservar `#B0894E` para texto sobre navy y para hairlines/decoración. Nunca el bronce como único indicador.
**Impacto en los snippets de la Fase 1 (abajo):** sustituir `text-bronze` por `text-bronze-ink` en todo texto sobre `bg`/`surface` — el eyebrow de `SectionHeading` en tono `dark`, la variante `link` de `Button`, y los `hover:text-bronze` del Header en su estado sólido/scrolled. Dejar `text-bronze` solo cuando el fondo es navy.

**A3. No hay camino ejecutable para el Paso 7 ("probar envío real E2E") ni `/verify` sin secretos de producción.**
- `CONTACT_FROM_EMAIL=no-reply@pagaza.mx` con `pagaza.mx` **aún no verificado en Resend** (el dominio se entrega después, §12 línea 405) → Resend rechaza el envío; en modo test solo permite `onboarding@resend.dev` y solo al dueño de la cuenta.
- Turnstile es **obligatorio** (Zod exige `turnstileToken`) pero, a diferencia del ratelimit, **no se declara fail-open en dev**: sin `NEXT_PUBLIC_TURNSTILE_SITE_KEY` el widget no monta y el form no se puede enviar localmente.
**Fix:** documentar en `.env.example`/blueprint las llaves de test de Cloudflare (sitekey `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`), poner `CONTACT_FROM_EMAIL` con el sandbox de Resend (`onboarding@resend.dev`) por defecto, y especificar bypass/fail-open de Turnstile cuando no hay `NEXT_PUBLIC_TURNSTILE_SITE_KEY` en dev, para que los Pasos 7/10 sean verificables.

### MEDIO

**M1. CSP diferida al Paso 9 sin checklist → alto riesgo de romper Turnstile y Analytics al activarla.**
`next.config.ts` omite `Content-Security-Policy` a propósito. Al añadirla, una CSP estricta sin allowances romperá en silencio el widget/iframe de Turnstile y los scripts de Vercel Analytics/SpeedInsights. **Decisión:** usar **CSP estática por header (sin nonce)** para no matar el SSG (ver trampa 4.1). El borrador completo del header vive en **Fase 7 → §CSP**; dejarlo escrito en el blueprint desde ya.

**M2. Inconsistencia del root layout + faltan boundaries `not-found`.**
§3 (línea 68) pide `src/app/layout.tsx` como "raíz mínimo". Es **incorrecto** para el patrón que el scaffold implementa bien: `[locale]/layout.tsx` YA renderiza `<html>` y el redirect lo hace el middleware. Crear ese root layout con `<html>` produciría **doble `<html>`**. Además `layout.tsx` llama `notFound()` para locale inválido y no existe ningún `not-found.tsx`; sin `app/layout.tsx`, el 404 por defecto queda sin envoltura `<html>` (ver trampa 1.3).
**Fix:** corregir §3 (NO crear `app/layout.tsx`); añadir `app/[locale]/not-found.tsx` (hereda fuentes) y un `app/global-error.tsx`/`app/not-found.tsx` global con su **propio** `<html><body>` (y las mismas clases `.variable` de fuente).

**M3. `sharp` no es dependencia y `next.config.ts` no configura `images`.**
§7 exige fotografía B/N optimizada AVIF/WebP vía `next/image`. Next 15 requiere `sharp` para optimización local (ya no hay fallback squoosh) y `pnpm-workspace.yaml` aprueba su build pero **no está declarado** en `package.json`.
**Fix:** agregar `sharp` a `dependencies` y `images.formats = ['image/avif','image/webp']` (+ `remotePatterns` si aplica) en `next.config.ts`.

**M4. La cursiva serif del slogan es falsa; y `next/font/google` contradice "self-hosted".**
El slogan flagship (`page.tsx` línea 24) usa `font-serif italic`, pero `EB_Garamond` se carga sin `style: ["italic"]` (layout líneas 11-16) → itálica **sintetizada** por el navegador en el elemento de marca más visible. Además §2/Regla #8 dicen "self-hosted" pero se usa `next/font/google`, que descarga las fuentes **en build** (requiere red).
**Fix:** añadir `style: ["normal","italic"]` al loader de EB Garamond; recortar pesos (hoy `["400","500","600","700"]`; el sistema usa 500–600 → quitar `700` y quizá `400` para aligerar LCP); y **decidir explícitamente**: self-host real (`next/font/local` con `.woff2` en `public/fonts/`) o dejar por escrito que "self-hosted" = el self-host en build de `next/font/google` (elimina la ambigüedad de Regla #8/§3). Detalle operativo en trampa 3.

**M5. Las secciones `Compromiso` y `Metodologia` no tienen fuente de contenido definida.**
§6 renderiza `<Compromiso/>` y `<Metodologia/>`, pero §3 `content/` solo lista `site`, `pilares`, `sectores`, `alianzas`, `types`. Con Regla #7 ("nada hardcodeado, todo bilingüe vía `content/*`") esas dos secciones quedan sin origen.
**Fix:** agregar `content/compromiso.ts` y `content/metodologia.ts` tipados y bilingües (la metodología de 3 disciplinas y "excelencia/atención/enfoque práctico" ya están en el `.md`).

**M6. Traducción EN: tarea manual grande y de alto riesgo terminológico con un solo ejemplo dado.**
§4 exige traducir a mano registro legal EN de 3 pilares + 10 sectores + casos + metodología, pero solo da un mapeo ("Amparo"). Términos como PAMA, REPSE, CSD, ASF, ISSSTE, "revisión de gabinete", "responsabilidad patrimonial del Estado" se prestan a EN literal incorrecto.
**Fix:** incluir en el blueprint un glosario fijo ES→EN (~15 términos) para bloquear la terminología **antes** del Paso 2.

**M7. `NextIntlClientProvider` sin `messages` — depende de herencia v4 no confirmada en el pin.**
`layout.tsx` línea 53 usa `<NextIntlClientProvider>` sin props. En v4 la herencia automática de mensajes al cliente existe, pero toda la capa interactiva (Header, ContactForm, Sectores, StatBlock, LocaleSwitcher) usará `useTranslations`; si la herencia falla con `^4.3.4`, **todos** revientan con "no messages" (ver trampa 1.4).
**Fix:** verificar la herencia con un client component real en el Paso 1; si no se confirma, pasar explícito `const messages = await getMessages(); <NextIntlClientProvider messages={messages}>` (o un subconjunto por namespace).

**M8. El bloque CSS de `prefers-reduced-motion` no detiene el count-up JS.**
`globals.css` (líneas 40-51) neutraliza `animation`/`transition`, pero el count-up del `StatBlock` (§7, diferenciador clave) se hará con `requestAnimationFrame`, que ese CSS **no** frena. El scaffold da falsa sensación de estar cubierto.
**Fix:** `StatBlock` debe leer `matchMedia('(prefers-reduced-motion: reduce)')` en JS y mostrar el valor final sin animar (ya es Regla #5).

**M9. Canal WhatsApp asumido sin dato ni formato, y `SiteInfo` incompleto.**
§Contacto/Paso 7 asumen WhatsApp pero no hay número ni formato `wa.me`. El tel `(55) 78-91-88-65` debe volverse `https://wa.me/525578918865`. El type `SiteInfo` (`types.ts`) no tiene campos para `whatsapp`, `nav` ni `redes`, pese a que §3 dice que `site.ts` incluye "nav, redes".
**Fix:** confirmar si el tel es WhatsApp, añadir el link normalizado y campos al `SiteInfo` (o declarar que `nav` vive en `messages`, como asume la Fase 1 de abajo).

**M10. Falta `metadataBase`.** OG/canonical/hreflang saldrían relativos y Next emitiría warning. → **Se resuelve en la Fase 1**: el `generateMetadata` de abajo ya incluye `metadataBase: new URL(SITE_URL)`.

### BAJO

- **B1.** `Container` aparece en Paso 1 como componente `ui/` base pero no en el manifiesto §3 (líneas 82-89). → Resuelto: la Fase 1 lo trata como base; alinear el manifiesto.
- **B2.** `@radix-ui/react-dialog` está en `dependencies` sin uso claro (¿nav móvil / overlay del menú?); `motion` se menciona en §2 pero no está instalado. Definir uso o quitar.
- **B3.** No hay script `typecheck` (`tsc --noEmit`) pese a "strict, cero any", ni `test`, ni `playwright.config.ts`, ni `playwright install` en el setup, aunque Playwright es dependencia y el Paso 10 lo usa. Añadirlos.
- **B4.** `pnpm-workspace.yaml` usa `allowBuilds` (válido solo en pnpm v11) sin campo `packages:`. La máquina tiene v11 (ok), pero el README dice "pnpm ≥ 9"; en 9/10 esa clave no aplica (sería `onlyBuiltDependencies`) y sharp/swc quedarían sin build. Fijar requisito a pnpm ≥ 11 (ver trampa 7.1).
- **B5.** `pnpm lint` = `next lint`, deprecado en Next 15.5 (se elimina en 16). Migrar a ESLint CLI.
- **B6.** `.prettierrc.json` con `prettier-plugin-tailwindcss` en Tailwind v4 necesita `tailwindStylesheet: "./src/styles/globals.css"` para ordenar clases custom (ver trampa 2.4).
- **B7.** Colisión de nombre `t`: helper de `LocalizedText` en `content/types.ts` vs `t` de `getTranslations`. Renombrar uno al importar ambos.
- **B8.** `EB_Garamond` carga peso `700` que la escala (§7: 400-600) no usa → payload extra. → Mismo fix que M4.
- **B9.** Tensión de orden: Regla #9 pide reporter a la Torre "desde el día 1", pero el orden lo pone en Paso 9. Aclarar cuál manda.

---

## Empezar aqui: Fase 1

**Objetivo del Paso 1:** cerrar el "chrome" del sitio (Header scroll-aware bilingüe + Footer), la base de componentes `ui/` reutilizables, y el SEO base (metadata por locale con hreflang/canonical, `sitemap.ts`, `robots.ts`) **sin romper el render 100% estático (SSG)** que ya trae el scaffold.

### 0. Estado actual verificado (NO re-hacer)

- `src/i18n/routing.ts` → `defineRouting({ locales: ['es','en'], defaultLocale: 'es' })`. `localePrefix` es `'always'` por defecto ⇒ `/es` y `/en` siempre prefijados y `/` redirige. Ideal para hreflang. **No tocar.**
- `src/i18n/request.ts` → `getRequestConfig` con `requestLocale` + `hasLocale`. **Correcto v4. No tocar.**
- `src/i18n/navigation.ts` → `createNavigation(routing)` exporta `Link, redirect, usePathname, useRouter, getPathname`. **Usar SIEMPRE este `Link`/`usePathname`, nunca los de `next/link`/`next/navigation`.**
- `src/middleware.ts` → `createMiddleware(routing)` con matcher que excluye `api`, `_next`, `_vercel` y archivos con extensión. `sitemap.xml`/`robots.txt` (llevan punto) quedan fuera del middleware ⇒ se sirven directo. **No tocar** (ver trampa 1.5).
- `src/app/[locale]/layout.tsx` → ya tiene `generateStaticParams`, `setRequestLocale(locale)`, fuentes `next/font/google` (EB Garamond + Inter con `variable`), `NextIntlClientProvider` y Analytics/SpeedInsights. **Se EDITA (no se reescribe):** metadata estática → `generateMetadata`, e insertar `<Header/>`/`<Footer/>`.
- `src/styles/globals.css` → tokens `@theme` (genera `bg-navy`, `text-bronze`, `border-line`, `font-serif`, etc.) + bloque `prefers-reduced-motion` global. **Se EDITA** para añadir `scroll-padding-top`, el token `--color-bronze-ink` (A2) y `style: italic` no aplica aquí sino al loader (M4).
- **No existe `src/app/layout.tsx` raíz, y es correcto:** en el patrón next-intl el `[locale]/layout.tsx` actúa como layout raíz (renderiza `<html>`). **No crear** un root layout en Fase 1 (ver M2 y trampa 1.3).

### 1. Archivos exactos a crear / editar

**CREAR**

| Ruta | Tipo | Rol |
|---|---|---|
| `src/app/sitemap.ts` | Server (metadata route) | Sitemap es/en + `alternates.languages` (hreflang) |
| `src/app/robots.ts` | Server (metadata route) | robots.txt + link al sitemap |
| `src/lib/seo.ts` | Módulo | `SITE_URL` normalizado + helpers de alternates (DRY entre layout y sitemap) |
| `src/content/site.ts` | Data tipada | `siteInfo` (tipo `SiteInfo`) + `NAV_SECTIONS` |
| `src/components/ui/Container.tsx` | Server | Ancho máx. 1280px + padding lateral responsive |
| `src/components/ui/Button.tsx` | Server (presentacional, sin hooks) | Variantes `primary`/`ghost`/`link`; render `<a>` o `<button>` |
| `src/components/ui/SectionHeading.tsx` | Server | Eyebrow + título serif + intro; `tone` light/dark |
| `src/components/ui/Reveal.tsx` | **Client** | Fade-up on-scroll con IntersectionObserver, respeta `prefers-reduced-motion` |
| `src/components/layout/Header.tsx` | **Client** | Navbar scroll-aware + CTA + menú móvil |
| `src/components/layout/LocaleSwitcher.tsx` | **Client** | ES/EN con `Link` localizado (crawlable, sin JS) |
| `src/components/layout/Footer.tsx` | Server (async) | Nav, datos de contacto, marca de agua "P" |
| `src/components/layout/MobileMenu.tsx` | **Client** (opcional) | Extraído del Header si supera ~300 líneas |

**EDITAR**

| Ruta | Cambio |
|---|---|
| `src/app/[locale]/layout.tsx` | `export const metadata` → `generateMetadata` async por locale; envolver `{children}` en `<main id="contenido">`; skip-link + `<Header/>` + `<Footer locale={locale}/>` dentro del provider; (opcional) `export const dynamicParams = false` |
| `src/app/[locale]/page.tsx` | Quitar su `<main>` propio (pasa al layout) → devolver `<>…</>`; mantener el hero placeholder hasta el Paso 3 |
| `src/messages/es.json` | Añadir namespaces `metadata`, `nav`, `cta`, `localeSwitcher`, `a11y`, `footer` |
| `src/messages/en.json` | Espejo EN (registro formal) |
| `src/styles/globals.css` | Añadir `html { scroll-padding-top: 5rem; }` + token `--color-bronze-ink` (A2) |
| `.env.example` / `.env.local` | Confirmar `NEXT_PUBLIC_SITE_URL` (fallback en `seo.ts` evita romper build si falta) |

### 2. next-intl v4 — patrones CORRECTOS para SSG

**Regla de oro SSG:** `setRequestLocale(locale)` debe llamarse en **cada** `layout` y **cada** `page` del segmento `[locale]`, **antes** de cualquier `getTranslations`/`useTranslations`. Sin eso, next-intl fuerza render dinámico (`headers()`), rompe el SSG y baja el Lighthouse (ver trampa 1.1).

**Server vs Client — qué función usar:**
- **Server Component (`async`)** → `import { getTranslations } from 'next-intl/server'`; `const t = await getTranslations('footer')` (usa el locale del request tras `setRequestLocale`) **o** `await getTranslations({ locale, namespace })` cuando tengas el `locale` explícito (**obligatorio en `generateMetadata`**).
- **Client Component (`'use client'`)** → `import { useTranslations, useLocale } from 'next-intl'`. Funciona porque el `NextIntlClientProvider` del layout envuelve al Header (ver M7 sobre `messages`).
- Para resolver `LocalizedText` de `content/*` en cliente usa `useLocale()`; en server pásalo por prop.

**`generateStaticParams`** (ya presente, correcto):
```ts
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

**Enlaces localizados** — SIEMPRE desde `@/i18n/navigation`:
```tsx
import { Link } from '@/i18n/navigation';
// <Link href="/">           → /es o /en según locale actual (prefijo automático)
// <Link href="/" locale="en"> → fuerza /en (usado en LocaleSwitcher)
```
> Anclas de una sola página (`#pilares`, `#contacto`) NO usan el `Link` localizado: usa `<a href="#pilares">` normal para que el scroll suave funcione sin re-navegar. El `Link` localizado es para cambiar ruta/locale.

**Optimización opcional de `NextIntlClientProvider`** (no requerida en Fase 1; reduce bundle cliente):
```tsx
import { getMessages } from 'next-intl/server';
const messages = await getMessages();
const clientMessages = { nav: messages.nav, cta: messages.cta, localeSwitcher: messages.localeSwitcher, a11y: messages.a11y };
// <NextIntlClientProvider messages={clientMessages}>
```

**LocaleSwitcher (patrón v4 canónico, crawlable, cero JS de navegación):**
```tsx
'use client';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname(); // pathname SIN prefijo de locale

  return (
    <div role="group" aria-label="Idioma / Language" className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-current/30">/</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === active ? 'true' : undefined}
            className={cn('transition-colors', loc === active ? 'text-bronze' : 'opacity-70 hover:opacity-100')}
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
```
Notas v4: `usePathname()` de `@/i18n/navigation` devuelve la ruta **sin** locale; `<Link locale={loc}>` re-inyecta el prefijo. En one-page el hash no se preserva al cambiar idioma (aceptable en v1).

### 3. SEO base

**`src/lib/seo.ts`:**
```ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://pagaza.mx';

// hreflang para la home (una ruta bilingüe). Con metadataBase, rutas relativas.
export function localeAlternates(locale: string) {
  return {
    canonical: `/${locale}`,
    languages: {
      es: '/es',
      en: '/en',
      'x-default': '/es',
    },
  } as const;
}
```

**`generateMetadata` por locale — reemplaza el `export const metadata` de `[locale]/layout.tsx`:**
```ts
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, localeAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' }); // locale EXPLÍCITO en metadata

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('title'), template: `%s · ${t('brand')}` },
    description: t('description'),
    alternates: localeAlternates(locale),           // canonical + hreflang es/en/x-default
    openGraph: {
      type: 'website',
      siteName: t('brand'),
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_MX',
      images: ['/og-image.png'], // placeholder; OG real en Paso 8
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.svg' },
  };
}
```
Claves v4/App Router: en `generateMetadata` **no** se llama `setRequestLocale`; se pasa `locale` explícito a `getTranslations`. `metadataBase` (resuelve M10) permite rutas relativas en `alternates`/`openGraph`. El `template` del título lo heredarán las páginas cuando definan `title`.

**`src/app/sitemap.ts`** (una entrada por locale, cada una con sus alternates):
```ts
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: `${SITE_URL}/es`, en: `${SITE_URL}/en` };
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }));
}
```

**`src/app/robots.ts`:**
```ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

### 4. Componentes base (`ui/` y `layout/`)

> Recordatorio A2: en estos snippets, cambiar `text-bronze` por `text-bronze-ink` en todo texto sobre fondo claro (eyebrow de `SectionHeading` tono dark, variante `link` de `Button`, hovers del Header sólido).

**`src/components/ui/Container.tsx`:**
```tsx
import { cn } from '@/lib/utils';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1280px] px-6 md:px-8', className)}>{children}</div>;
}
```

**`src/components/ui/Button.tsx`** (presentacional, sin `"use client"`; sirve en RSC y en cliente. Para enlaces con locale, reutilizar `buttonClasses` sobre el `Link` localizado):
```tsx
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'link';

const base =
  'inline-flex items-center justify-center gap-2 rounded-[2px] text-sm font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-navy px-7 py-3.5 text-white hover:bg-navy-2',
  ghost: 'border border-line px-7 py-3.5 text-navy hover:border-navy',
  link: 'text-bronze underline-offset-4 hover:underline', // ← usar text-bronze-ink sobre claro (A2)
};

export function buttonClasses(variant: Variant = 'primary', className?: string) {
  return cn(base, variants[variant], className);
}

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', href, className, children, ...rest }: Props) {
  const cls = buttonClasses(variant, className);
  if (href) return <a href={href} className={cls}>{children}</a>; // anclas #contacto, tel:, mailto:
  return <button className={cls} {...rest}>{children}</button>;
}
```
> Trampa 2.1: nunca interpolar nombres de utilidad (`` `bg-${variant}` ``) — Tailwind v4 los purga. Mapear a clases **literales** como arriba.

**`src/components/ui/SectionHeading.tsx`** (`tone: 'light'` para uso sobre navy):
```tsx
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow, title, intro, align = 'left', tone = 'dark', as: Heading = 'h2',
}: {
  eyebrow?: string; title: string; intro?: string;
  align?: 'left' | 'center'; tone?: 'dark' | 'light'; as?: React.ElementType;
}) {
  const light = tone === 'light';
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={cn('mb-4 text-xs font-medium uppercase tracking-[0.14em]', light ? 'text-bronze-soft' : 'text-bronze-ink')}>
          {eyebrow}
        </p>
      )}
      <Heading className={cn('font-serif text-3xl leading-tight md:text-4xl', light ? 'text-white' : 'text-navy')}>
        {title}
      </Heading>
      {intro && (
        <p className={cn('mt-4 text-base leading-relaxed md:text-lg', light ? 'text-white/80' : 'text-muted')}>{intro}</p>
      )}
    </div>
  );
}
```

**`src/components/ui/Reveal.tsx`** (client; muestra de inmediato si `prefers-reduced-motion`):
```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}
```
> El mismo patrón `matchMedia` en JS es obligatorio para el count-up del `StatBlock` (M8): el CSS de reduced-motion NO frena `requestAnimationFrame`.

**`src/components/layout/Header.tsx`** (client; scroll-aware transparente→sólido, CTA, menú móvil accesible):
```tsx
'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { NAV_SECTIONS } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const tCta = useTranslations('cta');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-line bg-surface/95 text-navy backdrop-blur' : 'bg-transparent text-white',
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight" aria-label="Pagaza Abogados Tributarios">
          PAGAZA
        </Link>

        <nav aria-label={t('menu')} className="hidden items-center gap-8 md:flex">
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm transition-colors hover:text-bronze">
              {t(s.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <a href="#contacto" className="rounded-[2px] bg-bronze px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-navy transition-colors hover:bg-bronze-soft">
            {tCta('consulta')}
          </a>
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t('close') : t('open')} className="md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-surface text-navy md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="py-2 text-sm hover:text-bronze">
                {t(s.key)}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-4">
              <LocaleSwitcher />
              <a href="#contacto" onClick={() => setOpen(false)} className="rounded-[2px] bg-navy px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white">
                {tCta('consulta')}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
```
Detalles clave: header `fixed` ⇒ el `<main>` necesita `scroll-padding-top` (globals) para que las anclas no queden bajo el header; transición solo de color (no `transform`), segura con reduced-motion; menú móvil con `aria-expanded`/`aria-controls`. En el paso siguiente añadir cierre con `Escape` y bloqueo de scroll si se vuelve overlay (o migrar a `@radix-ui/react-dialog`, ya instalado — ver B2). Si crece, extraer a `MobileMenu.tsx`.

**`src/components/layout/Footer.tsx`** (server async; datos de `content/site.ts`, marca de agua "P"):
```tsx
import { getTranslations } from 'next-intl/server';
import { siteInfo, NAV_SECTIONS } from '@/content/site';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/content/types';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const tel = siteInfo.telefono.replace(/[^\d]/g, '');

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Marca de agua "P" serif de fondo */}
      <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-6 select-none font-serif text-[22rem] leading-none text-white/[0.04]">
        P
      </span>

      <Container className="relative grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">PAGAZA</p>
          <p className="mt-4 max-w-xs font-serif text-lg italic text-white/80">{siteInfo.slogan[locale]}</p>
        </div>

        <nav aria-label={t('sections')} className="flex flex-col gap-2">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-bronze-soft">{t('sections')}</p>
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm text-white/80 hover:text-bronze-soft">{tNav(s.key)}</a>
          ))}
        </nav>

        <address className="not-italic">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-bronze-soft">{t('contact')}</p>
          <p className="text-sm text-white/80">{siteInfo.socio}</p>
          <a href={`tel:+52${tel}`} className="mt-1 block text-sm text-white/80 hover:text-bronze-soft">{siteInfo.telefono}</a>
          <a href={`mailto:${siteInfo.email}`} className="block text-sm text-white/80 hover:text-bronze-soft">{siteInfo.email}</a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">{siteInfo.direccion[locale]}</p>
        </address>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Pagaza Abogados Tributarios. {t('rights')}</p>
        </Container>
      </div>
    </footer>
  );
}
```
> Nota M9: si el tel es WhatsApp, añadir `siteInfo.whatsapp` normalizado (`https://wa.me/525578918865`) y su campo en `SiteInfo`.

### 5. Contenido y mensajes

**`src/content/site.ts`** (usa el tipo `SiteInfo`; `NAV_SECTIONS` mapea id de ancla → clave de `messages.nav`):
```ts
import type { SiteInfo } from './types';

export const siteInfo: SiteInfo = {
  slogan: {
    es: 'La estrategia correcta siempre gana. Con esta definición de éxito, nunca perdemos.',
    en: 'The right strategy always wins. With this definition of success, we never lose.',
  },
  socio: 'Alfonso Pagaza',
  telefono: '(55) 78-91-88-65',
  email: 'a@pagaza.mx',
  direccion: {
    es: 'Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, CDMX',
    en: 'Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, Mexico City',
  },
};

export const NAV_SECTIONS = [
  { id: 'compromiso', key: 'compromiso' },
  { id: 'pilares', key: 'pilares' },
  { id: 'metodologia', key: 'metodologia' },
  { id: 'sectores', key: 'sectores' },
  { id: 'alianzas', key: 'alianzas' },
  { id: 'contacto', key: 'contacto' },
] as const;
```

**`src/messages/es.json`** — añadir (mantener el bloque `home` existente):
```json
{
  "metadata": {
    "brand": "Pagaza Abogados Tributarios",
    "title": "Pagaza Abogados Tributarios · Estrategia fiscal de élite en CDMX",
    "description": "Despacho fiscalista boutique en Lomas de Chapultepec. Protección patrimonial, consultoría y litigio fiscal, administrativo y constitucional para empresas y patrimonios de alto perfil."
  },
  "nav": {
    "compromiso": "Firma", "pilares": "Servicios", "metodologia": "Metodología",
    "sectores": "Sectores", "alianzas": "Alianzas", "contacto": "Contacto",
    "menu": "Menú principal", "open": "Abrir menú", "close": "Cerrar menú"
  },
  "cta": { "consulta": "Agendar consulta" },
  "localeSwitcher": { "label": "Cambiar idioma" },
  "a11y": { "skipToContent": "Saltar al contenido" },
  "footer": {
    "sections": "Navegación", "contact": "Contacto",
    "rights": "Todos los derechos reservados."
  }
}
```
**`src/messages/en.json`** — espejo EN (registro formal-legal): `"title": "Pagaza Abogados Tributarios · Elite Tax Strategy in Mexico City"`; `nav`: `Firm / Services / Methodology / Sectors / Alliances / Contact`; `cta.consulta`: `"Schedule a consultation"`; `a11y.skipToContent`: `"Skip to content"`; `footer`: `Navigation / Contact / All rights reserved.`

### 6. Ediciones puntuales

**`src/app/[locale]/layout.tsx`** — quitar `export const metadata` (lo sustituye `generateMetadata` de §3) e insertar el chrome dentro del provider, con `<main>` y skip-link. El cuerpo queda:
```tsx
const { locale } = await params;
if (!hasLocale(routing.locales, locale)) notFound();
setRequestLocale(locale);
const t = await getTranslations('a11y');

return (
  <html lang={locale} className={`${ebGaramond.variable} ${inter.variable}`}>
    <body>
      <NextIntlClientProvider>
        <a href="#contenido" className="sr-only rounded-[2px] bg-navy px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]">
          {t('skipToContent')}
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer locale={locale as Locale} />
      </NextIntlClientProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);
```
Añadir imports de `getTranslations`, `Header`, `Footer`, `Locale`. Opcional hardening: `export const dynamicParams = false;`.

**`src/app/[locale]/page.tsx`** — cambiar el `<main …>` externo por `<>…</>` (el `<main>` vive ahora en el layout); no duplicar. Mantener `setRequestLocale(locale)` + `getTranslations('home')` tal cual.

**`src/styles/globals.css`** — añadir tras el bloque `html`:
```css
html { scroll-padding-top: 5rem; } /* offset del header fijo (h-20) para anclas */
```
Y en el `@theme`, el token de A2: `--color-bronze-ink: #7A5C2E;`.

### 7. Orden de implementación (incremental, compila en cada paso)

1. `src/lib/seo.ts` → `src/content/site.ts` → namespaces en `messages/es.json` y `en.json`.
2. `ui/`: `Container` → `Button` → `SectionHeading` → `Reveal`.
3. `layout/`: `LocaleSwitcher` → `Header` → `Footer`.
4. Editar `[locale]/layout.tsx` (metadata + chrome), `page.tsx` (quitar `<main>`), `globals.css` (`scroll-padding-top` + `bronze-ink`).
5. `app/robots.ts` → `app/sitemap.ts`.
6. `pnpm lint` + `pnpm build` y verificación.

### 8. Definición de "hecho" (verificación Fase 1)

- `pnpm build`: `/es` y `/en` **prerenderizados (SSG/●)**, no dinámicos; `/sitemap.xml` y `/robots.txt` generados. Si salen dinámicos ⇒ falta `setRequestLocale`.
- `pnpm lint` limpio; `pnpm dev`: `/` redirige a `/es`; el switcher lleva `/es`↔`/en` conservando la ruta.
- View-source de `/es`: `<link rel="alternate" hreflang="es|en|x-default">`, `<link rel="canonical" href=".../es">`, `<html lang="es">` (y `lang="en"` en `/en`); títulos/description distintos por idioma.
- `/sitemap.xml` con dos `<url>` (es/en) y sus `xhtml:link` alternates; `/robots.txt` con `Disallow: /api/` y `Sitemap:`.
- Header: transparente sobre el hero, sólido con hairline al hacer scroll; nav ancla con offset correcto; menú móvil abre/cierra con teclado (`aria-expanded`).
- A11y: skip-link visible al tabular, foco visible (ring bronce), `Footer` con `<address>` y `tel:`/`mailto:`; con `prefers-reduced-motion` no hay fade/translate en `Reveal`. Contraste del bronce sobre claro corregido con `bronze-ink` (A2).

### 9. Recordatorios v4 (Fase 1)

- No mezclar `next/link`/`next/navigation` con los de `@/i18n/navigation` (rompe el prefijo de locale).
- `getTranslations` en `generateMetadata` **requiere** `{ locale }` explícito.
- Anclas `#seccion` con `<a>` normal, no con `Link` localizado.
- `sitemap.ts`/`robots.ts` van en `src/app/` (no en `[locale]/`); el matcher del middleware ya los excluye por llevar punto.
- `og-image.png`/`favicon.svg` son placeholders de Fase 1; el OG real y el JSON-LD (`LegalService`/`LocalBusiness`) son Paso 8.

---

## Pieza critica: formulario seguro (Fase 7)

> **Pieza:** `POST /api/contact` — única superficie dinámica de un sitio 100% SSG. Es el punto de mayor riesgo porque es el **único** lugar donde entra input no confiable, dispara un efecto lateral (envío de correo con costo/reputación en Resend) y toca terceros (Upstash, Cloudflare, Resend). No hay DB → el riesgo NO es SQLi; es **abuso (spam/DoS/costo), header-injection en el correo, fuga de información en errores y bypass del anti-bot**.
>
> **Stack:** Route Handler de Next.js 15 (App Router, **runtime Node** — no Edge, por Resend y sanitización) + Zod + `@upstash/ratelimit` + honeypot + Cloudflare Turnstile (verificación server-side) + Resend. Reporter fail-open a la Torre en cada rechazo/uso relevante.

### 1) Happy path

1. **Cliente (`ContactForm`, RHF + Zod):** el usuario llena `nombre`, `email`, `mensaje` (y opcionales), resuelve **Turnstile** (obtiene `turnstileToken`), el honeypot `_hp` queda **vacío** y oculto. RHF valida por UX (no por seguridad) y hace `POST /api/contact` con `Content-Type: application/json`.
2. **Servidor — parseo defensivo:** `request.json()` dentro de `try/catch`. Body malformado o `Content-Type` incorrecto → `400 BAD_REQUEST` (nunca 500).
3. **Rate limit por IP:** se extrae la IP (`x-forwarded-for`/`x-real-ip`) y se consulta `@upstash/ratelimit` (sliding window 5/10 min). Dentro del límite → continúa.
4. **Honeypot:** `_hp` vacío/ausente → continúa (humano).
5. **Validación Zod (shape + límites):** `contactSchema.safeParse(body)`. Éxito → `data` tipado y `.trim()` aplicado.
6. **Anti header-injection:** guard explícito verifica que `nombre`/`email`/`empresa` no contengan `\r`/`\n`/`%0a`/`%0d`/controles (ya reforzado por regex en Zod).
7. **Turnstile server-side:** `POST …/siteverify` con `secret` + `response` + `remoteip`. `{ success: true }` → continúa.
8. **Resend:** correo con asunto fijo del servidor, cuerpo con campos sanitizados, `to = CONTACT_TO_EMAIL`, `from = CONTACT_FROM_EMAIL` **verificado**, `reply_to = email` del prospecto.
9. **Reporter (fail-open):** `void report(...).catch(()=>{})` sin bloquear.
10. **Respuesta:** `200 { success: true }`. El cliente muestra `success`, limpia el form y **resetea Turnstile** (los tokens son de un solo uso).

### 2) Modos de falla (todos) — manejo y HTTP status

| # | Falla | Detección | HTTP | Respuesta | Efecto lateral |
|---|-------|-----------|------|-----------|----------------|
| A | JSON malformado / Content-Type inválido | `try/catch` en `request.json()` | **400** | `{code:"BAD_REQUEST"}` genérico | No envía |
| B | Rate-limit excedido | `ratelimit.limit(ip)` → `success:false` | **429** | `{code:"RATE_LIMITED"}` + `Retry-After` + `X-RateLimit-Reset` | Reporter "rate_limited". NO llama Turnstile/Resend |
| C | Honeypot lleno (`_hp` ≠ "") | check tras parseo | **200** (falso positivo deliberado) | `{success:true}` — el bot cree que funcionó | No envía. Reporter "honeypot_hit". Nunca revelar detección |
| D | Turnstile inválido/vencido/reusado | siteverify → `success:false` | **400** | `{code:"CAPTCHA_FAILED"}` | No envía. Reporter "captcha_failed". Cliente resetea widget |
| E | Turnstile caído / timeout | `fetch` lanza / status ≥500 / timeout (~5s) | **503** (**fail-CLOSED**) | `{code:"CAPTCHA_UNAVAILABLE"}` | No envía. **NO fail-open** (sería relay de spam abierto) |
| F | Payload Zod inválido | `safeParse` → `error` | **400** | `{code:"VALIDATION_ERROR", details:fieldErrors}` sin stack | No envía. `details` seguro (campo + reglas) |
| G | Intento de header-injection | regex Zod + guard | **400** | `{code:"VALIDATION_ERROR"}` genérico (no confirmar vector) | No envía. Reporter "header_injection_attempt" |
| H | Resend caído / key inválida / dominio no verificado | `send` → `error`/`throw` | **500** | `{code:"INTERNAL_ERROR", message:"…Escríbenos a a@pagaza.mx."}` cero detalles del proveedor | Reporter "resend_error" solo hacia la Torre. Fallback UX (canal directo) |
| I | Falla del Reporter | `report()` rechaza | — | Ninguna | **Fail-open** (`.catch`); el correo ya se envió |
| J | Falta env crítica | check lazy | **500** (o **503** si Upstash) | genérico | Reporter "config_error". Nunca filtrar qué env falta |
| K | Método ≠ POST | solo se exporta `POST` | **405** (automático) | — | — |

**Orden endurecido (fail-cheap → fail-expensive):** `parse JSON → rate-limit → honeypot → Zod (shape + anti-injection) → Turnstile (red) → Resend (red) → reporter`. **Decisión:** validar shape con Zod **antes** de gastar la llamada de red a Turnstile (diverge del pipeline literal del §5 que lista Turnstile antes) para no amplificar DoS ni quemar verificaciones con payloads basura. Documentarlo en el `Plan - Pagaza`.

### 3) Contratos

**3.1 Esquema Zod (`src/lib/validation.ts`)**
```ts
import { z } from "zod";

// Debe coincidir 1:1 con los ids de src/content/sectores.ts (los 10 sectores).
export const SECTOR_IDS = [
  "textil", "retail", "manufactura", "energia", "inmobiliario",
  "financiero", "tecnologia", "agroindustria", "logistica", "salud",
] as const;

// Rechaza saltos de línea y controles (anti header-injection) en campos de cabecera.
const noControlChars = /^[^\r\n\t\f\v\u0000-\u001F\u007F]*$/;

export const contactSchema = z.object({
  nombre: z.string().trim().min(2).max(120).regex(noControlChars),
  empresa: z.string().trim().max(160).regex(noControlChars).optional().or(z.literal("")),
  email: z.string().trim().toLowerCase().email().max(160).regex(noControlChars),
  telefono: z.string().trim().max(40).regex(/^[0-9+()\s-]*$/).optional().or(z.literal("")),
  sector: z.enum(SECTOR_IDS).optional(),
  mensaje: z.string().trim().min(10).max(2000),        // \n permitido (es cuerpo, no cabecera)
  _hp: z.string().max(0).optional().or(z.literal("")), // honeypot: DEBE venir vacío
  turnstileToken: z.string().min(1).max(2048),
  locale: z.enum(["es", "en"]),
}).strict(); // rechaza campos extra (defensa prototype pollution / inesperados)

export type ContactInput = z.infer<typeof contactSchema>;
```
**Límites (fuente de verdad):** `nombre` 2–120 · `empresa` 0–160 · `email` válido ≤160 · `telefono` 0–40 (solo `0-9+()- `) · `sector` ∈ 10 ids (opcional) · `mensaje` 10–2000 · `turnstileToken` 1–2048 · `locale` `es|en`. **Límite de body:** rechazar payloads > ~16 KB antes de parsear (defensa cheap contra `mensaje` gigante / bomba JSON).

**3.2 Rate-limit por IP (`src/lib/ratelimit.ts`)**
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 req / 10 min por IP
  prefix: "pagaza:contact",
  analytics: true,
});

// IP: en Vercel confiar en la cabecera de plataforma (request.ip ya no existe en Next 15).
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0].trim()) || req.headers.get("x-real-ip") || "0.0.0.0";
}
```
- Ventana: sliding window **5/10 min/IP**, clave `pagaza:contact:<ip>`.
- `x-forwarded-for` es spoofeable en general, pero **en Vercel** la plataforma la fija (usar el valor izquierdo). No usar cookies/headers de cliente como clave.
- **429:** incluir `Retry-After` y `X-RateLimit-Reset`. Si Upstash cae: **503** genérico (no fail-open peligroso). **Fail-open SOLO por config ausente en dev** (ver trampa 6.2), nunca fail-closed por falta de credenciales locales.

**3.3 Formato de respuesta consistente**
```ts
// Éxito (único shape, siempre 200)
{ "success": true }

// Error (todos los fallos; mismo envelope)
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED" | "CAPTCHA_FAILED" | "CAPTCHA_UNAVAILABLE"
          | "VALIDATION_ERROR" | "BAD_REQUEST" | "INTERNAL_ERROR",
    "message": string,                       // genérico, i18n por `locale`
    "details"?: Record<string, string[]>     // SOLO en VALIDATION_ERROR (fieldErrors de Zod)
  }
}
```
**Regla de oro:** el `message` es genérico y localizable; **nunca** contiene stack traces, nombres de env, respuestas de Resend/Cloudflare ni el vector detectado. El cliente mapea `code`→copy vía `messages/{es,en}.json`. Todas las respuestas: `Content-Type: application/json`, `Cache-Control: no-store`.

**3.4 Sanitización anti header-injection (`src/lib/sanitize.ts`)**
Doble barrera: (1) regex `noControlChars` en Zod; (2) guard explícito antes de armar el correo:
```ts
const HEADER_FIELDS = [data.nombre, data.email, data.empresa ?? ""];
if (HEADER_FIELDS.some(v => /[\r\n]|%0a|%0d/i.test(v))) {
  return json(400, { success:false, error:{ code:"VALIDATION_ERROR", message: t("genericValidation") }});
}
```
El **asunto** lo fija el servidor (constante, ej. `"Nuevo contacto — Pagaza"`), nunca se interpola input en cabeceras. `reply_to = data.email` (validado, sin saltos). El `mensaje` (que sí puede tener `\n`) va **solo en el cuerpo**; si el cuerpo es HTML se escapa (`&lt;`) — preferir cuerpo `text`.

**3.5 Verificación server-side de Turnstile (`src/lib/turnstile.ts`)**
```ts
export async function verifyTurnstile(token: string, ip: string): Promise<
  { ok: true } | { ok: false; reason: "failed" | "unavailable" }
> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
        remoteip: ip,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return { ok: false, reason: "unavailable" }; // 5xx CF → 503
    const data = (await res.json()) as { success: boolean };
    return data.success ? { ok: true } : { ok: false, reason: "failed" }; // 400
  } catch {
    return { ok: false, reason: "unavailable" }; // timeout/red → 503, fail-CLOSED
  } finally {
    clearTimeout(t);
  }
}
```
Server-side **obligatorio** (el `NEXT_PUBLIC_TURNSTILE_SITE_KEY` del cliente no verifica nada). Token de **un solo uso** → el cliente resetea el widget tras cada submit. Timeout con `AbortController`. **Fail-closed** ante caída de CF (modo E).

**3.6 CSP y allowances (§CSP — Paso 9, `next.config.ts headers()`)**
Hoy `next.config.ts` **no incluye `Content-Security-Policy`**. **Decisión (M1 + trampa 4.1): CSP estática por header, sin nonce**, para no matar el SSG. Header:
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com;
  frame-src https://challenges.cloudflare.com;
  connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  form-action 'self';
  frame-ancestors 'none';
  base-uri 'self';
  object-src 'none';
  upgrade-insecure-requests
```
- **Turnstile:** `script-src` (carga `api.js`) + `frame-src` (reto en iframe) + `connect-src` (postback).
- **Vercel Analytics/Speed-Insights:** `script-src https://va.vercel-scripts.com` + `connect-src https://vitals.vercel-insights.com` (los endpoints de recolección son same-origin `/_vercel/*`, cubiertos por `'self'`).
- `frame-ancestors 'none'` refuerza el `X-Frame-Options: DENY` ya presente; `form-action 'self'` evita exfiltración del POST; `object-src 'none'` y `base-uri 'self'` cierran vectores clásicos. Fuentes/CSS son self-hosted (`next/font`), no hace falta abrir `fonts.googleapis.com`/`gstatic.com`.
- **Deuda:** `'unsafe-inline'` en `script-src` es un compromiso; el nonce por request choca con el SSG (trampa 4.1). Registrar la deuda en el `Plan - Pagaza` si se acepta el compromiso inicial.

### 4) Checklist de seguridad (Fase 7)

- [ ] **Validación server-side con Zod** (`safeParse`, `.strict()`, todos los límites del §3.1). El cliente valida solo por UX.
- [ ] **Rate-limit por IP** (5/10 min, sliding window), clave `pagaza:contact:<ip>`; **429** con `Retry-After`; **503** si Upstash cae (no fail-open); fail-open solo por config ausente en dev.
- [ ] **Honeypot `_hp`** → **200 falso-positivo**, sin enviar, sin revelar detección.
- [ ] **Turnstile verificado server-side** con `secret`; token de un solo uso; timeout 5 s; **fail-closed (503)** si CF cae; **400** si es inválido/duplicado.
- [ ] **Anti header-injection** doble barrera (regex Zod + guard) sobre `nombre`/`email`/`empresa`; asunto fijado por servidor; `mensaje` solo en cuerpo (escapado si HTML).
- [ ] **Errores genéricos y consistentes**; **cero** stack traces, envs o respuestas de proveedores al cliente.
- [ ] **Orden fail-cheap**; límite de body (~16 KB).
- [ ] **Runtime Node** (no Edge); método **solo POST** (405 al resto); `Cache-Control: no-store`.
- [ ] **Secretos solo en env de Vercel** (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, Upstash); `.env.local` git-ignored; el site key público es el único `NEXT_PUBLIC_*`.
- [ ] **Resend:** dominio remitente verificado (`CONTACT_FROM_EMAIL`), `reply_to` = email del prospecto; **500 genérico** + fallback UX si falla.
- [ ] **CSP completa** desplegada (§3.6), más los headers ya presentes (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`).
- [ ] **Sin persistencia de PII**: el lead solo viaja por correo; nada de PII en URLs/analytics.
- [ ] **Reporter fail-open** a la Torre en cada rechazo relevante, sin bloquear.
- [ ] **`pnpm audit`** limpio; dependencias mínimas.
- [ ] **Prueba E2E real:** envío exitoso llega a `a@pagaza.mx`; cada modo de falla (A–K) devuelve el status y shape esperados.

**Riesgos residuales:** (1) token de Turnstile no reseteado tras recarga → falsos 400; (2) atacante que agota Upstash (costo) — mitigado por el propio rate-limit y el límite de tamaño; (3) reputación de Resend si un bypass del captcha genera spam — por eso el captcha es **fail-closed**; (4) IP compartida (NAT corporativo) puede pegar en el 429 legítimo — considerar límite más holgado o segundo factor (email) si el cliente lo reporta.

---

## Trampas del stack y mitigaciones

Notas de campo para este scaffold (`pnpm 11.13.0`, `node v24`, `next 15.5.4`, `next-intl ^4.3.4`, `tailwindcss ^4`, lockfile `9.0`, sin `packageManager`, `[locale]/layout.tsx` como layout raíz). Cada trampa: **síntoma → causa → mitigación**.

### 1. next-intl v4 + App Router SSG

**1.1 — Olvidar `setRequestLocale` apaga el SSG de toda la rama.** Síntoma: la página sale como `ƒ (Dynamic)` o revienta con `Couldn't find next-intl locale…`. Causa: next-intl necesita `setRequestLocale(locale)` **antes** de cualquier API en cada page/layout del segmento. Mitigación: en cada componente **server** que llame a next-intl, primero `const { locale } = await params; setRequestLocale(locale);`. Las secciones que reciben contenido por props (`Hero`, `Pilares`) NO lo necesitan — solo los archivos que Next trata como boundary de ruta o que llaman `getTranslations`. Verificar en `pnpm build`: todo `○`/`●`, nada `ƒ` salvo `/api/contact`.

**1.2 — `generateMetadata` localizado también apaga el SSG.** Si usa `getTranslations` necesita el `{ locale }` explícito (no `setRequestLocale`, que ahí no corre) — cubierto por el snippet de la Fase 1 §3. Usar `await params` (Promise en Next 15).

**1.3 — No existe `app/layout.tsx` raíz: `not-found`/`global-error` quedan sin `<html>`.** Síntoma: una URL fuera de patrón o un `notFound()` que escapa del árbol `[locale]` da página en blanco / error de root layout. Causa: aquí el layout raíz **es** `[locale]/layout.tsx`; un `app/not-found.tsx` o `app/global-error.tsx` se renderizan FUERA de él. Mitigación (ver M2): usa `[locale]/not-found.tsx` (hereda fuentes) y, si agregas boundaries globales, que rendericen su **propio** `<html><body>` con las mismas clases `.variable`. NO añadas `app/page.tsx`/`app/layout.tsx`.

**1.4 — `NextIntlClientProvider` sin `messages`.** Síntoma: un client component lanza `MISSING_MESSAGE`, o el bundle crece porque viaja el JSON completo. Causa: en v4 sin prop `messages` hereda del request y envía **todos** los mensajes del locale. Mitigación: mantén `messages/*.json` con todos los namespaces que consumen los client components; si crece, pasa subconjunto (`<NextIntlClientProvider messages={pick(messages,['form','nav'])}>`). Textos de dominio (pilares/sectores) NO por messages: por props desde el server. Ver M7 (verificar herencia en Paso 1).

**1.5 — Matcher del middleware: si lo tocas, rompes `/api/contact` o los archivos SEO.** Síntoma: el POST recibe `307` a `/es/api/contact`, o `sitemap.xml`/`robots.txt` se redirigen con prefijo. Causa: el matcher `["/", "/(es|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"]` excluye a propósito `api`, `_next`, `_vercel` y todo con punto (extensión). Mitigación: no toques el matcher salvo para **agregar** exclusiones. Rutas de metadata sin extensión (`/es/opengraph-image`) quedan cubiertas por `/(es|en)/:path*`. Test de humo: `curl -i -X POST /api/contact` debe devolver `400/429/200`, nunca `3xx`.

**1.6 — `params` es `Promise` en Next 15.** Tipar siempre `params: Promise<{ locale: string }>` y `await` antes de usar (en `generateMetadata`, `opengraph-image.tsx`, secciones que reciban params).

**1.7 — `dynamicParams` y locales fuera de lista.** Cubierto por el guard `if (!hasLocale(...)) notFound()`. Para cero render dinámico: `export const dynamicParams = false` en `[locale]/layout.tsx`.

### 2. Tailwind CSS v4 (@theme, sin config)

**2.1 — Clases por concatenación se purgan.** `` `text-${sector.color}` `` sale sin estilo en prod. v4 escanea el source estáticamente; nombres no literales se eliminan. Mitigación: mapea a clases **literales** (`const styles = { primary: 'bg-navy text-white' }`) + `cn()`. Para forzar generación: `@source inline("bg-navy text-bronze …")` en `globals.css`. Riesgo alto en `Button` (variantes) y `Sectores`/`StatBlock` (badges).

**2.2 — Opacidad sobre tokens custom (`text-muted/70`).** Funciona vía `color-mix()` si el token está en `@theme` (`--color-*`, lo está). En navegadores muy viejos degrada a sólido; para el target moderno funciona. Si algún caso no rinde, define variante explícita o `rgb(... / <alpha>)`.

**2.3 — PostCSS: no agregar `autoprefixer` ni `postcss-import`.** `postcss.config.mjs` usa solo `@tailwindcss/postcss`, que ya hace import-inlining y prefijado. Añadir los plugins de v3 rompe el pipeline. Déjalo con un solo plugin.

**2.4 — `prettier-plugin-tailwindcss` no ordena clases custom sin apuntar al stylesheet.** Sin `tailwind.config.ts` el plugin no sabe dónde vive el theme. Mitigación (B6): en Prettier `"tailwindStylesheet": "./src/styles/globals.css"` + `plugins: ["prettier-plugin-tailwindcss"]`.

**2.5 — El `@import "tailwindcss";` debe ir primero.** `globals.css` declara `--font-serif: var(--font-eb-garamond)…` en `@theme` (correcto). Si alguien mueve el `@import` o mete otro antes, v4 no arranca. Conserva el orden.

**2.6 — Detección de sources si el repo es subdirectorio.** En Vercel salen clases sin estilo aunque local esté bien. v4 ancla la auto-detección al root del proyecto/git. Mitigación: fija el **Root Directory** de Vercel a la carpeta del sitio; si hace falta, `@source "../";` en `globals.css`.

### 3. next/font (EB Garamond + Inter)

**3.1 — `next/font/google` exige red en build.** Self-hostea pero **descarga en build-time** desde Google; sin red (CI aislado) falla. En Vercel hay red. Para build hermético, migra a `next/font/local` con `.woff2` en `public/fonts/`; cachea `.next/cache` en CI. (Decisión pendiente en M4.)

**3.2 — La `variable` de la fuente debe estar en un ancestro.** `font-serif` resuelve `var(--font-eb-garamond)`, que solo existe si `ebGaramond.variable` está en el DOM por encima. Hoy está en `<html>` — correcto. Se rompe si un `not-found`/`global-error` fuera de `[locale]` renderiza sin esa clase (ver 1.3): incluir las mismas `.variable`.

**3.3 — Falta la itálica de EB Garamond → itálica sintética.** El slogan flagship (`page.tsx` línea 24, `italic`) se ve oblicuo/deformado. `EB_Garamond({...})` solo carga `style: normal`. Mitigación (M4): `style: ["normal", "italic"]`; y recortar pesos (quitar `700`, quizá `400`) para aligerar LCP.

**3.4 — `@theme` con `var()`: estático, no metas valores dinámicos.** Trata los tokens de `@theme` como estáticos; para overrides usa la variable de la instancia (`ebGaramond.variable`) o `style={{ fontFamily }}`.

### 4. Cloudflare Turnstile + CSP estricta

**4.1 — CSP con nonce mata el SSG (la trampa mayor del Paso 9).** Las CSP con nonce requieren leer el nonce del request por render → Next opta por dinámico. **Decisión (M1):** CSP **estática por header** sin nonce; acepta `script-src 'self' 'unsafe-inline'` (el bootstrap de hidratación inyecta inline) y `style-src 'self' 'unsafe-inline'` (next/font y Tailwind inyectan estilos inline). Documentar el trade-off.

**4.2 — La CSP bloquea el widget/iframe/verificación de Turnstile.** Consola: `Refused to load … challenges.cloudflare.com`. Turnstile carga `api.js`, se renderiza en iframe y hace fetch a ese host. Permitir: `script-src … https://challenges.cloudflare.com`, `frame-src https://challenges.cloudflare.com`, `connect-src 'self' https://challenges.cloudflare.com` (bloque completo en Fase 7 §3.6). `@vercel/analytics`/`speed-insights` recolectan same-origin (`/_vercel/*`) → cubiertos por `'self'`.

**4.3 — `X-Frame-Options: DENY` NO rompe Turnstile (falsa alarma).** XFO controla si **tu** sitio puede ser enmarcado por otros; no afecta que tú embebas el iframe de Turnstile. Deja `DENY`; lo que gobierna a Turnstile es `frame-src` de la CSP.

**4.4 — Token de Turnstile de un solo uso y con expiración (~300s).** Reenvíos dan `400`. Mitigación: en `ContactForm` resetea el widget (`turnstile.reset()`) tras cada submit (éxito o error) y regenera token antes de reintentar. Sitekey vía `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, verificación con `TURNSTILE_SECRET_KEY` server-side.

### 5. Resend (verificación de dominio, from/reply-to, header injection)

**5.1 — `from` en dominio no verificado → 403.** `CONTACT_FROM_EMAIL=no-reply@pagaza.mx` no funciona hasta verificar `pagaza.mx` en Resend (DNS pendiente, ver A3). Mitigación: hasta el cutover, usa `onboarding@resend.dev` (o subdominio ya verificado del team Brota). En el Paso 11, al recibir DNS: verifica el dominio (SPF/DKIM/DMARC) **antes** de cambiar `CONTACT_FROM_EMAIL`.

**5.2 — Email del prospecto en `from` (en vez de `reply-to`).** Falla SPF/DKIM → spam/rechazo. `from` = SIEMPRE tu dominio verificado; `reply_to` = email del prospecto; `to` = `CONTACT_TO_EMAIL` (`a@pagaza.mx`).

**5.3 — Header/HTML injection vía campos.** Ya cubierto por el pipeline (Fase 7 §3.4): rechaza `\n`/`\r` en `nombre`/`email`/`empresa` antes de armar el correo; valida `email` con Zod; escapa el `mensaje` si es HTML (o usa texto plano). Nunca metas input crudo en `subject`.

**5.4 — SDK de Resend y runtime.** Errores raros de fetch/stream si corre en edge. Fija `export const runtime = "nodejs"` (ver 6.1).

### 6. @upstash/ratelimit en Vercel serverless

**6.1 — Runtime del handler: edge vs nodejs.** `@upstash/*` son REST (fetch, corren en ambos), pero Resend y la sanitización viven mejor en Node. Declara `export const runtime = "nodejs"` en `app/api/contact/route.ts`. Todo el pipeline en el mismo runtime.

**6.2 — Instanciar `Redis`/`Ratelimit` en top-level revienta sin envs.** En dev sin credenciales, `Redis.fromEnv()` a nivel módulo lanza y **tumba** `/api/contact` o el build. Mitigación: implementa el **fail-open por config** que pide el BLUEPRINT: si faltan `UPSTASH_REDIS_REST_URL`/`TOKEN`, exporta un limitador no-op que **permite** (dev) y solo instancia el real cuando ambas envs existen. Nunca fail-closed por config ausente.

**6.3 — `request.ip` ya no existe en Next 15.** Si no lees `x-forwarded-for`, todas las peticiones comparten bucket. Usa `const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "127.0.0.1";`. En Vercel el primer valor es el cliente real (helper `getClientIp` en Fase 7 §3.2).

**6.4 — El `pending` de analytics se pierde (serverless freeze).** Con `analytics: true`, la función se congela al responder y la promesa puede no completarse. `await pending` o `ctx.waitUntil(pending)`. Si no necesitas analítica del limiter, déjala en `false` (menos comandos Redis = menos costo).

**6.5 — Honeypot antes de gastar Redis/Resend.** Respeta el orden endurecido (Fase 7 §2): rate-limit → honeypot (200 falso, sin enviar) → Zod → Turnstile → Resend. El honeypot barato corta temprano.

### 7. pnpm v11 (allowBuilds, frozen-lockfile en CI de Vercel)

**7.1 — Sin `packageManager`, Vercel puede usar otra versión de pnpm y no honrar `allowBuilds`.** Síntoma: `sharp`/`@swc/core` no ejecutan build-scripts ("Ignored build scripts…"). `allowBuilds` es clave nueva; 11.13.0 sí la lee, pero un pnpm más viejo en CI la ignora (la forma portátil histórica es `onlyBuiltDependencies`, no puesta). Mitigación: fija `"packageManager": "pnpm@11.13.0"` en `package.json`; opcionalmente añade `onlyBuiltDependencies: ['sharp','@swc/core','@parcel/watcher','unrs-resolver']`. Verifica que el log de deploy no diga "Ignored build scripts".

**7.2 — `--frozen-lockfile` en CI: lockfile desincronizado tumba el deploy.** `ERR_PNPM_OUTDATED_LOCKFILE`. Vercel corre `pnpm install --frozen-lockfile`. Si editas `package.json` (agregar `resend`, `zod`, `sharp`) sin regenerar el lock, CI rompe. Mitigación: tras **cada** cambio de deps corre `pnpm install` local y **commitea `pnpm-lock.yaml`** junto al `package.json`; antes de push valida con `pnpm install --frozen-lockfile`.

**7.3 — `pnpm-workspace.yaml` hace que Vercel trate el repo como workspace.** Confunde el Root Directory. Fija el **Root Directory** del proyecto Vercel a la carpeta que contiene este `package.json`/`pnpm-workspace.yaml` (coherente con 2.6).

**7.4 — `allowBuilds` es lista de aprobación, no de instalación.** `sharp` está en `allowBuilds` pero no en `dependencies`: la lista solo **autoriza** ejecutar el build-script si el paquete aparece en el árbol (Next trae su propio sharp opcional). Si necesitas `sharp` explícito (M3, optimización de imágenes), agrégalo a `dependencies` **además** de mantenerlo en `allowBuilds`.

Archivos clave inspeccionados: `src/middleware.ts`, `src/app/[locale]/{layout,page}.tsx`, `src/i18n/{routing,request,navigation}.ts`, `src/styles/globals.css`, `next.config.ts`, `postcss.config.mjs`, `pnpm-workspace.yaml`, `package.json`, `work/complemento pdf.md`.

---

## Checklist listo-para-construir

**Bloqueadores de la auditoría (antes de escribir código de dominio):**
- [ ] **A1** Mover el contenido canónico de `work/` a ruta versionada (`docs/contenido-fuente.md`) o embeberlo en el spec.
- [ ] **A2** Añadir token `--color-bronze-ink` (~`#7A5C2E`) y usarlo en TODO texto bronce sobre claro (incluye cifras del Hero ya presentes); reservar `#B0894E` para navy/decoración.
- [ ] **A3** `.env.example` con llaves de test de Turnstile, `CONTACT_FROM_EMAIL=onboarding@resend.dev` por defecto, y fail-open de Turnstile en dev.
- [ ] **M2** Corregir §3: NO crear `app/layout.tsx`; añadir `app/[locale]/not-found.tsx` + `app/global-error.tsx` con su propio `<html><body>`.
- [ ] **M3** `sharp` en `dependencies` + `images.formats=['image/avif','image/webp']` en `next.config.ts`.
- [ ] **M4** `style:["normal","italic"]` en EB Garamond; quitar peso `700`; decidir y documentar qué significa "self-hosted".
- [ ] **M5** Crear `content/compromiso.ts` y `content/metodologia.ts` (tipados, bilingües).
- [ ] **M6** Glosario fijo ES→EN (~15 términos: PAMA, REPSE, CSD, ASF, ISSSTE, amparo, revisión de gabinete, responsabilidad patrimonial del Estado…).
- [ ] **M9** Confirmar WhatsApp; añadir `wa.me` normalizado y campos (`whatsapp`, `redes`) al type `SiteInfo`.
- [ ] **M1** Dejar escrito el borrador de CSP estática (Fase 7 §3.6) para el Paso 9.

**Setup / Paso 0:**
- [ ] `"packageManager": "pnpm@11.13.0"` en `package.json`; `pnpm install --frozen-lockfile` local pasa; `pnpm config list` muestra `allowBuilds`; sin "Ignored build scripts".
- [ ] Prettier con `tailwindStylesheet: "./src/styles/globals.css"` (B6); scripts `typecheck`/`test` y `playwright install` (B3); migrar `next lint` a ESLint CLI (B5).
- [ ] `postcss.config.mjs` con un solo plugin; orden de `globals.css` intacto (`@import "tailwindcss";` primero).

**Fase 1 (chrome + SEO base) — verificación:**
- [ ] `pnpm build`: `/es` y `/en` como `○`/`●`; `/api/contact` como `ƒ`; `/sitemap.xml` y `/robots.txt` generados. Ningún `ƒ` inesperado ⇒ `setRequestLocale` presente en cada page/layout.
- [ ] `setRequestLocale(locale)` antes de todo `getTranslations`/`useTranslations` en server; `generateMetadata` con `{ locale }` explícito y `metadataBase` (M10).
- [ ] `pnpm dev`: `/` redirige a `/es`; el switcher lleva `/es`↔`/en` conservando la ruta; solo se usa `Link`/`usePathname` de `@/i18n/navigation`.
- [ ] View-source: `hreflang es|en|x-default`, `canonical`, `<html lang>` correcto, títulos/description por idioma.
- [ ] Header transparente sobre hero → sólido con hairline al scroll; anclas con offset (`scroll-padding-top`); menú móvil con teclado (`aria-expanded`/`aria-controls`).
- [ ] A11y: skip-link visible al tabular, foco visible (ring bronce), `Footer` con `<address>` + `tel:`/`mailto:`; `Reveal` sin fade/translate con `prefers-reduced-motion`.
- [ ] Nunca interpolar nombres de utilidad Tailwind (mapear a literales); Root Directory de Vercel apuntando a la carpeta del sitio.

**Durante secciones (Pasos 3–8):**
- [ ] Cada page/layout nuevo con traducciones server: `setRequestLocale` primero; secciones que reciben props NO lo necesitan.
- [ ] `StatBlock` lee `matchMedia('(prefers-reduced-motion: reduce)')` en JS y muestra el valor final sin animar (M8).
- [ ] Verificar herencia de `NextIntlClientProvider` con un client real; pasar `messages` explícito si falla (M7).
- [ ] Tras cada cambio de deps: `pnpm install` + commit de `pnpm-lock.yaml` + `pnpm install --frozen-lockfile` local (7.2).

**Fase 7 (formulario) — usar el Checklist de seguridad completo de arriba, más:**
- [ ] `export const runtime = "nodejs"` en `route.ts`; solo `POST`; `Cache-Control: no-store`.
- [ ] Rate-limit fail-open por config ausente en dev, **503** si Upstash cae; IP por `x-forwarded-for` (no `request.ip`).
- [ ] Orden fail-cheap (parse → rate-limit → honeypot → Zod → Turnstile → Resend → reporter); límite de body ~16 KB.
- [ ] `curl -i -X POST /api/contact` responde del handler (nunca `3xx`); token Turnstile se resetea entre submits.
- [ ] CSP desplegada permite `challenges.cloudflare.com` en `script-src`/`frame-src`/`connect-src` sin romper el SSG; widget de Turnstile carga.

**Deploy (Paso 11):**
- [ ] Root Directory de Vercel correcto; `packageManager` fijado; log sin "Ignored build scripts".
- [ ] Dominio `pagaza.mx` verificado en Resend (SPF/DKIM/DMARC) **antes** de cambiar `CONTACT_FROM_EMAIL`.
- [ ] Secretos solo en env de Vercel; `.env.local` git-ignored; `pnpm audit` limpio.
- [ ] Prueba E2E real: lead llega a `a@pagaza.mx`; cada modo de falla (A–K) devuelve status y shape esperados.