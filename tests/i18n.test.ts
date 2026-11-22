import { test } from "node:test";
import assert from "node:assert/strict";
import {
  localeFromPath,
  localePath,
  locales,
  stripLocale,
  switchLocalePath,
} from "../lib/i18n/config";
import { dictionaries } from "../lib/i18n/dictionaries";
import {
  localizeCategories,
  localizedCategory,
  localizedProduct,
} from "../lib/i18n/catalogue";
import { categories, products } from "../lib/products";

const keys = (value: unknown, prefix = ""): string[] => {
  if (Array.isArray(value))
    return [prefix, ...value.flatMap((item, i) => keys(item, `${prefix}[${i}]`))];
  if (value && typeof value === "object")
    return [
      prefix,
      ...Object.entries(value).flatMap(([key, child]) =>
        keys(child, prefix ? `${prefix}.${key}` : key),
      ),
    ];
  return [prefix];
};

test("every locale exposes the same dictionary shape", () => {
  const reference = keys(dictionaries.en).sort();
  for (const locale of locales) {
    assert.deepEqual(
      keys(dictionaries[locale]).sort(),
      reference,
      `${locale} dictionary does not match the English keys`,
    );
  }
});

test("locale paths keep English at the root and prefix the others", () => {
  assert.equal(localePath("en", "/products/"), "/products/");
  assert.equal(localePath("de", "/products/"), "/de/products/");
  assert.equal(localePath("fr", "/"), "/fr/");
  assert.equal(localeFromPath("/"), "en");
  assert.equal(localeFromPath("/de/products/"), "de");
  assert.equal(localeFromPath("/fr/"), "fr");
  assert.equal(stripLocale("/de/products/"), "/products/");
  assert.equal(stripLocale("/products/"), "/products/");
  assert.equal(switchLocalePath("/de/products/", "fr"), "/fr/products/");
  assert.equal(switchLocalePath("/de/products/", "en"), "/products/");
});

test("every category and product has German and French content", () => {
  for (const locale of ["de", "fr"] as const) {
    for (const category of categories) {
      const translated = localizedCategory(category, locale);
      assert.notEqual(
        translated.name,
        category.name,
        `${locale} category ${category.slug} is not translated`,
      );
    }
    for (const product of products) {
      const translated = localizedProduct(product, locale);
      assert.notEqual(
        translated.name,
        product.name,
        `${locale} product ${product.slug} is not translated`,
      );
      assert.notEqual(translated.description, product.description);
      assert.ok(translated.specs);
    }
  }
});

test("category and product helpers keep the source catalogue intact", () => {
  const before = products[0].name;
  localizeCategories(categories, "de");
  localizedProduct(products[0], "fr");
  assert.equal(products[0].name, before);
});
