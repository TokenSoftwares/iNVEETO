"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allFeatures, modules } from "@/content/features";
import { ui } from "@/content/ui";
import { useLocale, useT } from "@/lib/locale-context";


export function WhatsNew() {
  const t = useT();
  const locale = useLocale();
  const rail = useRef<HTMLUListElement>(null);
  const fresh = allFeatures.filter((f) => f.isNew);
  const moduleName = (id: string) => t(modules.find((m) => m.id === id)!.name);

  const scroll = (dirn: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const rtl = locale === "ar" ? -1 : 1;
    el.scrollBy({ left: dirn * rtl * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="pb-24 sm:pb-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="t-h3 text-ink">{t(ui.sections.whatsNew)}</h2>
            <p className="t-body mt-1">{t(ui.sections.whatsNewBody)}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={t({ en: "Previous", ar: "السابق" })} className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-line transition hover:ring-brand">
              <ChevronLeft size={18} className="rtl:-scale-x-100" aria-hidden />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label={t({ en: "Next", ar: "التالي" })} className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-line transition hover:ring-brand">
              <ChevronRight size={18} className="rtl:-scale-x-100" aria-hidden />
            </button>
          </div>
        </div>
        <ul ref={rail} className="-mx-1 mt-7 flex snap-x snap-mandatory scroll-px-1 gap-4 overflow-x-auto px-1 pb-4 pt-1 [scrollbar-width:thin]" tabIndex={0} aria-label={t(ui.sections.whatsNew)}>
          {fresh.map((f) => (
            <li key={f.id} className="w-[78%] shrink-0 snap-start rounded-3xl bg-gradient-to-b from-mist to-white p-6 ring-1 ring-line sm:w-[300px]">
              <span className="chip bg-white text-brand-deep ring-1 ring-line">{moduleName(f.module)}</span>
              <h3 className="mt-5 text-[1.05rem] font-medium text-ink">{t(f.title)}</h3>
              <p className="t-body mt-2 text-[0.95rem]">{t(f.desc)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
