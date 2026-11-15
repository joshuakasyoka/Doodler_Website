import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections/render";
import { getPage, getPages, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const PATH = "/";

export function generateMetadata(): Metadata {
  const page = getPages().find((p) => p.path === PATH);
  return page ? pageMetadata(page, getSite()) : {};
}

export default async function HomePage() {
  const page = await getPage(PATH);
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
