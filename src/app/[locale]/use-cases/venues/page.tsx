import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { VenueAreas } from "@/components/pages/VenueAreas";
import { FinalCta } from "@/components/home/ContactSection";
import { LinkButton } from "@/components/ui/LinkButton";
import { SafeImg } from "@/components/ui/SafeImg";
import { venues } from "@/content/usecases";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href } from "@/content/i18n";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/use-cases/venues">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Venue event management", ar: "إدارة فعاليات المنشآت" }, venues.hero.body, "/use-cases/venues");
}

export default async function VenuesPage({ params }: PageProps<"/[locale]/use-cases/venues">) {
  const { locale, t } = await resolveLocale(params);
  const Back = locale === "ar" ? ChevronRight : ChevronLeft;
  const guests = [
    { n: { en: "Layla Nasser", ar: "ليلى ناصر" }, i: "LN", ok: true },
    { n: { en: "Omar Mansour", ar: "عمر منصور" }, i: "OM", ok: false },
    { n: { en: "Sara Khalil", ar: "سارة خليل" }, i: "SK", ok: true },
  ];

  const aside = (
    <div className="relative">
      <SafeImg src={venues.hero.image} alt={t({ en: "Elegant venue hall set up for an event", ar: "قاعة أنيقة مجهزة لفعالية" })} className="aspect-[4/3] w-full rounded-[28px] object-cover" eager />
      <figure className="demo-window absolute -bottom-10 start-4 w-[min(320px,85%)] p-4 sm:start-[-24px]">
        <figcaption className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink">{t({ en: "Ballroom B · Check-in", ar: "القاعة B · تسجيل الحضور" })}</span>
          <span className="chip bg-ok-soft text-ok">{t({ en: "Live", ar: "مباشر" })}</span>
        </figcaption>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            [42, { en: "Checked in", ar: "تم تسجيلهم" }],
            [6, { en: "Pending", ar: "قيد الانتظار" }],
            [5, { en: "VIP", ar: "شخصيات مهمة" }],
          ].map(([v, l], k) => (
            <div key={k} className="rounded-xl bg-mist py-2">
              <p className="text-lg font-semibold tabular-nums text-brand-deep">{v as number}</p>
              <p className="text-[0.7rem] text-slate">{t(l as { en: string; ar: string })}</p>
            </div>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {guests.map((g) => (
            <li key={g.i} className="flex items-center gap-2 text-sm">
              <span className="grid size-7 place-items-center rounded-full bg-lavender text-[0.65rem] font-semibold text-brand-deep">{g.i}</span>
              <span className="flex-1 text-ink">{t(g.n)}</span>
              {g.ok ? (
                <span className="chip h-6 bg-ok-soft text-[0.7rem] text-ok">
                  <CheckCircle2 size={12} aria-hidden /> {t({ en: "Checked in", ar: "تم التسجيل" })}
                </span>
              ) : (
                <span className="chip h-6 bg-wait-soft text-[0.7rem] text-wait">{t({ en: "Pending", ar: "قيد الانتظار" })}</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate">
          <Smartphone size={13} aria-hidden /> {t({ en: "Self check-in · sample data", ar: "تسجيل ذاتي · بيانات نموذجية" })}
        </p>
      </figure>
    </div>
  );

  return (
    <>
      <PageHero
        title={t(venues.hero.title)}
        body={t(venues.hero.body)}
        aside={aside}
        kicker={
          <Link href={href(locale, "/use-cases")} className="inline-flex items-center gap-1 text-sm text-slate hover:text-brand-strong">
            <Back size={15} aria-hidden /> {t(ui.nav.usecases)}
          </Link>
        }
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
          <LinkButton href={href(locale, "/contact")} variant="secondary">{t(ui.cta.demo)}</LinkButton>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <h2 className="t-h2 text-ink">{t(venues.hero.kicker)}</h2>
          <div className="max-w-[44rem] space-y-5">
            {venues.intro.map((p, i) => (
              <p key={i} className={i === 1 ? "t-lead text-ink" : "t-lead"}>
                {t(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <div className="shell">
          <h2 className="t-h2 max-w-[22ch] text-ink">{t(ui.usecases.venuesHow)}</h2>
          <div className="mt-12">
            <VenueAreas />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="t-h2 text-ink">{t(ui.usecases.venuesGain)}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {venues.benefits.map((b) => (
                <li key={b.en} className="flex gap-2.5 rounded-2xl bg-white p-4 text-[0.97rem] text-ink ring-1 ring-line">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                  {t(b)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-lavender p-8 sm:p-10">
            <h2 className="t-h3 text-ink">{t(ui.usecases.venuesWhy)}</h2>
            <p className="t-lead mt-4 text-ink/80">{t(venues.why)}</p>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
