import { defineConfig, devices } from "@playwright/test";

/**
 * E2E smoke (BUILD-NOTES B3 / Paso 10). Corre contra `pnpm dev` para que el bypass de Turnstile en
 * desarrollo permita probar el envío exitoso del formulario sin credenciales. `reuseExistingServer`
 * reutiliza un server ya levantado en :3000 (dev o prod).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Menos workers: el dev server compila rutas on-demand y se satura con demasiada concurrencia.
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    locale: "es-MX", // el redirect de `/` negocia por Accept-Language → /es
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
    command: "pnpm dev",
    url: "http://localhost:3000",
    timeout: 180_000,
    reuseExistingServer: true,
  },
});
