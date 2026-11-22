"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  localeStorageKey,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";

const browserLocale = (): Locale | null => {
  const languages =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];
  for (const language of languages) {
    const code = language.toLowerCase().split("-")[0];
    if (code === "de" || code === "fr") return code;
  }
  return null;
};

/**
 * Sends first-time visitors to their browser language on the English tree.
 * A stored preference (set by the language switcher) always wins, and
 * `?lang=en` is an explicit opt-out.
 */
export function LanguageDetect() {
  const pathname = usePathname();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lang") === "en") {
      try {
        localStorage.setItem(localeStorageKey, "en");
      } catch {}
      return;
    }
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(localeStorageKey);
    } catch {}
    if (saved) return;
    const detected = browserLocale();
    if (!detected) return;
    const target = switchLocalePath(pathname, detected);
    if (target !== pathname) window.location.replace(target);
  }, [pathname]);
  return null;
}
