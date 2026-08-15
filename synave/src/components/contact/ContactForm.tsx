"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/contact/actions";
import { budgets, initialContactState, subjects } from "@/lib/contact";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const fieldBase =
  "h-12 w-full rounded-xl border bg-paper px-4 text-ink placeholder:text-muted transition-colors focus:border-signal";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-swiss">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-signal px-7 font-medium text-white shadow-[0_10px_30px_-12px_rgba(59,108,255,0.75)] transition-colors hover:bg-signal-600 disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      {!pending && <IconArrowRight className="h-4 w-4" />}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContact,
    initialContactState,
  );
  const errors = state.errors ?? {};
  const panelRef = useRef<HTMLDivElement>(null);

  // Après réponse du serveur, ramène l'utilisateur sur le message : sans cela,
  // une confirmation ou une erreur passe inaperçue si la page a défilé.
  useEffect(() => {
    if (state.status === "idle") return;
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    panelRef.current?.focus({ preventScroll: true });
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={panelRef}
        tabIndex={-1}
        role="status"
        className="card scroll-mt-28 p-8 text-center sm:p-12"
      >
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-mint-100 text-mint-600">
          <IconCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold">
          Message bien reçu
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-ink-soft">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div ref={panelRef} tabIndex={-1} className="scroll-mt-28 outline-none">
      <form action={formAction} className="card p-7 sm:p-9" noValidate>
        {state.status === "error" && state.message && (
          <p
            role="alert"
            className="mb-7 rounded-xl border border-swiss-100 bg-swiss-100/60 px-4 py-3 text-sm text-swiss-600"
          >
            {state.message}
          </p>
        )}

        {/* Piège à robots, invisible et hors du parcours clavier */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto">
          <label htmlFor="site">Ne pas remplir</label>
          <input
            id="site"
            name="site"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nom et prénom <span className="text-swiss">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(
                fieldBase,
                errors.name ? "border-swiss" : "border-line",
              )}
              placeholder="Camille Rochat"
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              E-mail <span className="text-swiss">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                fieldBase,
                errors.email ? "border-swiss" : "border-line",
              )}
              placeholder="camille@exemple.ch"
            />
            <FieldError id="email-error" message={errors.email} />
          </div>

          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium">
              Société{" "}
              <span className="font-normal text-muted">
                (si elle existe déjà)
              </span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className={cn(fieldBase, "border-line")}
              placeholder="Nom de votre société"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Téléphone{" "}
              <span className="font-normal text-muted">(facultatif)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={cn(fieldBase, "border-line")}
              placeholder="+41 79 000 00 00"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Votre sujet <span className="text-swiss">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={cn(
                fieldBase,
                errors.subject ? "border-swiss" : "border-line",
              )}
            >
              <option value="" disabled>
                Choisissez un sujet…
              </option>
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <FieldError id="subject-error" message={errors.subject} />
          </div>

          <div>
            <label htmlFor="budget" className="mb-2 block text-sm font-medium">
              Budget envisagé{" "}
              <span className="font-normal text-muted">(facultatif)</span>
            </label>
            <select
              id="budget"
              name="budget"
              defaultValue=""
              className={cn(fieldBase, "border-line")}
            >
              <option value="">Sans préférence</option>
              {budgets.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Votre projet <span className="text-swiss">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "w-full rounded-xl border bg-paper px-4 py-3.5 leading-relaxed text-ink placeholder:text-muted transition-colors focus:border-signal",
              errors.message ? "border-swiss" : "border-line",
            )}
            placeholder="Où en êtes-vous, ce que vous cherchez à résoudre, et pour quand. Quelques phrases suffisent."
          />
          <FieldError id="message-error" message={errors.message} />
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 h-4.5 w-4.5 shrink-0 accent-[var(--color-signal)]"
            />
            <span className="text-sm leading-relaxed text-ink-soft">
              J&apos;accepte que Synave traite les informations transmises pour
              répondre à ma demande. Elles ne sont ni revendues ni utilisées à
              des fins publicitaires. <span className="text-swiss">*</span>
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <SubmitButton />
          <p className="text-sm text-muted">Réponse sous un jour ouvrable.</p>
        </div>
      </form>
    </div>
  );
}
