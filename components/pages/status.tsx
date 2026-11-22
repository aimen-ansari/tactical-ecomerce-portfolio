"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";

export function ErrorState({ reset }: { reset: () => void }) {
  const { t } = useI18n();
  return (
    <div className="container empty-state">
      <h1>{t.error.heading}</h1>
      <p>{t.error.body}</p>
      <button className="button" onClick={reset}>
        {t.error.button}
      </button>
    </div>
  );
}

export function LoadingState() {
  const { t } = useI18n();
  return (
    <div className="container loading-state" role="status">
      <div className="skeleton" />
      <p>{t.loading}</p>
    </div>
  );
}

export function NotFoundState() {
  const { t, href } = useI18n();
  return (
    <div className="container empty-state not-found">
      <p className="eyebrow">{t.notFound.eyebrow}</p>
      <h1>{t.notFound.heading}</h1>
      <p>{t.notFound.body}</p>
      <Link className="button" href={href("/products/")}>
        {t.notFound.button} ↗
      </Link>
    </div>
  );
}
