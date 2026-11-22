import type { Metadata } from "next";
import { InfoPage } from "@/components/pages/info";
import { infoMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = infoMetadata("en", "terms");

export default function Page() {
  return <InfoPage locale="en" page="terms" />;
}
