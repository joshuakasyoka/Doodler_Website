import type { Section, SectionType } from "@/lib/content";
import { registry } from "./registry";
import type { SectionComponent, SectionContext } from "./types";

type Props = {
  sections: Section[];
  photosHidden: boolean;
  labels: SectionContext["labels"];
  /** The page's emphasis style (globals.css: [data-emphasis]). */
  emphasis?: "italic" | "upright";
};

/** Renders a page's ordered sections, skipping hidden ones. */
export function Sections({ sections, photosHidden, labels, emphasis = "italic" }: Props) {
  const visible = sections.filter((section) => !section.hidden);
  const rendered = visible.map((section, index) => {
    const context: SectionContext = { first: index === 0, aboveFold: index < 2, photosHidden, labels };
    const Component = registry[section.type] as SectionComponent<SectionType>;
    return <Component key={`${section.type}-${section.id ?? index}`} section={section} context={context} />;
  });
  return <div data-emphasis={emphasis}>{rendered}</div>;
}
