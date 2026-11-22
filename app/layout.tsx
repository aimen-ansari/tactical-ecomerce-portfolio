import type { Metadata, Viewport } from "next";
import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { QuoteProvider } from "@/components/quote-provider";
import { JsonLd } from "@/components/structured-data";
import { company } from "@/lib/config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  applicationName: "STAHLTECH",
  title: {
    default: "STAHLTECH | Private Security Uniforms & Accessories",
    template: "%s | STAHLTECH",
  },
  description:
    "Explore private-security polos, jackets, service trousers, armbands, identification strips, security badges, card holders, phone holders and duty accessories. Build a product selection and enquire about your business requirements.",
  authors: [{ name: "STAHLTECH" }],
  creator: "STAHLTECH",
  publisher: "STAHLTECH",
  category: "Private security uniforms and accessories",
  keywords: [
    "private security uniforms",
    "security badges",
    "security phone holders",
    "duty accessories",
    "identification accessories",
    "Sécurité privée",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "STAHLTECH",
    locale: "en_GB",
    images: [
      {
        url: "/images/security-social.jpg",
        width: 1200,
        height: 630,
        alt: "STAHLTECH private-security uniform and identification concepts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/security-social.jpg"],
  },
  robots: { index: !company.sampleCatalogue, follow: !company.sampleCatalogue },
};
export const viewport: Viewport = {
  themeColor: "#20231f",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <QuoteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </QuoteProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
