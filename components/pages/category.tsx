import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, products } from "@/lib/products";
import { Catalogue } from "@/components/catalogue";
import { JsonLd } from "@/components/structured-data";
import {
  getDictionary,
  localePath,
  localizeProducts,
  localizedCategory,
  type Locale,
} from "@/lib/i18n";
import {
  breadcrumbJsonLd,
  categoryProducts,
  collectionPageJsonLd,
} from "@/lib/seo";

export function CategoryPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const found = categories.find((category) => category.slug === slug);
  if (!found) notFound();
  const t = getDictionary(locale);
  const category = localizedCategory(found, locale);
  const items = localizeProducts(categoryProducts(slug), locale);
  const href = (path: string) => localePath(locale, path);
  return (
    <>
      <div className="page-heading container">
        <nav aria-label={t.product.breadcrumb} className="breadcrumbs">
          <Link href={href("/")}>{t.common.home}</Link> /{" "}
          <Link href={href("/products/")}>{t.common.products}</Link> /{" "}
          <span>{category.short}</span>
        </nav>
        <p className="eyebrow">
          {t.pages.category.eyebrow.replace(
            "{name}",
            category.short.toUpperCase(),
          )}
        </p>
        <h1>{category.name}</h1>
        <p>
          {category.description} {t.pages.category.intro}
        </p>
        <p className="sample-note">{t.pages.category.sampleNote}</p>
      </div>
      <Catalogue category={slug} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.home, path: href("/") },
          { name: t.common.products, path: href("/products/") },
          { name: category.name, path: href(`/categories/${slug}/`) },
        ])}
      />
      <JsonLd data={collectionPageJsonLd(category, items, locale)} />
    </>
  );
}
