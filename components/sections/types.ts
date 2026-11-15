import type { ReactNode } from "react";
import type { SectionOf, SectionType } from "@/lib/content";

/** Page-level facts every section may need. */
export type SectionContext = {
  /** The first visible section on the page owns the page's <h1>. */
  first: boolean;
  /** Among the first two sections, so likely on the first screen: images load eagerly. */
  aboveFold: boolean;
  /** Site-wide photo placeholder mode (content/site.ts). */
  photosHidden: boolean;
  /** Interface strings sections may need (content/site.ts → ui). */
  labels: { playVideo: string; readMore: string; readLess: string };
};

export type SectionProps<T extends SectionType> = { section: SectionOf<T>; context: SectionContext };
export type SectionComponent<T extends SectionType> = (props: SectionProps<T>) => ReactNode;

export const headingLevel = (context: SectionContext): 1 | 2 => (context.first ? 1 : 2);
