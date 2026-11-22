import type { MetadataRoute } from "next";
import { company } from "@/lib/config";
import { products, categories } from "@/lib/products";
import { latestCatalogueDate } from "@/lib/seo";
export const dynamic = "force-static";
const baseUrl = company.url.replace(/\/+$/, "");
const url = (path: string) => `${baseUrl}/${path ? `${path}/` : ""}`;
const date = (value: string) => new Date(`${value}T00:00:00.000Z`);
const latest = date(latestCatalogueDate);
const categoryLatest = (slug: string) => {
  const dates = products
    .filter((product) => product.category === slug)
    .map((product) => product.added)
    .sort();
  return date(dates.at(-1) ?? latestCatalogueDate);
};
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: url(""),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: url("products"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("about"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("custom-orders"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("contact"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("faq"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: url("privacy"),
      lastModified: latest,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: url("terms"),
      lastModified: latest,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: url(`categories/${category.slug}`),
    lastModified: categoryLatest(category.slug),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: url(`products/${product.slug}`),
    lastModified: date(product.added),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...categoryPages, ...productPages];
}
