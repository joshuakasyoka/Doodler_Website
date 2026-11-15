import type { ImageLoaderProps } from "next/image";

/**
 * Image CDN loader. Only active when NEXT_PUBLIC_IMAGE_CDN_URL is set
 * (see next.config.ts). The query format below suits imgix / Cloudinary-style
 * URL APIs; adjust it to the CDN you pick. Content paths stay unchanged.
 */
export default function cdnLoader({ src, width, quality }: ImageLoaderProps): string {
  const base = process.env.NEXT_PUBLIC_IMAGE_CDN_URL ?? "";
  const params = new URLSearchParams({ w: String(width), q: String(quality ?? 75), auto: "format" });
  return `${base}${src}?${params.toString()}`;
}
