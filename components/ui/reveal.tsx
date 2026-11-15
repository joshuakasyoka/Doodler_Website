import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "li" | "p" | "figure" | "span";
  /** fade: fades up (default). clip: uncovered from the bottom up. */
  variant?: "fade" | "clip";
  /** Stretch to the full width of a flex parent. */
  full?: boolean;
  /** Fill the height of a grid cell, so cards in a row line up. */
  stretch?: boolean;
};

/**
 * Fades its content up as it scrolls into view (see MotionObserver and
 * globals.css). Neighbours that arrive together cascade.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "fade",
  full = false,
  stretch = false,
}: RevealProps) {
  return (
    <Tag
      data-reveal={variant === "clip" ? "clip" : ""}
      className={[full ? "w-full" : "", stretch ? "h-full" : ""].join(" ").trim() || undefined}
    >
      {children}
    </Tag>
  );
}
