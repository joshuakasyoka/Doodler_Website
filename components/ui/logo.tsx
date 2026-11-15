import { cva, type VariantProps } from "class-variance-authority";
import { SPRITE } from "./icon";

const logo = cva("h-auto overflow-visible", {
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

/** The Doodler wordmark. */
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
    </svg>
  );
}
