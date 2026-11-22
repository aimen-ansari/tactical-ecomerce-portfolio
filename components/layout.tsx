"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight, ArrowRight, Globe2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BasketButton } from "./quote-provider";
import { categories } from "@/lib/products";
import { company } from "@/lib/config";
export function Wordmark() {
  return (
    <span className="wordmark">
      STAHLTECH<span className="wordmark-dot">+</span>
      <small>PRIVATE SECURITY & UNIFORMS</small>
    </span>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const reduce = useReducedMotion();
  const links = [
    ["/products/", "Products"],
    ["/about/", "About Stahltech"],
    ["/custom-orders/", "Custom Orders"],
    ["/contact/", "Contact"],
  ];
  return (
    <>
      <div className="info-bar">
        <div className="container">
          <span>{company.infoBar}</span>
          <span>
            <Globe2 size={12} /> Built for business. Open to the world.
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Link href="/" aria-label="Stahltech home">
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([url, label]) =>
              label === "Products" ? (
                <details
                  className="nav-dropdown"
                  key={url}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.currentTarget.open = false;
                      e.currentTarget.querySelector("summary")?.focus();
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget))
                      e.currentTarget.open = false;
                  }}
                >
                  <summary>
                    Products <span className="nav-plus">+</span>
                  </summary>
                  <div>
                    <Link
                      href="/products/"
                      onClick={(e) =>
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open")
                      }
                    >
                      Explore all products <ArrowUpRight size={14} />
                    </Link>
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/categories/${c.slug}/`}
                        onClick={(e) =>
                          e.currentTarget
                            .closest("details")
                            ?.removeAttribute("open")
                        }
                      >
                        {c.short}
                        <ArrowUpRight size={13} />
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  className={path.startsWith(url) ? "active" : ""}
                  aria-current={path.startsWith(url) ? "page" : undefined}
                  key={url}
                  href={url}
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <BasketButton />
            <Link href="/contact/" className="button small-button desktop-cta">
              Request a Quote <ArrowUpRight size={15} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ height: reduce ? "auto" : 0, opacity: 1 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="mobile-nav"
            >
              {links.map(([url, label]) => (
                <Link key={url} href={url} onClick={() => setMenu(false)}>
                  {label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
              <div className="mobile-collections">
                <span>Collections</span>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}/`}
                    onClick={() => setMenu(false)}
                  >
                    {c.short}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
              <Link href="/quote/" onClick={() => setMenu(false)}>
                Review quotation <ArrowRight size={18} />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" aria-label="Stahltech home">
            <Wordmark />
          </Link>
          <p>
            Professional products.
            <br />
            Considered partnerships.
          </p>
          <span className="small muted">
            For international business enquiries.
          </span>
        </div>
        <div>
          <h3>EXPLORE</h3>
          <Link href="/products/">Product catalogue</Link>
          <Link href="/about/">About Stahltech</Link>
          <Link href="/custom-orders/">Custom enquiries</Link>
          <Link href="/faq/">Frequently asked questions</Link>
        </div>
        <div>
          <h3>PRODUCT COLLECTIONS</h3>
          {categories
            .filter((c) =>
              [
                "clothing",
                "identification",
                "holders",
                "badges",
                "belts",
                "tactical",
              ].includes(c.slug),
            )
            .map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}/`}>
                {c.short}
              </Link>
            ))}
        </div>
        <div>
          <h3>LET’S TALK BUSINESS</h3>
          <p>
            Have a product or sourcing requirement?
            <br />
            Start a conversation with our team.
          </p>
          <Link href="/contact/" className="footer-enquiry">
            Make an enquiry <ArrowUpRight size={17} />
          </Link>
          {company.surgicalUrl && (
            <a
              href={company.surgicalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Surgical instruments ↗
            </a>
          )}
          {company.leatherUrl && (
            <a
              href={company.leatherUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leather products ↗
            </a>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} STAHLTECH. All rights reserved.
        </span>
        <span className="footer-legal">
          <Link href="/privacy/">Privacy policy</Link>
          <Link href="/terms/">Terms & conditions</Link>
          <span>EN / INTERNATIONAL</span>
        </span>
      </div>
      <div className="container sample-footer">
        DEVELOPMENT CATALOGUE · Illustrative products and AI-generated imagery.
        Specifications require verification.
      </div>
    </footer>
  );
}
export function WhatsAppButton() {
  const number = company.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with STAHLTECH on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <div>
          <p className="eyebrow">YOUR NEXT BUSINESS PARTNERSHIP</p>
          <h2>
            Let’s build your
            <br />
            next product enquiry.
          </h2>
          <p>
            Share your product selection, quantities and requirements.
            <br />
            We’ll take the conversation from there.
          </p>
        </div>
        <Link className="button light-button" href="/contact/">
          Start a conversation <ArrowUpRight size={19} />
        </Link>
      </div>
    </section>
  );
}
