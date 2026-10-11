import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { stories } from "@/content/stories";
import { ui } from "@/content/ui";
import { href, tr, type Locale, type T } from "@/content/i18n";
import { SafeImg } from "@/components/ui/SafeImg";

export function Stars() {
  return (
    <span className="flex gap-0.5 text-brand" aria-label="5 / 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} className="fill-current" aria-hidden />
      ))}
    </span>
  );
}

export function StoriesTeaser({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  const alQuds = stories.find((s) => s.id === "alquds")!;
  const aba = stories.find((s) => s.id === "aba-plex")!;
  const rest = stories.filter((s) => !["alquds", "aba-plex"].includes(s.id));

  return (
    <section className="py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2 max-w-[18ch] text-ink">{t(ui.sections.storiesTitle)}</h2>
          <Link href={href(locale, "/customer-stories")} className="text-link inline-flex items-center gap-1">
            {t(ui.cta.allStories)} <ArrowUpRight size={16} aria-hidden className="rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          <figure className="relative overflow-hidden rounded-[28px] bg-brand-deep p-8 text-white sm:p-12">
            <div className="absolute -end-24 -top-24 size-72 rounded-full bg-brand/40 blur-3xl" aria-hidden />
            <Stars />
            <blockquote className="relative mt-6 text-[1.35rem] font-light leading-[1.5] sm:text-[1.6rem]">
              “{t(alQuds.quote!.text)}”
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-4">
              {alQuds.images[0] && (
                <SafeImg src={alQuds.images[0].src} alt={t(alQuds.images[0].alt)} className="size-14 rounded-2xl object-cover ring-2 ring-white/20" />
              )}
              <span>
                <span className="block font-medium">{t(alQuds.quote!.name)}</span>
                <span className="block text-sm text-white/70">{t(alQuds.quote!.role)}</span>
              </span>
            </figcaption>
          </figure>

          <figure className="flex flex-col rounded-[28px] bg-mist p-8 ring-1 ring-line sm:p-10">
            <Stars />
            <blockquote className="mt-6 text-[1.15rem] leading-relaxed text-ink">“{t(aba.quote!.text)}”</blockquote>
            <figcaption className="mt-6">
              <span className="block font-medium text-ink">{t(aba.quote!.name)}</span>
              <span className="block text-sm text-slate">{t(aba.org)}</span>
            </figcaption>
            {aba.metric && (
              <p className="mt-auto flex items-baseline gap-2 border-t border-line pt-6">
                <span className="t-h2 text-brand-deep">{aba.metric.value}</span>
                <span className="text-sm text-slate">{t(aba.metric.label)}</span>
              </p>
            )}
          </figure>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((s) => (
            <li key={s.id} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              {s.images[0] ? (
                <SafeImg src={s.images[0].src} alt={t(s.images[0].alt)} className="aspect-[16/9] w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/9] items-end bg-gradient-to-br from-lavender to-mist p-6">
                  {s.metric && (
                    <p>
                      <span className="t-h1 block text-brand-deep">{s.metric.value}</span>
                      <span className="text-sm text-slate">{t(s.metric.label)}</span>
                    </p>
                  )}
                </div>
              )}
              <div className="p-6">
                <p className="text-xs text-slate">{s.kind === "sponsorship" ? t(ui.stories.sponsorship) : t(ui.stories.customer)}</p>
                <h3 className="mt-1.5 text-[1.05rem] font-medium text-ink">{t(s.org)}</h3>
                <p className="mt-1 text-sm text-slate">{t(s.context)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
