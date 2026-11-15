import { getPagePaths, getPages } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Doodler";

export function generateStaticParams() {
  return getPagePaths()
    .filter((path) => path !== "/")
    .map((path) => ({ slug: path.slice(1) }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPages().find((p) => p.path === `/${slug}`);
  return renderOgImage(page?.title ?? "Doodler");
}
