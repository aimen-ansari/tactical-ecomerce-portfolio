import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/pages/category";
import { categoryMetadata } from "@/lib/i18n/metadata";
import { isLocale, locales } from "@/lib/i18n";
import { categories } from "@/lib/products";

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .flatMap((locale) =>
      categories.map((category) => ({ locale, slug: category.slug })),
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return categoryMetadata(isLocale(locale) ? locale : "en", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <CategoryPage locale={locale} slug={slug} />;
}
