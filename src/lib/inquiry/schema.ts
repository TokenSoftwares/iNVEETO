/**
 * Inquiry validation shared by the browser form and the API route.
 * The server never trusts the browser: it re-runs `validateInquiry` on every request.
 */

export const TOPICS = ["demo", "pricing", "support", "other"] as const;
export type Topic = (typeof TOPICS)[number];

export type Inquiry = {
  name: string;
  email: string;
  organization: string;
  topic: Topic;
  message: string;
  locale: "en" | "ar";
};

export type FieldError = "name" | "email" | "organization" | "topic" | "message";

export const LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  organization: { max: 160 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** Remove control characters (keeps newlines/tabs in the message only). */
const clean = (s: unknown, keepNewlines = false) =>
  String(s ?? "")
    .replace(keepNewlines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ")
    .trim();

export function normalizeInquiry(raw: Record<string, unknown>): Inquiry {
  const topic = clean(raw.topic) as Topic;
  return {
    name: clean(raw.name).replace(/\s+/g, " "),
    email: clean(raw.email).toLowerCase(),
    organization: clean(raw.organization).replace(/\s+/g, " "),
    topic: (TOPICS as readonly string[]).includes(topic) ? topic : "other",
    message: clean(raw.message, true),
    locale: raw.locale === "ar" ? "ar" : "en",
  };
}

export function validateInquiry(q: Inquiry): FieldError[] {
  const errors: FieldError[] = [];
  if (q.name.length < LIMITS.name.min || q.name.length > LIMITS.name.max) errors.push("name");
  if (q.email.length > LIMITS.email.max || !EMAIL_RE.test(q.email)) errors.push("email");
  if (q.organization.length > LIMITS.organization.max) errors.push("organization");
  if (!(TOPICS as readonly string[]).includes(q.topic)) errors.push("topic");
  if (q.message.length < LIMITS.message.min || q.message.length > LIMITS.message.max) errors.push("message");
  return errors;
}

/** Spam traps: a hidden field humans never fill, and a minimum time on the form. */
export const HONEYPOT_FIELD = "website";
export const MIN_FILL_MS = 2500;
