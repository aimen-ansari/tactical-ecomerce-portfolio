import type { Metadata } from "next";
import { company } from "@/lib/config";
import { categories, products } from "@/lib/products";
import {
  getDictionary,
  localePath,
  locales,
  ogLocales,
  type Locale,
} from "./index";
import { localizedCategory, localizedProduct } from "./catalogue";

export const infoPageKeys = [
  "about",
  "custom-orders",
  "contact",
  "quote",
  "faq",
  "privacy",
  "terms",
] as const;
export type InfoPageKey = (typeof infoPageKeys)[number];

export const isInfoPageKey = (value: string): value is InfoPageKey =>
  (infoPageKeys as readonly string[]).includes(value);

export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, localePath(locale, path)]),
  ),
  "x-default": localePath("en", path),
});

const socialImage = {
  url: "/images/security-social.jpg",
  width: 1200,
  height: 630,
};

export function baseMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(company.url),
    applicationName: "STAHLTECH",
    title: {
      default: t.meta.siteTitle,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    authors: [{ name: "STAHLTECH" }],
    creator: "STAHLTECH",
    publisher: "STAHLTECH",
    category: t.meta.siteTitle,
    keywords: t.meta.keywords,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/logo.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      type: "website",
      siteName: "STAHLTECH",
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => ogLocales[other]),
      images: [{ ...socialImage, alt: t.common.brandImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/security-social.jpg"],
    },
    robots: {
      index: !company.sampleCatalogue,
      follow: !company.sampleCatalogue,
    },
    alternates: {
      canonical: localePath(locale, "/"),
      languages: languageAlternates("/"),
    },
  };
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  robots?: Metadata["robots"];
};

export function pageMetadata(locale: Locale, meta: PageMeta): Metadata {
  const image = meta.image ?? {
    ...socialImage,
    alt: getDictionary(locale).info.webPageAlt,
  };
  return {
    metadataBase: new URL(company.url),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath(locale, meta.path),
      languages: languageAlternates(meta.path),
    },
    ...(meta.robots ? { robots: meta.robots } : {}),
    openGraph: {
      type: "website",
      siteName: "STAHLTECH",
      locale: ogLocales[locale],
      title: meta.title,
      description: meta.description,
      url: localePath(locale, meta.path),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image.url],
    },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata(locale, {
    title: t.home.metaTitle,
    description: t.home.metaDescription,
    path: "/",
    image: { ...socialImage, alt: t.home.metaImageAlt },
  });
}

export function productsMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata(locale, {
    title: t.pages.products.metaTitle,
    description: t.pages.products.metaDescription,
    path: "/products/",
    image: { ...socialImage, alt: t.common.brandImageAlt },
  });
}

export function categoryMetadata(locale: Locale, slug: string): Metadata {
  const t = getDictionary(locale);
  const found = categories.find((category) => category.slug === slug);
  if (!found)
    return {
      title: t.pages.category.notFound,
      robots: { index: false, follow: false },
    };
  const category = localizedCategory(found, locale);
  const count = products.filter((product) => product.category === slug).length;
  const description = (
    count === 1
      ? t.pages.category.metaDescriptionOne
      : t.pages.category.metaDescription
  )
    .replace("{description}", category.description)
    .replace("{count}", String(count));
  return pageMetadata(locale, {
    title: category.name,
    description,
    path: `/categories/${slug}/`,
    image: {
      url: `/images/category-${category.image}.webp`,
      width: 640,
      height: 640,
      alt: t.common.imageAlt.replace("{name}", category.short),
    },
  });
}

export function productMetadata(locale: Locale, slug: string): Metadata {
  const t = getDictionary(locale);
  const found = products.find((product) => product.slug === slug);
  if (!found)
    return {
      title: t.product.notFound,
      robots: { index: false, follow: false },
    };
  const product = localizedProduct(found, locale);
  return pageMetadata(locale, {
    title: product.name,
    description: product.description,
    path: `/products/${slug}/`,
    image: {
      url: `/images/category-${product.image}.webp`,
      width: 640,
      height: 640,
      alt: t.common.imageAlt.replace("{name}", product.name),
    },
  });
}

export function infoMetadata(locale: Locale, page: InfoPageKey): Metadata {
  const t = getDictionary(locale);
  const metaKey = page === "custom-orders" ? "customOrders" : page;
  const meta = t.info.meta[metaKey];
  return pageMetadata(locale, {
    title: meta.title,
    description: meta.description,
    path: `/${page}/`,
    ...(page === "quote"
      ? { robots: { index: false, follow: false } as Metadata["robots"] }
      : {}),
  });
}
