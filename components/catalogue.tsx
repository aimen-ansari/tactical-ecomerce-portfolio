"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products, imagePath, type Product } from "@/lib/products";
import {
  canonicalColour,
  canonicalSize,
  localizeCategories,
  localizeProducts,
  localizedCategory,
} from "@/lib/i18n/catalogue";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "@/lib/i18n/client";
import { useQuote } from "./quote-provider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useQuote();
  const { t, href, locale } = useI18n();
  const p = product;
  const category = categories.find((c) => c.slug === p.category);
  const categoryShort = category
    ? localizedCategory(category, locale).short
    : "";
  return (
    <article className="product-card">
      <Link className="product-image" href={href(`/products/${p.slug}/`)}>
        <Image
          src={imagePath(p.image)}
          alt={fill(t.common.imageAlt, { name: p.name })}
          width={600}
          height={600}
          sizes="(max-width: 760px) 50vw, 25vw"
        />
        <span className="image-corner">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="product-meta">
        <span>{categoryShort}</span>
        <span>{p.code}</span>
      </div>
      <Link href={href(`/products/${p.slug}/`)}>
        <h3>{p.name}</h3>
      </Link>
      <button
        onClick={() =>
          add({
            slug: p.slug,
            colour: canonicalColour(locale, p.colours[0]),
            size: canonicalSize(locale, p.sizes[0]),
            quantity: 1,
            notes: "",
          })
        }
        className="add-link"
      >
        {t.common.addToQuote} <Plus size={15} />
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
  const { t, locale } = useI18n();
  const localisedProducts = localizeProducts(products, locale);
  const localisedCategories = localizeCategories(categories, locale);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(category || "");
  const [material, setMaterial] = useState("");
  const [subcat, setSubcat] = useState("");
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(9);
  const [filters, setFilters] = useState(false);
  const categoryNameFor = (slug: string) =>
    localisedCategories.find((c) => c.slug === slug)?.name ?? slug;
  const filtered = localisedProducts
    .filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!subcat || p.subcategory === subcat) &&
        (!material || p.material === material) &&
        (!colour || p.colours.includes(colour)) &&
        (!size || p.sizes.includes(size)) &&
        normaliseSearch(
          `${p.name} ${p.frenchName} ${p.subcategory} ${p.material} ${p.code} ${categoryNameFor(p.category)}`,
        ).includes(normaliseSearch(search)),
    )
    .sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name, locale)
        : sort === "za"
          ? b.name.localeCompare(a.name, locale)
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
  const filterFields = [
    {
      label: t.catalogue.productType,
      value: subcat,
      set: setSubcat,
      options: [
        ...new Set(
          localisedProducts
            .filter((p) => !cat || p.category === cat)
            .map((p) => p.subcategory),
        ),
      ],
    },
    {
      label: t.catalogue.material,
      value: material,
      set: setMaterial,
      options: [
        ...new Set(
          localisedProducts
            .filter((p) => !cat || p.category === cat)
            .map((p) => p.material),
        ),
      ],
    },
    {
      label: t.catalogue.colour,
      value: colour,
      set: setColour,
      options: [
        ...new Set(
          localisedProducts
            .filter((p) => !cat || p.category === cat)
            .flatMap((p) => p.colours),
        ),
      ],
    },
    {
      label: t.catalogue.size,
      value: size,
      set: setSize,
      options: [
        ...new Set(
          localisedProducts
            .filter((p) => !cat || p.category === cat)
            .flatMap((p) => p.sizes),
        ),
      ],
    },
  ];
  return (
    <div className="container catalogue">
      <div className="catalogue-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            aria-label={t.catalogue.searchLabel}
            placeholder={t.catalogue.searchPlaceholder}
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
          <SlidersHorizontal size={16} /> {t.catalogue.filters}
        </button>
        <label className="sort-label">
          {t.catalogue.sortBy}{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">{t.catalogue.newest}</option>
            <option value="az">{t.catalogue.nameAsc}</option>
            <option value="za">{t.catalogue.nameDesc}</option>
          </select>
        </label>
      </div>
      <div className="catalogue-layout">
        <aside className={`filters ${filters ? "is-open" : ""}`}>
          <div className="section-heading">
            <h3>{t.catalogue.filterProducts}</h3>
            <button className="text-button" onClick={reset}>
              {t.catalogue.reset}
            </button>
          </div>
          <fieldset>
            <legend>{t.catalogue.collection}</legend>
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
                {t.catalogue.allProducts} <span>{products.length}</span>
              </label>
            )}
            {localisedCategories
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
          {filterFields.map((field) => (
            <label className="filter-select" key={field.label}>
              {field.label.toUpperCase()}
              <select
                aria-label={field.label}
                value={field.value}
                onChange={(e) => {
                  field.set(e.target.value);
                  setLimit(9);
                }}
              >
                <option value="">{t.catalogue.allOption}</option>
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
          <p className="small muted">{t.catalogue.sampleNote}</p>
        </aside>
        <div>
          <div className="results-bar">
            <p role="status">
              {fill(
                filtered.length === 1
                  ? t.catalogue.resultCountOne
                  : t.catalogue.resultCount,
                { count: filtered.length },
              )}{" "}
              {cat && `/ ${categoryNameFor(cat)}`}
            </p>
            {(search || subcat || material || colour || size) && (
              <button className="text-button" onClick={reset}>
                {t.catalogue.clearFilters} <X size={13} />
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
                    {fill(
                      filtered.length === 1
                        ? t.catalogue.showingOne
                        : t.catalogue.showing,
                      {
                        shown: Math.min(limit, filtered.length),
                        total: filtered.length,
                      },
                    )}
                  </p>
                  <button
                    className="button outline"
                    onClick={() => setLimit(limit + 9)}
                  >
                    {t.catalogue.loadMore} <Plus size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <Search size={32} />
              <h2>{t.catalogue.emptyTitle}</h2>
              <p>{t.catalogue.emptyBody}</p>
              <button className="button" onClick={reset}>
                {t.catalogue.resetFilters}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
