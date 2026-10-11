"use client";

import { createContext, useContext } from "react";
import type { Locale, T } from "@/content/i18n";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** Returns a translator bound to the current locale: `const t = useT(); t(ui.nav.login)` */
export function useT() {
  const l = useLocale();
  return (v: T) => v[l];
}
