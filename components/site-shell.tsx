import type { ReactNode } from "react";
import { Header, Footer, WhatsAppButton } from "./layout";
import { QuoteProvider } from "./quote-provider";
import { JsonLd } from "./structured-data";
import { LanguageDetect } from "./language-detect";
import { LocaleProvider } from "@/lib/i18n/client";
import { getDictionary, type Locale } from "@/lib/i18n";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = getDictionary(locale);
  return (
    <LocaleProvider locale={locale}>
      <JsonLd data={organizationJsonLd(locale)} />
      <JsonLd data={websiteJsonLd(locale)} />
      <a href="#main" className="skip-link">
        {t.common.skip}
      </a>
      <QuoteProvider>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </QuoteProvider>
      <WhatsAppButton />
      {locale === "en" && <LanguageDetect />}
    </LocaleProvider>
  );
}
