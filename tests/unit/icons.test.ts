import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { iconNames, iconViewBoxes } from "@/lib/icon-names";

const sprite = fs.readFileSync("public/icons/sprite.svg", "utf8");
const symbols = [...sprite.matchAll(/<symbol id="([^"]+)" viewBox="([^"]+)"/g)];

describe("icon sprite", () => {
  it("matches the typed icon names exactly", () => {
    expect(symbols.map((m) => m[1]).sort()).toEqual([...iconNames].sort());
  });
  it("records each symbol's viewBox", () => {
    for (const [, id, viewBox] of symbols)
      expect(iconViewBoxes[id as keyof typeof iconViewBoxes]).toBe(viewBox);
  });
});
