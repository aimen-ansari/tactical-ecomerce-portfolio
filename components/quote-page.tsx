"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";
import { useQuote, QuoteLines } from "./quote-provider";
import { EnquiryForm } from "./enquiry-form";

export function QuotePage() {
  const { items, ready } = useQuote();
  const { t, href } = useI18n();
  return (
    <div className="container quote-page">
      <div className="quote-review">
        <h2>
          {t.quote.selection}{" "}
          <span className="muted">({items.length})</span>
        </h2>
        <QuoteLines />
        <Link href={href("/products/")} className="underlined-link">
          ← {t.quote.continue}
        </Link>
        <div className="quote-info">
          <h3>{t.quote.infoTitle}</h3>
          <p>{t.quote.infoBody}</p>
        </div>
      </div>
      <div>{ready && <EnquiryForm />}</div>
    </div>
  );
}
