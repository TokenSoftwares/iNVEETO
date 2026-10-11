import Link from "next/link";
import { MessageCircle } from "lucide-react";

const Linkedin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.92h-3.94v-11Z" />
  </svg>
);
import { Logo } from "@/components/ui/Logo";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href, tr, type Locale } from "@/content/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = (v: { en: string; ar: string }) => tr(v, locale);
  const cols = [
    {
      title: t(ui.footer.product),
      links: [
        { label: t(ui.nav.features), to: href(locale, "/features") },
        { label: t(ui.nav.usecases), to: href(locale, "/use-cases") },
        { label: t(ui.nav.pricing), to: href(locale, "/pricing") },
        { label: t(ui.nav.login), to: site.links.login },
        { label: t(ui.cta.trial), to: site.links.trial },
      ],
    },
    {
      title: t(ui.footer.company),
      links: [
        { label: t(ui.nav.stories), to: href(locale, "/customer-stories") },
        { label: t(ui.nav.faqs), to: href(locale, "/#faqs") },
        { label: t(ui.nav.contact), to: href(locale, "/contact") },
        { label: t(ui.footer.feedback), to: site.links.feedbackForm },
      ],
    },
    {
      title: t(ui.footer.legal),
      links: [
        { label: t(ui.footer.privacy), to: site.links.privacy },
        { label: t(ui.footer.terms), to: site.links.terms },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-line bg-mist">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo className="h-9" />
          <p className="t-body mt-5">{t(ui.footer.blurb)}</p>
          <ul className="mt-6 space-y-1.5 text-[0.95rem]">
            <li>
              <a className="text-link" href={`mailto:${site.contact.general}`}>{site.contact.general}</a>
            </li>
            <li>
              <a className="text-link" href={`mailto:${site.contact.support}`}>{site.contact.support}</a>
            </li>
            <li>
              <a className="text-link" href={`mailto:${site.contact.sales}`}>{site.contact.sales}</a>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            <a href={site.links.linkedin} aria-label="iNVEETO on LinkedIn" className="grid size-10 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-line transition hover:ring-brand">
              <Linkedin size={18} />
            </a>
            <a href={site.contact.whatsappUrl} aria-label={`WhatsApp ${site.contact.whatsappDisplay}`} className="grid size-10 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-line transition hover:ring-brand">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="text-sm font-medium text-ink">{c.title}</h2>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to.startsWith("/") ? (
                      <Link href={l.to} className="text-[0.95rem] text-slate transition-colors hover:text-brand-strong">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.to} className="text-[0.95rem] text-slate transition-colors hover:text-brand-strong">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-line py-6 text-sm text-slate sm:flex-row sm:justify-between">
        <p>{t(ui.footer.rights)}</p>
        <p dir="ltr" className="sm:text-end">Organize. Select. Invite. Confirm.</p>
      </div>
    </footer>
  );
}
