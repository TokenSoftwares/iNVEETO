"use client";

import { useState } from "react";
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertTriangle, Mail } from "lucide-react";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { useT } from "@/lib/locale-context";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
const topics = ["demo", "pricing", "support", "other"] as const;

/**
 * Inquiry form.
 * - With NEXT_PUBLIC_INQUIRY_ENDPOINT set: POSTs JSON and reports real success/failure.
 * - Without it: validates, then opens the visitor's email app pre-filled to info@inveeto.com.
 *   The UI says so up front; it never claims a message was delivered.
 */
export function ContactForm() {
  const t = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<(typeof topics)[number]>("demo");
  const endpoint = site.inquiryEndpoint;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      organization: String(fd.get("organization") ?? "").trim(),
      topic: t(ui.form.topics[topic]),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (!endpoint) {
      const subject = `${data.topic} · ${data.organization || data.name}`;
      const body = `${data.message}\n\n${data.name}\n${data.organization}\n${data.email}`;
      window.location.href = `mailto:${site.contact.general}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldCls = "w-full";

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-line sm:p-8">
      <h3 className="t-h3 text-ink">{t(ui.form.title)}</h3>
      {!endpoint && (
        <p className="mt-2 flex items-start gap-2 text-sm text-slate">
          <Mail size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden />
          {t(ui.form.mailtoNote)}
        </p>
      )}

      <Form className="mt-6 grid gap-5" validationBehavior="native" onSubmit={onSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="name" isRequired className={fieldCls} validate={(v) => (v.trim().length < 2 ? t(ui.form.errName) : null)}>
            <Label>{t(ui.form.name)}</Label>
            <Input autoComplete="name" />
            <FieldError />
          </TextField>
          <TextField
            name="email"
            type="email"
            isRequired
            className={fieldCls}
            validate={(v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : t(ui.form.errEmail))}
          >
            <Label>{t(ui.form.email)}</Label>
            <Input autoComplete="email" dir="ltr" className="rtl:text-right" />
            <FieldError />
          </TextField>
        </div>
        <TextField name="organization" className={fieldCls}>
          <Label>
            {t(ui.form.org)} <span className="font-normal text-slate">({t(ui.form.optional)})</span>
          </Label>
          <Input autoComplete="organization" />
        </TextField>

        <fieldset>
          <legend className="text-sm font-medium text-ink">{t(ui.form.topic)}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((k) => (
              <label key={k} className={`chip h-9 cursor-pointer px-3.5 ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${topic === k ? "bg-lavender text-brand-deep ring-lilac" : "bg-white text-slate ring-line hover:text-ink"}`}>
                <input type="radio" name="topic" value={k} checked={topic === k} onChange={() => setTopic(k)} className="sr-only" />
                {t(ui.form.topics[k])}
              </label>
            ))}
          </div>
        </fieldset>

        <TextField name="message" isRequired className={fieldCls} validate={(v) => (v.trim().length < 10 ? t(ui.form.errMessage) : null)}>
          <Label>{t(ui.form.message)}</Label>
          <TextArea rows={4} />
          <FieldError />
        </TextField>

        <Button type="submit" size="lg" isDisabled={status === "sending"} className="w-full rounded-full sm:w-fit sm:px-8">
          {status === "sending" ? t(ui.form.sending) : endpoint ? t(ui.form.submit) : t(ui.form.submitMail)}
        </Button>

        <div aria-live="polite" className="min-h-0">
          <AnimatePresence>
            {(status === "sent" || status === "mailto" || status === "error") && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 rounded-2xl p-4 text-sm ${status === "error" ? "bg-no-soft text-no" : status === "sent" ? "bg-ok-soft text-ok" : "bg-mist text-ink ring-1 ring-line"}`}
              >
                {status === "error" ? <AlertTriangle size={18} className="shrink-0" aria-hidden /> : <CheckCircle2 size={18} className="shrink-0" aria-hidden />}
                <span>
                  <strong className="block font-medium">
                    {status === "error" ? t(ui.form.errorTitle) : status === "sent" ? t(ui.form.successTitle) : t(ui.form.mailtoTitle)}
                  </strong>
                  {status === "error" ? t(ui.form.errorBody) : status === "sent" ? t(ui.form.successBody) : t(ui.form.mailtoBody)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Form>
    </div>
  );
}
