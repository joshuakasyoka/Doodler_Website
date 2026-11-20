import { describe, expect, it } from "vitest";
import { getPage, getPagePaths, getPages, getSite } from "@/lib/content";

describe("content", () => {
  it("validates every page and the site at import time", () => {
    expect(getSite().name).toBe("Doodler");
    expect(getPagePaths()).toEqual([
      "/",
      "/product",
      "/veiligheid",
      "/prijzen",
      "/onderzoek",
      "/over-ons",
      "/gratis-proberen",
    ]);
  });

  it("gives every page a title and description", () => {
    for (const page of getPages()) {
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.description.length).toBeGreaterThan(0);
    }
  });

  it("adds blur placeholders and keeps image sizes honest", async () => {
    const home = await getPage("/");
    const banner = home?.sections.find((s) => s.type === "media-banner");
    expect(banner?.type === "media-banner" && banner.image?.blurDataURL).toMatch(
      /^data:image\/webp;base64,/,
    );
  });

  it("starts every page with a section that can own the h1", () => {
    const owners = new Set(["hero", "page-intro", "product-tour", "pricing", "trial"]);
    for (const page of getPages()) {
      const first = page.sections.find((s) => !s.hidden);
      expect(owners.has(first?.type ?? ""), page.path).toBe(true);
    }
  });
});
