import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/pages/product";
import { productMetadata } from "@/lib/i18n/metadata";
import { isLocale, locales } from "@/lib/i18n";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .flatMap((locale) =>
      products.map((product) => ({ locale, slug: product.slug })),
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return productMetadata(isLocale(locale) ? locale : "en", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <ProductPage locale={locale} slug={slug} />;
}
