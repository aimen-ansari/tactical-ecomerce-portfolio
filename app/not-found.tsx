import Link from "next/link";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="container empty-state not-found">
          <p className="eyebrow">404 / PAGE NOT FOUND</p>
          <h1>A different direction.</h1>
          <p>
            This page could not be found. Explore the catalogue to find what you
            need.
          </p>
          <p className="not-found-languages">
            <Link href="/">English</Link>
            <Link href="/de/">Deutsch</Link>
            <Link href="/fr/">Français</Link>
          </p>
          <Link className="button" href="/products/">
            Explore products ↗
          </Link>
        </main>
      </body>
    </html>
  );
}
