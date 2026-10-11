"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, CopyCheck, Check } from "lucide-react";
import { DemoWindow, people, Avatar, useSequence } from "./shared";
import { useLocale, useT } from "@/lib/locale-context";

const tags = [
  [{ en: "Speakers", ar: "متحدثون" }, { en: "Academia", ar: "أكاديميون" }],
  [{ en: "Partners", ar: "شركاء" }, { en: "Government", ar: "حكومة" }],
  [{ en: "Donors", ar: "مانحون" }],
  [{ en: "Venues", ar: "منشآت" }, { en: "Partners", ar: "شركاء" }],
];

export function OrganizeMock({ active }: { active: boolean }) {
  const t = useT();
  const locale = useLocale();
  // 1 rows in · 2 tags · 3 duplicate found · 4 merged
  const step = useSequence(active, [250, 700, 900, 1500]);
  const rows = people.slice(0, 4);
  const other = locale === "en" ? "ar" : "en";

  return (
    <DemoWindow title={t({ en: "Address book", ar: "دفتر العناوين" })}>
      <div className="flex items-center gap-2 rounded-xl bg-mist px-3 py-2.5 text-sm text-slate ring-1 ring-line">
        <Search size={15} aria-hidden />
        <span>{t({ en: "Search name, tag, company or job title", ar: "ابحث بالاسم أو الوسم أو الشركة أو المسمى" })}</span>
      </div>

      <ul className="mt-3 divide-y divide-line">
        {rows.map((p, i) => (
          <motion.li
            key={p.id}
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 py-3"
          >
            <Avatar initials={p.initials} tone={i} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.92rem] font-medium text-ink">{p[locale]}</p>
              <p className="truncate text-xs text-slate">
                <span lang={other} dir={other === "ar" ? "rtl" : "ltr"}>{p[other]}</span>
                <span aria-hidden> · </span>
                {t(p.org)}
              </p>
            </div>
            <div className="hidden flex-wrap justify-end gap-1 sm:flex">
              {tags[i].map((tg, j) => (
                <motion.span
                  key={j}
                  initial={false}
                  animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.8 }}
                  transition={{ delay: 0.1 + i * 0.07 + j * 0.05, duration: 0.3 }}
                  className="chip bg-lavender text-brand-deep"
                >
                  {t(tg)}
                </motion.span>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="mt-2 min-h-[52px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.div
              key="dup"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-3 rounded-xl bg-wait-soft px-3 py-3 text-sm text-wait"
            >
              <CopyCheck size={16} aria-hidden />
              <span>{t({ en: "Possible duplicate: Sara Khalil (2 records)", ar: "تكرار محتمل: سارة خليل (سجلان)" })}</span>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div
              key="merged"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-xl bg-ok-soft px-3 py-3 text-sm text-ok"
            >
              <Check size={16} aria-hidden />
              <span>{t({ en: "Duplicate resolved automatically. Records merged.", ar: "تمت معالجة التكرار تلقائيًا ودمج السجلين." })}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoWindow>
  );
}
