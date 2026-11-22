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
import { products, categories, imagePath, type Category } from "@/lib/products";
import {
  getDictionary,
  localePath,
  localizeCategories,
  localizedProduct,
  type Locale,
} from "@/lib/i18n";
import { fill } from "@/lib/i18n/format";
import { ProductCard } from "@/components/catalogue";
import { FinalCTA } from "@/components/layout";
import { HeroTitle, Reveal } from "@/components/reveal";

const homeCategorySlugs = ["badges", "tactical", "identification", "holders"];
const moreCategorySlugs = [
  "clothing",
  "jackets",
  "trousers",
  "belts",
  "headwear",
  "gloves",
  "footwear",
];
const featuredSlugs = [
  "belt-mounted-tactical-phone-holder",
  "woven-security-badge-patch",
  "securite-privee-identification-armband",
  "private-security-short-sleeve-polo",
];

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const href = (path: string) => localePath(locale, path);
  const localisedCategories = localizeCategories(categories, locale);
  const bySlug = (slug: string) =>
    localisedCategories.find((category) => category.slug === slug);
  const homeCategories = homeCategorySlugs
    .map(bySlug)
    .filter((category): category is Category => Boolean(category));
  const moreCategories = moreCategorySlugs
    .map(bySlug)
    .filter((category): category is Category => Boolean(category));
  const featuredProducts = featuredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product) => Boolean(product))
    .map((product) => localizedProduct(product!, locale));
  return (
    <>
      <section className="hero">
        <Image
          className="hero-photo"
          src="/images/security-hero.webp"
          alt={t.home.heroImageAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-label">
            <span /> {t.home.heroLabel}
          </div>
          <HeroTitle lines={t.home.heroTitle} />
          <p className="hero-description">
            {t.home.heroDescription[0]}
            <br className="desktop-break" /> {t.home.heroDescription[1]}
          </p>
          <div className="hero-actions">
            <Link href={href("/products/")} className="button">
              {t.home.heroPrimary} <ArrowUpRight size={19} />
            </Link>
            <Link href={href("/contact/")} className="hero-secondary">
              {t.home.heroSecondary} <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-caption">
            <span className="cross">+</span>
            <span>
              {t.home.heroCaption[0]}
              <br />
              {t.home.heroCaption[1]}
            </span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>{t.home.heroBottom}</span>
          <span>
            {t.home.heroRange} <span className="line" />
          </span>
        </div>
      </section>
      <div className="value-strip">
        <div className="container">
          {[
            [Layers3, t.home.values[0]],
            [SlidersHorizontal, t.home.values[1]],
            [PackageCheck, t.home.values[2]],
            [Globe2, t.home.values[3]],
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
              <p className="eyebrow">{t.home.collectionsEyebrow}</p>
              <h2>{t.home.collectionsHeading}</h2>
            </div>
            <Link href={href("/products/")} className="underlined-link">
              {t.home.viewAll} <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="category-grid">
            {homeCategories.map((c, i) => (
              <Link
                href={href(`/categories/${c.slug}/`)}
                className="category-card"
                key={c.slug}
              >
                <div className="category-photo">
                  <Image
                    src={imagePath(c.image)}
                    alt={fill(t.home.categoryAlt, { name: c.short })}
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
                  {fill(
                    products.filter((p) => p.category === c.slug).length === 1
                      ? t.home.productCountOne
                      : t.home.productCount,
                    {
                      count: products.filter((p) => p.category === c.slug).length,
                    },
                  )}
                </p>
              </Link>
            ))}
          </div>
          <div className="category-pills">
            {moreCategories.map((c) => (
              <Link key={c.slug} href={href(`/categories/${c.slug}/`)}>
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
              alt={t.home.brandImageAlt}
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <span>{t.home.brandImageCaption}</span>
          </div>
          <Reveal>
            <p className="eyebrow">{t.home.brandEyebrow}</p>
            <h2>
              {t.home.brandHeading[0]}
              <br />
              {t.home.brandHeading[1]}
            </h2>
            <p>{t.home.brandP1}</p>
            <p>{t.home.brandP2}</p>
            <Link href={href("/about/")} className="underlined-link">
              {t.home.brandLink} <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section selected">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.home.selectedEyebrow}</p>
              <h2>{t.home.selectedHeading}</h2>
            </div>
            <Link href={href("/products/")} className="underlined-link">
              {t.home.exploreCatalogue} <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="featured-grid">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p className="sample-note">{t.home.sampleNote}</p>
        </div>
      </section>
      <section className="custom-section">
        <div className="container custom-grid">
          <div>
            <p className="eyebrow">{t.home.customEyebrow}</p>
            <h2>
              {t.home.customHeading[0]}
              <br />
              {t.home.customHeading[1]}
            </h2>
            <p>{t.home.customP}</p>
            <Link href={href("/custom-orders/")} className="button">
              {t.home.customButton} <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="custom-options">
            {t.home.customOptions.map(([title, description], index) => (
              <div key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <Plus size={18} />
              </div>
            ))}
            <p className="small muted">{t.home.customNote}</p>
          </div>
        </div>
      </section>
      <section className="section process">
        <div className="container">
          <p className="eyebrow">{t.home.processEyebrow}</p>
          <h2>{t.home.processHeading}</h2>
          <div className="process-grid">
            {t.home.processSteps.map(([title, description], index) => (
              <Reveal key={title}>
                <span className="process-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>
                  {title}
                  <ArrowUpRight size={20} />
                </h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
