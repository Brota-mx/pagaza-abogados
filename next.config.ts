import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

/**
 * CSP estática por header (SIN nonce): un nonce por request forzaría render dinámico y mataría el
 * SSG (BUILD-NOTES M1 / trampa 4.1). Allowances (§3.6):
 * - Turnstile: script-src (api.js) + frame-src (iframe del reto) + connect-src (postback).
 * - Vercel Analytics/Speed-Insights: script-src va.vercel-scripts.com + connect-src vitals.vercel-insights.com
 *   (la recolección /_vercel/* es same-origin, cubierta por 'self').
 * - 'unsafe-inline' es el compromiso aceptado por no usar nonce (bootstrap de hidratación + estilos
 *   inline de next/font y Tailwind). En DEV se añade 'unsafe-eval' (HMR/React Refresh) y se omite
 *   upgrade-insecure-requests (fricción en http://localhost).
 */
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isProd ? [] : ["'unsafe-eval'"]),
  "https://challenges.cloudflare.com",
  "https://va.vercel-scripts.com",
].join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com",
  "frame-src https://challenges.cloudflare.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Fotografía B/N optimizada en AVIF/WebP (M3) para las secciones que usen next/image.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
