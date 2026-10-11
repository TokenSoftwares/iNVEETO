"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Check, Crown, Mic, Bookmark } from "lucide-react";
import { DemoWindow, people, Avatar, useSequence } from "./shared";
import { useLocale, useT } from "@/lib/locale-context";

const filters = [
  { id: "tag", label: { en: "Tag: Partners", ar: "الوسم: شركاء" } },
  { id: "class", label: { en: "Classification: VIP", ar: "التصنيف: شخصية مهمة" } },
  { id: "history", label: { en: "Attended: Annual Conference", ar: "حضر: المؤتمر السنوي" } },
];

const roles = [
  { icon: Crown, label: { en: "VIP", ar: "شخصية مهمة" } },
  { icon: Mic, label: { en: "Speaker", ar: "متحدث" } },
  { icon: Crown, label: { en: "VIP", ar: "شخصية مهمة" } },
  { icon: null, label: { en: "Guest", ar: "ضيف" } },
  { icon: Crown, label: { en: "VIP", ar: "شخصية مهمة" } },
];

export function SelectMock({ active }: { active: boolean }) {
  const t = useT();
  const locale = useLocale();
  // 1-3 filters on · 4 rows checked · 5 count
  const step = useSequence(active, [300, 500, 500, 500, 400]);
  const [saved, setSaved] = useState(false);
  const selected = [0, 1, 2, 4];

  return (
    <DemoWindow title={t({ en: "New invitation list", ar: "قائمة دعوات جديدة" })}>
      <div className="flex flex-wrap gap-2">
        {filters.map((f, i) => {
          const on = step > i;
          return (
            <span
              key={f.id}
              className={`chip h-8 px-3 ring-1 transition-colors duration-300 ${on ? "bg-brand text-white ring-brand" : "bg-white text-slate ring-line"}`}
            >
              {on && <Check size={13} aria-hidden />}
              {t(f.label)}
            </span>
          );
        })}
      </div>

      <ul className="mt-4 space-y-1.5">
        {people.map((p, i) => {
          const isSel = selected.includes(i) && step >= 4;
          const R = roles[i];
          return (
            <li
              key={p.id}
              className={`flex items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-500 ${
                isSel ? "bg-mist ring-1 ring-lilac" : step >= 4 ? "opacity-45" : ""
              }`}
            >
              <span
                className={`grid size-5 place-items-center rounded-md ring-1 transition-colors ${isSel ? "bg-brand text-white ring-brand" : "bg-white ring-line-strong"}`}
                aria-hidden
              >
                {isSel && <Check size={13} />}
              </span>
              <Avatar initials={p.initials} tone={i} />
              <span className="min-w-0 flex-1 truncate text-[0.9rem] text-ink">{p[locale]}</span>
              <span className="chip bg-lavender text-brand-deep">
                {R.icon && <R.icon size={12} aria-hidden />}
                {t(R.label)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <motion.p initial={false} animate={{ opacity: step >= 5 ? 1 : 0.3 }} className="text-sm text-ink" aria-live="polite">
          <span className="text-lg font-semibold tabular-nums text-brand-deep">{step >= 5 ? 38 : 0}</span>{" "}
          {t({ en: "selected of 1,248 contacts", ar: "محددون من أصل 1,248 جهة اتصال" })}
        </motion.p>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          className={`btn btn-sm shrink-0 ${saved ? "bg-ok-soft text-ok" : "btn-secondary"}`}
        >
          <Bookmark size={15} aria-hidden className={saved ? "fill-current" : ""} />
          {saved ? t({ en: "Segment saved", ar: "تم حفظ الشريحة" }) : t({ en: "Save as segment", ar: "احفظ كشريحة" })}
        </button>
      </div>
    </DemoWindow>
  );
}
