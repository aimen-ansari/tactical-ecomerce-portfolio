import type { Metadata } from "next";
import { ProductPage } from "@/components/pages/product";
import { productMetadata } from "@/lib/i18n/metadata";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return productMetadata("en", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductPage locale="en" slug={slug} />;
}
