import { cva, type VariantProps } from "class-variance-authority";
import { iconViewBoxes, type IconName } from "@/lib/icon-names";

/** Bump when public/icons/sprite.svg changes, so browsers fetch the new file. */
const SPRITE = "/icons/sprite.svg?v=9";

const icon = cva("shrink-0 overflow-visible", {
  variants: {
    size: {
      xs: "size-icon-xs",
      sm: "size-icon-sm",
      md: "size-icon",
      lg: "size-icon-lg",
      xl: "size-icon-xl",
      sign: "h-auto w-icon-sign",
      thread: "h-thread w-auto",
      "thread-tall": "h-thread-tall w-auto",
      "thread-mid": "h-thread-mid w-auto",
      wide: "h-auto w-full",
      logo: "h-auto w-logo",
      "logo-lg": "h-auto w-logo-lg",
      /** the pencil underline inside buttons (styled by the scribble-target utility) */
      underline: "scribble pointer-events-none absolute inset-x-lg bottom-xs h-xs w-auto",
      mark: "h-icon-mark w-auto",
      panel: "size-icon-panel",
      dot: "size-dot-icon",
      wordmark: "h-auto w-full",
    },
    float: { true: "float", false: "" },
  },
  defaultVariants: { size: "md", float: false },
});

type IconProps = VariantProps<typeof icon> & {
  name: IconName;
  /** Stroke icons and lines draw themselves in as they scroll into view. */
  draw?: boolean;
  /** Accessible name. Omit for decorative icons (the default). */
  label?: string;
};

/** An icon from the single SVG sprite (public/icons/sprite.svg). */
export function Icon({ name, label, size, draw, float }: IconProps) {
  return (
    <svg
      className={icon({ size, float })}
      data-draw={draw ? "" : undefined}
      viewBox={iconViewBoxes[name]}
      preserveAspectRatio={size === "underline" ? "none" : undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <use href={`${SPRITE}#${name}`} />
    </svg>
  );
}
