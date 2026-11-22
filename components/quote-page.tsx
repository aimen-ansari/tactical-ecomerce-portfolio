"use client";
import Link from "next/link";
import { useQuote, QuoteLines } from "./quote-provider";
import { EnquiryForm } from "./enquiry-form";
export function QuotePage() {
  const { items, ready } = useQuote();
  return (
    <div className="container quote-page">
      <div className="quote-review">
        <h2>
          Your product selection <span className="muted">({items.length})</span>
        </h2>
        <QuoteLines />
        <Link href="/products/" className="underlined-link">
          ← Continue exploring
        </Link>
        <div className="quote-info">
          <h3>A quotation, tailored to your enquiry.</h3>
          <p>
            Quantities and variants help us understand your requirements.
            Product details, pricing, order terms and delivery arrangements are
            subject to confirmation.
          </p>
        </div>
      </div>
      <div>{ready && <EnquiryForm />}</div>
    </div>
  );
}
