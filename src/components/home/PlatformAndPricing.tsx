import Link from "next/link";
import { Headset, ShieldCheck, UsersRound, Languages, Check, Minus, ArrowUpRight } from "lucide-react";
import { benefits } from "@/content/home";
import { planRows, plans, pricingCopy } from "@/content/plans";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href, tr, type Locale, type T } from "@/content/i18n";
import { LinkButton } from "@/components/ui/LinkButton";

const benefitIcons = { support: Headset, data: ShieldCheck, teams: UsersRound, bilingual: Languages } as const;

export function Benefits({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  return (
    <section className="bg-lavender py-24 sm:py-28">
      <div className="shell">
        <h2 className="t-h2 max-w-[20ch] text-ink">{t(ui.sections.benefitsTitle)}</h2>
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = benefitIcons[b.id as keyof typeof benefitIcons];
            return (
              <li key={b.id}>
                <Icon size={26} strokeWidth={1.6} className="text-brand-deep" aria-hidden />
                <h3 className="mt-5 text-[1.08rem] font-medium text-ink">{t(b.title)}</h3>
                <p className="t-body mt-2">{t(b.body)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function PlanCell({ v, locale }: { v: T | boolean; locale: Locale }) {
  if (v === true) return <Check size={18} className="text-brand" aria-label={tr(ui.pricing.included, locale)} />;
  if (v === false) return <Minus size={18} className="text-line-strong" aria-label={tr(ui.pricing.notIncluded, locale)} />;
  return <span className="tabular-nums">{tr(v, locale)}</span>;
}

export function PlanTable({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const t = (v: T) => tr(v, locale);
  const rows = compact ? planRows.slice(0, 6) : planRows;
  return (
    <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
      <table className="w-full min-w-[480px] text-start text-[0.95rem]">
        <caption className="sr-only">{t(pricingCopy.limitsNote)}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-5 py-4 text-start text-sm font-normal text-slate sm:px-6">{t(ui.pricing.feature)}</th>
            <th scope="col" className="px-5 py-4 text-start sm:px-6">
              <span className="block font-medium text-ink">{t(plans.individual.name)}</span>
              {!compact && <span className="block text-xs font-normal text-slate">{t(plans.individual.blurb)}</span>}
            </th>
            <th scope="col" className="bg-mist px-5 py-4 text-start sm:px-6">
              <span className="block font-medium text-brand-deep">{t(plans.enterprise.name)}</span>
              {!compact && <span className="block text-xs font-normal text-slate">{t(plans.enterprise.blurb)}</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line last:border-0">
              <th scope="row" className="px-5 py-3.5 text-start font-normal text-slate sm:px-6">{t(r.label)}</th>
              <td className="px-5 py-3.5 text-ink sm:px-6"><PlanCell v={r.individual} locale={locale} /></td>
              <td className="bg-mist px-5 py-3.5 text-ink sm:px-6"><PlanCell v={r.enterprise} locale={locale} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingTeaser({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
        <div>
          <h2 className="t-h2 text-ink">{t(ui.sections.pricingTitle)}</h2>
          <p className="t-lead mt-5 max-w-[30rem]">{t(pricingCopy.body)}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate">
            <Check size={16} className="text-ok" aria-hidden /> {t(pricingCopy.trialNote)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
            <LinkButton href={`mailto:${site.contact.sales}`} variant="secondary">{t(ui.cta.talk)}</LinkButton>
          </div>
        </div>
        <div>
          <PlanTable locale={locale} compact />
          <p className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate">
            <span>{t(pricingCopy.limitsNote)}</span>
            <Link href={href(locale, "/pricing")} className="text-link inline-flex items-center gap-1">
              {t(ui.cta.pricing)} <ArrowUpRight size={15} aria-hidden className="rtl:-scale-x-100" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
