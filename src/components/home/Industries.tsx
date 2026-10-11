"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ArrowUpRight } from "lucide-react";
import { industries } from "@/content/usecases";
import { ui } from "@/content/ui";
import { href } from "@/content/i18n";
import { useLocale, useT } from "@/lib/locale-context";

export function Industries() {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useState(industries[0].id);
  const current = industries.find((i) => i.id === active)!;

  return (
    <section className="bg-gradient-to-b from-white via-lavender/60 to-white py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 className="t-h2 max-w-[20ch] text-ink">{t(ui.sections.industriesTitle)}</h2>
          <p className="t-lead max-w-[34rem] lg:justify-self-end">{t(ui.sections.industriesBody)}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div role="tablist" aria-label={t(ui.usecases.filter)} aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {industries.map((ind) => {
              const on = ind.id === active;
              return (
                <button
                  key={ind.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="industry-panel"
                  id={`ind-${ind.id}`}
                  onClick={() => setActive(ind.id)}
                  onMouseEnter={() => setActive(ind.id)}
                  onKeyDown={(e) => {
                    const i = industries.findIndex((x) => x.id === active);
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      const n = industries[(i + 1) % industries.length];
                      setActive(n.id);
                      document.getElementById(`ind-${n.id}`)?.focus();
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const n = industries[(i - 1 + industries.length) % industries.length];
                      setActive(n.id);
                      document.getElementById(`ind-${n.id}`)?.focus();
                    }
                  }}
                  tabIndex={on ? 0 : -1}
                  className={`group flex shrink-0 items-center justify-between gap-4 rounded-2xl px-4 py-3 text-start transition-colors lg:px-5 lg:py-4 ${
                    on ? "bg-white text-ink shadow-soft ring-1 ring-line" : "text-slate hover:text-ink"
                  }`}
                >
                  <span className="whitespace-nowrap text-[0.98rem] lg:whitespace-normal lg:text-[1.08rem]">{t(ind.name)}</span>
                  <span className={`hidden size-2 rounded-full transition-colors lg:block ${on ? "bg-brand" : "bg-transparent"}`} aria-hidden />
                </button>
              );
            })}
          </div>

          <div id="industry-panel" role="tabpanel" aria-labelledby={`ind-${current.id}`} className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-[1.1fr_1fr]"
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={current.image} alt={t(current.alt)} className="absolute inset-0 size-full object-cover" loading="lazy" />
                  <span className="chip absolute start-4 top-4 bg-white/90 text-brand-deep backdrop-blur">{t(current.tag)}</span>
                </div>
                <div className="flex flex-col p-7 sm:p-8">
                  <h3 className="t-h3 text-ink">{t(current.name)}</h3>
                  <ul className="mt-5 space-y-3">
                    {current.points.map((p, i) => (
                      <li key={i} className="flex gap-2.5 text-[0.97rem] text-ink">
                        <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                        {t(p)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    {current.detailSlug ? (
                      <Link href={href(locale, `/use-cases/${current.detailSlug}`)} className="text-link inline-flex items-center gap-1">
                        {t(ui.cta.viewUsecase)} <ArrowUpRight size={16} aria-hidden className="rtl:-scale-x-100" />
                      </Link>
                    ) : (
                      <Link href={href(locale, "/use-cases")} className="text-link inline-flex items-center gap-1">
                        {t(ui.cta.allUsecases)} <ArrowUpRight size={16} aria-hidden className="rtl:-scale-x-100" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
