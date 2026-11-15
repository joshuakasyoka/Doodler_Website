import type { Metadata } from "next";
import { env } from "@/lib/env";
import type { Page, Site } from "@/lib/content";

export const siteUrl = new URL(env.NEXT_PUBLIC_SITE_URL);

/** Per-page metadata from content: title, description, canonical URL and Open Graph. */
export function pageMetadata(page: Page, site: Site): Metadata {
  const images = page.ogImage
    ? [
        {
          url: page.ogImage.src,
          width: page.ogImage.width,
          height: page.ogImage.height,
          alt: page.ogImage.alt,
        },
      ]
    : undefined; // otherwise the generated opengraph-image for the route is used
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: site.name,
      url: page.path,
      title: page.title,
      description: page.description,
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}
