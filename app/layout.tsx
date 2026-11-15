import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ConsentSlot } from "@/components/layout/consent-slot";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { MotionObserver } from "@/components/ui";
import { getSite } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import { bricolage, dmSans } from "./fonts";
import "./globals.css";

const site = getSite();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: site.name, template: `%s` },
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#fffbf6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: browser translation and extensions edit these two tags' attributes
    <html lang="nl" className={`${bricolage.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body id="top" suppressHydrationWarning>
        <SkipLink label={site.ui.skipLink} />
        <Header site={site} />
        <main id="main" tabIndex={-1} className="rounded-b-lg bg-bg pb-xl focus:outline-none lg:rounded-b-xl">
          {children}
        </main>
        <Footer site={site} />
        <ConsentSlot />
        <MotionObserver />
      </body>
    </html>
  );
}
