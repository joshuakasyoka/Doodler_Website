/**
 * assets:check — keeps /public honest.
 *
 * Fails (exit 1) when:
 *   • an image or video in /public is not referenced by any content file (orphan),
 *   • a content path points to a file that does not exist (broken),
 *   • a file breaks the naming convention (/public/images/<folder>/<kebab-name>.<ext>),
 *   • a file sits loose at the /public root,
 *   • an image is over 1 MB, or a video is over 3 MB.
 */
import fs from "node:fs";
import path from "node:path";
import * as content from "@/content";

const PUBLIC = path.join(process.cwd(), "public");
const MEDIA_DIRS = ["images", "videos"];
const ALLOWED_ROOT = new Set(["images", "videos", "icons"]);
const MAX_IMAGE_BYTES = 1024 * 1024;
/** Full-bleed banner video is 1080p; the 1 MB image cap would force it soft. */
const MAX_VIDEO_BYTES = 3 * 1024 * 1024;
const NAME = /^\/(images|videos)\/[a-z0-9-]+\/[a-z0-9-]+\.(jpg|jpeg|png|webp|mp4)$/;

const walk = (dir: string): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const full = path.join(dir, e.name);
        return e.isDirectory() ? walk(full) : [full];
      })
    : [];

// every /images/… or /videos/… string in the evaluated content
const referenced = new Set<string>();
const collect = (node: unknown): void => {
  if (typeof node === "string") {
    for (const m of node.matchAll(/\/(?:images|videos)\/[^\s)"']+/g)) referenced.add(m[0]);
  } else if (Array.isArray(node)) node.forEach(collect);
  else if (node && typeof node === "object") Object.values(node).forEach(collect);
};
collect(content);

const files = MEDIA_DIRS.flatMap((d) => walk(path.join(PUBLIC, d))).map(
  (f) => "/" + path.relative(PUBLIC, f).split(path.sep).join("/"),
);
const problems: string[] = [];

for (const entry of fs.readdirSync(PUBLIC)) {
  if (entry.startsWith(".")) continue;
  if (!ALLOWED_ROOT.has(entry)) problems.push(`loose file at /public root: /${entry}`);
}
for (const file of files) {
  if (path.basename(file).startsWith(".")) continue;
  if (!NAME.test(file)) problems.push(`naming: ${file} (use /<images|videos>/<folder>/<kebab-name>.<ext>)`);
  if (!referenced.has(file)) problems.push(`orphan: ${file} is not referenced by any content file`);
  const size = fs.statSync(path.join(PUBLIC, file)).size;
  const max = file.endsWith(".mp4") ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (size > max)
    problems.push(
      `too large: ${file} is ${(size / 1024 / 1024).toFixed(2)} MB (max ${max / 1024 / 1024} MB)`,
    );
}
for (const ref of referenced) {
  if (!fs.existsSync(path.join(PUBLIC, ref)))
    problems.push(`broken: content points to ${ref}, which does not exist`);
}

const media = files.filter((f) => !path.basename(f).startsWith("."));
console.log(`assets:check — ${media.length} files in /public, ${referenced.size} referenced by content`);
if (problems.length) {
  console.error(problems.map((p) => `  ✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log("  ✓ no orphans, no broken paths, names and sizes OK");
