import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const card = cva("relative flex flex-col", {
  variants: {
    tone: {
      surface: "bg-surface text-text",
      panel: "bg-panel text-text",
      ink: "bg-ink text-text-on-media",
      outline: "border border-border bg-surface text-text",
      none: "",
    },
    radius: {
      card: "rounded-card",
      logo: "rounded-md md:rounded-card",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-lg lg:rounded-xl",
    },
    pad: {
      none: "",
      logo: "h-partner-card justify-center px-sm py-sm md:h-partner-card-lg md:px-xl md:py-lg",
      sm: "p-md",
      callout: "p-xl md:p-callout",
      price: "p-card-pad",
      person: "px-person-x pt-person-x pb-person-b",
      md: "p-lg",
      lg: "p-xl md:p-2xl",
      xl: "px-lg py-3xl md:px-3xl md:py-4xl",
    },
    gap: { none: "", "2xs": "gap-2xs", xs: "gap-xs", sm: "gap-sm", md: "gap-md", lg: "gap-lg" },
    align: { start: "", center: "items-center text-center" },
    clip: { true: "overflow-hidden", false: "" },
    /** lifts a little on hover (price cards) */
    lift: { true: "group transition hover:-translate-y-2xs hover:shadow-soft-hover", false: "" },
    shadow: { none: "", soft: "shadow-soft" },
    /** fill the height of its grid cell */
    fill: { true: "h-full", false: "" },
  },
  defaultVariants: {
    tone: "surface",
    radius: "md",
    pad: "md",
    gap: "md",
    align: "start",
    clip: false,
    lift: false,
    shadow: "none",
    fill: false,
  },
});

type CardProps = VariantProps<typeof card> & {
  children: ReactNode;
  as?: "div" | "article" | "li" | "figure" | "aside";
};

export function Card({
  children,
  as: Tag = "div",
  tone,
  radius,
  pad,
  gap,
  align,
  clip,
  lift,
  shadow,
  fill,
}: CardProps) {
  return <Tag className={card({ tone, radius, pad, gap, align, clip, lift, shadow, fill })}>{children}</Tag>;
}
