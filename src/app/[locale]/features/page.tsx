import type { Metadata } from "next";
import { PageHero, Stats } from "@/components/pages/PageHero";
import { FeatureExplorer } from "@/components/pages/FeatureExplorer";
import { AtAGlance } from "@/components/pages/AtAGlance";
import { FinalCta } from "@/components/home/ContactSection";
import { LinkButton } from "@/components/ui/LinkButton";
import { featuresHero, sharedCapabilities, workflow } from "@/content/features";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href } from "@/content/i18n";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/features">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Features", ar: "الميزات" }, featuresHero.body, "/features");
}

export default async function FeaturesPage({ params }: PageProps<"/[locale]/features">) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero title={t(featuresHero.title)} body={t(featuresHero.body)}>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
          <LinkButton href={href(locale, "/pricing")} variant="secondary">{t(ui.cta.pricing)}</LinkButton>
        </div>
        <Stats items={featuresHero.stats.map((s) => ({ value: s.value, label: t(s.label) }))} />
      </PageHero>

      <AtAGlance locale={locale} title={t({ en: "At a glance", ar: "نظرة سريعة" })} />

      <section className="shell pb-24">
        <FeatureExplorer />
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <div className="shell">
          <h2 className="t-h2 max-w-[22ch] text-ink">{t(ui.sections.shared)}</h2>
          <p className="t-lead mt-4 max-w-[36rem]">{t(ui.sections.sharedBody)}</p>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {sharedCapabilities.map((c) => (
              <li key={c.id} className="bg-white p-7">
                <h3 className="text-[1.05rem] font-medium text-ink">{t(c.title)}</h3>
                <p className="t-body mt-2 text-[0.95rem]">{t(c.desc)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="shell">
          <h2 className="t-h2 max-w-[22ch] text-ink">{t(ui.sections.workflowTitle)}</h2>
          <p className="t-lead mt-4 max-w-[36rem]">{t(ui.sections.workflowBody)}</p>
          <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-4">
            <span className="absolute inset-x-6 top-5 hidden h-px bg-gradient-to-r from-lilac via-brand to-lilac md:block" aria-hidden />
            {workflow.map((w, i) => (
              <li key={w.id} className="relative flex gap-4 md:block">
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-brand-deep ring-2 ring-brand">
                  {i + 1}
                </span>
                <div className="md:mt-5">
                  <h3 className="text-[1.05rem] font-medium text-ink">{t(w.title)}</h3>
                  <p className="t-body mt-1 text-[0.95rem]">{t(w.desc)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
