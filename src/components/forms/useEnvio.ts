"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";

export type Estado = "idle" | "submitting" | "success" | "error";

/**
 * Envío de un formulario al API: estado, honeypot y `fetch`. Los dos formularios del sitio lo
 * hacían con el mismo bloque copiado, cambiando sólo la URL.
 *
 * Ya no hay captcha: Turnstile se retiró a petición del cliente (1-ago-2026) para no depender de
 * Cloudflare. Lo que queda frente al abuso automatizado es el rate-limit por IP, el honeypot y la
 * validación Zod del servidor — todo del lado del servidor, donde no se puede saltar desde el DOM.
 */
export function useEnvio<T extends object>(endpoint: string) {
  const locale = useLocale();
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorCode, setErrorCode] = useState<string>("INTERNAL_ERROR");
  const hpRef = useRef<HTMLInputElement>(null);

  async function enviar(values: T, onExito: () => void) {
    setEstado("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _hp: hpRef.current?.value ?? "",
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
    }
  }

  return { estado, setEstado, errorCode, enviar, hpRef };
}
