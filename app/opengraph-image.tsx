import { getPages } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Doodler";

export default function OpengraphImage() {
  const page = getPages().find((p) => p.path === "/");
  return renderOgImage(page?.title ?? "Doodler");
}
