"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import {
  categories,
  products,
  categoryName,
  imagePath,
  type Product,
} from "@/lib/products";
import { useQuote } from "./quote-provider";
export function ProductCard({ product: p }: { product: Product }) {
  const { add } = useQuote();
  return (
    <article className="product-card">
      <Link className="product-image" href={`/products/${p.slug}/`}>
        <Image
          src={imagePath(p.image)}
          alt={`Illustrative ${p.name}`}
          width={600}
          height={600}
          sizes="(max-width: 760px) 50vw, 25vw"
        />
        <span className="image-corner">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="product-meta">
        <span>{categories.find((c) => c.slug === p.category)?.short}</span>
        <span>{p.code}</span>
      </div>
      <Link href={`/products/${p.slug}/`}>
        <h3>{p.name}</h3>
      </Link>
      <button
        onClick={() =>
          add({
            slug: p.slug,
            colour: p.colours[0],
            size: p.sizes[0],
            quantity: 1,
            notes: "",
          })
        }
        className="add-link"
      >
        Add to quote <Plus size={15} />
      </button>
    </article>
  );
}
const normaliseSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function Catalogue({ category }: { category?: string }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(category || "");
  const [material, setMaterial] = useState("");
  const [subcat, setSubcat] = useState("");
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(9);
  const [filters, setFilters] = useState(false);
  const filtered = products
    .filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!subcat || p.subcategory === subcat) &&
        (!material || p.material === material) &&
        (!colour || p.colours.includes(colour)) &&
        (!size || p.sizes.includes(size)) &&
        normaliseSearch(
          `${p.name} ${p.frenchName} ${p.subcategory} ${p.code} ${categoryName(p.category)}`,
        ).includes(normaliseSearch(search)),
    )
    .sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : sort === "za"
          ? b.name.localeCompare(a.name)
          : b.added.localeCompare(a.added),
    );
  const reset = () => {
    setSearch("");
    setCat(category || "");
    setMaterial("");
    setSubcat("");
    setColour("");
    setSize("");
    setLimit(9);
  };
  return (
    <div className="container catalogue">
      <div className="catalogue-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            aria-label="Search products"
            placeholder="Search products or product codes…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLimit(9);
            }}
          />
        </div>
        <button
          className="filter-toggle button outline"
          aria-expanded={filters}
          onClick={() => setFilters(!filters)}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <label className="sort-label">
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest additions</option>
            <option value="az">Name: A–Z</option>
            <option value="za">Name: Z–A</option>
          </select>
        </label>
      </div>
      <div className="catalogue-layout">
        <aside className={`filters ${filters ? "is-open" : ""}`}>
          <div className="section-heading">
            <h3>Filter products</h3>
            <button className="text-button" onClick={reset}>
              Reset
            </button>
          </div>
          <fieldset>
            <legend>COLLECTION</legend>
            {!category && (
              <label>
                <input
                  type="radio"
                  name="category"
                  checked={!cat}
                  onChange={() => {
                    setCat("");
                    setSubcat("");
                    setMaterial("");
                    setColour("");
                    setSize("");
                    setLimit(9);
                  }}
                />{" "}
                All products <span>{products.length}</span>
              </label>
            )}
            {categories
              .filter((c) => !category || c.slug === category)
              .map((c) => (
                <label key={c.slug}>
                  <input
                    type="radio"
                    name="category"
                    checked={cat === c.slug}
                    onChange={() => {
                      setCat(c.slug);
                      setSubcat("");
                      setMaterial("");
                      setColour("");
                      setSize("");
                      setLimit(9);
                    }}
                  />
                  {c.short}
                  <span>
                    {products.filter((p) => p.category === c.slug).length}
                  </span>
                </label>
              ))}
          </fieldset>
          {[
            [
              "Product type",
              subcat,
              setSubcat,
              [
                ...new Set(
                  products
                    .filter((p) => !cat || p.category === cat)
                    .map((p) => p.subcategory),
                ),
              ],
            ],
            [
              "Material",
              material,
              setMaterial,
              [
                ...new Set(
                  products
                    .filter((p) => !cat || p.category === cat)
                    .map((p) => p.material),
                ),
              ],
            ],
            [
              "Colour",
              colour,
              setColour,
              [
                ...new Set(
                  products
                    .filter((p) => !cat || p.category === cat)
                    .flatMap((p) => p.colours),
                ),
              ],
            ],
            [
              "Size",
              size,
              setSize,
              [
                ...new Set(
                  products
                    .filter((p) => !cat || p.category === cat)
                    .flatMap((p) => p.sizes),
                ),
              ],
            ],
          ].map(([label, value, set, options]) => (
            <label className="filter-select" key={String(label)}>
              {String(label).toUpperCase()}
              <select
                aria-label={String(label)}
                value={value as string}
                onChange={(e) => {
                  (set as (s: string) => void)(e.target.value);
                  setLimit(9);
                }}
              >
                <option value="">All {String(label).toLowerCase()}s</option>
                {(options as string[]).map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          ))}
          <p className="small muted">
            Sample options shown. Final specifications are confirmed by enquiry.
          </p>
        </aside>
        <div>
          <div className="results-bar">
            <p role="status">
              {filtered.length} product{filtered.length === 1 ? "" : "s"}{" "}
              {cat && `/ ${categories.find((c) => c.slug === cat)?.short}`}
            </p>
            {(search || subcat || material || colour || size) && (
              <button className="text-button" onClick={reset}>
                Clear filters <X size={13} />
              </button>
            )}
          </div>
          {filtered.length ? (
            <>
              <div className="product-grid">
                {filtered.slice(0, limit).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
              {limit < filtered.length && (
                <div className="load-more">
                  <p className="small muted">
                    Showing {Math.min(limit, filtered.length)} of{" "}
                    {filtered.length} product{filtered.length === 1 ? "" : "s"}
                  </p>
                  <button
                    className="button outline"
                    onClick={() => setLimit(limit + 9)}
                  >
                    Load more products <Plus size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <Search size={32} />
              <h2>No matching products</h2>
              <p>Try a different search or reset your filters.</p>
              <button className="button" onClick={reset}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
