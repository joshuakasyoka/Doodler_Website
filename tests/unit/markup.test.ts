import { describe, expect, it } from "vitest";
import { parseMarkup, stripMarkup } from "@/lib/content/markup";

describe("markup", () => {
  it("parses emphasis and links", () => {
    expect(parseMarkup("Herstel *in beeld*")).toEqual([
      { type: "text", value: "Herstel " },
      { type: "em", value: "in beeld" },
    ]);
    expect(parseMarkup("per maand. [Prijzen](/prijzen)")).toEqual([
      { type: "text", value: "per maand. " },
      { type: "link", value: "Prijzen", href: "/prijzen" },
    ]);
  });
  it("keeps escaped asterisks as text", () => {
    expect(stripMarkup("zorggesprek.\\*")).toBe("zorggesprek.*");
    expect(parseMarkup("\\* Kessels")).toEqual([{ type: "text", value: "* Kessels" }]);
  });
});
