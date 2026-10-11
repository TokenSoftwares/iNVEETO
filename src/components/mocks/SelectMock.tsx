"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Check, Crown, Mic, Bookmark } from "lucide-react";
import { DemoWindow, people, Avatar, useSequence } from "./shared";
import { fmt, isInvited, roleLabel, sample, tagLabel, type Role } from "./sampleData";
import { useLocale, useT } from "@/lib/locale-context";

const filters = [
  { id: "tag", label: { en: "Tag: Partners", ar: "الوسم: شركاء" } },
  { id: "history", label: { en: "Attended: Annual Conference 2025", ar: "حضر: المؤتمر السنوي 2025" } },
];

const roleIcon: Record<Role, typeof Crown | null> = { vip: Crown, speaker: Mic, guest: null };

export function SelectMock({ active }: { active: boolean }) {
  const t = useT();
  const locale = useLocale();
  // 1-2 filters on · 3 rows selected · 4 roles assigned · 5 totals
  const step = useSequence(active, [300, 500, 600, 600, 400]);
  const [saved, setSaved] = useState(false);
  const { vip, speaker, guest } = sample.roles;

  return (
    <DemoWindow title={t({ en: `Invitation list · ${sample.event.en}`, ar: `قائمة الدعوات · ${sample.event.ar}` })}>
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
          const invited = isInvited(p);
          const isSel = invited && step >= 3;
          const Icon = roleIcon[p.role];
          return (
            <li
              key={p.id}
              className={`flex items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-500 ${
                isSel ? "bg-mist ring-1 ring-lilac" : step >= 3 ? "[&_.avatar]:grayscale" : ""
              }`}
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-md ring-1 transition-colors ${isSel ? "bg-brand text-white ring-brand" : "bg-white ring-line-strong"}`}
                aria-hidden
              >
                {isSel && <Check size={13} />}
              </span>
              <Avatar initials={p.initials} tone={i} />
              <span className={`min-w-0 flex-1 truncate text-[0.9rem] ${!invited && step >= 3 ? "text-slate" : "text-ink"}`}>{p[locale]}</span>
              {isSel && step >= 4 ? (
                <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="chip bg-lavender text-brand-deep">
                  {Icon && <Icon size={12} aria-hidden />}
                  {t(roleLabel[p.role])}
                </motion.span>
              ) : (
                <span className="chip bg-white text-slate ring-1 ring-line">{t(tagLabel[p.tags[0]])}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <motion.div initial={false} animate={{ opacity: step >= 5 ? 1 : 0.3 }} aria-live="polite">
          <p className="text-sm text-ink">
            <span className="text-lg font-semibold tabular-nums text-brand-deep">{step >= 5 ? fmt(sample.selected) : 0}</span>{" "}
            {t({ en: `selected of ${fmt(sample.contacts)} contacts`, ar: `محددة من أصل ${fmt(sample.contacts)} جهة اتصال` })}
          </p>
          <p className="mt-0.5 text-xs tabular-nums text-slate">
            {t({
              en: `${vip} VIP · ${speaker} Speakers · ${guest} Guests`,
              ar: `${vip} شخصية مهمة · ${speaker} متحدثين · ${guest} ضيفًا`,
            })}
          </p>
        </motion.div>
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
