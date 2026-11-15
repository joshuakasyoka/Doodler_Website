import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { iconNames } from "@/lib/icon-names";
import { markupProblems, parseMarkup } from "@/lib/content/markup";

/**
 * Field schemas shared by every section. Each check fails `next build` with
 * the path of the offending field (see lib/content/validate.ts).
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
export const publicFileExists = (src: string) => fs.existsSync(path.join(PUBLIC_DIR, src));

/** Internal path, in-page anchor, external URL or mail link. `#` alone marks a link still to be filled in. */
export const href = z
  .string()
  .regex(
    /^(\/[a-z0-9\-/#?=&%.]*|#[a-z0-9-]*|https:\/\/\S+|mailto:\S+)$/,
    "must start with /, #, https:// or mailto:",
  );

/** Copy in the content mini-markup (*emphasis*, [link](href)). */
export const markup = z
  .string()
  .trim()
  .min(1, "is empty")
  .superRefine((value, ctx) => {
    for (const problem of markupProblems(value)) ctx.addIssue({ code: "custom", message: problem });
    for (const node of parseMarkup(value)) {
      if (node.type === "link" && !href.safeParse(node.href).success)
        ctx.addIssue({
          code: "custom",
          message: `link "${node.href}" must start with /, #, https:// or mailto:`,
        });
    }
  });

/** Plain text: no markup allowed (alt text, labels, captions). */
export const text = z.string().trim().min(1, "is empty");

export const iconName = z.enum(iconNames);

export const image = z
  .object({
    /** /images/<page-or-project>/<descriptive-kebab-name>.<jpg|png|webp> */
    src: z
      .string()
      .regex(
        /^\/images\/[a-z0-9-]+\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/,
        "must be /images/<folder>/<kebab-name>.jpg|png|webp",
      ),
    /** Describe what the image shows. Use "" only together with decorative: true. */
    alt: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    /** Purely decorative: hidden from screen readers. */
    decorative: z.boolean().optional(),
    /** Replaced by a grey placeholder while `photosHidden` is on in site.ts. */
    hideable: z.boolean().optional(),
    /** Generated at build time by lib/content; leave out. */
    blurDataURL: z.string().startsWith("data:image/").optional(),
  })
  .superRefine((img, ctx) => {
    if (!publicFileExists(img.src))
      ctx.addIssue({ code: "custom", path: ["src"], message: `file not found: public${img.src}` });
    if (!img.decorative && img.alt.trim() === "")
      ctx.addIssue({
        code: "custom",
        path: ["alt"],
        message: "alt text is required (or set decorative: true)",
      });
  });

export const video = z
  .object({
    src: z
      .string()
      .regex(/^\/videos\/[a-z0-9-]+\/[a-z0-9-]+\.mp4$/, "must be /videos/<folder>/<kebab-name>.mp4"),
    poster: image,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    /** Accessible description. Omit for purely decorative background video. */
    label: text.optional(),
    /** Play once instead of looping. */
    once: z.boolean().optional(),
  })
  .superRefine((v, ctx) => {
    if (!publicFileExists(v.src))
      ctx.addIssue({ code: "custom", path: ["src"], message: `file not found: public${v.src}` });
  });

export const link = z.object({
  label: markup,
  href,
  icon: iconName.optional(),
});

export const button = link.extend({
  variant: z.enum(["primary", "light"]).default("primary"),
  size: z.enum(["md", "lg"]).default("lg"),
});

/** A drawn connector line between blocks (the manifest-style pages). */
export const thread = iconName;

export const quote = z.object({
  text: markup,
  name: text,
  role: text.optional(),
});

export type Image = z.output<typeof image>;
export type Video = z.output<typeof video>;
export type Link = z.output<typeof link>;
export type Button = z.output<typeof button>;
