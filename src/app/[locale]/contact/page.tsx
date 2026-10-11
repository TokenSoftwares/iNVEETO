import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { ContactBlock } from "@/components/home/ContactSection";
import { ui } from "@/content/ui";
import { pageMeta, resolveLocale } from "@/lib/page";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, { en: "Contact", ar: "تواصل معنا" }, ui.sections.contactBody, "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero title={t(ui.sections.contactTitle)} body={t(ui.sections.contactBody)} />
      <section className="shell pb-12">
        <ContactBlock locale={locale} />
      </section>
    </>
  );
}
