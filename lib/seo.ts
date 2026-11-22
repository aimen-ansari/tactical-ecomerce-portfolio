import { company } from "./config";
import {
  products,
  imagePath,
  categoryName,
  type Category,
  type Product,
} from "./products";

export const siteUrl = company.url.replace(/\/+$/, "");
export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
export const imageUrl = (index: number) => absoluteUrl(imagePath(index));
export const latestCatalogueDate = products.reduce(
  (latest, product) => (product.added > latest ? product.added : latest),
  "2026-01-01",
);
const divisionName = `${company.name} — ${company.division}`;
const defaultDescription =
  "Private security uniforms, badges, identification, phone holders and duty accessories for business buyers.";

export const organizationJsonLd = () => {
  const contactPoint = [
    ...(company.email
      ? [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: company.email,
            availableLanguage: ["English", "French"],
          },
        ]
      : []),
    ...(company.phone
      ? [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: company.phone,
            availableLanguage: ["English", "French"],
          },
        ]
      : []),
  ];
  const sameAs = [company.surgicalUrl, company.leatherUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    description: defaultDescription,
    ...(company.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address,
          },
        }
      : {}),
    ...(contactPoint.length ? { contactPoint } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
};

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: divisionName,
  url: siteUrl,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
  },
});

export const webPageJsonLd = (
  name: string,
  description: string,
  path: string,
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url: absoluteUrl(path),
  isPartOf: {
    "@type": "WebSite",
    name: divisionName,
    url: siteUrl,
  },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const productJsonLd = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  sku: product.code,
  category: categoryName(product.category),
  url: absoluteUrl(`/products/${product.slug}/`),
  image: [imageUrl(product.image)],
  brand: {
    "@type": "Brand",
    name: company.name,
  },
  material: product.material,
  color: product.colours.join(", "),
  size: product.sizes.join(", "),
  additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
    "@type": "PropertyValue",
    name,
    value,
  })),
});

export const itemListJsonLd = (
  items: Product[],
  name: string,
  path: string,
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  url: absoluteUrl(path),
  numberOfItems: items.length,
  itemListElement: items.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      url: absoluteUrl(`/products/${product.slug}/`),
      image: imageUrl(product.image),
    },
  })),
});

export const collectionPageJsonLd = (
  category: Category,
  items: Product[],
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: category.name,
  description: category.description,
  url: absoluteUrl(`/categories/${category.slug}/`),
  isPartOf: {
    "@type": "WebSite",
    name: divisionName,
    url: siteUrl,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        url: absoluteUrl(`/products/${product.slug}/`),
        image: imageUrl(product.image),
      },
    })),
  },
});

export const faqJsonLd = (faqs: readonly (readonly [string, string])[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
});

export const categoryProductCount = (slug: string) =>
  products.filter((product) => product.category === slug).length;

export const categoryProducts = (slug: string) =>
  products.filter((product) => product.category === slug);
