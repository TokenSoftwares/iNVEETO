"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Users, Mail, Send, ArrowRight, ArrowLeft } from "lucide-react";
import { DemoWindow, useSequence } from "./shared";
import { attendees, sample } from "./sampleData";
import { useLocale, useT } from "@/lib/locale-context";

export function EngageMock({ active }: { active: boolean }) {
  const t = useT();
  const locale = useLocale();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  // 1 audience · 2 newsletter · 3 results
  const step = useSequence(active, [250, 600, 700]);
  const [resent, setResent] = useState(false);
  const [wasActive, setWasActive] = useState(active);
  if (active !== wasActive) {
    setWasActive(active);
    if (!active) setResent(false);
  }

  const { opened: o1, openedAfterResend: o2, responded, pledged, followUp } = sample.campaign;
  const opened = resent ? o2 : o1;
  const total = attendees; // 226 confirmed guests who attended + 6 walk-ins

  return (
    <DemoWindow title={t({ en: "Campaign · Thank you for joining", ar: "حملة · شكرًا لحضوركم" })}>
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <motion.div initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="rounded-xl bg-mist p-3 ring-1 ring-line">
          <p className="flex items-center gap-2 text-xs text-slate">
            <Users size={14} aria-hidden /> {t({ en: "Audience", ar: "الجمهور" })}
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{t({ en: "Annual Conference attendance list", ar: "قائمة حضور المؤتمر السنوي" })}</p>
          <p className="text-xs tabular-nums text-slate">
            {t({
              en: `${total} attendees, including ${sample.attendance.walkIns} walk-ins`,
              ar: `${total} حاضرًا، منهم ${sample.attendance.walkIns} غير مدعوين`,
            })}
          </p>
        </motion.div>
        <motion.span
          initial={false}
          animate={{ opacity: step >= 2 ? 1 : 0.2, x: step >= 2 ? 0 : locale === "ar" ? 6 : -6 }}
          className="hidden justify-self-center text-brand sm:block"
          aria-hidden
        >
          <Arrow size={18} />
        </motion.span>
        <motion.div initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="rounded-xl bg-white p-3 ring-1 ring-lilac">
          <p className="flex items-center gap-2 text-xs text-slate">
            <Mail size={14} aria-hidden /> {t({ en: "Newsletter template", ar: "قالب نشرة" })}
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{t({ en: "Post-event thank you", ar: "شكر ما بعد الفعالية" })}</p>
          <p className="text-xs text-slate">{t({ en: "Personalized: {first name}", ar: "مخصص: {الاسم الأول}" })}</p>
        </motion.div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-line" aria-live="polite">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-slate">{t({ en: "Opened", ar: "فتحوا الرسالة" })}</p>
          <p className="text-sm tabular-nums text-ink">
            <span className="text-lg font-semibold text-brand-deep">{step >= 3 ? opened : 0}</span> / {total}
          </p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand to-[#9a7fc2] rtl:bg-gradient-to-l"
            initial={false}
            animate={{ width: step >= 3 ? `${(opened / total) * 100}%` : "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="chip bg-lavender text-brand-deep tabular-nums">{t({ en: `Responded: ${responded}`, ar: `ردّوا: ${responded}` })}</span>
          <span className="chip bg-ok-soft text-ok tabular-nums">{t({ en: `Pledged: ${pledged}`, ar: `تعهّدوا: ${pledged}` })}</span>
          <span className="chip bg-wait-soft text-wait tabular-nums">{t({ en: `Needs follow-up: ${followUp}`, ar: `بحاجة إلى متابعة: ${followUp}` })}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate">
          {resent
            ? t({ en: "Resent to non-openers. No duplicate campaign needed.", ar: "أُعيد الإرسال لمن لم يفتحوا الرسالة، دون حملة مكررة." })
            : t({ en: `${total - opened} attendees haven't opened it yet.`, ar: `${total - opened} حاضرًا لم يفتحوا الرسالة بعد.` })}
        </p>
        <button
          type="button"
          disabled={step < 3 || resent}
          onClick={() => setResent(true)}
          className="btn btn-primary btn-sm shrink-0 disabled:opacity-50"
        >
          <Send size={14} aria-hidden className="rtl:-scale-x-100" />
          {resent ? t({ en: "Resent", ar: "أُعيد الإرسال" }) : t({ en: "Resend to non-openers", ar: "أعد الإرسال لمن لم يفتحوا الرسالة" })}
        </button>
      </div>
    </DemoWindow>
  );
}
