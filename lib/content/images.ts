import path from "node:path";
import sharp from "sharp";
import { ContentError } from "./validate";

const cache = new Map<string, Promise<{ width: number; height: number; blurDataURL: string }>>();

/** Reads a public image once per build: its real size and a tiny blurred placeholder. */
export function inspectImage(src: string) {
  let entry = cache.get(src);
  if (!entry) {
    entry = (async () => {
      const file = sharp(path.join(process.cwd(), "public", src));
      const meta = await file.metadata();
      const blur = await file.clone().resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
      return {
        width: meta.width ?? 0,
        height: meta.height ?? 0,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      };
    })();
    cache.set(src, entry);
  }
  return entry;
}

type ImageLike = { src: string; width: number; height: number; blurDataURL?: string };
const isImage = (value: unknown): value is ImageLike =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as ImageLike).src === "string" &&
  (value as ImageLike).src.startsWith("/images/") &&
  typeof (value as ImageLike).width === "number";

/**
 * Walks validated content and, for every image, checks that the width and
 * height in content match the file's aspect ratio and adds a blur placeholder.
 */
export async function enrichImages<T>(data: T, file: string): Promise<T> {
  const problems: string[] = [];
  const visit = async (node: unknown, at: string): Promise<void> => {
    if (Array.isArray(node)) {
      await Promise.all(node.map((child, i) => visit(child, `${at}[${i}]`)));
    } else if (node && typeof node === "object") {
      if (isImage(node)) {
        const real = await inspectImage(node.src);
        const ratio = node.width / node.height;
        const realRatio = real.width / real.height;
        if (Math.abs(ratio - realRatio) / realRatio > 0.02)
          problems.push(
            `  • ${at}: ${node.src} is ${real.width}×${real.height}, but content says ${node.width}×${node.height}`,
          );
        node.blurDataURL = real.blurDataURL;
      }
      await Promise.all(Object.entries(node).map(([key, child]) => visit(child, at ? `${at}.${key}` : key)));
    }
  };
  await visit(data, "");
  if (problems.length)
    throw new ContentError(`\n\nImage size mismatch in ${file}:\n${problems.join("\n")}\n`);
  return data;
}
