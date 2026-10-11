"use client";

import { useRef } from "react";
import { Contact, Languages, CalendarCheck, MailOpen, ListChecks, QrCode, BarChart3, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { highlights } from "@/content/home";
import { allFeatures, modules } from "@/content/features";
import { ui } from "@/content/ui";
import { useLocale, useT } from "@/lib/locale-context";

const icons: Record<string, typeof Contact> = {
  contacts: Contact,
  "dual-language": Languages,
  events: CalendarCheck,
  invitations: MailOpen,
  rsvp: ListChecks,
  qr: QrCode,
  reports: BarChart3,
  share: Share2,
};

export function Highlights() {
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
    <section className="py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="t-h2 text-ink">{t(ui.sections.highlightsTitle)}</h2>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {highlights.map((h) => {
            const Icon = icons[h.id];
            return (
              <li key={h.id} className="border-t border-line py-7">
                <span className="grid size-11 place-items-center rounded-2xl bg-lavender text-brand-deep">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 text-[1.08rem] font-medium leading-snug text-ink">{t(h.title)}</h3>
                <p className="t-body mt-2">{t(h.body)}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shell mt-24">
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
        <ul ref={rail} className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]" tabIndex={0} aria-label={t(ui.sections.whatsNew)}>
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
