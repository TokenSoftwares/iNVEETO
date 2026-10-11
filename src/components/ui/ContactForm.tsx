"use client";

import { useEffect, useRef, useState } from "react";
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import { CheckCircle2, AlertTriangle, Mail, LifeBuoy, Briefcase } from "lucide-react";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { useLocale, useT } from "@/lib/locale-context";
import { HONEYPOT_FIELD, LIMITS, TOPICS, type FieldError as FieldName, type Topic } from "@/lib/inquiry/schema";

type Status = "idle" | "sending" | "sent" | "error" | "rate" | "invalid";

/**
 * Inquiry form. Posts to /api/inquiry (validated, rate-limited, spam-trapped on the server).
 * `configured` comes from the server: when no delivery provider is set up, the form is not
 * shown at all and visitors get the official email addresses instead.
 */
export function ContactForm({ configured }: { configured: boolean }) {
  const t = useT();
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<Topic>("demo");
  const [serverErrors, setServerErrors] = useState<FieldName[]>([]);
  const startedAt = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const q = new URLSearchParams(window.location.search).get("topic");
    // Read ?topic= after hydration so the page stays statically prerendered.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q && (TOPICS as readonly string[]).includes(q)) setTopic(q as Topic);
  }, []);

  useEffect(() => {
    if (status !== "idle" && status !== "sending") statusRef.current?.focus();
  }, [status]);

  if (!configured) return <EmailFallback />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setServerErrors([]);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          organization: fd.get("organization"),
          message: fd.get("message"),
          topic,
          locale,
          [HONEYPOT_FIELD]: fd.get(HONEYPOT_FIELD),
          startedAt: startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldName[] };
      if (res.ok && data.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }
      if (res.status === 429) return setStatus("rate");
      if (res.status === 400 && data.fields?.length) {
        setServerErrors(data.fields);
        return setStatus("invalid");
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-line">
        <div ref={statusRef} tabIndex={-1} role="status" className="outline-none">
          <CheckCircle2 size={32} className="text-mint-ink" aria-hidden />
          <h3 className="t-h3 mt-4 text-ink">{t(ui.form.successTitle)}</h3>
          <p className="t-body mt-2">{t(ui.form.successBody)}</p>
        </div>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary btn-sm mt-6">
          {t(ui.form.sendAnother)}
        </button>
      </div>
    );
  }

  const fieldInvalid = (f: FieldName) => serverErrors.includes(f) || undefined;

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-line sm:p-8">
      <h3 className="t-h3 text-ink">{t(ui.form.title)}</h3>

      <Form ref={formRef} className="mt-6 grid gap-5" validationBehavior="native" onSubmit={onSubmit} aria-describedby="inquiry-privacy">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="name"
            isRequired
            maxLength={LIMITS.name.max}
            isInvalid={fieldInvalid("name")}
            validate={(v) => (v.trim().length < LIMITS.name.min ? t(ui.form.errName) : null)}
          >
            <Label>{t(ui.form.name)}</Label>
            <Input autoComplete="name" />
            <FieldError>{fieldInvalid("name") ? t(ui.form.errName) : undefined}</FieldError>
          </TextField>
          <TextField
            name="email"
            type="email"
            isRequired
            maxLength={LIMITS.email.max}
            isInvalid={fieldInvalid("email")}
            validate={(v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : t(ui.form.errEmail))}
          >
            <Label>{t(ui.form.email)}</Label>
            <Input autoComplete="email" dir="ltr" className="rtl:text-right" />
            <FieldError>{fieldInvalid("email") ? t(ui.form.errEmail) : undefined}</FieldError>
          </TextField>
        </div>
        <TextField name="organization" maxLength={LIMITS.organization.max}>
          <Label>
            {t(ui.form.org)} <span className="font-normal text-slate">({t(ui.form.optional)})</span>
          </Label>
          <Input autoComplete="organization" />
        </TextField>

        <fieldset>
          <legend className="text-sm font-medium text-ink">{t(ui.form.topic)}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOPICS.map((k) => (
              <label
                key={k}
                className={`chip h-10 cursor-pointer px-4 text-[0.88rem] ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
                  topic === k ? "bg-lavender text-brand-deep ring-lilac" : "bg-white text-slate ring-line hover:text-ink"
                }`}
              >
                <input type="radio" name="topic" value={k} checked={topic === k} onChange={() => setTopic(k)} className="sr-only" />
                {t(ui.form.topics[k])}
              </label>
            ))}
          </div>
        </fieldset>

        <TextField
          name="message"
          isRequired
          maxLength={LIMITS.message.max}
          isInvalid={fieldInvalid("message")}
          validate={(v) => (v.trim().length < LIMITS.message.min ? t(ui.form.errMessage) : null)}
        >
          <Label>{t(ui.form.message)}</Label>
          <TextArea rows={5} />
          <FieldError>{fieldInvalid("message") ? t(ui.form.errMessage) : undefined}</FieldError>
        </TextField>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p id="inquiry-privacy" className="text-sm text-slate">
            {t(ui.form.privacy)}{" "}
            <a href={site.links.privacy} className="text-link">
              {t(ui.form.privacyLink)}
            </a>
          </p>
          <Button type="submit" size="lg" isDisabled={status === "sending"} className="w-full shrink-0 rounded-full sm:w-fit sm:px-8">
            {status === "sending" ? t(ui.form.sending) : t(ui.form.submit)}
          </Button>
        </div>

        <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
          {(status === "error" || status === "rate" || status === "invalid") && (
            <div role="alert" className={`flex gap-3 rounded-2xl p-4 text-sm ${status === "invalid" ? "bg-wait-soft text-wait" : "bg-no-soft text-no"}`}>
              <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden />
              <span>
                {status === "invalid" ? (
                  t(ui.form.fixFields)
                ) : (
                  <>
                    <strong className="block font-medium">{status === "rate" ? t(ui.form.rateTitle) : t(ui.form.errorTitle)}</strong>
                    {status === "rate" ? t(ui.form.rateBody) : t(ui.form.errorBody)}
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}

/** Shown instead of the form while no delivery provider is configured. */
function EmailFallback() {
  const t = useT();
  const rows = [
    { icon: Briefcase, label: t(ui.contact.sales), email: site.contact.sales },
    { icon: Mail, label: t(ui.contact.general), email: site.contact.general },
    { icon: LifeBuoy, label: t(ui.contact.support), email: site.contact.support },
  ];
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-line sm:p-8">
      <h3 className="t-h3 text-ink">{t(ui.form.emailTitle)}</h3>
      <p className="t-body mt-2">{t(ui.form.emailBody)}</p>
      <ul className="mt-6 space-y-3">
        {rows.map((r) => (
          <li key={r.email}>
            <a href={`mailto:${r.email}`} className="group flex items-center gap-4 rounded-2xl p-4 ring-1 ring-line transition hover:bg-mist hover:ring-lilac">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lavender text-brand-deep">
                <r.icon size={19} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-slate">{r.label}</span>
                <span className="block truncate font-medium text-ink group-hover:text-brand-strong" dir="ltr">
                  {r.email}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
