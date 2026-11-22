import { Catalogue } from "@/components/catalogue";
import { JsonLd } from "@/components/structured-data";
import { products } from "@/lib/products";
import { getDictionary, localizeProducts, type Locale } from "@/lib/i18n";
import { itemListJsonLd } from "@/lib/seo";

export function ProductsPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const localised = localizeProducts(products, locale);
  return (
    <>
      <div className="page-heading container">
        <p className="eyebrow">{t.pages.products.eyebrow}</p>
        <h1>{t.pages.products.heading}</h1>
        <p>{t.pages.products.intro}</p>
        <p className="sample-note">{t.pages.products.sampleNote}</p>
      </div>
      <Catalogue />
      <JsonLd
        data={itemListJsonLd(
          localised,
          t.pages.products.listName,
          "/products/",
          locale,
        )}
      />
    </>
  );
}
