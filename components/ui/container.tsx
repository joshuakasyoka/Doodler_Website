import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const container = cva("mx-auto w-full", {
  variants: {
    size: {
      content: "max-w-content px-gutter",
      wide: "max-w-wide px-gutter",
      narrow: "max-w-narrow px-gutter",
      text: "max-w-text px-gutter",
      /** near full width, for the big rounded panels */
      bleed: "max-w-bleed px-inset",
      /** the full window width, for the header */
      full: "px-header-x",
    },
    align: { start: "", center: "flex flex-col items-center text-center" },
  },
  defaultVariants: { size: "content", align: "start" },
});

export function Container({
  children,
  size,
  align,
}: VariantProps<typeof container> & { children: ReactNode }) {
  return <div className={container({ size, align })}>{children}</div>;
}
