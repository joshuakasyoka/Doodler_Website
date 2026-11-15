import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const stack = cva("flex flex-col", {
  variants: {
    gap: {
      none: "",
      "2xs": "gap-2xs",
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
      "2xl": "gap-2xl",
      head: "gap-head",
    },
    align: { stretch: "", start: "items-start", center: "items-center text-center" },
    grow: { true: "flex-1", false: "" },
  },
  defaultVariants: { gap: "md", align: "stretch", grow: false },
});

type StackProps = VariantProps<typeof stack> & {
  children: ReactNode;
  as?: "div" | "article" | "header" | "footer" | "li" | "figure";
};

/** Children in a column with consistent spacing. */
export function Stack({ children, as: Tag = "div", gap, align, grow }: StackProps) {
  return <Tag className={stack({ gap, align, grow })}>{children}</Tag>;
}

const cluster = cva("flex flex-wrap", {
  variants: {
    gap: { xs: "gap-xs", sm: "gap-sm", md: "gap-md", lg: "gap-lg", xl: "gap-xl" },
    justify: { start: "", center: "justify-center", between: "justify-between", end: "justify-end" },
    align: { center: "items-center", start: "items-start", baseline: "items-baseline" },
  },
  defaultVariants: { gap: "md", justify: "start", align: "center" },
});

type ClusterProps = VariantProps<typeof cluster> & { children: ReactNode; as?: "div" | "ul" | "p" };

/** Children in a wrapping row. */
export function Cluster({ children, as: Tag = "div", gap, justify, align }: ClusterProps) {
  return <Tag className={cluster({ gap, justify, align })}>{children}</Tag>;
}
