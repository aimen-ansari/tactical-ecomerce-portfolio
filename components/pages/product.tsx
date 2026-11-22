import { notFound } from "next/navigation";
import Link from "next/link";
import { products, categories } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/catalogue";
import { JsonLd } from "@/components/structured-data";
import {
  getDictionary,
  localePath,
  localizeProducts,
  localizedCategory,
  localizedProduct,
  type Locale,
} from "@/lib/i18n";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

export function ProductPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const found = products.find((product) => product.slug === slug);
  if (!found) notFound();
  const t = getDictionary(locale);
  const product = localizedProduct(found, locale);
  const category = categories.find((item) => item.slug === found.category);
  const categoryName = category
    ? localizedCategory(category, locale).name
    : found.category;
  const related = localizeProducts(
    products
      .filter((item) => item.slug !== slug)
      .sort(
        (a, b) =>
          Number(b.category === found.category) -
          Number(a.category === found.category),
      )
      .slice(0, 4),
    locale,
  );
  const href = (path: string) => localePath(locale, path);
  return (
    <div className="container">
      <nav aria-label={t.product.breadcrumb} className="breadcrumbs">
        <Link href={href("/")}>{t.common.home}</Link> /{" "}
        <Link href={href("/products/")}>{t.common.products}</Link> /{" "}
        <Link href={href(`/categories/${found.category}/`)}>
          {categoryName}
        </Link>{" "}
        / <span>{product.name}</span>
      </nav>
      <ProductDetail product={product} />
      <section className="section">
        <p className="eyebrow">{t.product.relatedEyebrow}</p>
        <h2>{t.product.relatedHeading}</h2>
        <div className="featured-grid mt-8">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.home, path: href("/") },
          { name: t.common.products, path: href("/products/") },
          {
            name: categoryName,
            path: href(`/categories/${found.category}/`),
          },
          { name: product.name, path: href(`/products/${slug}/`) },
        ])}
      />
      <JsonLd data={productJsonLd(product, locale)} />
    </div>
  );
}
