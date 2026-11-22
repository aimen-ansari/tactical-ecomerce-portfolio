"use client";
/* eslint-disable react-hooks/set-state-in-effect -- Browser-owned local storage must be restored after static hydration. */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { ShoppingBag, X, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { products, imagePath } from "@/lib/products";
import { parseStoredQuote, type QuoteItem } from "@/lib/quote";
import { displayColour, displaySize, localizedProduct } from "@/lib/i18n/catalogue";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "@/lib/i18n/client";
import Image from "next/image";

type Context = {
  items: QuoteItem[];
  ready: boolean;
  add: (item: Omit<QuoteItem, "key">) => void;
  update: (
    key: string,
    patch: Partial<Pick<QuoteItem, "quantity" | "notes">>,
  ) => void;
  remove: (key: string) => void;
  open: () => void;
  close: () => void;
};
const QuoteContext = createContext<Context | null>(null);
export const useQuote = () => {
  const c = useContext(QuoteContext);
  if (!c) throw new Error("Missing quote provider");
  return c;
};
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const { t, href } = useI18n();
  // Restore the browser-owned basket after hydration; never read localStorage on the server.
  useEffect(() => {
    try {
      setItems(parseStoredQuote(localStorage.getItem("stahltech-quote-v1")));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("stahltech-quote-v1", JSON.stringify(items));
      } catch {}
  }, [items, ready]);
  const open = () => {
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
    setDrawerOpen(true);
  };
  const close = () => {
    dialog.current?.close();
    setDrawerOpen(false);
  };
  const add = (item: Omit<QuoteItem, "key">) => {
    const key = `${item.slug}|${item.colour}|${item.size}`;
    setItems((old) => {
      const same = old.find((x) => x.key === key);
      return same
        ? old.map((x) =>
            x.key === key
              ? {
                  ...x,
                  quantity: Math.min(100000, x.quantity + item.quantity),
                  notes: item.notes || x.notes,
                }
              : x,
          )
        : old.length < 50
          ? [...old, { ...item, key }]
          : old;
    });
    open();
  };
  const update = (
    key: string,
    patch: Partial<Pick<QuoteItem, "quantity" | "notes">>,
  ) =>
    setItems((old) =>
      old.map((x) =>
        x.key === key
          ? {
              ...x,
              ...patch,
              quantity:
                patch.quantity === undefined
                  ? x.quantity
                  : Math.max(
                      1,
                      Math.min(100000, Math.floor(patch.quantity) || 1),
                    ),
            }
          : x,
      ),
    );
  const remove = (key: string) =>
    setItems((old) => old.filter((x) => x.key !== key));
  return (
    <QuoteContext.Provider
      value={{ items, ready, add, update, remove, open, close }}
    >
      {children}
      <dialog
        ref={dialog}
        className="quote-dialog"
        aria-labelledby="quote-title"
        onClose={() => setDrawerOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <motion.div
          initial={{ x: reduce ? 0 : 50 }}
          animate={{ x: drawerOpen ? 0 : reduce ? 0 : 50 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="drawer"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.quote.eyebrow}</p>
              <h2 id="quote-title">
                {t.quote.title}{" "}
                <span className="muted">({items.length})</span>
              </h2>
            </div>
            <button
              className="icon-button"
              onClick={close}
              aria-label={t.quote.close}
            >
              <X />
            </button>
          </div>
          <QuoteLines compact />
          {items.length > 0 ? (
            <Link className="button full" href={href("/quote/")} onClick={close}>
              {t.quote.review} <ArrowRight size={17} />
            </Link>
          ) : (
            <Link
              className="button"
              href={href("/products/")}
              onClick={close}
            >
              {t.quote.explore} <ArrowRight size={17} />
            </Link>
          )}
          <p className="small muted mt-5">{t.quote.note}</p>
        </motion.div>
      </dialog>
    </QuoteContext.Provider>
  );
}

export function BasketButton() {
  const { items, open } = useQuote();
  const { t } = useI18n();
  return (
    <button
      className="basket-button"
      onClick={open}
      aria-label={fill(t.common.openBasket, { count: items.length })}
    >
      <ShoppingBag size={18} />
      <span>{t.common.quoteBasket}</span>
      <b>{items.length}</b>
    </button>
  );
}

export function QuoteLines({ compact = false }: { compact?: boolean }) {
  const { items, ready, update, remove } = useQuote();
  const { t, href, locale } = useI18n();
  if (!ready) return <p role="status">{t.quote.loading}</p>;
  if (!items.length)
    return (
      <div className="empty-state">
        <ShoppingBag size={36} />
        <h3>{t.quote.emptyTitle}</h3>
        <p>{t.quote.emptyBody}</p>
      </div>
    );
  return (
    <div className="quote-lines">
      {items.map((item) => {
        const found = products.find((p) => p.slug === item.slug);
        if (!found) return null;
        const p = localizedProduct(found, locale);
        return (
          <article className="quote-line" key={item.key}>
            <Image
              src={imagePath(p.image)}
              alt={fill(t.common.imageAlt, { name: p.name })}
              width={110}
              height={110}
            />
            <div className="quote-line-content">
              <Link href={href(`/products/${p.slug}/`)}>
                <strong>{p.name}</strong>
              </Link>
              <p className="small muted">
                {p.code} · {displayColour(locale, item.colour)} ·{" "}
                {displaySize(locale, item.size)}
              </p>
              <div className="quantity-row">
                <div className="stepper">
                  <button
                    aria-label={fill(t.quote.decrease, { name: p.name })}
                    onClick={() =>
                      update(item.key, { quantity: item.quantity - 1 })
                    }
                  >
                    <Minus size={13} />
                  </button>
                  <input
                    aria-label={fill(t.quote.quantity, { name: p.name })}
                    type="number"
                    min="1"
                    max="100000"
                    value={item.quantity}
                    onChange={(e) =>
                      update(item.key, { quantity: Number(e.target.value) })
                    }
                  />
                  <button
                    aria-label={fill(t.quote.increase, { name: p.name })}
                    onClick={() =>
                      update(item.key, { quantity: item.quantity + 1 })
                    }
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  className="icon-button"
                  aria-label={fill(t.quote.remove, { name: p.name })}
                  onClick={() => remove(item.key)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {!compact && (
                <label className="small">
                  {t.quote.productNotes}
                  <textarea
                    maxLength={1000}
                    placeholder={t.quote.notesPlaceholder}
                    value={item.notes}
                    onChange={(e) =>
                      update(item.key, { notes: e.target.value })
                    }
                  />
                </label>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
