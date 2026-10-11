"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ArrowUpRight } from "lucide-react";
import { industries } from "@/content/usecases";
import { ui } from "@/content/ui";
import { href } from "@/content/i18n";
import { useLocale, useT } from "@/lib/locale-context";
import { SafeImg } from "@/components/ui/SafeImg";

export function IndustryGrid() {
  const t = useT();
  const locale = useLocale();
  const [filter, setFilter] = useState<string>("all");
  const list = filter === "all" ? industries : industries.filter((i) => i.id === filter);

  const pill = (on: boolean) =>
    `chip h-10 shrink-0 px-4 text-[0.9rem] ring-1 transition-colors ${on ? "bg-brand text-white ring-brand" : "bg-white text-slate ring-line hover:text-ink"}`;

  return (
    <div id="use-cases">
      <div role="group" aria-label={t(ui.usecases.filter)} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={pill(filter === "all")}>
          {t(ui.usecases.all)}
        </button>
        {industries.map((i) => (
          <button key={i.id} type="button" aria-pressed={filter === i.id} onClick={() => setFilter(i.id)} className={pill(filter === i.id)}>
            {t(i.tag)}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {list.map((ind) => (
            <motion.li
              layout
              key={ind.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImg src={ind.image} alt={t(ind.alt)} className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="chip absolute start-4 top-4 bg-white/90 text-brand-deep backdrop-blur">{t(ind.tag)}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="t-h3 text-ink">{t(ind.name)}</h3>
                <ul className="mt-4 space-y-2.5">
                  {ind.points.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-[0.95rem] text-ink">
                      <Check size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {t(p)}
                    </li>
                  ))}
                </ul>
                {ind.detailSlug && (
                  <Link href={href(locale, `/use-cases/${ind.detailSlug}`)} className="text-link mt-auto inline-flex items-center gap-1 pt-6">
                    {t(ui.cta.viewUsecase)} <ArrowUpRight size={15} aria-hidden className="rtl:-scale-x-100" />
                  </Link>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
