import { Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/Button";
import { sendContactMessage } from "~/lib/contact";
import { cn } from "~/lib/cn";
import { serviceOptions, validateContact, type ContactInput, type FieldErrors } from "~/lib/validation";
import { useContactIntent } from "./ContactIntent";

const empty: ContactInput = { name: "", contact: "", service: "", message: "", consent: false, company: "" };
const fieldOrder: Array<keyof ContactInput> = ["name", "contact", "service", "message", "consent"];

type Status = { type: "idle" } | { type: "info" | "success" | "error"; message: string };

/**
 * Formulario de contacto. No pide datos de salud (RGPD, art. 9): las lesiones
 * se hablan en la primera conversación. Hoy no envía nada y lo dice.
 */
export function ContactForm() {
  const id = useId();
  const { intent } = useContactIntent();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<FieldErrors<ContactInput>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [sending, setSending] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Si la persona llega desde un servicio concreto, se preselecciona.
  useEffect(() => {
    if (intent) setValues((v) => ({ ...v, service: intent }));
  }, [intent]);

  const set = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = fieldOrder.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    // Antispam básico: honeypot relleno o envío en menos de 3 s = bot. Se ignora en silencio.
    if (values.company || Date.now() - startedAt.current < 3000) {
      setStatus({ type: "success", message: "Gracias, mensaje recibido." });
      return;
    }
    setSending(true);
    const result = await sendContactMessage(values);
    setSending(false);
    if (result.status === "sent") {
      setStatus({ type: "success", message: "Mensaje enviado. Te responderé lo antes posible." });
      setValues(empty);
    } else if (result.status === "not-connected") {
      setStatus({
        type: "info",
        message:
          "Esto es una demo: el formulario todavía no está conectado, así que tu mensaje no se ha enviado. Los datos no se han guardado.",
      });
    } else {
      setStatus({ type: "error", message: result.message });
    }
  };

  const fieldId = (name: keyof ContactInput) => `${id}-${name}`;
  const describedBy = (name: keyof ContactInput, hint?: boolean) =>
    [errors[name] ? `${fieldId(name)}-error` : null, hint ? `${fieldId(name)}-hint` : null].filter(Boolean).join(" ") ||
    undefined;
  const inputClass = (name: keyof ContactInput) =>
    cn(
      "w-full rounded-field border bg-blanco px-4 text-grafito placeholder:text-piedra/70 transition-colors",
      errors[name] ? "border-error" : "border-linea hover:border-piedra-light",
    );

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-card bg-tiza p-6 text-grafito sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Nombre" error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={cn(inputClass("name"), "min-h-13")}
          />
        </Field>

        <Field id={fieldId("contact")} label="Email o teléfono" error={errors.contact}>
          <input
            id={fieldId("contact")}
            name="contact"
            autoComplete="email"
            value={values.contact}
            onChange={(e) => set("contact", e.target.value)}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={describedBy("contact")}
            className={cn(inputClass("contact"), "min-h-13")}
          />
        </Field>
      </div>

      <Field id={fieldId("service")} label="¿Qué te interesa?" error={errors.service} className="mt-5">
        <select
          id={fieldId("service")}
          name="service"
          value={values.service}
          onChange={(e) => set("service", e.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy("service")}
          className={cn(inputClass("service"), "min-h-13 appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2323272a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Elige una opción
          </option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId("message")}
        label="Mensaje (opcional)"
        error={errors.message}
        className="mt-5"
        hint="Cuéntame qué buscas. No incluyas información médica: si tienes alguna lesión, lo hablamos en persona."
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          maxLength={1000}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", true)}
          className={cn(inputClass("message"), "resize-y py-3")}
        />
      </Field>

      {/* Honeypot: invisible para personas, tentador para bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("company")}>Empresa</label>
        <input
          id={fieldId("company")}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id={fieldId("consent")}
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={describedBy("consent")}
          className="mt-0.5 size-5 shrink-0 accent-acento"
        />
        <label htmlFor={fieldId("consent")} className="text-small text-piedra">
          He leído la{" "}
          <Link to="/privacidad" className="font-medium text-grafito underline underline-offset-2">
            política de privacidad
          </Link>{" "}
          y acepto que se usen mis datos para responder a mi mensaje.
        </label>
      </div>
      {errors.consent && (
        <p id={`${fieldId("consent")}-error`} className="mt-2 text-small text-error">
          {errors.consent}
        </p>
      )}

      <Button
        type="submit"
        disabled={sending}
        className="group mt-8 w-full sm:w-auto"
        icon={
          <Send
            aria-hidden
            className="size-4 transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        }
      >
        {sending ? "Enviando…" : "Enviar mensaje"}
      </Button>

      <p
        role="status"
        className={cn(
          "mt-5 text-small font-medium empty:hidden",
          status.type === "error" && "text-error",
          status.type === "info" && "rounded-field border border-linea bg-blanco px-4 py-3 text-grafito",
        )}
      >
        {status.type !== "idle" ? status.message : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-small font-semibold">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-micro text-piedra">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-small text-error">
          {error}
        </p>
      )}
    </div>
  );
}
