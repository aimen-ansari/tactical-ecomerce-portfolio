import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/products";
import { productsMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = productsMetadata("en");

export default function Page() {
  return <ProductsPage locale="en" />;
}
