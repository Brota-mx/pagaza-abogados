"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import {
  newsletterFormSchema,
  type NewsletterFormValues,
} from "@/lib/validation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { TurnstileWidget } from "./TurnstileWidget";

type Status = "idle" | "submitting" | "success" | "error";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Alta al newsletter. Vive sobre navy, así que los campos van en blanco translúcido con borde
 * claro en vez de las utilidades de superficie del formulario de contacto.
 *
 * El checkbox de consentimiento no es decorativo: el esquema del servidor exige `true` literal,
 * de modo que un envío sin aceptar el aviso se rechaza aunque alguien manipule el DOM.
 */
export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const tForm = useTranslations("form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<string>("INTERNAL_ERROR");
  const [token, setToken] = useState<string>("");
  const [resetSignal, setResetSignal] = useState(0);
  const hpRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    mode: "onBlur",
  });

  const captchaOn = SITE_KEY.length > 0;
  const captchaReady = !captchaOn || token.length > 0;

  const onSubmit = async (values: NewsletterFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
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
        setStatus("success");
        reset();
      } else {
        setErrorCode(json?.error?.code ?? "INTERNAL_ERROR");
        setStatus("error");
      }
    } catch {
      setErrorCode("NETWORK");
      setStatus("error");
    } finally {
      // Token de un solo uso: resetear el widget y limpiar el token tras cada intento.
      setToken("");
      setResetSignal((s) => s + 1);
    }
  };

  if (status === "success") {
    return (
      <p
        role="status"
        tabIndex={-1}
        ref={(el) => el?.focus()}
        className="flex items-center gap-3 text-white/90 focus-visible:outline-none"
      >
        <CheckCircle2
          aria-hidden
          className="text-steel-soft shrink-0"
          size={22}
        />
        {t("successMessage")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot: oculto para humanos, visible para bots. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="_hp_news">{tForm("hp")}</label>
        <input
          ref={hpRef}
          id="_hp_news"
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{t("emailLabel")}</span>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            className={cn(
              "focus:ring-offset-navy w-full rounded-[2px] border bg-white/10 px-4 py-3 text-white transition-colors placeholder:text-white/50 focus:ring-2 focus:ring-white focus:ring-offset-1 focus:outline-none",
              errors.email ? "border-error" : "border-white/25",
            )}
          />
        </label>
        <button
          type="submit"
          disabled={status === "submitting" || !captchaReady}
          className="text-navy focus-visible:ring-offset-navy shrink-0 cursor-pointer rounded-[2px] bg-white px-7 py-3 text-sm font-medium tracking-[0.1em] uppercase transition-colors hover:bg-white/85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </div>

      {errors.email && (
        <p className="text-error text-sm">{tForm("fieldErrors.email")}</p>
      )}

      <label className="flex items-start gap-3 text-sm text-white/70">
        <input
          {...register("consentimiento")}
          type="checkbox"
          aria-invalid={Boolean(errors.consentimiento)}
          className="focus-visible:ring-offset-navy accent-steel mt-0.5 h-4 w-4 shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        <span>
          {t("consentimiento")}{" "}
          <Link
            href="/aviso-de-privacidad"
            className="focus-visible:ring-offset-navy text-white underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("avisoLink")}
          </Link>
          .
        </span>
      </label>
      {errors.consentimiento && (
        <p className="text-error text-sm">{t("consentimientoError")}</p>
      )}

      {captchaOn && (
        <TurnstileWidget
          siteKey={SITE_KEY}
          onToken={setToken}
          resetSignal={resetSignal}
        />
      )}

      {status === "error" && (
        <p
          role="alert"
          className="border-error/40 bg-error/10 rounded-[2px] border px-4 py-3 text-sm text-white"
        >
          {tForm(`errors.${errorCode}`)}
        </p>
      )}
      {captchaOn && !captchaReady && status !== "submitting" && (
        <p className="text-xs text-white/60">{tForm("turnstilePending")}</p>
      )}
    </form>
  );
}
