import { MessageCircle, Mail, LifeBuoy, Briefcase, ArrowUpRight } from "lucide-react";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { tr, type Locale, type T } from "@/content/i18n";
import { ContactForm } from "@/components/ui/ContactForm";
import { isInquiryConfigured } from "@/lib/inquiry/delivery";
import { LinkButton } from "@/components/ui/LinkButton";

export function ContactChannels({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  const channels = [
    { icon: Mail, label: t(ui.contact.general), value: site.contact.general, to: `mailto:${site.contact.general}` },
    { icon: LifeBuoy, label: t(ui.contact.support), value: site.contact.support, to: `mailto:${site.contact.support}` },
    { icon: Briefcase, label: t(ui.contact.sales), value: site.contact.sales, to: `mailto:${site.contact.sales}` },
    { icon: MessageCircle, label: t(ui.contact.whatsapp), value: site.contact.whatsappDisplay, to: site.contact.whatsappUrl },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {channels.map((c) => (
        <li key={c.value}>
          <a href={c.to} className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-line transition hover:ring-brand">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lavender text-brand-deep">
              <c.icon size={19} aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-slate">{c.label}</span>
              <span className="block truncate font-medium text-ink group-hover:text-brand-strong" dir="ltr">
                {c.value}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FeedbackCard({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  return (
    <div className="rounded-2xl bg-mist p-5 ring-1 ring-line">
      <p className="font-medium text-ink">{t(ui.contact.feedbackTitle)}</p>
      <p className="t-body mt-1 text-[0.95rem]">{t(ui.contact.feedbackBody)}</p>
      <a href={site.links.feedbackForm} className="text-link mt-3 inline-flex items-center gap-1 text-[0.95rem]">
        {t(ui.contact.feedbackCta)} <ArrowUpRight size={15} aria-hidden className="rtl:-scale-x-100" />
      </a>
    </div>
  );
}

/**
 * Contact block shared by the homepage and /contact.
 * With an inquiry provider configured: channels + feedback on one side, the form on the other.
 * Without one: the official channels take the form's place, so nothing non-working is shown.
 */
export function ContactBlock({ locale, intro }: { locale: Locale; intro?: React.ReactNode }) {
  const configured = isInquiryConfigured();
  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr]">
      <div>
        {intro}
        {configured && (
          <div className={intro ? "mt-8" : ""}>
            <ContactChannels locale={locale} />
          </div>
        )}
        <div className={intro || configured ? "mt-8" : ""}>
          <FeedbackCard locale={locale} />
        </div>
      </div>
      <div id="contact-form">{configured ? <ContactForm configured /> : <ContactChannels locale={locale} />}</div>
    </div>
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  return (
    <section id="contact-us" className="py-24 sm:py-32">
      <div className="shell">
        <ContactBlock
          locale={locale}
          intro={
            <>
              <h2 className="t-h2 text-ink">{t(ui.sections.contactTitle)}</h2>
              <p className="t-lead mt-4 max-w-[28rem]">{t(ui.sections.contactBody)}</p>
            </>
          }
        />
      </div>
    </section>
  );
}

export function FinalCta({ locale }: { locale: Locale }) {
  const t = (v: T) => tr(v, locale);
  return (
    <section className="shell">
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-lavender via-[#e9e0f5] to-mist px-6 py-16 text-center ring-1 ring-line sm:px-12 sm:py-24">
        <svg className="pointer-events-none absolute inset-0 size-full opacity-60" aria-hidden>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="#7d5ba6" opacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div className="relative mx-auto max-w-[40rem]">
          <h2 className="t-h1 text-ink">{t(ui.sections.finalTitle)}</h2>
          <p className="t-lead mt-5">{t(ui.sections.finalBody)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <LinkButton href={site.links.trial} magnetic>{t(ui.cta.trial)}</LinkButton>
            <LinkButton href={site.links.login} variant="secondary">{t(ui.nav.login)}</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
