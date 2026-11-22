export const dynamic = "force-static";
import { company } from "@/lib/config";
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      ...(company.sampleCatalogue
        ? { disallow: "/" }
        : { allow: "/", disallow: ["/quote/"] }),
    },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
