import type { Metadata } from "next";
import { Catalogue } from "@/components/catalogue";
import { JsonLd } from "@/components/structured-data";
import { products } from "@/lib/products";
import { itemListJsonLd } from "@/lib/seo";
const title = "Product Catalogue";
const description =
  "Explore private-security uniforms, badges, identification, phone holders, duty belts and accessories. Build a product selection and request a quotation.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products/" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/products/",
    images: [
      {
        url: "/images/security-social.jpg",
        width: 1200,
        height: 630,
        alt: "STAHLTECH private-security catalogue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/security-social.jpg"],
  },
};
export default function Products() {
  return (
    <>
      <div className="page-heading container">
        <p className="eyebrow">THE PRIVATE SECURITY COLLECTION</p>
        <h1>Explore the catalogue.</h1>
        <p>Find the right starting point for your next business enquiry.</p>
        <p className="sample-note">
          DEVELOPMENT SAMPLE CATALOGUE · Product specifications and imagery
          require verification.
        </p>
      </div>
      <Catalogue />
      <JsonLd
        data={itemListJsonLd(
          products,
          "STAHLTECH private-security product catalogue",
          "/products/",
        )}
      />
    </>
  );
}
