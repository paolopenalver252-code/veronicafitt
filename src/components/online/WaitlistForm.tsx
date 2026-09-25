import { Link } from "react-router";
import { useId, useState, type FormEvent } from "react";
import { Button } from "~/components/ui/Button";
import { joinWaitlist } from "~/lib/contact";
import { cn } from "~/lib/cn";
import { validateEmail } from "~/lib/validation";

type Status = { type: "idle" } | { type: "error"; message: string } | { type: "done"; message: string };

/** Lista de espera del online: solo email + consentimiento (minimización de datos). */
export function WaitlistForm({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; consent?: string }>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = {
      email: validateEmail(email) ?? undefined,
      consent: consent ? undefined : "Necesito tu consentimiento para avisarte.",
    };
    setErrors(next);
    if (next.email || next.consent) {
      document.getElementById(next.email ? `${id}-email` : `${id}-consent`)?.focus();
      return;
    }
    setSending(true);
    const result = await joinWaitlist(email.trim());
    setSending(false);
    if (result.status === "sent") setStatus({ type: "done", message: "Listo. Te avisaré cuando estén disponibles." });
    else if (result.status === "not-connected")
      setStatus({
        type: "done",
        message: "Esto es una demo: la lista de espera todavía no está conectada, así que no se ha guardado tu email.",
      });
    else setStatus({ type: "error", message: result.message });
  };

  const dark = tone === "dark";
  const errorText = dark ? "text-error-light" : "text-error";

  return (
    <form noValidate onSubmit={onSubmit} className={cn("max-w-[30rem]", className)}>
      <label htmlFor={`${id}-email`} className="text-small font-semibold">
        Tu email
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={cn(
            "min-h-13 flex-1 rounded-field border bg-blanco px-4 text-grafito placeholder:text-piedra/70",
            errors.email ? "border-error" : "border-linea",
          )}
          placeholder="nombre@email.com"
        />
        <Button type="submit" disabled={sending}>
          Apuntarme
        </Button>
      </div>
      {errors.email && (
        <p id={`${id}-email-error`} className={cn("mt-2 text-small", errorText)}>
          {errors.email}
        </p>
      )}

      <div className="mt-4 flex items-start gap-3">
        <input
          id={`${id}-consent`}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-cobalto"
        />
        <label htmlFor={`${id}-consent`} className={cn("text-small", dark ? "text-tiza/75" : "text-piedra")}>
          Acepto recibir un aviso cuando estén disponibles los entrenamientos online, según la{" "}
          <Link to="/privacidad" className="underline underline-offset-2">
            política de privacidad
          </Link>
          .
        </label>
      </div>
      {errors.consent && (
        <p id={`${id}-consent-error`} className={cn("mt-2 text-small", errorText)}>
          {errors.consent}
        </p>
      )}

      <p role="status" className={cn("mt-4 text-small font-medium", status.type === "error" ? errorText : "")}>
        {status.type !== "idle" ? status.message : ""}
      </p>
    </form>
  );
}
