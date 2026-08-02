"use client";

import { cloneElement, isValidElement, useId } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useEnvio } from "./useEnvio";

type SectorOption = { value: string; label: string };

const fieldBase =
  "w-full rounded-[2px] border bg-surface px-4 py-3 text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 focus:ring-offset-bg";

export function ContactForm({
  sectorOptions,
}: {
  sectorOptions: SectorOption[];
}) {
  const t = useTranslations("form");
  const consentErrorId = useId();
  const { estado, setEstado, errorCode, enviar, hpRef } =
    useEnvio<ContactFormValues>("/api/contact");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: ContactFormValues) => enviar(values, reset);

  if (estado === "success") {
    return (
      <div
        role="status"
        tabIndex={-1}
        ref={(el) => el?.focus()}
        className="border-line bg-surface rounded-[4px] border p-8 text-center focus-visible:outline-none"
      >
        <CheckCircle2 aria-hidden className="text-success mx-auto" size={40} />
        <h3 className="text-navy mt-4 font-serif text-2xl">
          {t("successTitle")}
        </h3>
        <p className="text-muted mt-2 leading-relaxed">{t("successMessage")}</p>
        <button
          type="button"
          onClick={() => setEstado("idle")}
          className="text-brand focus-visible:ring-brand mt-6 cursor-pointer text-sm font-medium tracking-[0.1em] uppercase underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot: oculto para humanos, visible para bots. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="_hp">{t("hp")}</label>
        <input
          ref={hpRef}
          id="_hp"
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("nombre")}
          required
          error={errors.nombre && t("fieldErrors.nombre")}
        >
          <input
            {...register("nombre")}
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.nombre)}
            className={cn(
              fieldBase,
              errors.nombre ? "border-error" : "border-line",
            )}
          />
        </Field>
        <Field label={t("empresa")} hint={t("optional")}>
          <input
            {...register("empresa")}
            type="text"
            autoComplete="organization"
            className={cn(fieldBase, "border-line")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("email")}
          required
          error={errors.email && t("fieldErrors.email")}
        >
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={cn(
              fieldBase,
              errors.email ? "border-error" : "border-line",
            )}
          />
        </Field>
        <Field
          label={t("telefono")}
          hint={t("optional")}
          error={errors.telefono && t("fieldErrors.telefono")}
        >
          <input
            {...register("telefono")}
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.telefono)}
            className={cn(
              fieldBase,
              errors.telefono ? "border-error" : "border-line",
            )}
          />
        </Field>
      </div>

      <Field label={t("sector")} hint={t("optional")}>
        <select
          {...register("sector")}
          className={cn(fieldBase, "border-line")}
          defaultValue=""
        >
          <option value="">{t("sectorPlaceholder")}</option>
          {sectorOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label={t("mensaje")}
        required
        error={errors.mensaje && t("fieldErrors.mensaje")}
      >
        <textarea
          {...register("mensaje")}
          rows={5}
          aria-invalid={Boolean(errors.mensaje)}
          className={cn(
            fieldBase,
            "resize-y",
            errors.mensaje ? "border-error" : "border-line",
          )}
        />
      </Field>

      {/* Consentimiento expreso del aviso de privacidad (LFPDPPP). El servidor lo exige con
          z.literal(true), así que esto no es un adorno de cumplimiento. */}
      <label className="text-muted flex items-start gap-3 text-sm">
        <input
          {...register("consentimiento")}
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.consentimiento)}
          aria-describedby={errors.consentimiento ? consentErrorId : undefined}
          className="accent-brand focus-visible:ring-brand mt-0.5 h-4 w-4 shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
        <span>
          {t("consentimiento")}{" "}
          <Link
            href="/aviso-de-privacidad"
            className="text-brand focus-visible:ring-brand underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
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
          className="border-error/30 bg-error/5 text-error rounded-[2px] border px-4 py-3 text-sm"
        >
          {t(`errors.${errorCode}`)}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "submitting"}
        className="bg-navy hover:bg-navy-2 focus-visible:ring-brand focus-visible:ring-offset-bg inline-flex cursor-pointer items-center justify-center rounded-[2px] px-8 py-3.5 text-sm font-medium tracking-[0.1em] text-white uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {estado === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

type FieldInputProps = {
  id?: string;
  required?: boolean;
  "aria-required"?: boolean;
  "aria-describedby"?: string;
};

/** Campo con label, indicador opcional/requerido y mensaje de error accesible. */
function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | false;
  children: ReactElement<FieldInputProps>;
}) {
  const errorId = useId();
  const hintId = useId();
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const field = isValidElement(children)
    ? cloneElement(children, {
        required: required || undefined,
        "aria-required": required || undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <label className="block">
      <span className="text-navy mb-1.5 flex items-baseline justify-between text-sm font-medium">
        <span>
          {label}
          {required && (
            <span aria-hidden className="text-error">
              {" "}
              *
            </span>
          )}
        </span>
        {hint && (
          <span id={hintId} className="text-muted text-xs font-normal">
            {hint}
          </span>
        )}
      </span>
      {field}
      {error && (
        <span id={errorId} role="alert" className="text-error mt-1 block text-sm">
          {error}
        </span>
      )}
    </label>
  );
}
