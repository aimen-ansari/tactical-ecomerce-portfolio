import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/site-shell";
import { baseMetadata } from "@/lib/i18n/metadata";
import "../globals.css";

export const metadata: Metadata = baseMetadata("en");
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
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
