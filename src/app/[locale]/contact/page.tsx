import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { ContactChannels } from "@/components/home/ContactSection";
import { ContactForm } from "@/components/ui/ContactForm";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Contact", ar: "تواصل معنا" }, ui.sections.contactBody, "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero title={t(ui.sections.contactTitle)} body={t(ui.sections.contactBody)} />
      <section className="shell grid gap-12 pb-12 lg:grid-cols-[0.9fr_1.3fr]">
        <div>
          <ContactChannels locale={locale} />
          <div className="mt-6 rounded-2xl bg-mist p-5 ring-1 ring-line">
            <p className="font-medium text-ink">{t(ui.contact.feedbackTitle)}</p>
            <p className="t-body mt-1 text-[0.95rem]">{t(ui.contact.feedbackBody)}</p>
            <a href={site.links.feedbackForm} className="text-link mt-3 inline-flex items-center gap-1 text-[0.95rem]">
              {t(ui.contact.feedbackCta)} <ArrowUpRight size={15} aria-hidden className="rtl:-scale-x-100" />
            </a>
          </div>
        </div>
        <div id="contact-form">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
