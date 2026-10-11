"use client";

import { Accordion } from "@heroui/react";
import { Compass, Handshake, PartyPopper } from "lucide-react";
import { venues } from "@/content/usecases";
import { useT } from "@/lib/locale-context";

const icons = { internal: Compass, stakeholders: Handshake, engagement: PartyPopper } as const;

export function VenueAreas() {
  const t = useT();
  return (
    <div className="space-y-6">
      {venues.areas.map((a) => {
        const Icon = icons[a.id as keyof typeof icons];
        return (
          <article key={a.id} className="grid gap-8 rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[0.8fr_1.6fr]">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-lavender text-brand-deep">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="t-h3 mt-5 text-ink">{t(a.title)}</h3>
              <p className="t-body mt-2">{t(a.summary)}</p>
            </div>
            <div>
              <Accordion className="rounded-2xl bg-mist px-2 ring-1 ring-line sm:px-4">
                <Accordion.Item id={`${a.id}-featured`}>
                  <Accordion.Heading>
                    <Accordion.Trigger className="gap-4 py-4 text-start">
                      <span>
                        <span className="block font-medium text-ink">{t(a.featured.label)}</span>
                        <span className="block text-sm font-normal text-slate">{t(a.featured.short)}</span>
                      </span>
                      <Accordion.Indicator className="text-brand" />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="pb-5">
                      <p className="text-[1.02rem] font-medium text-brand-deep">{t(a.featured.title)}</p>
                      {a.featured.body.map((p, i) => (
                        <p key={i} className={`t-body mt-3 ${i === 2 ? "text-ink" : ""}`}>
                          {t(p)}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {a.more.map((m) => (
                  <li key={m.label.en} className="rounded-2xl p-4 ring-1 ring-line">
                    <p className="font-medium text-ink">{t(m.label)}</p>
                    <p className="mt-0.5 text-sm text-slate">{t(m.short)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
