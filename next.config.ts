import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  // New asset namespace avoids reusing previously cached compressed responses.
  assetPrefix: "/delivery-v2",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;
