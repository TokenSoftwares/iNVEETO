"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, ScanLine, Crown, RotateCcw } from "lucide-react";
import { DemoWindow, Avatar, StatusChip, useSequence } from "./shared";
import { useLocale, useT } from "@/lib/locale-context";
import { useReducedMotion } from "@/lib/hooks";

/** Decorative QR-style pattern (not a scannable code). Built once at module load. */
const QR_N = 21;
const QR_CELLS: [number, number][] = (() => {
  let seed = 7;
  const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= QR_N - 7 && y < 7) || (x < 7 && y >= QR_N - 7);
  const out: [number, number][] = [];
  for (let y = 0; y < QR_N; y++)
    for (let x = 0; x < QR_N; x++) {
      if (!finder(x, y) && r() > 0.52) out.push([x, y]);
    }
  return out;
})();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={7} rx={1.4} fill="#3d2a5c" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={1} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.7} fill="#3d2a5c" />
    </g>
  );
}

function QrPattern() {
  return (
    <svg viewBox="-1 -1 23 23" className="size-full" aria-hidden>
      {QR_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} rx={0.2} fill="#3d2a5c" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={14} y={0} />
      <Finder x={0} y={14} />
    </svg>
  );
}

export function ConfirmMock({ active }: { active: boolean }) {
  const t = useT();
  const locale = useLocale();
  const reduced = useReducedMotion();
  // 1 scanning · 2 guest found (confirmed) · 3 checked in
  const step = useSequence(active, [300, 1700, 900]);
  const [session, setSession] = useState(2);
  const [wasActive, setWasActive] = useState(active);
  if (active !== wasActive) {
    setWasActive(active);
    if (!active) setSession(2);
  }
  const checked = step >= 3;

  return (
    <DemoWindow title={t({ en: "Check-in · Ballroom B", ar: "تسجيل الحضور · القاعة B" })}>
      <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
        <div className="relative mx-auto aspect-square w-[150px] overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-line">
          <QrPattern />
          {step >= 1 && step < 3 && !reduced && (
            <motion.span
              className="absolute inset-x-2 h-0.5 rounded-full bg-brand shadow-[0_0_14px_4px_rgb(106_59_216/0.45)]"
              initial={{ top: "10%" }}
              animate={{ top: ["10%", "88%", "10%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
          <AnimatePresence>
            {checked && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 grid place-items-center bg-white/80 backdrop-blur-[2px]"
              >
                <CheckCircle2 size={56} className="text-ok" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-mist p-3 ring-1 ring-line">
            <Avatar initials="LN" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.92rem] font-medium text-ink">{locale === "en" ? "Layla Nasser" : "ليلى ناصر"}</p>
              <p className="flex items-center gap-1 text-xs text-brand-deep">
                <Crown size={12} aria-hidden /> {t({ en: "VIP · Table 3", ar: "شخصية مهمة · طاولة 3" })}
              </p>
            </div>
            <div aria-live="polite">
              {step < 2 ? (
                <span className="chip bg-white text-slate ring-1 ring-line">
                  <ScanLine size={12} aria-hidden /> {t({ en: "Scanning", ar: "جارٍ المسح" })}
                </span>
              ) : (
                <StatusChip status={checked ? "checked" : "confirmed"} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { v: 41 + (checked ? 1 : 0), l: { en: "Checked in", ar: "تم تسجيلهم" }, c: "text-ok" },
              { v: 6, l: { en: "Pending", ar: "قيد الانتظار" }, c: "text-wait" },
              { v: 5, l: { en: "VIP", ar: "شخصيات مهمة" }, c: "text-brand-deep" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-white py-2.5 ring-1 ring-line">
                <motion.p key={s.v} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-xl font-semibold tabular-nums ${s.c}`}>
                  {s.v}
                </motion.p>
                <p className="text-[0.72rem] text-slate">{t(s.l)}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 text-xs text-slate">
            <span aria-live="polite">
              {t({ en: `Check-in ${session} of 6 · multi-session day`, ar: `تسجيل الحضور ${session} من 6 · يوم متعدد الجلسات` })}
            </span>
            <button
              type="button"
              disabled={!checked || session >= 6}
              onClick={() => {
                setSession((s) => Math.min(6, s + 1));
              }}
              className="btn btn-quiet btn-sm !min-h-8 gap-1 !px-2.5 text-xs text-brand-strong disabled:opacity-40"
            >
              <RotateCcw size={13} aria-hidden />
              {t({ en: "Next session", ar: "الجلسة التالية" })}
            </button>
          </div>
        </div>
      </div>
    </DemoWindow>
  );
}
