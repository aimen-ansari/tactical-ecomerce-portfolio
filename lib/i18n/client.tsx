"use client";
import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, localePath, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);

/**
 * Client-side access to the active language, its dictionary and a helper that
 * prefixes links with the current locale.
 */
export function useI18n(): {
  locale: Locale;
  t: Dictionary;
  href: (path: string) => string;
} {
  const locale = useLocale();
  return {
    locale,
    t: dictionaries[locale],
    href: (path: string) => localePath(locale, path),
  };
}
