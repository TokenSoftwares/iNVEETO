"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { DemoWindow, useSequence } from "./shared";
import { useLocale, useT } from "@/lib/locale-context";
import type { Locale } from "@/content/i18n";

const copy = {
  en: {
    subject: "You're invited: Annual Conference",
    dear: "Dear Layla,",
    body: "We'd be honoured to welcome you to our Annual Conference on 18 November. Please let us know if you can join.",
    yes: "Confirm",
    maybe: "Tentative",
    no: "Apologize",
  },
  ar: {
    subject: "دعوة: المؤتمر السنوي",
    dear: "عزيزتي ليلى،",
    body: "يسعدنا أن نرحب بك في مؤتمرنا السنوي يوم 18 تشرين الثاني. نرجو إعلامنا بإمكانية حضورك.",
    yes: "تأكيد",
    maybe: "مبدئي",
    no: "اعتذار",
  },
};

export function InviteMock({ active }: { active: boolean }) {
  const t = useT();
  const locale = useLocale();
  const [lang, setLang] = useState<Locale>(locale);
  const step = useSequence(active, [300, 900, 600]);
  const c = copy[lang];
  const tallies = [
    { label: { en: "Confirmed", ar: "مؤكد" }, value: 247, cls: "bg-brand" },
    { label: { en: "Pending", ar: "قيد الانتظار" }, value: 38, cls: "bg-[#e0a43b]" },
    { label: { en: "Apologized", ar: "معتذر" }, value: 14, cls: "bg-no" },
  ];
  const max = 299;

  return (
    <DemoWindow
      title={t({ en: "Invitation preview", ar: "معاينة الدعوة" })}
      aside={
        <span role="group" aria-label={t({ en: "Invitation language", ar: "لغة الدعوة" })} className="flex rounded-full bg-mist p-0.5 ring-1 ring-line">
          {(["en", "ar"] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={`h-7 rounded-full px-2.5 text-xs transition-colors ${lang === l ? "bg-white text-brand-deep shadow-soft" : "text-slate"}`}
            >
              {l === "en" ? "EN" : "ع"}
            </button>
          ))}
        </span>
      }
    >
      <motion.div
        initial={false}
        animate={{ rotateX: step >= 1 ? 0 : 14, opacity: step >= 1 ? 1 : 0.4, y: step >= 1 ? 0 : 12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 900 }}
        className="overflow-hidden rounded-2xl ring-1 ring-line"
        lang={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex h-14 items-center justify-between bg-gradient-to-r from-lavender to-[#e8def5] px-4">
          <span className="text-sm font-semibold text-brand-deep">{lang === "en" ? "Your organization" : "مؤسستك"}</span>
          <span className="text-[0.7rem] text-brand-deep/70">{lang === "en" ? "Custom header" : "ترويسة مخصصة"}</span>
        </div>
        <div className="bg-white px-4 py-4">
          <p className="text-xs text-slate">{c.subject}</p>
          <p className="mt-2 text-[0.95rem] font-medium text-ink">{c.dear}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate">{c.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip h-8 bg-brand px-3 text-white">{c.yes}</span>
            <span className="chip h-8 bg-mist px-3 text-ink ring-1 ring-line">{c.maybe}</span>
            <span className="chip h-8 bg-mist px-3 text-ink ring-1 ring-line">{c.no}</span>
          </div>
        </div>
        <div className="border-t border-line bg-mist px-4 py-2 text-[0.7rem] text-slate">{lang === "en" ? "Custom footer · Sent from events@yourdomain.org" : "تذييل مخصص · أُرسلت من events@yourdomain.org"}</div>
      </motion.div>

      <div className="mt-4 space-y-2.5" aria-live="polite">
        {tallies.map((r, i) => (
          <div key={i} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 text-sm">
            <span className="text-slate">{t(r.label)}</span>
            <span className="h-2 overflow-hidden rounded-full bg-mist">
              <motion.span
                className={`block h-full rounded-full ${r.cls}`}
                initial={false}
                animate={{ width: step >= 2 ? `${(r.value / max) * 100}%` : "0%" }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <span className="text-end font-medium tabular-nums text-ink">{step >= 2 ? r.value : 0}</span>
          </div>
        ))}
      </div>
    </DemoWindow>
  );
}
