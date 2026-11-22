"use client";
import { Globe2 } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  localeNames,
  localeShortNames,
  localeStorageKey,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import { useI18n, useLocale } from "@/lib/i18n/client";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const current = useLocale();
  const pathname = usePathname();
  const { t } = useI18n();
  const choose = (next: Locale) => {
    try {
      localStorage.setItem(localeStorageKey, next);
    } catch {}
    const target = switchLocalePath(pathname, next);
    if (target !== pathname) {
      window.location.assign(target);
      return;
    }
    document
      .querySelectorAll("details.lang-switcher[open]")
      .forEach((details) => details.removeAttribute("open"));
  };
  return (
    <details className={`lang-switcher${compact ? " compact" : ""}`}>
      <summary aria-label={t.common.languageAria} title={t.common.language}>
        <Globe2 size={14} aria-hidden="true" />
        <span>{compact ? localeShortNames[current] : localeNames[current]}</span>
      </summary>
      <div className="lang-menu" role="group" aria-label={t.common.languageAria}>
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            onClick={() => choose(locale)}
          >
            <span>{localeNames[locale]}</span>
            <small>{localeShortNames[locale]}</small>
          </button>
        ))}
      </div>
    </details>
  );
}
