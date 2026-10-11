import { deliverInquiry, isInquiryConfigured } from "@/lib/inquiry/delivery";
import { HONEYPOT_FIELD, MIN_FILL_MS, normalizeInquiry, validateInquiry } from "@/lib/inquiry/schema";

/**
 * POST /api/inquiry — receives the contact form.
 *
 * Protections: same-origin check, JSON-only, 16 KB body cap, honeypot + minimum fill time,
 * server-side validation, per-IP rate limit, no input echoed back, no-store responses.
 * Delivery is delegated to src/lib/inquiry/delivery.ts (configured via environment variables).
 */

const MAX_BODY = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort limiter (per server instance). For strict limits across instances,
// back this with a shared store such as Vercel KV / Upstash Redis.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    const allowed = (process.env.INQUIRY_ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    return o.host === host || allowed.includes(o.origin);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, { ok: false, error: "forbidden" });
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) return json(415, { ok: false, error: "unsupported" });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "rate_limited" });

  const text = await req.text();
  if (text.length > MAX_BODY) return json(413, { ok: false, error: "too_large" });

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error();
  } catch {
    return json(400, { ok: false, error: "invalid" });
  }

  // Spam traps: pretend success so bots learn nothing.
  const startedAt = Number(raw.startedAt);
  if (String(raw[HONEYPOT_FIELD] ?? "") !== "" || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return json(200, { ok: true });
  }

  const inquiry = normalizeInquiry(raw);
  const fields = validateInquiry(inquiry);
  if (fields.length) return json(400, { ok: false, error: "invalid", fields });

  if (!isInquiryConfigured()) return json(503, { ok: false, error: "not_configured" });

  const result = await deliverInquiry(inquiry);
  if (!result.ok) return json(result.reason === "not_configured" ? 503 : 502, { ok: false, error: result.reason });
  return json(200, { ok: true });
}

export function GET() {
  return json(405, { ok: false, error: "method_not_allowed" });
}
