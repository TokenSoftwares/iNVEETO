import "server-only";
import { createHmac } from "node:crypto";
import type { Inquiry } from "./schema";

/**
 * WHERE INQUIRIES GO — the only part of the form that needs configuring.
 *
 * Configure ONE of these in the hosting environment (Vercel → Project → Settings →
 * Environment Variables), then redeploy:
 *
 *   Option A — email via Resend (https://resend.com):
 *     INQUIRY_RESEND_API_KEY   API key
 *     INQUIRY_FROM             verified sender, e.g. "iNVEETO Website <website@inveeto.com>"
 *     INQUIRY_TO               recipient(s), comma-separated (default: info@inveeto.com)
 *
 *   Option B — webhook (CRM, Zapier/Make, a helpdesk, your own API):
 *     INQUIRY_WEBHOOK_URL      HTTPS endpoint that receives a JSON POST
 *     INQUIRY_WEBHOOK_SECRET   optional; adds header X-Inveeto-Signature: sha256=<hmac of body>
 *
 * With neither configured, the site does not render the form at all: it shows the
 * official email addresses instead, so visitors are never shown a form that can't deliver.
 */

export type DeliveryResult = { ok: true; provider: "resend" | "webhook" } | { ok: false; reason: "not_configured" | "delivery_failed" };

const env = (k: string) => (process.env[k] ?? "").trim();

export function inquiryProvider(): "resend" | "webhook" | null {
  if (env("INQUIRY_RESEND_API_KEY") && env("INQUIRY_FROM")) return "resend";
  if (/^https:\/\//.test(env("INQUIRY_WEBHOOK_URL"))) return "webhook";
  return null;
}

export const isInquiryConfigured = () => inquiryProvider() !== null;

const topicLabel: Record<Inquiry["topic"], string> = {
  demo: "Book a demo",
  pricing: "Pricing",
  support: "Technical support",
  other: "Something else",
};

function asText(q: Inquiry, receivedAt: string) {
  return [
    `New inquiry from the iNVEETO website (${q.locale === "ar" ? "Arabic" : "English"} site)`,
    "",
    `Topic:        ${topicLabel[q.topic]}`,
    `Name:         ${q.name}`,
    `Email:        ${q.email}`,
    `Organization: ${q.organization || "—"}`,
    `Received:     ${receivedAt}`,
    "",
    "Message:",
    q.message,
  ].join("\n");
}

async function withTimeout(url: string, init: RequestInit, ms = 8000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, cache: "no-store" });
  } finally {
    clearTimeout(id);
  }
}

export async function deliverInquiry(q: Inquiry): Promise<DeliveryResult> {
  const provider = inquiryProvider();
  if (!provider) return { ok: false, reason: "not_configured" };
  const receivedAt = new Date().toISOString();

  try {
    if (provider === "resend") {
      const to = (env("INQUIRY_TO") || "info@inveeto.com").split(",").map((s) => s.trim()).filter(Boolean);
      const res = await withTimeout("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env("INQUIRY_RESEND_API_KEY")}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env("INQUIRY_FROM"),
          to,
          reply_to: q.email,
          subject: `Website inquiry: ${topicLabel[q.topic]} — ${q.name}`.slice(0, 180),
          text: asText(q, receivedAt), // plain text only: nothing a visitor types is rendered as HTML
        }),
      });
      return res.ok ? { ok: true, provider } : { ok: false, reason: "delivery_failed" };
    }

    const body = JSON.stringify({ type: "website.inquiry", receivedAt, inquiry: q });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const secret = env("INQUIRY_WEBHOOK_SECRET");
    if (secret) headers["X-Inveeto-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
    const res = await withTimeout(env("INQUIRY_WEBHOOK_URL"), { method: "POST", headers, body });
    return res.ok ? { ok: true, provider } : { ok: false, reason: "delivery_failed" };
  } catch {
    return { ok: false, reason: "delivery_failed" };
  }
}
