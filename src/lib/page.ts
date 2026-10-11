import { notFound } from "next/navigation";
import { isLocale, tr, type Locale, type T } from "@/content/i18n";

/** Resolve and validate the locale param; returns a bound translator. */
export async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = (v: T) => tr(v, locale as Locale);
  return { locale: locale as Locale, t };
}

export function pageMeta(locale: string, title: T, description: T, path: string) {
  const l = (isLocale(locale) ? locale : "en") as Locale;
  return {
    title: tr(title, l),
    description: tr(description, l),
    alternates: { canonical: `/${l}${path}`, languages: { en: `/en${path}`, ar: `/ar${path}` } },
  };
}
