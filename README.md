# Pagaza Abogados Tributarios

Sitio institucional bilingüe (ES/EN) del despacho fiscalista **Pagaza Abogados Tributarios**.
Proyecto de **Brota Mx**. Standalone.

**Borrador en vivo:** _(pendiente — se agrega el link de Vercel tras el primer deploy)_

## Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · next-intl (ES/EN) · Resend + Zod (formulario) · Vercel.

## Requisitos

- Node.js ≥ 20
- pnpm ≥ 9

## Setup

```bash
pnpm install
cp .env.example .env.local   # rellenar valores (ver .env.example)
pnpm dev                     # http://localhost:3000  → redirige a /es
```

## Scripts

| Comando | Qué hace |
|---------|----------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servir el build |
| `pnpm lint` | Linter |
| `pnpm format` | Prettier |

## Documentación

- **`BLUEPRINT.md`** — arquitectura completa y **orden de construcción numerado**. Empieza por ahí.
- **`CLAUDE.md`** — guía para trabajar con Claude Code en este repo.

## Notas de organización (Brota)

Todo lo de este proyecto va **separado** de Galarza/Personal:
- Repo: organización **Brota.mx** en GitHub.
- Hosting: **Team Brota** en Vercel (no el scope personal).
- Servicios (Resend, Upstash, Turnstile): cuentas/proyectos de Brota.

## Estado

Scaffold inicial (Paso 0 del BLUEPRINT). Listo para construir sección por sección.
