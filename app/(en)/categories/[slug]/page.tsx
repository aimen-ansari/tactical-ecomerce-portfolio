import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category";
import { categoryMetadata } from "@/lib/i18n/metadata";
import { categories } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return categoryMetadata("en", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryPage locale="en" slug={slug} />;
}
