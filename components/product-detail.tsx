"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus, Minus, Maximize2, X, Check } from "lucide-react";
import { imagePath, type Product } from "@/lib/products";
import { useQuote } from "./quote-provider";
export function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useQuote();
  const [colour, setColour] = useState(p.colours[0]);
  const [size, setSize] = useState(p.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);
  const zoom = useRef<HTMLDialogElement>(null);
  return (
    <div className="product-detail">
      <div>
        <button
          className={`detail-photo view-${view}`}
          onClick={() => zoom.current?.showModal()}
          aria-label={`Zoom illustrative image of ${p.name}`}
        >
          <Image
            src={imagePath(p.image)}
            alt={`Illustrative ${p.name}`}
            width={1000}
            height={1000}
            priority
          />
          <span>
            <Maximize2 size={19} /> Click to enlarge
          </span>
        </button>
        <div className="thumbnails">
          {["Full view", "Close detail"].map((label, i) => (
            <button
              className={view === i ? "selected" : ""}
              onClick={() => setView(i)}
              aria-label={label}
              aria-pressed={view === i}
              key={label}
            >
              <Image
                src={imagePath(p.image)}
                alt={label}
                width={100}
                height={100}
                style={{ transform: i ? "scale(1.55)" : "none" }}
              />
            </button>
          ))}
        </div>
        <p className="sample-note">
          AI-GENERATED CONCEPT IMAGE · Replace with original product
          photography.
        </p>
      </div>
      <div className="detail-copy">
        <p className="eyebrow">SAMPLE PRODUCT / {p.code}</p>
        <h1>{p.name}</h1>
        <p>{p.description}</p>
        <hr />
        <fieldset className="variant-group">
          <legend>
            Colour <span>{colour}</span>
          </legend>
          <div className="swatches">
            {p.colours.map((c) => (
              <button
                key={c}
                className={`swatch swatch-${c.toLowerCase()} ${colour === c ? "selected" : ""}`}
                aria-label={c}
                aria-pressed={colour === c}
                onClick={() => setColour(c)}
              >
                {colour === c && <Check size={16} />}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="variant-group">
          <legend>
            Size <span>{size}</span>
          </legend>
          <div className="size-options">
            {p.sizes.map((s) => (
              <button
                className={size === s ? "selected" : ""}
                aria-pressed={size === s}
                key={s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        {p.moq && <p>Minimum order quantity: {p.moq}</p>}
        {p.leadTime && <p>Estimated lead time: {p.leadTime}</p>}
        <label className="quantity-label">
          Quantity
          <div className="stepper">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min="1"
              max="100000"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(
                    1,
                    Math.min(100000, Math.floor(Number(e.target.value)) || 1),
                  ),
                )
              }
              aria-label="Quantity"
            />
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity(Math.min(100000, quantity + 1))}
            >
              <Plus size={14} />
            </button>
          </div>
        </label>
        <button
          className="button full"
          onClick={() =>
            add({ slug: p.slug, colour, size, quantity, notes: "" })
          }
        >
          Add to quote <Plus size={18} />
        </button>
        <Link
          className="button outline full"
          href={`/contact/?product=${encodeURIComponent(p.code + " " + p.name)}`}
        >
          Ask about this product <ArrowUpRight size={17} />
        </Link>
        <p className="small muted">
          No online payment. Pricing, specifications and delivery arrangements
          are confirmed by quotation.
        </p>
        <details className="specifications" open>
          <summary>Product specifications</summary>
          <dl>
            {Object.entries(p.specs).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </details>
        <details className="specifications">
          <summary>Customisation enquiries</summary>
          <p>
            Tell us about your logo, colours, sizing or packaging preferences.
            Options are subject to review and confirmation.
          </p>
          <Link href="/custom-orders/" className="underlined-link">
            Discuss your requirements <ArrowUpRight size={15} />
          </Link>
        </details>
      </div>
      <dialog
        ref={zoom}
        className="zoom-dialog"
        aria-label={`${p.name} enlarged illustrative image`}
        onClick={(e) => {
          if (e.target === e.currentTarget) zoom.current?.close();
        }}
      >
        <button
          className="icon-button zoom-close"
          aria-label="Close enlarged image"
          onClick={() => zoom.current?.close()}
        >
          <X />
        </button>
        <Image
          src={imagePath(p.image)}
          alt={`Enlarged illustrative ${p.name}`}
          width={1200}
          height={1200}
        />
      </dialog>
    </div>
  );
}
