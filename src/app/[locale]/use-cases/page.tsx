import type { Metadata } from "next";
import { Puzzle, ShieldCheck, Languages, BarChart3 } from "lucide-react";
import { PageHero, Stats } from "@/components/pages/PageHero";
import { IndustryGrid } from "@/components/pages/IndustryGrid";
import { FinalCta } from "@/components/home/ContactSection";
import { LinkButton } from "@/components/ui/LinkButton";
import { usecasesHero, whyChoose } from "@/content/usecases";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href } from "@/content/i18n";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/use-cases">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Use cases", ar: "حالات الاستخدام" }, usecasesHero.body, "/use-cases");
}

const icons = { "every-org": Puzzle, secure: ShieldCheck, bilingual: Languages, smarter: BarChart3 } as const;

export default async function UseCasesPage({ params }: PageProps<"/[locale]/use-cases">) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero title={t(usecasesHero.title)} body={t(usecasesHero.body)}>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
          <LinkButton href={href(locale, "/contact")} variant="secondary">{t(ui.cta.demo)}</LinkButton>
        </div>
        <Stats items={usecasesHero.stats.map((s) => ({ value: s.value, label: t(s.label) }))} />
      </PageHero>

      <section className="shell pb-24">
        <IndustryGrid />
      </section>

      <section className="bg-lavender py-24 sm:py-28">
        <div className="shell">
          <h2 className="t-h2 max-w-[24ch] text-ink">{t(ui.usecases.why)}</h2>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w) => {
              const Icon = icons[w.id as keyof typeof icons];
              return (
                <li key={w.id}>
                  <Icon size={26} strokeWidth={1.6} className="text-brand-deep" aria-hidden />
                  <h3 className="mt-5 text-[1.08rem] font-medium text-ink">{t(w.title)}</h3>
                  <p className="t-body mt-2">{t(w.body)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="pt-24">
        <FinalCta locale={locale} />
      </div>
    </>
  );
}
