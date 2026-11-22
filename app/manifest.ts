import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STAHLTECH — Private Security Uniforms & Accessories",
    short_name: "STAHLTECH",
    description:
      "Private-security uniforms, security badges, identification, phone holders and duty accessories for business buyers.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4ef",
    theme_color: "#20231f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
