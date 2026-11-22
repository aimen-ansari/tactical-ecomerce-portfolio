import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Globe2, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/config";
import { EnquiryForm } from "@/components/enquiry-form";
import { QuotePage } from "@/components/quote-page";
import { FinalCTA } from "@/components/layout";
import { JsonLd } from "@/components/structured-data";
import { faqJsonLd, webPageJsonLd } from "@/lib/seo";
const pages = {
  about: {
    title: "About Stahltech",
    description:
      "Learn about STAHLTECH's Private Security Uniforms & Accessories division and its focus on uniforms, identification, badges and duty accessories.",
  },
  "custom-orders": {
    title: "Custom Orders",
    description:
      "Discuss custom branding, colours, sizing, packaging and bulk quantities for private-security uniforms and accessories.",
  },
  contact: {
    title: "Contact & Request a Quote",
    description:
      "Contact STAHLTECH about private-security uniforms, badges, identification, phone holders and bulk business enquiries.",
  },
  quote: {
    title: "Review Your Quotation",
    description:
      "Review your selected products, variants and quantities before sending a business enquiry.",
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about private-security product enquiries, samples, customisation, minimum quantities and shipping.",
  },
  privacy: {
    title: "Privacy Policy — Draft",
    description:
      "Draft privacy notice covering enquiry information, browser storage and email delivery.",
  },
  terms: {
    title: "Terms & Conditions — Draft",
    description:
      "Draft terms covering catalogue information, quotation requests, custom enquiries and commercial arrangements.",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const meta = pages[page as keyof typeof pages];
  if (!meta) return { title: "Page not found" };
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${page}/` },
    ...(page === "quote"
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url: `/${page}/`,
      images: [
        {
          url: "/images/security-social.jpg",
          width: 1200,
          height: 630,
          alt: "STAHLTECH private-security concepts",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/security-social.jpg"],
    },
  };
}
const faqs: [string, string][] = [
  [
    "How do I request a quotation?",
    "Add products and preferred variants to your quotation basket, then share quantities and your business details. You can also send a general enquiry without selecting products.",
  ],
  [
    "Can I enquire about samples?",
    "Yes. Include the products you wish to evaluate and your delivery destination. Sample availability, costs and arrangements must be confirmed for each enquiry.",
  ],
  [
    "Can products be customised?",
    "You can enquire about logos, patches, colours, sizes and packaging. Feasibility and any commercial requirements are reviewed before options are confirmed. No specific production capability is promised by this sample catalogue.",
  ],
  [
    "Is there a minimum order quantity?",
    "Minimum quantities depend on the product and requirements. Where an MOQ has been verified, it will appear on the product page. Otherwise, please include your intended quantity in the enquiry.",
  ],
  [
    "Do you provide international shipping?",
    "Share your destination and preferred arrangements in your enquiry. Shipping options, documentation, costs and responsibilities must be agreed before an order is accepted.",
  ],
  [
    "What payment arrangements are available?",
    "Payment methods, currency and terms are discussed as part of the quotation. This website does not collect payments or provide an online checkout.",
  ],
  [
    "Are the catalogue photographs actual Stahltech products?",
    "This development catalogue uses illustrative sample products and AI-generated concept imagery. They must be replaced or verified before publication as an actual product offering.",
  ],
  [
    "When will I receive a response?",
    "Response timing depends on the enquiry and business availability. No fixed turnaround is promised. Email delivery must be configured before this development website can send enquiries.",
  ],
];
export default async function InfoPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!(page in pages)) notFound();
  const meta = pages[page as keyof typeof pages]!;
  if (page === "quote")
    return (
      <>
        <div className="page-heading container">
          <p className="eyebrow">YOUR SELECTION / YOUR REQUIREMENTS</p>
          <h1>Make your next move.</h1>
          <p>Review your products, then tell us about your business.</p>
        </div>
        <QuotePage />
      </>
    );
  if (page === "about")
    return (
      <>
        <JsonLd data={webPageJsonLd(meta.title, meta.description, "/about/")} />
        <div className="page-heading container">
          <p className="eyebrow">INTRODUCING STAHLTECH</p>
          <h1>
            Professional products.
            <br />A focused perspective.
          </h1>
          <p>
            A dedicated space for private-security uniform and accessory
            enquiries.
          </p>
        </div>
        <section className="container about-grid">
          <div className="about-photo">
            <Image
              src="/images/security-hero.webp"
              alt="Illustrative product studio arrangement, not a Stahltech facility"
              fill
              sizes="(max-width:760px) 100vw, 50vw"
            />
          </div>
          <div className="prose">
            <p className="eyebrow">PRIVATE SECURITY & UNIFORMS</p>
            <h2>A collection built around your enquiry.</h2>
            <p>
              STAHLTECH’s Private Security Uniforms & Accessories division is
              focused on private-security uniforms, armbands, identification
              strips, security badges, card holders, phone holders and duty
              accessories for business clients.
            </p>
            <p>
              This catalogue helps importers, distributors, uniform suppliers,
              security companies and institutional procurement teams organise
              their requirements and start a direct conversation.
            </p>
            <p>
              Explore products by category, select the details that matter to
              you and share your planned quantities. Commercial terms and
              product specifications are confirmed individually.
            </p>
            <Link className="underlined-link" href="/products/">
              Explore our collections <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        <section className="section container">
          <div className="verification-panel">
            <p className="eyebrow">
              COMPANY INFORMATION / PENDING VERIFICATION
            </p>
            <h2>The facts behind the business.</h2>
            <p>
              Verified registration details, business location, team information
              and original facility photographs will be added here after
              business review. No manufacturing, certification or export-history
              claims are made in this development version.
            </p>
          </div>
        </section>
        {(company.surgicalUrl || company.leatherUrl) && (
          <section className="container division-links">
            <h2>Other Stahltech divisions</h2>
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
          </section>
        )}
        <FinalCTA />
      </>
    );
  if (page === "contact" || page === "custom-orders") {
    const custom = page === "custom-orders";
    return (
      <>
        <JsonLd
          data={webPageJsonLd(meta.title, meta.description, `/${page}/`)}
        />
        <div className="page-heading container">
          <p className="eyebrow">
            {custom
              ? "SPECIFICATIONS / BRANDING / BULK REQUIREMENTS"
              : "LET’S TALK BUSINESS"}
          </p>
          <h1>
            {custom ? (
              <>
                Your requirements.
                <br />
                The starting point.
              </>
            ) : (
              <>
                Good business starts
                <br />
                with a conversation.
              </>
            )}
          </h1>
          <p>
            {custom
              ? "Tell us about your logo, colours, sizing, packaging and planned quantities."
              : "Share your product interests and business requirements with STAHLTECH."}
          </p>
        </div>
        <section className="container contact-layout">
          <aside>
            <p className="eyebrow">
              {custom
                ? "A CONSIDERED APPROACH"
                : "INTERNATIONAL BUSINESS ENQUIRIES"}
            </p>
            <h2>
              {custom ? "Define the details." : "Connect with Stahltech."}
            </h2>
            <p>
              {custom
                ? "Every enquiry is reviewed individually. Options, feasibility, sample arrangements, quantities and lead times must be confirmed before an order is agreed."
                : "For importers, distributors, uniform suppliers, security companies and procurement teams."}
            </p>
            {custom ? (
              <div className="contact-points">
                {[
                  "Identity: logos, badges & patches",
                  "Specification: colours, materials & sizes",
                  "Presentation: labels & packaging",
                  "Order: quantities & destination",
                ].map((t) => (
                  <div key={t}>
                    <span>↗</span>
                    {t}
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
                  International enquiries welcome
                </div>
                {!company.email && !company.phone && (
                  <p className="small muted">
                    Business contact details are awaiting verification.
                    Configure verified contact information before launch.
                  </p>
                )}
                {company.whatsapp && (
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underlined-link"
                  >
                    Enquire on WhatsApp ↗
                  </a>
                )}
              </div>
            )}
            <div className="quote-info">
              <h3>Already have a selection?</h3>
              <p>
                Products added to your quote basket will be included with this
                enquiry.
              </p>
              <Link href="/quote/" className="underlined-link">
                Review quote basket <ArrowUpRight size={16} />
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
        <JsonLd data={webPageJsonLd(meta.title, meta.description, "/faq/")} />
        <JsonLd data={faqJsonLd(faqs)} />
        <div className="page-heading container">
          <p className="eyebrow">HELPFUL TO KNOW</p>
          <h1>
            A little clarity.
            <br />
            Before we begin.
          </h1>
          <p>Answers to common product and business enquiry questions.</p>
        </div>
        <section className="container faq-layout">
          <aside>
            <h2>Business enquiries</h2>
            <p>
              Can’t find the answer you need?
              <br />
              Tell us what you have in mind.
            </p>
            <Link href="/contact/" className="underlined-link">
              Contact Stahltech <ArrowUpRight size={17} />
            </Link>
          </aside>
          <div>
            {faqs.map(([q, a], i) => (
              <details className="faq-item" key={q}>
                <summary>
                  <span className="muted">0{i + 1}</span>
                  {q}
                  <span className="faq-plus">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <FinalCTA />
      </>
    );
  return (
    <div className="container legal prose">
      <JsonLd
        data={webPageJsonLd(meta.title, meta.description, `/${page}/`)}
      />
      <p className="eyebrow">DRAFT / BUSINESS & LEGAL REVIEW REQUIRED</p>
      <h1>{page === "privacy" ? "Privacy policy." : "Terms & conditions."}</h1>
      <div className="verification-panel">
        <strong>Development draft — not approved for public use.</strong>
        <p>
          STAHLTECH must review this text, identify the responsible legal entity
          and applicable jurisdiction, and confirm all operational details
          before launch.
        </p>
      </div>
      {page === "privacy" ? (
        <>
          <h2>Information you provide</h2>
          <p>
            The enquiry form requests your name, company, email, country,
            optional phone, requirements and selected products. This information
            is used to respond to your business enquiry.
          </p>
          <h2>Browser storage</h2>
          <p>
            Your product selection, variants, quantities and item notes are
            saved in this browser’s local storage. Remove items from your basket
            or clear browser storage to delete them. The website does not use
            analytics or advertising cookies in this version.
          </p>
          <h2>Enquiry delivery</h2>
          <p>
            When configured, enquiries are sent to the business using Resend as
            an email delivery provider. In development mode without credentials,
            the form returns an error and does not deliver or store your
            enquiry. Business retention periods, processing locations and
            provider agreements require review.
          </p>
          <h2>Your enquiries and rights</h2>
          <p>
            Configure a verified privacy contact before launch. The business
            must document its legal basis, retention schedule, deletion process
            and the rights applicable in the relevant jurisdictions.
          </p>
          <h2>Contact details</h2>
          <p>
            Business contact: {company.email} · {company.phone} ·{" "}
            {company.address}. Postal address and responsible legal entity
            require final business verification.
          </p>
        </>
      ) : (
        <>
          <h2>Catalogue information</h2>
          <p>
            Products, images and specifications in this development catalogue
            are illustrative samples. They are not confirmed offers, certified
            equipment, or claims of affiliation with any official agency.
          </p>
          <h2>Quotation requests</h2>
          <p>
            Adding products to the basket or submitting an enquiry does not
            place an order or create a binding agreement. Prices,
            specifications, quantities, delivery arrangements and payment terms
            require written confirmation.
          </p>
          <h2>Custom enquiries</h2>
          <p>
            Branding, materials, colours, sizing and packaging requests are
            subject to feasibility review. Buyers should hold the necessary
            rights for any logos or identity materials they provide.
          </p>
          <h2>Commercial arrangements</h2>
          <p>
            Order acceptance, sampling, shipping responsibilities, customs,
            returns, warranties, liability, dispute resolution and governing law
            must be reviewed and documented by the business before publication.
          </p>
          <h2>Business identity</h2>
          <p>
            Legal entity, registered address and governing jurisdiction:
            awaiting business verification.
          </p>
        </>
      )}
      <Link href="/contact/" className="underlined-link">
        Make an enquiry <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
