import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/pages/info";
import { infoMetadata } from "@/lib/i18n/metadata";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return infoMetadata(isLocale(locale) ? locale : "en", "contact");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <InfoPage locale={locale} page="contact" />;
}
