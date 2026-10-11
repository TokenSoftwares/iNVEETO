import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PlanPrice, PlanTable } from "@/components/home/PlatformAndPricing";
import { FinalCta } from "@/components/home/ContactSection";
import { LinkButton } from "@/components/ui/LinkButton";
import { plans, pricingCopy, type PlanId } from "@/content/plans";
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
  const planIds: PlanId[] = ["individual", "enterprise"];

  return (
    <>
      <PageHero title={t(pricingCopy.title)} body={t(pricingCopy.body)}>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
          <LinkButton href={href(locale, "/contact?topic=pricing")} variant="secondary">
            {t(ui.cta.talk)}
          </LinkButton>
        </div>
        <p className="mt-5 flex items-center gap-2 text-sm text-slate">
          <Check size={16} className="text-ok" aria-hidden /> {t(pricingCopy.trialNote)}
        </p>
      </PageHero>

      <section className="shell pb-24">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {planIds.map((id, i) => (
            <div key={id} className={`rounded-3xl p-7 ring-1 ${i === 1 ? "bg-lavender ring-lilac" : "bg-white ring-line"}`}>
              <h2 className="t-h3 text-ink">{t(plans[id].name)}</h2>
              <p className="t-body mt-1">{t(plans[id].blurb)}</p>
              <div className="mt-4">
                <PlanPrice id={id} locale={locale} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <LinkButton href={site.links.selectPackage} size="sm" variant={i === 1 ? "primary" : "secondary"}>
                  {t({ en: "Free trial for 3 months", ar: "تجربة مجانية لمدة 3 أشهر" })}
                </LinkButton>
                <LinkButton href={href(locale, "/contact?topic=pricing")} size="sm" variant="quiet">
                  {t({ en: "Ask sales", ar: "اسأل فريق المبيعات" })}
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
        <PlanTable locale={locale} showBlurbs={false} />
        <p className="mt-4 text-sm text-slate">{t(pricingCopy.limitsNote)}</p>
      </section>

      <section className="bg-mist py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <h2 className="t-h2 text-ink">{t({ en: "Common questions", ar: "أسئلة متداولة" })}</h2>
          <div>
          <dl className="divide-y divide-line rounded-3xl bg-white px-6 ring-1 ring-line">
            {related.map((f) => (
              <div key={f.id} className="py-6">
                <dt className="font-medium text-ink">{t(f.q)}</dt>
                <dd className="t-body mt-2">{t(f.a)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            <a href={href(locale, "/#faqs")} className="text-link">{t({ en: "See all FAQs", ar: "اعرض كل الأسئلة" })}</a>
          </p>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <FinalCta locale={locale} />
      </div>
    </>
  );
}
