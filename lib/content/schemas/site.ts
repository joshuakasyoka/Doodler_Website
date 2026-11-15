import { z } from "zod";
import { href, iconName, image, markup, text } from "./fields";
import { sectionSchema } from "./sections";

export const navItem = z.object({
  label: text,
  href,
  icon: iconName.optional(),
  /** The dark, primary pill in the header (Login). */
  primary: z.boolean().optional(),
});

export const siteSchema = z.object({
  name: text,
  /** Swap every hideable photo for a grey placeholder (the original site's "hide-images" mode). */
  photosHidden: z.boolean(),
  header: z.object({
    logoLabel: text,
    navLabel: text,
    nav: z.array(navItem).min(1),
    actions: z.array(navItem),
    languageToggle: z.object({ label: text, ariaLabel: text, hidden: z.boolean() }),
  }),
  footer: z.object({
    wordmarkLabel: text,
    navLabel: text,
    links: z.array(navItem).min(1),
    legal: markup,
  }),
  /** Interface strings for things the original site had no copy for. */
  ui: z.object({
    skipLink: text,
    menuOpen: text,
    menuClose: text,
    playVideo: text,
    readMore: text,
    readLess: text,
    notFound: z.object({ title: text, heading: markup, text: markup, link: navItem }),
    error: z.object({ title: text, heading: markup, text: markup, retry: text }),
  }),
});

export const pageSchema = z.object({
  /** URL path, e.g. "/" or "/prijzen". */
  path: z.string().regex(/^\/([a-z0-9-]+)?$/, 'must be "/" or "/<kebab-slug>"'),
  title: text,
  description: text,
  /** Optional Open Graph image; a branded one is generated from the title otherwise. */
  ogImage: image.optional(),
  /** How *emphasised* words in headings look on this page: italic (default) or upright. */
  emphasis: z.enum(["italic", "upright"]).default("italic"),
  sections: z.array(sectionSchema).min(1),
});

export const creditSchema = z.object({
  subject: text,
  kind: z.enum(["logo", "photo", "quote", "font", "illustration"]),
  source: text,
  licence: text,
  usedIn: z.array(z.string()).min(1),
  /** Shown on the site when the licence requires attribution. */
  attribution: markup.optional(),
  /** Open question to resolve before launch. */
  todo: text.optional(),
});

export type Site = z.output<typeof siteSchema>;
export type SiteInput = z.input<typeof siteSchema>;
export type Page = z.output<typeof pageSchema>;
export type PageInput = z.input<typeof pageSchema>;
export type Credit = z.output<typeof creditSchema>;
export type CreditInput = z.input<typeof creditSchema>;
export type NavItem = z.output<typeof navItem>;
