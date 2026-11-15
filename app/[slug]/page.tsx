import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections/render";
import { getPage, getPagePaths, getPages, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Every page in content except the home page; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPagePaths()
    .filter((path) => path !== "/")
    .map((path) => ({ slug: path.slice(1) }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getPages().find((p) => p.path === `/${slug}`);
  return page ? pageMetadata(page, getSite()) : {};
}

export default async function ContentPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = await getPage(`/${slug}`);
  if (!page) notFound();
  return (
    <Sections
      sections={page.sections}
      photosHidden={getSite().photosHidden}
      labels={{
        playVideo: getSite().ui.playVideo,
        readMore: getSite().ui.readMore,
        readLess: getSite().ui.readLess,
      }}
      emphasis={page.emphasis}
    />
  );
}
