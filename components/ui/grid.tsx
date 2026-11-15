import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const grid = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      tiles: "grid-cols-2",
      split: "grid-cols-1 items-center lg:grid-cols-2",
    },
    gap: { sm: "gap-sm", md: "gap-md", lg: "gap-lg", xl: "gap-xl", "2xl": "gap-2xl" },
  },
  defaultVariants: { cols: 3, gap: "lg" },
});

type GridProps = VariantProps<typeof grid> & { children: ReactNode; as?: "div" | "ul" | "ol" };

/** A responsive grid: one column on phones, more as space allows. */
export function Grid({ children, as: Tag = "div", cols, gap }: GridProps) {
  return <Tag className={grid({ cols, gap })}>{children}</Tag>;
}
