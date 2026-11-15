import { cva, type VariantProps } from "class-variance-authority";
import { SPRITE } from "./icon";

const logo = cva("logo-mark h-auto overflow-visible", {
  variants: {
    size: {
      /** the header */
      md: "w-logo",
      /** the footer: as wide as the page */
      full: "w-full",
    },
  },
  defaultVariants: { size: "md" },
});

type LogoProps = VariantProps<typeof logo> & {
  /** Accessible name. Omit when the surrounding link already names it. */
  label?: string;
};

/**
 * The Doodler wordmark. On hover (or when its link has keyboard focus) the
 * pencil in the "l" draws a line underneath, out from its tip to both ends.
 * See .logo-line in globals.css.
 */
export function Logo({ label, size }: LogoProps) {
  return (
    <svg
      className={logo({ size })}
      viewBox="0 0 104 34"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <use href={`${SPRITE}#logo`} width="104" height="33" />
      {/* two strokes leaving the pencil tip (x 71, y 31.6): one to the left edge, one to the right */}
      <path
        className="logo-line"
        pathLength={1}
        d="M71.2 32.4C64 33.1 55 32.1 44 32.6S24 32.2 13 32.7 4.2 32.3 1.2 32.6"
      />
      <path
        className="logo-line"
        pathLength={1}
        d="M71.2 32.4C78 32 86 32.9 93.5 32.4S100.4 32.2 102.8 32.5"
      />
    </svg>
  );
}
