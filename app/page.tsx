import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Layers3,
  SlidersHorizontal,
  PackageCheck,
  Globe2,
  Plus,
} from "lucide-react";
import {
  products,
  imagePath,
  categoryBySlug,
  type Category,
  type Product,
} from "@/lib/products";
import { ProductCard } from "@/components/catalogue";
import { FinalCTA } from "@/components/layout";
import { HeroTitle, Reveal } from "@/components/reveal";
const homeTitle = "Private Security Uniforms, Badges & Duty Accessories";
const homeDescription =
  "Explore private-security uniforms, security badges, identification, tactical phone holders and duty accessories. Build a product selection and request a business quotation.";
export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: [
      {
        url: "/images/security-social.jpg",
        width: 1200,
        height: 630,
        alt: "STAHLTECH private-security uniform, badge and identification concepts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/images/security-social.jpg"],
  },
};
const homeCategories = ["badges", "tactical", "identification", "holders"]
  .map(categoryBySlug)
  .filter((category): category is Category => Boolean(category));
const moreCategories = [
  "clothing",
  "jackets",
  "trousers",
  "belts",
  "headwear",
  "gloves",
  "footwear",
]
  .map(categoryBySlug)
  .filter((category): category is Category => Boolean(category));
const featuredSlugs = [
  "belt-mounted-tactical-phone-holder",
  "woven-security-badge-patch",
  "securite-privee-identification-armband",
  "private-security-short-sleeve-polo",
];
const featuredProducts = featuredSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product));
export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          className="hero-photo"
          src="/images/security-hero.webp"
          alt="Illustrative black private-security jacket, polo shirt, ID holder and orange identification armband"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-label">
            <span /> EQUIPPED FOR YOUR BUSINESS
          </div>
          <HeroTitle />
          <p className="hero-description">
            Private-security uniforms, identification and everyday accessories.
            <br className="desktop-break" /> A considered collection for
            professional buyers.
          </p>
          <div className="hero-actions">
            <Link href="/products/" className="button">
              Explore products <ArrowUpRight size={19} />
            </Link>
            <Link href="/contact/" className="hero-secondary">
              Request a quote <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-caption">
            <span className="cross">+</span>
            <span>
              FUNCTIONAL DESIGN.
              <br />
              PROFESSIONAL PURPOSE.
            </span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>THE PRIVATE SECURITY COLLECTION</span>
          <span>
            01 — 11 <span className="line" />
          </span>
        </div>
      </section>
      <div className="value-strip">
        <div className="container">
          {[
            [Layers3, "A focused product collection"],
            [SlidersHorizontal, "Customisation enquiries"],
            [PackageCheck, "Bulk quotation requests"],
            [Globe2, "International business focus"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Layers3;
            return (
              <div key={String(label)}>
                <I size={19} />
                <span>{String(label)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <section className="section collections">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE THE COLLECTION</p>
              <h2>Purpose in every category.</h2>
            </div>
            <Link href="/products/" className="underlined-link">
              View all products <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="category-grid">
            {homeCategories.map((c, i) => (
              <Link
                href={`/categories/${c.slug}/`}
                className="category-card"
                key={c.slug}
              >
                <div className="category-photo">
                  <Image
                    src={imagePath(c.image)}
                    alt={`Illustrative ${c.short}`}
                    width={640}
                    height={640}
                  />
                  <span className="category-number">0{i + 1}</span>
                </div>
                <h3>
                  {c.short}
                  <ArrowUpRight size={19} />
                </h3>
                <p>
                  {products.filter((p) => p.category === c.slug).length}{" "}
                  products in collection
                </p>
              </Link>
            ))}
          </div>
          <div className="category-pills">
            {moreCategories.map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}/`}>
                {c.short}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="brand-section">
        <div className="container brand-grid">
          <div className="brand-image">
            <Image
              src="/images/security-hero.webp"
              alt="Illustrative private-security uniform and identification arrangement"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <span>THE STAHLTECH PRIVATE SECURITY COLLECTION</span>
          </div>
          <Reveal>
            <p className="eyebrow">A FOCUSED DIVISION. A CLEAR PURPOSE.</p>
            <h2>
              Practical products.
              <br />
              Professional possibilities.
            </h2>
            <p>
              STAHLTECH’s Private Security Uniforms & Accessories division
              brings polos, jackets, service trousers, identification, badges,
              phone holders and duty accessories together in one dedicated
              catalogue for business buyers.
            </p>
            <p>
              From individual product enquiries to coordinated collections,
              start with what your business needs. We’ll discuss specifications,
              quantities and the details that matter to you.
            </p>
            <Link href="/about/" className="underlined-link">
              Discover Stahltech <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section selected">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A CLOSER LOOK</p>
              <h2>Selected for your next enquiry.</h2>
            </div>
            <Link href="/products/" className="underlined-link">
              Explore the catalogue <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="featured-grid">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p className="sample-note">
            SAMPLE COLLECTION · Illustrative product imagery. Final details to
            be confirmed.
          </p>
        </div>
      </section>
      <section className="custom-section">
        <div className="container custom-grid">
          <div>
            <p className="eyebrow">YOUR BRAND. YOUR REQUIREMENTS.</p>
            <h2>
              Make the enquiry
              <br />
              your own.
            </h2>
            <p>
              Looking for specific colours, identity details or a coordinated
              bulk order? Tell us what you have in mind.
            </p>
            <Link href="/custom-orders/" className="button">
              Discuss custom requirements <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="custom-options">
            {[
              [
                "01",
                "Logo & identity",
                "Ask about patches, badges and branding options.",
              ],
              [
                "02",
                "Colours & sizing",
                "Share your preferred palette, fit and size range.",
              ],
              [
                "03",
                "Bulk & packaging",
                "Discuss quantities, presentation and packaging.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
                <Plus size={18} />
              </div>
            ))}
            <p className="small muted">
              All custom options are subject to feasibility review and
              confirmation.
            </p>
          </div>
        </div>
      </section>
      <section className="section process">
        <div className="container">
          <p className="eyebrow">STRAIGHTFORWARD FROM THE START</p>
          <h2>From selection to conversation.</h2>
          <div className="process-grid">
            {[
              [
                "01",
                "Explore & select",
                "Browse the collection and add products to your quotation basket.",
              ],
              [
                "02",
                "Share your requirements",
                "Tell us your quantities, preferred options and business details.",
              ],
              [
                "03",
                "Continue the conversation",
                "Receive a response to discuss specifications and next steps.",
              ],
            ].map(([n, t, d]) => (
              <Reveal key={n}>
                <span className="process-number">{n}</span>
                <h3>
                  {t}
                  <ArrowUpRight size={20} />
                </h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
