import type { MetadataRoute } from "next";
import { company } from "@/lib/config";
import { products, categories } from "@/lib/products";
import { latestCatalogueDate } from "@/lib/seo";
import { localePath, locales, type Locale } from "@/lib/i18n";

export const dynamic = "force-static";

const baseUrl = company.url.replace(/\/+$/, "");
const withSlash = (path: string) =>
  path ? `/${path.replace(/^\/+|\/+$/g, "")}/` : "/";
const url = (locale: Locale, path: string) =>
  `${baseUrl}${localePath(locale, withSlash(path))}`;
const date = (value: string) => new Date(`${value}T00:00:00.000Z`);
const latest = date(latestCatalogueDate);

const languages = (path: string) => ({
  languages: {
    ...Object.fromEntries(
      locales.map((locale) => [locale, url(locale, path)]),
    ),
    "x-default": url("en", path),
  },
});

const categoryLatest = (slug: string) => {
  const dates = products
    .filter((product) => product.category === slug)
    .map((product) => product.added)
    .sort();
  return date(dates.at(-1) ?? latestCatalogueDate);
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: Array<[string, number]> = [
    ["", 1],
    ["products", 0.9],
    ["about", 0.6],
    ["custom-orders", 0.6],
    ["contact", 0.7],
    ["faq", 0.5],
    ["privacy", 0.2],
    ["terms", 0.2],
  ];
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(
    ([path, priority]) =>
      locales.map((locale) => ({
        url: url(locale, path),
        lastModified: latest,
        changeFrequency:
          path === "" || path === "products" ? "weekly" : "monthly",
        priority,
        alternates: languages(path),
      })),
  );
  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap(
    (category) =>
      locales.map((locale) => ({
        url: url(locale, `categories/${category.slug}`),
        lastModified: categoryLatest(category.slug),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: languages(`categories/${category.slug}`),
      })),
  );
  const productEntries: MetadataRoute.Sitemap = products.flatMap((product) =>
    locales.map((locale) => ({
      url: url(locale, `products/${product.slug}`),
      lastModified: date(product.added),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: languages(`products/${product.slug}`),
    })),
  );
  return [...staticEntries, ...categoryEntries, ...productEntries];
}
