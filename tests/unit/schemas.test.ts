import { describe, expect, it } from "vitest";
import { image, link, markup, video } from "@/lib/content/schemas/fields";
import { sectionSchema } from "@/lib/content/schemas/sections";
import { pageSchema } from "@/lib/content/schemas/site";
import { ContentError, parseContent } from "@/lib/content/validate";

const realImage = {
  src: "/images/home/doodle-op-koelkast.webp",
  alt: "Een doodle",
  width: 1280,
  height: 703,
};

describe("image schema", () => {
  it("accepts an existing, well-named image with alt text", () => {
    expect(image.safeParse(realImage).success).toBe(true);
  });
  it("rejects a path to a missing file", () => {
    const result = image.safeParse({ ...realImage, src: "/images/home/does-not-exist.webp" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("file not found");
  });
  it("rejects names outside the convention", () => {
    expect(image.safeParse({ ...realImage, src: "/images/Home/Final-v2.webp" }).success).toBe(false);
    expect(image.safeParse({ ...realImage, src: "/hero.webp" }).success).toBe(false);
  });
  it("requires alt text unless the image is marked decorative", () => {
    expect(image.safeParse({ ...realImage, alt: "" }).success).toBe(false);
    expect(image.safeParse({ ...realImage, alt: "", decorative: true }).success).toBe(true);
  });
  it("requires width and height", () => {
    expect(image.safeParse({ src: realImage.src, alt: "x" }).success).toBe(false);
  });
});

describe("video schema", () => {
  it("rejects a missing video file", () => {
    const result = video.safeParse({
      src: "/videos/home/nope.mp4",
      poster: realImage,
      width: 1280,
      height: 720,
    });
    expect(result.success).toBe(false);
  });
});

describe("markup and links", () => {
  it("accepts emphasis, links and escaped asterisks", () => {
    expect(markup.safeParse("Herstel *in beeld*").success).toBe(true);
    expect(markup.safeParse("Mail [ons](mailto:hallo@doodler.app).").success).toBe(true);
    expect(markup.safeParse("de helft van een zorggesprek.\\*").success).toBe(true);
  });
  it("rejects unbalanced emphasis and bad link targets", () => {
    expect(markup.safeParse("Herstel *in beeld").success).toBe(false);
    expect(markup.safeParse("[klik](javascript:alert(1))").success).toBe(false);
  });
  it("only allows known link schemes", () => {
    expect(link.safeParse({ label: "x", href: "/prijzen" }).success).toBe(true);
    expect(link.safeParse({ label: "x", href: "http://insecure.example" }).success).toBe(false);
  });
});

describe("sections", () => {
  it("rejects an unknown section type", () => {
    expect(sectionSchema.safeParse({ type: "carousel-3d" }).success).toBe(false);
  });
  it("reports content errors with the file and field path", () => {
    const page = {
      path: "/test",
      title: "T",
      description: "D",
      sections: [{ type: "quote", text: "Hallo", cite: "" }],
    };
    expect(() => parseContent(pageSchema, page, "content/pages/test.ts")).toThrow(ContentError);
    expect(() => parseContent(pageSchema, page, "content/pages/test.ts")).toThrow(
      /content\/pages\/test\.ts[\s\S]*sections\[0\] \(quote\)\.cite: is empty/,
    );
  });
});
