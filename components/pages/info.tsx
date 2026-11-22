import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Globe2, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/config";
import { EnquiryForm } from "@/components/enquiry-form";
import { QuotePage } from "@/components/quote-page";
import { FinalCTA } from "@/components/layout";
import { JsonLd } from "@/components/structured-data";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { faqJsonLd, webPageJsonLd } from "@/lib/seo";
import type { InfoPageKey } from "@/lib/i18n/metadata";

export function InfoPage({
  locale,
  page,
}: {
  locale: Locale;
  page: InfoPageKey;
}) {
  const t = getDictionary(locale);
  const href = (path: string) => localePath(locale, path);
  const metaKey = page === "custom-orders" ? "customOrders" : page;
  const meta = t.info.meta[metaKey];

  if (page === "quote")
    return (
      <>
        <div className="page-heading container">
          <p className="eyebrow">{t.quote.pageEyebrow}</p>
          <h1>{t.quote.pageHeading}</h1>
          <p>{t.quote.pageIntro}</p>
        </div>
        <QuotePage />
      </>
    );

  if (page === "about")
    return (
      <>
        <JsonLd
          data={webPageJsonLd(meta.title, meta.description, "/about/", locale)}
        />
        <div className="page-heading container">
          <p className="eyebrow">{t.info.about.eyebrow}</p>
          <h1>
            {t.info.about.heading[0]}
            <br />
            {t.info.about.heading[1]}
          </h1>
          <p>{t.info.about.intro}</p>
        </div>
        <section className="container about-grid">
          <div className="about-photo">
            <Image
              src="/images/security-hero.webp"
              alt={t.info.about.imageAlt}
              fill
              sizes="(max-width:760px) 100vw, 50vw"
            />
          </div>
          <div className="prose">
            <p className="eyebrow">{t.info.about.sectionEyebrow}</p>
            <h2>{t.info.about.sectionHeading}</h2>
            <p>{t.info.about.p1}</p>
            <p>{t.info.about.p2}</p>
            <p>{t.info.about.p3}</p>
            <Link className="underlined-link" href={href("/products/")}>
              {t.info.about.link} <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        <section className="section container">
          <div className="verification-panel">
            <p className="eyebrow">{t.info.about.verificationEyebrow}</p>
            <h2>{t.info.about.verificationHeading}</h2>
            <p>{t.info.about.verificationBody}</p>
          </div>
        </section>
        {(company.surgicalUrl || company.leatherUrl) && (
          <section className="container division-links">
            <h2>{t.info.about.divisions}</h2>
            {company.surgicalUrl && (
              <a
                href={company.surgicalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.info.about.surgical} ↗
              </a>
            )}
            {company.leatherUrl && (
              <a
                href={company.leatherUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.info.about.leather} ↗
              </a>
            )}
          </section>
        )}
        <FinalCTA />
      </>
    );

  if (page === "contact" || page === "custom-orders") {
    const custom = page === "custom-orders";
    const copy = custom ? t.info.custom : t.info.contact;
    return (
      <>
        <JsonLd
          data={webPageJsonLd(meta.title, meta.description, `/${page}/`, locale)}
        />
        <div className="page-heading container">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.heading[0]}
            <br />
            {copy.heading[1]}
          </h1>
          <p>{copy.intro}</p>
        </div>
        <section className="container contact-layout">
          <aside>
            <p className="eyebrow">{copy.asideEyebrow}</p>
            <h2>{copy.asideHeading}</h2>
            <p>{copy.asideBody}</p>
            {custom ? (
              <div className="contact-points">
                {t.info.custom.points.map((point) => (
                  <div key={point}>
                    <span>↗</span>
                    {point}
                  </div>
                ))}
              </div>
            ) : (
              <div className="contact-points">
                {company.email && (
                  <a href={`mailto:${company.email}`}>
                    <Mail size={18} />
                    {company.email}
                  </a>
                )}
                {company.phone && (
                  <a href={`tel:${company.phone}`}>
                    <Phone size={18} />
                    {company.phone}
                  </a>
                )}
                {company.address && (
                  <div>
                    <MapPin size={18} />
                    {company.address}
                  </div>
                )}
                <div>
                  <Globe2 size={18} />
                  {t.info.contact.international}
                </div>
                {!company.email && !company.phone && (
                  <p className="small muted">
                    {t.info.contact.awaiting} {t.info.contact.awaitingNote}
                  </p>
                )}
                {company.whatsapp && (
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underlined-link"
                  >
                    {t.info.contact.whatsapp} ↗
                  </a>
                )}
              </div>
            )}
            <div className="quote-info">
              <h3>{copy.alreadyTitle}</h3>
              <p>{copy.alreadyBody}</p>
              <Link href={href("/quote/")} className="underlined-link">
                {copy.reviewBasket} <ArrowUpRight size={16} />
              </Link>
            </div>
          </aside>
          <EnquiryForm custom={custom} />
        </section>
      </>
    );
  }

  if (page === "faq")
    return (
      <>
        <JsonLd
          data={webPageJsonLd(meta.title, meta.description, "/faq/", locale)}
        />
        <JsonLd data={faqJsonLd(t.info.faq.items as [string, string][])} />
        <div className="page-heading container">
          <p className="eyebrow">{t.info.faq.eyebrow}</p>
          <h1>
            {t.info.faq.heading[0]}
            <br />
            {t.info.faq.heading[1]}
          </h1>
          <p>{t.info.faq.intro}</p>
        </div>
        <section className="container faq-layout">
          <aside>
            <h2>{t.info.faq.asideHeading}</h2>
            <p>
              {t.info.faq.asideBody[0]}
              <br />
              {t.info.faq.asideBody[1]}
            </p>
            <Link href={href("/contact/")} className="underlined-link">
              {t.info.faq.contact} <ArrowUpRight size={17} />
            </Link>
          </aside>
          <div>
            {t.info.faq.items.map(([question, answer], index) => (
              <details className="faq-item" key={question}>
                <summary>
                  <span className="muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {question}
                  <span className="faq-plus">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <FinalCTA />
      </>
    );

  const legal = page === "privacy" ? t.info.privacy : t.info.terms;
  return (
    <div className="container legal prose">
      <JsonLd
        data={webPageJsonLd(meta.title, meta.description, `/${page}/`, locale)}
      />
      <p className="eyebrow">{legal.eyebrow}</p>
      <h1>{legal.heading}</h1>
      <div className="verification-panel">
        <strong>{legal.draftTitle}</strong>
        <p>{legal.draftBody}</p>
      </div>
      {legal.sections.map(([heading, body]) => (
        <div key={heading}>
          <h2>{heading}</h2>
          <p>
            {body
              .replace("{email}", company.email)
              .replace("{phone}", company.phone)
              .replace("{address}", company.address)}
          </p>
        </div>
      ))}
      <Link href={href("/contact/")} className="underlined-link">
        {t.info.enquiryLink} <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
