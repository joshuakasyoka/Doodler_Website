/**
 * The content data layer: the ONLY module that reads /content.
 *
 * Everything is validated with Zod when this module loads, so a missing field,
 * bad link or missing image fails `next build` with a readable message. Swap
 * the imports below for a headless CMS client later; the accessors' return
 * types stay the same, so nothing else changes.
 */
import * as raw from "@/content";
import { creditSchema, pageSchema, siteSchema, type Page, type Site } from "./schemas/site";
import { enrichImages } from "./images";
import { ContentError, parseContent } from "./validate";
import { z } from "zod";

export type { Page, Site, Credit, NavItem } from "./schemas/site";
export type { Section, SectionType, SectionOf, PromptDrawDemo } from "./schemas/sections";
export type { Image, Video, Link, Button } from "./schemas/fields";
export { ContentError } from "./validate";

const site: Site = parseContent(siteSchema, raw.site, "content/site.ts");
const credits = parseContent(z.array(creditSchema), raw.credits, "content/credits.ts");

const pages: Page[] = Object.entries(raw.pages).map(([file, page]) => {
  const parsed = parseContent(pageSchema, page, file);
  const ids = parsed.sections.map((s) => s.id).filter((id): id is string => Boolean(id));
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length)
    throw new ContentError(`\n\nContent error in ${file}: duplicate section id(s) ${dupes.join(", ")}\n`);
  return parsed;
});

const paths = pages.map((p) => p.path);
const duplicatePaths = paths.filter((p, i) => paths.indexOf(p) !== i);
if (duplicatePaths.length) throw new ContentError(`Two pages share the path ${duplicatePaths.join(", ")}`);

const fileOf = new Map(Object.entries(raw.pages).map(([file, page]) => [page.path, file]));
const enriched = new Map<string, Promise<Page>>();

export function getSite(): Site {
  return site;
}

export function getCredits() {
  return credits;
}

/** All page paths, for static generation and the sitemap. */
export function getPagePaths(): string[] {
  return pages.map((p) => p.path);
}

/** A page with blur placeholders added, or undefined if no page has that path. */
export async function getPage(path: string): Promise<Page | undefined> {
  const page = pages.find((p) => p.path === path);
  if (!page) return undefined;
  let entry = enriched.get(path);
  if (!entry) {
    entry = enrichImages(structuredClone(page), fileOf.get(path) ?? path);
    enriched.set(path, entry);
  }
  return entry;
}

/** Every page (validated, without blur placeholders): for metadata, sitemap and tests. */
export function getPages(): Page[] {
  return pages;
}

/** The English dictionary captured from the original site (not routed yet). */
export function getTranslations(locale: "en"): Readonly<Record<string, string>> {
  if (locale === "en") return raw.translationsEn;
  return {};
}
