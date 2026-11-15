import { describe, expect, it } from "vitest";
import { registry } from "@/components/sections/registry";
import { sectionSchema } from "@/lib/content/schemas/sections";
import { getPages } from "@/lib/content";

const schemaTypes = sectionSchema.options.map((option) => option.shape.type.value).sort();

describe("section registry", () => {
  it("has exactly one component per section schema", () => {
    expect(Object.keys(registry).sort()).toEqual(schemaTypes);
  });
  it("maps every type to a component", () => {
    for (const component of Object.values(registry)) expect(typeof component).toBe("function");
  });
  it("covers every section type used in content", () => {
    const used = new Set(getPages().flatMap((p) => p.sections.map((s) => s.type)));
    for (const type of used) expect(registry).toHaveProperty(type);
  });
});
