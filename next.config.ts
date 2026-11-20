import type { NextConfig } from "next";
import { env } from "./lib/env";

/** Old static-site URLs that must keep working (301). */
const legacyRedirects = [
  { source: "/index.html", destination: "/" },
  { source: "/product.html", destination: "/product" },
  { source: "/veiligheid.html", destination: "/veiligheid" },
  { source: "/prijzen.html", destination: "/prijzen" },
  { source: "/onderzoek.html", destination: "/onderzoek" },
  { source: "/over-ons.html", destination: "/over-ons" },
  { source: "/gratis-proberen.html", destination: "/gratis-proberen" },
  // team.html was a meta-refresh to the team section on Over ons
  { source: "/team.html", destination: "/over-ons#team" },
  { source: "/team", destination: "/over-ons#team" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ~8 KB of atomic CSS: inlining it removes the render-blocking stylesheet requests on first visit
  experimental: { inlineCss: true },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 60: photos behind a dark scrim and text (the banners); 75: default; 90: portraits
    qualities: [60, 75, 90],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
    // only files under /public/images may be optimised
    localPatterns: [{ pathname: "/images/**", search: "" }],
    // Swap to an image CDN by setting NEXT_PUBLIC_IMAGE_CDN_URL (see lib/images/loader.ts)
    ...(env.NEXT_PUBLIC_IMAGE_CDN_URL
      ? { loader: "custom" as const, loaderFile: "./lib/images/loader.ts" }
      : {}),
  },
  // files in /public/downloads save as a file instead of opening in the browser
  async headers() {
    return [
      {
        source: "/downloads/doodler-pilotrapport.pdf",
        headers: [{ key: "Content-Disposition", value: 'attachment; filename="Doodler pilotrapport.pdf"' }],
      },
    ];
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
