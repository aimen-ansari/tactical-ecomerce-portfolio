"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight, ArrowRight, Globe2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BasketButton } from "./quote-provider";
import { categories } from "@/lib/products";
import { company } from "@/lib/config";
import { stripLocale } from "@/lib/i18n/config";
import { localizeCategories } from "@/lib/i18n/catalogue";
import { useI18n } from "@/lib/i18n/client";
import { LanguageSwitcher } from "./language-switcher";

export function Wordmark() {
  const { t } = useI18n();
  return (
    <span className="wordmark">
      STAHLTECH<span className="wordmark-dot">+</span>
      <small>{t.common.brandTagline}</small>
    </span>
  );
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const reduce = useReducedMotion();
  const { t, href, locale } = useI18n();
  const localisedCategories = localizeCategories(categories, locale);
  const currentPath = stripLocale(path);
  const links = [
    ["/products/", t.common.products],
    ["/about/", t.common.about],
    ["/custom-orders/", t.common.customOrders],
    ["/contact/", t.common.contact],
  ];
  return (
    <>
      <div className="info-bar">
        <div className="container">
          <span>{t.common.infoBar}</span>
          <span>
            <Globe2 size={12} /> {t.common.builtForBusiness}
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Link href={href("/")} aria-label={t.common.homeAria}>
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label={t.common.mainNav}>
            {links.map(([url, label]) =>
              url === "/products/" ? (
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
                    {label} <span className="nav-plus">+</span>
                  </summary>
                  <div>
                    <Link
                      href={href("/products/")}
                      onClick={(e) =>
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open")
                      }
                    >
                      {t.common.exploreAllProducts} <ArrowUpRight size={14} />
                    </Link>
                    {localisedCategories.map((c) => (
                      <Link
                        key={c.slug}
                        href={href(`/categories/${c.slug}/`)}
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
                  className={currentPath.startsWith(url) ? "active" : ""}
                  aria-current={
                    currentPath.startsWith(url) ? "page" : undefined
                  }
                  key={url}
                  href={href(url)}
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <LanguageSwitcher compact />
            <BasketButton />
            <Link
              href={href("/contact/")}
              className="button small-button desktop-cta"
            >
              {t.common.requestQuote} <ArrowUpRight size={15} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              aria-label={menu ? t.common.closeNav : t.common.openNav}
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
              aria-label={t.common.mobileNav}
              initial={{ height: reduce ? "auto" : 0, opacity: 1 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="mobile-nav"
            >
              {links.map(([url, label]) => (
                <Link key={url} href={href(url)} onClick={() => setMenu(false)}>
                  {label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
              <div className="mobile-collections">
                <span>{t.common.collections}</span>
                {localisedCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={href(`/categories/${c.slug}/`)}
                    onClick={() => setMenu(false)}
                  >
                    {c.short}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
              <Link href={href("/quote/")} onClick={() => setMenu(false)}>
                {t.common.reviewQuotation} <ArrowRight size={18} />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function Footer() {
  const { t, href, locale } = useI18n();
  const localisedCategories = localizeCategories(categories, locale);
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href={href("/")} aria-label={t.common.homeAria}>
            <Wordmark />
          </Link>
          <p>
            {t.footer.tagline[0]}
            <br />
            {t.footer.tagline[1]}
          </p>
          <span className="small muted">{t.footer.note}</span>
        </div>
        <div>
          <h3>{t.footer.explore}</h3>
          <Link href={href("/products/")}>{t.footer.productCatalogue}</Link>
          <Link href={href("/about/")}>{t.footer.aboutStahltech}</Link>
          <Link href={href("/custom-orders/")}>
            {t.footer.customEnquiries}
          </Link>
          <Link href={href("/faq/")}>{t.footer.faq}</Link>
        </div>
        <div>
          <h3>{t.footer.productCollections}</h3>
          {localisedCategories
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
              <Link key={c.slug} href={href(`/categories/${c.slug}/`)}>
                {c.short}
              </Link>
            ))}
        </div>
        <div>
          <h3>{t.footer.talk}</h3>
          <p>
            {t.footer.talkNote[0]}
            <br />
            {t.footer.talkNote[1]}
          </p>
          <Link href={href("/contact/")} className="footer-enquiry">
            {t.footer.enquiry} <ArrowUpRight size={17} />
          </Link>
          {company.surgicalUrl && (
            <a
              href={company.surgicalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.surgical} ↗
            </a>
          )}
          {company.leatherUrl && (
            <a
              href={company.leatherUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.leather} ↗
            </a>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t.footer.rights.replace("{year}", String(new Date().getFullYear()))}</span>
        <span className="footer-legal">
          <Link href={href("/privacy/")}>{t.footer.privacy}</Link>
          <Link href={href("/terms/")}>{t.footer.terms}</Link>
          <LanguageSwitcher compact />
        </span>
      </div>
      <div className="container sample-footer">{t.footer.sample}</div>
    </footer>
  );
}

export function WhatsAppButton() {
  const { t } = useI18n();
  const number = company.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsapp}
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
  const { t, href } = useI18n();
  return (
    <section className="final-cta">
      <div className="container">
        <div>
          <p className="eyebrow">{t.finalCta.eyebrow}</p>
          <h2>
            {t.finalCta.heading[0]}
            <br />
            {t.finalCta.heading[1]}
          </h2>
          <p>
            {t.finalCta.body[0]}
            <br />
            {t.finalCta.body[1]}
          </p>
        </div>
        <Link className="button light-button" href={href("/contact/")}>
          {t.finalCta.button} <ArrowUpRight size={19} />
        </Link>
      </div>
    </section>
  );
}
