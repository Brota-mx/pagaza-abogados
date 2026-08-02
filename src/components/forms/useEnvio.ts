"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";

export type Estado = "idle" | "submitting" | "success" | "error";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Envío de un formulario al API: estado, honeypot, token de Turnstile y `fetch`. Los dos
 * formularios del sitio lo hacían con el mismo bloque de 35 líneas copiado, cambiando sólo la URL.
 *
 * El token es de un solo uso: tras cada intento —salga bien o mal— se limpia y se incrementa
 * `resetSignal` para que el widget se resetee.
 */
export function useEnvio<T extends object>(endpoint: string) {
  const locale = useLocale();
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorCode, setErrorCode] = useState<string>("INTERNAL_ERROR");
  const [token, setToken] = useState<string>("");
  const [resetSignal, setResetSignal] = useState(0);
  const hpRef = useRef<HTMLInputElement>(null);

  const captchaOn = SITE_KEY.length > 0;

  async function enviar(values: T, onExito: () => void) {
    setEstado("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _hp: hpRef.current?.value ?? "",
          turnstileToken: captchaOn ? token : "dev-bypass",
          locale,
        }),
      });
      const json = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: { code?: string };
      } | null;

      if (res.ok && json?.success) {
        setEstado("success");
        onExito();
      } else {
        setErrorCode(json?.error?.code ?? "INTERNAL_ERROR");
        setEstado("error");
      }
    } catch {
      setErrorCode("NETWORK");
      setEstado("error");
    } finally {
      setToken("");
      setResetSignal((s) => s + 1);
    }
  }

  return {
    estado,
    setEstado,
    errorCode,
    enviar,
    hpRef,
    siteKey: SITE_KEY,
    captchaOn,
    captchaReady: !captchaOn || token.length > 0,
    setToken,
    resetSignal,
  };
}
