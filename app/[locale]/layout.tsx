import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { baseMetadata } from "@/lib/i18n/metadata";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return baseMetadata(isLocale(locale) ? locale : "en");
}

export const viewport: Viewport = {
  themeColor: "#20231f",
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return (
    <html lang={locale}>
      <body>
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
