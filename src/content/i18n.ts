/**
 * Locale primitives shared by the whole content layer.
 *
 * Every piece of user-facing copy lives in /src/content as a `T` value
 * ({ en, ar }). Components call `tr(value, locale)` to pick a string.
 *
 * Arabic provenance:
 *  - Strings marked `// AR: official` were copied from inveeto.com/ar or the
 *    bilingual Use Cases / Customer Stories pages.
 *  - Everything else in Arabic is a new translation made for this redesign
 *    and should be reviewed by a native-speaking iNVEETO team member.
 */

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type T = { en: string; ar: string };

export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export const tr = (v: T, l: Locale) => v[l];

/** Build an internal href that keeps the current locale. */
export const href = (l: Locale, path = "") =>
  `/${l}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
