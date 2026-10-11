"use client";

import { Accordion } from "@heroui/react";
import { faqIntro, faqs } from "@/content/faqs";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { useT } from "@/lib/locale-context";

export function Faq() {
  const t = useT();
  return (
    <section id="faqs" className="bg-mist py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="t-h2 text-ink">{t(ui.sections.faqTitle)}</h2>
          <p className="t-body mt-4 max-w-[26rem]">
            {t(faqIntro)}{" "}
            <a className="text-link" href={`mailto:${site.contact.support}`}>
              {site.contact.support}
            </a>
          </p>
        </div>
        <Accordion className="rounded-3xl bg-white px-2 ring-1 ring-line sm:px-4" allowsMultipleExpanded>
          {faqs.map((f) => (
            <Accordion.Item key={f.id} id={f.id}>
              <Accordion.Heading>
                <Accordion.Trigger className="gap-4 py-5 text-start text-[1.02rem] font-medium text-ink">
                  {t(f.q)}
                  <Accordion.Indicator className="text-brand" />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="t-body pb-6 pe-10">{t(f.a)}</Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
