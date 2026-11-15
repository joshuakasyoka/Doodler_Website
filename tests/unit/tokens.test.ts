import fs from "node:fs";
import { describe, expect, it } from "vitest";

const tokens = fs.readFileSync("styles/tokens.css", "utf8");
const names = (ns: string) =>
  new Set([...tokens.matchAll(new RegExp(`--${ns}-([a-z0-9-]+):`, "g"))].map((m) => m[1]));

describe("design tokens", () => {
  it("never reuse a spacing name for a width (max-w-* would pick the spacing value)", () => {
    const spacing = names("spacing");
    const clashes = [...names("container")].filter((n) => spacing.has(n));
    expect(clashes).toEqual([]);
  });
});
