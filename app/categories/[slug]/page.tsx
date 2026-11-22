import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, imagePath } from "@/lib/products";
import { Catalogue } from "@/components/catalogue";
import { JsonLd } from "@/components/structured-data";
import {
  breadcrumbJsonLd,
  categoryProductCount,
  categoryProducts,
  collectionPageJsonLd,
} from "@/lib/seo";
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  if (!c)
    return {
      title: "Category not found",
      robots: { index: false, follow: false },
    };
  const count = categoryProductCount(slug);
  const description = `${c.description} Explore ${count} sample product${count === 1 ? "" : "s"} and share your business requirements.`;
  return {
    title: c.name,
    description,
    keywords: [c.name, c.short, "private security", "Sécurité privée"],
    alternates: { canonical: `/categories/${slug}/` },
    openGraph: {
      type: "website",
      title: c.name,
      description,
      url: `/categories/${slug}/`,
      images: [
        {
          url: imagePath(c.image),
          width: 640,
          height: 640,
          alt: `Illustrative ${c.short}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.name,
      description,
      images: [imagePath(c.image)],
    },
  };
}
export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  if (!c) notFound();
  const items = categoryProducts(slug);
  return (
    <>
      <div className="page-heading container">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link> / <Link href="/products/">Products</Link> /{" "}
          <span>{c.short}</span>
        </nav>
        <p className="eyebrow">THE COLLECTION / {c.short.toUpperCase()}</p>
        <h1>{c.name}</h1>
        <p>
          {c.description} Explore the sample collection and share your
          requirements.
        </p>
        <p className="sample-note">
          ILLUSTRATIVE CATALOGUE · Final product details require confirmation.
        </p>
      </div>
      <Catalogue category={slug} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: c.name, path: `/categories/${slug}/` },
        ])}
      />
      <JsonLd data={collectionPageJsonLd(c, items)} />
    </>
  );
}
