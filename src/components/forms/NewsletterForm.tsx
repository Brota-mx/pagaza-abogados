"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import {
  newsletterFormSchema,
  type NewsletterFormValues,
} from "@/lib/validation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useEnvio } from "./useEnvio";

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
  // Los errores se anuncian igual que en el formulario de contacto: `role="alert"` para que el
  // lector de pantalla los lea al aparecer, y `aria-describedby` para atarlos a su campo.
  const emailErrorId = useId();
  const consentErrorId = useId();
  const { estado, errorCode, enviar, hpRef } =
    useEnvio<NewsletterFormValues>("/api/newsletter");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: NewsletterFormValues) => enviar(values, reset);

  if (estado === "success") {
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
            aria-describedby={errors.email ? emailErrorId : undefined}
            className={cn(
              "focus:ring-offset-navy w-full rounded-[2px] border bg-white/10 px-4 py-3 text-white transition-colors placeholder:text-white/50 focus:ring-2 focus:ring-white focus:ring-offset-1 focus:outline-none",
              errors.email ? "border-error" : "border-white/25",
            )}
          />
        </label>
        <button
          type="submit"
          disabled={estado === "submitting"}
          className="text-navy focus-visible:ring-offset-navy shrink-0 cursor-pointer rounded-[2px] bg-white px-7 py-3 text-sm font-medium tracking-[0.1em] uppercase transition-colors hover:bg-white/85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {estado === "submitting" ? t("submitting") : t("submit")}
        </button>
      </div>

      {errors.email && (
        <p id={emailErrorId} role="alert" className="text-error text-sm">
          {tForm("fieldErrors.email")}
        </p>
      )}

      <label className="flex items-start gap-3 text-sm text-white/70">
        <input
          {...register("consentimiento")}
          type="checkbox"
          aria-invalid={Boolean(errors.consentimiento)}
          aria-describedby={errors.consentimiento ? consentErrorId : undefined}
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
        <p id={consentErrorId} role="alert" className="text-error text-sm">
          {t("consentimientoError")}
        </p>
      )}

      {estado === "error" && (
        <p
          role="alert"
          className="border-error/40 bg-error/10 rounded-[2px] border px-4 py-3 text-sm text-white"
        >
          {tForm(`errors.${errorCode}`)}
        </p>
      )}
    </form>
  );
}
