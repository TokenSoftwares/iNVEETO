import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { Stars } from "@/components/home/StoriesTeaser";
import { FinalCta } from "@/components/home/ContactSection";
import { LinkButton } from "@/components/ui/LinkButton";
import { SafeImg } from "@/components/ui/SafeImg";
import { stories, storiesIntro, teamMessage } from "@/content/stories";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href } from "@/content/i18n";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/customer-stories">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Customer stories", ar: "قصص العملاء" }, storiesIntro.body, "/customer-stories");
}

export default async function StoriesPage({ params }: PageProps<"/[locale]/customer-stories">) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero title={t(storiesIntro.title)} body={t(storiesIntro.body)}>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
          <LinkButton href={href(locale, "/contact?topic=demo")} variant="secondary">{t(ui.cta.demo)}</LinkButton>
        </div>
        <nav aria-label={t(ui.stories.index)} className="mt-12">
          <ol className="flex flex-wrap gap-2">
            {stories.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="chip h-10 bg-white px-4 text-[0.9rem] text-ink ring-1 ring-line transition-colors hover:text-brand-strong hover:ring-lilac">
                  {t(s.org)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <section className="shell space-y-6 pb-24">
        {stories.map((s, idx) => {
          const flip = idx % 2 === 1;
          const media = s.video ? (
            <video
              className="aspect-video w-full rounded-3xl bg-mist object-cover ring-1 ring-line"
              controls
              preload="metadata"
              playsInline
              aria-label={t(ui.stories.watch)}
            >
              <source src={s.video} type="video/mp4" />
            </video>
          ) : s.images.length > 0 ? (
            <div className={`grid gap-3 ${s.images.length > 1 ? "grid-cols-2" : ""}`}>
              {s.images.map((im, i) => (
                <SafeImg
                  key={im.src}
                  src={im.src}
                  alt={t(im.alt)}
                  className={`w-full rounded-3xl object-cover ring-1 ring-line ${s.images.length === 3 && i === 0 ? "col-span-2 aspect-[16/8]" : "aspect-[4/3]"}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex aspect-[4/3] flex-col justify-end rounded-3xl bg-gradient-to-br from-lavender to-mist p-8 ring-1 ring-line">
              {s.metric && (
                <>
                  <span className="t-display text-brand-deep" dir="ltr">{s.metric.value}</span>
                  <span className="mt-2 text-slate">{t(s.metric.label)}</span>
                </>
              )}
              {s.tags && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((tg) => (
                    <li key={tg.en} className="chip h-8 bg-white px-3 text-brand-deep ring-1 ring-line">{t(tg)}</li>
                  ))}
                </ul>
              )}
            </div>
          );
          return (
            <article key={s.id} id={s.id} className="grid items-center gap-8 rounded-[32px] bg-white p-5 ring-1 ring-line sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
              <div className={flip ? "lg:order-2" : ""}>{media}</div>
              <div>
                <p className="text-sm text-slate">{s.kind === "sponsorship" ? t(ui.stories.sponsorship) : t(ui.stories.customer)}</p>
                <h2 className="t-h2 mt-2 text-ink">{t(s.org)}</h2>
                <p className="mt-2 text-brand-strong">{t(s.context)}</p>
                <p className="t-body mt-5">{t(s.summary)}</p>
                {s.quote && (
                  <figure className="mt-7 border-s-2 border-brand ps-5">
                    <Stars locale={locale} />
                    <blockquote className="mt-3 text-[1.08rem] leading-relaxed text-ink">“{t(s.quote.text)}”</blockquote>
                    <figcaption className="mt-3 text-sm">
                      <span className="font-medium text-ink">{t(s.quote.name)}</span>
                      <span className="text-slate"> · {t(s.quote.role)}</span>
                    </figcaption>
                  </figure>
                )}
                <div className="mt-7 border-t border-line pt-5">
                  <h3 className="text-sm font-medium text-slate">{t(ui.stories.used)}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.used.map((u) => (
                      <li key={u.label.en}>
                        <Link href={href(locale, `/features#${u.module}`)} className="chip h-8 bg-lavender px-3 text-brand-deep transition-colors hover:bg-[#e6dcf4]">
                          {t(u.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="bg-mist py-24 sm:py-28">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="t-h2 text-ink">{t(teamMessage.title)}</h2>
            <p className="t-lead mt-5">{t(teamMessage.body)}</p>
            <p className="mt-6 text-sm text-slate">{t(teamMessage.disclaimer)}</p>
          </div>
          <video className="aspect-video w-full rounded-3xl bg-white object-cover ring-1 ring-line" controls preload="metadata" playsInline aria-label={t(teamMessage.title)}>
            <source src={`${teamMessage.video}#t=0.5`} type="video/mp4" />
          </video>
        </div>
      </section>

      <div className="pt-24">
        <FinalCta locale={locale} />
      </div>
    </>
  );
}
