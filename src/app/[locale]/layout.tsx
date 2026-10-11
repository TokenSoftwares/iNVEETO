import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/lib/locale-context";
import { dir, isLocale, locales } from "@/content/i18n";
import { site } from "@/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const ar = locale === "ar";
  return {
    metadataBase: new URL(site.url),
    title: {
      default: ar ? "إنفيتو | إدارة الفعاليات وجهات الاتصال والحملات" : "iNVEETO | Event, contact and campaign management",
      template: "%s | iNVEETO",
    },
    description: ar
      ? "نظّم. حدّد. ادعُ. تأكّد. منصة واحدة لإدارة جهات الاتصال والفعاليات والحملات بالعربية والإنجليزية."
      : "Organize. Select. Invite. Confirm. One platform for contacts, events and campaigns, in English and Arabic.",
    alternates: { languages: { en: "/en", ar: "/ar" } },
    icons: { icon: site.logo.icon },
    openGraph: { siteName: "iNVEETO", locale: ar ? "ar_AR" : "en_US", type: "website" },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <LocaleProvider locale={locale}>
          <Header />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </LocaleProvider>
      </body>
    </html>
  );
}
