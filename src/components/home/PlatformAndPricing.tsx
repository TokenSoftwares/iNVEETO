import Link from "next/link";
import { Headset, ShieldCheck, UsersRound, Languages, Check, X, ArrowUpRight } from "lucide-react";
import { benefits } from "@/content/home";
import { planRows, plans, pricingCopy, pricingPolicy, type PlanCellValue, type PlanId } from "@/content/plans";
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

/**
 * One plan cell. Included / not included are always written out as text (icon is decorative),
 * so the meaning never depends on color or an icon alone.
 */
export function PlanCell({ v, locale }: { v: PlanCellValue; locale: Locale }) {
  if (v.kind === "included")
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap text-ink">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lavender text-brand-deep" aria-hidden>
          <Check size={13} strokeWidth={2.5} />
        </span>
        {tr(ui.pricing.included, locale)}
      </span>
    );
  if (v.kind === "excluded")
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap text-slate">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-mist text-slate ring-1 ring-line" aria-hidden>
          <X size={12} strokeWidth={2.5} />
        </span>
        {tr(ui.pricing.notIncluded, locale)}
      </span>
    );
  return <span className="font-medium tabular-nums text-ink">{tr(v.text, locale)}</span>;
}

/** Price line under a plan name: amount only when the business has approved published pricing. */
export function PlanPrice({ id, locale }: { id: PlanId; locale: Locale }) {
  const p = plans[id];
  if (pricingPolicy === "published")
    return (
      <span className="block text-sm font-normal text-slate">
        <span className="text-base font-semibold text-ink" dir="ltr">{p.price.amount}</span> {tr(p.price.period, locale)}
      </span>
    );
  return <span className="block text-sm font-normal text-slate">{tr(pricingCopy.onRequest, locale)}</span>;
}

const planIds: PlanId[] = ["individual", "enterprise"];

/**
 * Full plan comparison. Desktop: a real data table (caption, column and row headers).
 * Phones: one list per plan, so nothing scrolls sideways and every row stays labelled.
 */
export function PlanTable({ locale, showBlurbs = true }: { locale: Locale; showBlurbs?: boolean }) {
  const t = (v: T) => tr(v, locale);
  return (
    <div>
      <div className="hidden overflow-hidden rounded-3xl bg-white ring-1 ring-line sm:block">
        <table className="w-full text-start text-[0.95rem]">
          <caption className="border-b border-line px-6 py-4 text-start text-sm text-slate">{t(pricingCopy.tableCaption)}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[38%] px-6 py-4 text-start align-bottom text-sm font-normal text-slate">
                {t(ui.pricing.feature)}
              </th>
              {planIds.map((id) => (
                <th key={id} scope="col" className={`px-6 py-4 text-start align-bottom ${id === "enterprise" ? "bg-mist" : ""}`}>
                  <span className={`block text-[1.05rem] font-semibold ${id === "enterprise" ? "text-brand-deep" : "text-ink"}`}>{t(plans[id].name)}</span>
                  {showBlurbs && <span className="mt-0.5 block text-xs font-normal leading-snug text-slate">{t(plans[id].blurb)}</span>}
                  <span className="mt-1.5 block">
                    <PlanPrice id={id} locale={locale} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planRows.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-0">
                <th scope="row" className="px-6 py-3.5 text-start font-normal text-slate">{t(r.label)}</th>
                <td className="px-6 py-3.5"><PlanCell v={r.individual} locale={locale} /></td>
                <td className="bg-mist px-6 py-3.5"><PlanCell v={r.enterprise} locale={locale} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 sm:hidden">
        {planIds.map((id) => (
          <section key={id} aria-labelledby={`plan-${id}`} className={`rounded-3xl p-5 ring-1 ${id === "enterprise" ? "bg-mist ring-lilac" : "bg-white ring-line"}`}>
            <h3 id={`plan-${id}`} className={`text-lg font-semibold ${id === "enterprise" ? "text-brand-deep" : "text-ink"}`}>{t(plans[id].name)}</h3>
            {showBlurbs && <p className="mt-0.5 text-sm text-slate">{t(plans[id].blurb)}</p>}
            <div className="mt-1.5"><PlanPrice id={id} locale={locale} /></div>
            <dl className="mt-4 divide-y divide-line border-t border-line">
              {planRows.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-4 py-2.5 text-[0.93rem]">
                  <dt className="min-w-0 flex-1 text-slate">{t(r.label)}</dt>
                  <dd className="max-w-[55%] shrink-0 text-end"><PlanCell v={r[id]} locale={locale} /></dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}

export function PricingTeaser({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.35fr] lg:items-start">
        <div>
          <h2 className="t-h2 text-ink">{t(ui.sections.pricingTitle)}</h2>
          <p className="t-lead mt-5 max-w-[30rem]">{t(pricingCopy.body)}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate">
            <Check size={16} className="text-ok" aria-hidden /> {t(pricingCopy.trialNote)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
            <LinkButton href={href(locale, "/contact?topic=pricing")} variant="secondary">{t(ui.cta.talk)}</LinkButton>
          </div>
        </div>
        <div>
          <PlanTable locale={locale} showBlurbs={false} />
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
