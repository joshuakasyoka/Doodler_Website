import { cx } from "@/lib/cx";
import { cva, type VariantProps } from "class-variance-authority";
import { RichText } from "./rich-text";

const text = cva("", {
  variants: {
    size: {
      lead: "max-w-measure font-body text-lead text-balance",
      /** the home hero's wider intro */
      "lead-wide": "max-w-lead font-body text-lead text-balance",
      label: "font-display text-label",
      /** a short intro set in the UI font (the template panel) */
      intro: "font-body text-subhead",
      figure: "max-w-measure font-display text-subhead",
      fine: "font-body text-fine",
      /** the manifest pages */
      "manifest-title": "max-w-manifest font-display text-manifest-title text-balance",
      "manifest-title-wide": "max-w-statement font-display text-title text-balance",
      manifest: "max-w-manifest-text font-display text-manifest text-balance",
      "manifest-lead": "max-w-manifest-lead font-body text-manifest-lead text-balance",
      "manifest-follow": "max-w-manifest-follow font-body text-manifest-lead text-balance",
      step: "font-display text-step",
      amount: "font-display text-amount font-medium",
      name: "font-display text-name font-medium",
      byline: "font-display text-ui",
      /** the product tour's wide intro */
      "lead-xl": "max-w-lead-wide font-body text-lead text-balance",
      /** small card copy in the UI font */
      ui: "font-body text-ui",
      /** take size and face from the parent */
      inherit: "",
      /** card titles: the lead size in the display face */
      "card-title": "font-display text-lead font-normal",
      body: "font-body text-body",
      small: "font-body text-small",
      eyebrow: "text-eyebrow tracking-wide uppercase",
      big: "max-w-text font-display text-statement",
      statement: "max-w-narrow font-display text-subhead",
      value: "font-display text-stat font-medium",
      price: "font-display text-title font-medium",
    },
    tone: {
      default: "",
      muted: "text-text-muted",
      inherit: "text-current",
      soft: "text-text-on-ink-muted",
      dim: "text-current opacity-90",
    },
    weight: { normal: "", medium: "font-medium", light: "font-light" },
    align: { start: "", center: "mx-auto text-center" },
  },
  defaultVariants: { size: "body", tone: "default", weight: "normal", align: "start" },
});

type TextProps = VariantProps<typeof text> & {
  as?: "p" | "span" | "div" | "small" | "strong" | "cite";
  /** Copy in content mini-markup. */
  text: string;
  /** The home hero's intro: fades up as the page opens. */
  intro?: boolean;
};

export function Text({ as: Tag = "p", text: value, intro, size, tone, weight, align }: TextProps) {
  return (
    <Tag className={cx(text({ size, tone, weight, align }), intro && "intro-lead")}>
      <RichText value={value} />
    </Tag>
  );
}
