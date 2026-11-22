"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus, Minus, Maximize2, X, Check } from "lucide-react";
import { imagePath, type Product } from "@/lib/products";
import {
  canonicalColour,
  canonicalSize,
  displayColour,
} from "@/lib/i18n/catalogue";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "@/lib/i18n/client";
import { useQuote } from "./quote-provider";

export function ProductDetail({ product }: { product: Product }) {
  const p = product;
  const { add } = useQuote();
  const { t, href, locale } = useI18n();
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
          aria-label={fill(t.product.zoom, { name: p.name })}
        >
          <Image
            src={imagePath(p.image)}
            alt={fill(t.common.imageAlt, { name: p.name })}
            width={1000}
            height={1000}
            priority
          />
          <span>
            <Maximize2 size={19} /> {t.product.clickToEnlarge}
          </span>
        </button>
        <div className="thumbnails">
          {[t.product.fullView, t.product.closeDetail].map((label, i) => (
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
        <p className="sample-note">{t.product.aiImage}</p>
      </div>
      <div className="detail-copy">
        <p className="eyebrow">
          {t.product.sample} / {p.code}
        </p>
        <h1>{p.name}</h1>
        <p>{p.description}</p>
        <hr />
        <fieldset className="variant-group">
          <legend>
            {t.product.colour} <span>{displayColour(locale, colour)}</span>
          </legend>
          <div className="swatches">
            {p.colours.map((c) => (
              <button
                key={c}
                className={`swatch swatch-${canonicalColour(locale, c).toLowerCase()} ${colour === c ? "selected" : ""}`}
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
            {t.product.size} <span>{size}</span>
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
        {p.moq && (
          <p>{fill(t.product.moq, { value: p.moq })}</p>
        )}
        {p.leadTime && (
          <p>{fill(t.product.leadTime, { value: p.leadTime })}</p>
        )}
        <label className="quantity-label">
          {t.product.quantity}
          <div className="stepper">
            <button
              aria-label={t.product.decrease}
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
              aria-label={t.product.quantity}
            />
            <button
              aria-label={t.product.increase}
              onClick={() => setQuantity(Math.min(100000, quantity + 1))}
            >
              <Plus size={14} />
            </button>
          </div>
        </label>
        <button
          className="button full"
          onClick={() =>
            add({
              slug: p.slug,
              colour: canonicalColour(locale, colour),
              size: canonicalSize(locale, size),
              quantity,
              notes: "",
            })
          }
        >
          {t.common.addToQuote} <Plus size={18} />
        </button>
        <Link
          className="button outline full"
          href={href(
            `/contact/?product=${encodeURIComponent(p.code + " " + p.name)}`,
          )}
        >
          {t.product.askAbout} <ArrowUpRight size={17} />
        </Link>
        <p className="small muted">{t.product.noPayment}</p>
        <details className="specifications" open>
          <summary>{t.product.specifications}</summary>
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
          <summary>{t.product.customisation}</summary>
          <p>{t.product.customisationBody}</p>
          <Link href={href("/custom-orders/")} className="underlined-link">
            {t.product.discuss} <ArrowUpRight size={15} />
          </Link>
        </details>
      </div>
      <dialog
        ref={zoom}
        className="zoom-dialog"
        aria-label={fill(t.product.zoomAria, { name: p.name })}
        onClick={(e) => {
          if (e.target === e.currentTarget) zoom.current?.close();
        }}
      >
        <button
          className="icon-button zoom-close"
          aria-label={t.product.closeZoom}
          onClick={() => zoom.current?.close()}
        >
          <X />
        </button>
        <Image
          src={imagePath(p.image)}
          alt={fill(t.product.enlargedAlt, { name: p.name })}
          width={1200}
          height={1200}
        />
      </dialog>
    </div>
  );
}
