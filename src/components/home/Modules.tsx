"use client";

import Link from "next/link";
import { Tabs } from "@heroui/react";
import { BookUser, CalendarCheck2, Megaphone, ArrowUpRight } from "lucide-react";
import { modules } from "@/content/features";
import { ui } from "@/content/ui";
import { href } from "@/content/i18n";
import { useLocale, useT } from "@/lib/locale-context";

const icons = { addressBook: BookUser, events: CalendarCheck2, campaigns: Megaphone };

export function Modules() {
  const t = useT();
  const locale = useLocale();
  return (
    <section id="modules" className="relative bg-mist pb-16 pt-24 sm:pt-32">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="t-h2 max-w-[22ch] text-ink">{t(ui.sections.modulesTitle)}</h2>
          <p className="t-lead max-w-[36rem] lg:justify-self-end">{t(ui.sections.modulesBody)}</p>
        </div>

        <Tabs className="mt-12" defaultSelectedKey="addressBook">
          <Tabs.ListContainer>
            <Tabs.List aria-label={t({ en: "Product modules", ar: "وحدات المنتج" })} className="w-fit rounded-full bg-white p-1 ring-1 ring-line">
              {modules.map((m) => {
                const Icon = icons[m.id];
                return (
                  <Tabs.Tab key={m.id} id={m.id} className="gap-2 rounded-full px-4 text-[0.95rem] sm:px-5">
                    <Icon size={17} aria-hidden />
                    {t(m.name)}
                    <Tabs.Indicator className="rounded-full bg-lavender" />
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </Tabs.ListContainer>

          {modules.map((m) => (
            <Tabs.Panel key={m.id} id={m.id} className="mt-8 outline-none">
              <div className="grid gap-10 rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[0.9fr_1.6fr]">
                <div>
                  <p className="t-h2 text-brand-deep">{t(m.verbs)}</p>
                  <p className="t-body mt-4 max-w-[30rem]">{t(m.intro)}</p>
                  <Link href={href(locale, `/features#${m.id}`)} className="text-link mt-6 inline-flex items-center gap-1">
                    {t({ en: `All ${m.name.en} features`, ar: `كل ميزات ${m.name.ar}` })}
                    <ArrowUpRight size={16} aria-hidden className="rtl:-scale-x-100" />
                  </Link>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  {m.groups.map((g) => (
                    <div key={g.id}>
                      <h3 className="text-sm font-medium text-slate">{t(g.title)}</h3>
                      <ul className="mt-3 space-y-2">
                        {g.items.slice(0, 3).map((f) => (
                          <li key={f.id} className="flex items-start gap-2 text-[0.95rem] text-ink">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                            <span>
                              {t(f.title)}
                              {f.isNew && <span className="chip ms-2 h-5 bg-lavender px-2 text-[0.68rem] text-brand-deep">{t(ui.features.newBadge)}</span>}
                            </span>
                          </li>
                        ))}
                        {g.items.length > 3 && (
                          <li className="ps-3.5 text-sm text-slate">
                            {t({ en: `+ ${g.items.length - 3} more`, ar: `+ ${g.items.length - 3} أخرى` })}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>

      </div>
    </section>
  );
}
