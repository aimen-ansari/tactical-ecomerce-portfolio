import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { homeMetadata } from "@/lib/i18n/metadata";

export const metadata: Metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
