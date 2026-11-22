export const locales = ["en", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
};

/** Short label used inside the compact language switcher. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  fr: "FR",
};

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
};

/** BCP 47 tags used for `hreflang` and the `<html lang>` attribute. */
export const htmlLangs: Record<Locale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

const normalisePath = (path: string) => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "" ? "/" : clean;
};

/**
 * English is served from the site root so existing links and search results keep
 * working. Every other locale is prefixed: /de/..., /fr/...
 */
export const localePath = (locale: Locale, path: string) => {
  const clean = normalisePath(path);
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
};

/** Reads the locale from a pathname such as `/de/products/`. */
export const localeFromPath = (pathname: string): Locale => {
  const segment = normalisePath(pathname).split("/")[1] || "";
  return isLocale(segment) ? segment : defaultLocale;
};

/** Removes the locale prefix, returning a root-relative path. */
export const stripLocale = (pathname: string) => {
  const clean = normalisePath(pathname);
  const locale = localeFromPath(clean);
  if (locale === defaultLocale) return clean;
  const stripped = clean.slice(locale.length + 1) || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
};

/** Keeps the current page while switching language. */
export const switchLocalePath = (pathname: string, next: Locale) =>
  localePath(next, stripLocale(pathname));

export const localeStorageKey = "stahltech-locale";
