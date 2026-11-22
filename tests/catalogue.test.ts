import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categories, products, imagePath } from "../lib/products";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicFile = (url: string) =>
  path.join(root, "public", url.replace(/^\//, ""));
test("catalogue categories, products and images are consistent", () => {
  assert.equal(
    new Set(categories.map((c) => c.slug)).size,
    categories.length,
    "category slugs must be unique",
  );
  assert.equal(
    new Set(products.map((p) => p.slug)).size,
    products.length,
    "product slugs must be unique",
  );
  assert.equal(
    new Set(products.map((p) => p.code)).size,
    products.length,
    "product codes must be unique",
  );
  for (const category of categories) {
    assert.ok(
      products.some((p) => p.category === category.slug),
      `category ${category.slug} has no products`,
    );
    assert.ok(
      existsSync(publicFile(imagePath(category.image))),
      `category ${category.slug} image is missing`,
    );
  }
  for (const product of products) {
    assert.ok(
      categories.some((c) => c.slug === product.category),
      `product ${product.slug} uses an unknown category`,
    );
    assert.ok(
      existsSync(publicFile(imagePath(product.image))),
      `product ${product.slug} image is missing`,
    );
  }
});
test("security badges and tactical phone holders are present", () => {
  for (const slug of ["badges", "tactical"]) {
    assert.ok(
      categories.some((c) => c.slug === slug),
      `missing ${slug} category`,
    );
    assert.ok(
      products.some((p) => p.category === slug),
      `missing products in ${slug}`,
    );
  }
});
