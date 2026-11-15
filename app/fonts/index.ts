import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (latin subset), both SIL Open Font License 1.1
 * — licences alongside in this folder. Exposed as CSS variables that the
 * font tokens in styles/tokens.css point at.
 */
export const bricolage = localFont({
  src: "./bricolage-grotesque-latin-variable.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const dmSans = localFont({
  src: "./dm-sans-latin-variable.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
