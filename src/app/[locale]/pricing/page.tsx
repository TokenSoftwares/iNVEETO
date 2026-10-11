import type { Metadata } from "next";
import { Check, Mail } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PlanTable } from "@/components/home/PlatformAndPricing";
import { FinalCta } from "@/components/home/ContactSection";
import { LinkButton } from "@/components/ui/LinkButton";
import { plans, pricingCopy, showPrices } from "@/content/plans";
import { faqs } from "@/content/faqs";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href } from "@/content/i18n";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/pricing">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Pricing", ar: "الأسعار" }, pricingCopy.body, "/pricing");
}

export default async function PricingPage({ params }: PageProps<"/[locale]/pricing">) {
  const { locale, t } = await resolveLocale(params);
  const related = faqs.filter((f) => ["public", "own-domain", "arabic"].includes(f.id));
  const planCards = [plans.individual, plans.enterprise];

  return (
    <>
      <PageHero title={t(pricingCopy.title)} body={t(pricingCopy.body)}>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
          <LinkButton href={`mailto:${site.contact.general}`} variant="secondary">
            <Mail size={17} aria-hidden /> {t(ui.cta.talk)}
          </LinkButton>
        </div>
        <p className="mt-5 flex items-center gap-2 text-sm text-slate">
          <Check size={16} className="text-ok" aria-hidden /> {t(pricingCopy.trialNote)}
        </p>
      </PageHero>

      <section className="shell pb-24">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {planCards.map((p, i) => (
            <div key={p.name.en} className={`rounded-3xl p-7 ring-1 ${i === 1 ? "bg-lavender ring-lilac" : "bg-white ring-line"}`}>
              <h2 className="t-h3 text-ink">{t(p.name)}</h2>
              <p className="t-body mt-1">{t(p.blurb)}</p>
              <p className="mt-5 text-lg font-medium text-brand-deep">
                {showPrices ? p.unconfirmedPrice : t({ en: "Pricing on request", ar: "الأسعار عند الطلب" })}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <LinkButton href={site.links.selectPackage} size="sm" variant={i === 1 ? "primary" : "secondary"}>
                  {t({ en: "Free trial for 3 months", ar: "تجربة مجانية لمدة 3 أشهر" })}
                </LinkButton>
                <LinkButton href={`mailto:${site.contact.sales}`} size="sm" variant="quiet">
                  {t({ en: "Ask sales", ar: "اسأل فريق المبيعات" })}
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
        <PlanTable locale={locale} />
        <p className="mt-4 text-sm text-slate">{t(pricingCopy.limitsNote)}</p>
      </section>

      <section className="bg-mist py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <h2 className="t-h2 text-ink">{t({ en: "Common questions", ar: "أسئلة شائعة" })}</h2>
          <dl className="divide-y divide-line rounded-3xl bg-white px-6 ring-1 ring-line">
            {related.map((f) => (
              <div key={f.id} className="py-6">
                <dt className="font-medium text-ink">{t(f.q)}</dt>
                <dd className="t-body mt-2">{t(f.a)}</dd>
              </div>
            ))}
            <div className="py-6">
              <a href={href(locale, "/#faqs")} className="text-link">{t({ en: "See all FAQs", ar: "اعرض كل الأسئلة" })}</a>
            </div>
          </dl>
        </div>
      </section>

      <div className="pt-24">
        <FinalCta locale={locale} />
      </div>
    </>
  );
}
