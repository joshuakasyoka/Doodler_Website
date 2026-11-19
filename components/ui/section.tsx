import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const section = cva("relative", {
  variants: {
    space: {
      default: "py-section",
      lg: "py-section-lg",
      "lg-top": "pt-section-lg pb-section",
      "lg-bottom": "pt-section pb-section-lg",
      top: "pt-page-top pb-section",
      hero: "pt-page-top",
      panel: "pt-2xl",
      "panel-y": "py-4xl",
      /** the product page's first section */
      tour: "pt-page-top-sm pb-5xl",
      block: "py-5xl",
      /** no space above: the previous section's bottom space is enough */
      after: "pb-section-lg",
      /** the near-full-width panels: a 16px gap above and below */
      inset: "py-inset",
      bottom: "pb-section",
      /** a drawn line leads in from the section above: the cards above hang 24px into this one, and
          the quote under the line sits 24px below it, so 48px here evens the space either side of the line */
      "thread-in": "pt-thread-in pb-section",
      steps: "pt-4xl",
      trial: "pt-page-top-sm pb-2xl",
      carousel: "py-4xl",
      tight: "py-xl",
      none: "",
    },
    tone: { default: "", ink: "bg-ink text-text-on-media" },
  },
  defaultVariants: { space: "default", tone: "default" },
});

type SectionProps = VariantProps<typeof section> & {
  children: ReactNode;
  id?: string;
  /** Names the region for screen readers when it has no visible heading. */
  label?: string;
};

/** A page band: the landmark and vertical rhythm every section sits in. */
export function Section({ children, id, label, space, tone }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={section({ space, tone })}>
      {children}
    </section>
  );
}
