import { Contact, Languages, CalendarCheck, MailOpen, ListChecks, QrCode, BarChart3, Share2 } from "lucide-react";
import { highlights } from "@/content/home";
import { tr, type Locale, type T } from "@/content/i18n";

const icons: Record<string, typeof Contact> = {
  contacts: Contact,
  "dual-language": Languages,
  events: CalendarCheck,
  invitations: MailOpen,
  rsvp: ListChecks,
  qr: QrCode,
  reports: BarChart3,
  share: Share2,
};

/** The eight feature blocks from the original inveeto.com homepage, kept as a quick overview. */
export function AtAGlance({ locale, title }: { locale: Locale; title: string }) {
  const t = (v: T) => tr(v, locale);
  return (
    <section className="shell pb-20" aria-labelledby="glance-title">
      <h2 id="glance-title" className="t-h3 text-ink">{title}</h2>
      <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => {
          const Icon = icons[h.id];
          return (
            <li key={h.id} className="border-t border-line py-6">
              <Icon size={20} className="text-brand" aria-hidden />
              <h3 className="mt-3 font-medium leading-snug text-ink">{t(h.title)}</h3>
              <p className="mt-1.5 text-[0.93rem] leading-relaxed text-slate">{t(h.body)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
