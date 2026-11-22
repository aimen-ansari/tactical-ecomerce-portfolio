import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsPage } from "@/components/pages/products";
import { productsMetadata } from "@/lib/i18n/metadata";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return productsMetadata(isLocale(locale) ? locale : "en");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <ProductsPage locale={locale} />;
}
