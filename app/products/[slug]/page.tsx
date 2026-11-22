import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, categoryName, imagePath } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/catalogue";
import { JsonLd } from "@/components/structured-data";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p)
    return {
      title: "Product not found",
      robots: { index: false, follow: false },
    };
  const image = {
    url: imagePath(p.image),
    width: 640,
    height: 640,
    alt: `Illustrative ${p.name}`,
  };
  return {
    title: p.name,
    description: p.description,
    keywords: [
      p.name,
      p.frenchName,
      p.subcategory,
      categoryName(p.category),
      p.code,
    ],
    alternates: { canonical: `/products/${slug}/` },
    openGraph: {
      type: "website",
      title: p.name,
      description: p.description,
      url: `/products/${slug}/`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: p.name,
      description: p.description,
      images: [imagePath(p.image)],
    },
  };
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <div className="container">
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/">Home</Link> / <Link href="/products/">Products</Link> /{" "}
        <Link href={`/categories/${p.category}/`}>
          {categoryName(p.category)}
        </Link>{" "}
        / <span>{p.name}</span>
      </nav>
      <ProductDetail product={p} />
      <section className="section">
        <p className="eyebrow">CONTINUE EXPLORING</p>
        <h2>Related products.</h2>
        <div className="featured-grid mt-8">
          {products
            .filter((x) => x.slug !== slug)
            .sort(
              (a, b) =>
                Number(b.category === p.category) -
                Number(a.category === p.category),
            )
            .slice(0, 4)
            .map((x) => (
              <ProductCard key={x.slug} product={x} />
            ))}
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          {
            name: categoryName(p.category),
            path: `/categories/${p.category}/`,
          },
          { name: p.name, path: `/products/${slug}/` },
        ])}
      />
      <JsonLd data={productJsonLd(p)} />
    </div>
  );
}
