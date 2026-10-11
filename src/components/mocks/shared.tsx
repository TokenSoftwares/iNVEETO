"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { useT } from "@/lib/locale-context";
import { ui } from "@/content/ui";
import type { T } from "@/content/i18n";

/**
 * Plays a timed sequence while `active` is true: returns the current step (0..n).
 * Reduced motion jumps straight to the final step.
 */
export function useSequence(active: boolean, delays: number[]) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [wasActive, setWasActive] = useState(active);
  // Restart from the first step each time the demo becomes active.
  if (active !== wasActive) {
    setWasActive(active);
    if (active) setStep(0);
  }
  const key = delays.join(",");
  useEffect(() => {
    if (!active || reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let acc = 0;
    delays.forEach((d, i) => {
      acc += d;
      timers.push(setTimeout(() => setStep(i + 1), acc));
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced, key]);
  return reduced ? delays.length : step;
}

export function DemoWindow({ title, children, className = "", aside }: { title: string; children: React.ReactNode; className?: string; aside?: React.ReactNode }) {
  const t = useT();
  return (
    <figure className={`demo-window overflow-hidden ${className}`}>
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-white/70 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{title}</span>
        <span className="ms-auto flex flex-wrap items-center justify-end gap-2">
          {aside}
          <span className="chip bg-mist text-[0.7rem] text-slate ring-1 ring-line">{t(ui.demo.sample)}</span>
        </span>
      </figcaption>
      <div className="p-4 sm:p-5">{children}</div>
    </figure>
  );
}

/** Sample people used across demos (names from the samples on inveeto.com; organizations generic). */
export const people: { id: string; en: string; ar: string; org: T; initials: string }[] = [
  { id: "layla", en: "Layla Nasser", ar: "ليلى ناصر", org: { en: "City University", ar: "جامعة المدينة" }, initials: "LN" },
  { id: "ahmed", en: "Ahmed Al-Rashid", ar: "أحمد الراشد", org: { en: "Ministry of Trade", ar: "وزارة التجارة" }, initials: "AR" },
  { id: "sara", en: "Sara Khalil", ar: "سارة خليل", org: { en: "Development agency", ar: "وكالة تنموية" }, initials: "SK" },
  { id: "omar", en: "Omar Mansour", ar: "عمر منصور", org: { en: "Grand hotel", ar: "فندق جراند" }, initials: "OM" },
  { id: "rania", en: "Rania Haddad", ar: "رانيا حداد", org: { en: "Chamber of Commerce", ar: "غرفة التجارة" }, initials: "RH" },
];

export function Avatar({ initials, tone = 0 }: { initials: string; tone?: number }) {
  const tones = ["bg-lavender text-brand-deep", "bg-[#ebe4f5] text-brand-strong", "bg-[#f3eff9] text-brand"];
  return (
    <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${tones[tone % 3]}`} aria-hidden>
      {initials}
    </span>
  );
}

export type Status = "confirmed" | "pending" | "apologized" | "checked";
export function StatusChip({ status }: { status: Status }) {
  const t = useT();
  const map: Record<Status, { cls: string; label: T }> = {
    confirmed: { cls: "bg-lavender text-brand-deep", label: { en: "Confirmed", ar: "مؤكد" } },
    pending: { cls: "bg-wait-soft text-wait", label: { en: "Pending", ar: "قيد الانتظار" } },
    apologized: { cls: "bg-no-soft text-no", label: { en: "Apologized", ar: "معتذر" } },
    checked: { cls: "bg-ok-soft text-ok", label: { en: "Checked in", ar: "تم تسجيل الحضور" } },
  };
  const m = map[status];
  return <span className={`chip ${m.cls}`}>{t(m.label)}</span>;
}
