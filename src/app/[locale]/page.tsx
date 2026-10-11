import { HeroStory } from "@/components/home/HeroStory";
import { Modules } from "@/components/home/Modules";
import { WhatsNew } from "@/components/home/WhatsNew";
import { Industries } from "@/components/home/Industries";
import { StoriesTeaser } from "@/components/home/StoriesTeaser";
import { Benefits, PricingTeaser } from "@/components/home/PlatformAndPricing";
import { Faq } from "@/components/home/Faq";
import { ContactSection, FinalCta } from "@/components/home/ContactSection";
import { isLocale } from "@/content/i18n";
import { notFound } from "next/navigation";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <HeroStory />
      <Modules />
      <div className="bg-mist">
        <WhatsNew />
      </div>
      <Industries />
      <StoriesTeaser locale={locale} />
      <Benefits locale={locale} />
      <PricingTeaser locale={locale} />
      <Faq />
      <ContactSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
