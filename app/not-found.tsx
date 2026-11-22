import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>A different direction.</h1>
      <p>
        This page could not be found. Explore the catalogue to find what you
        need.
      </p>
      <Link className="button" href="/products/">
        Explore products ↗
      </Link>
    </div>
  );
}
