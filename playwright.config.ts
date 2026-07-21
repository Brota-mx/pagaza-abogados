import { defineConfig, devices } from "@playwright/test";

/**
 * E2E smoke. Corre contra `pnpm dev`: en desarrollo `lib/resend.ts` simula el envío, de modo que
 * el camino feliz de los formularios se puede probar de punta a punta sin credenciales reales.
 *
 * Puerto 3100, no 3000: 3000 es el puerto por defecto de todos los proyectos Next de la máquina y
 * los tests llegaron a correr contra el sitio de otro cliente. Un puerto propio elimina la
 * ambigüedad y hace seguro reutilizar un server ya levantado en local.
 */
const PORT = 3100;
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Menos workers: el dev server compila rutas on-demand y se satura con demasiada concurrencia.
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // El idioma ya no se negocia por cabecera (localeDetection: false); se elige en `/`.
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
