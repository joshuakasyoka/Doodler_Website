import { cx } from "@/lib/cx";
import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import type { IconName } from "@/lib/icon-names";
import { Icon } from "./icon";

export const buttonStyles = cva(
  "relative isolate inline-flex shrink-0 items-center justify-center gap-xs overflow-hidden rounded-sm font-body font-normal whitespace-nowrap transition-colors scribble-target",
  {
    variants: {
      variant: {
        primary: "bg-ink text-text-on-media hover:bg-ink-hover",
        light: "bg-surface text-text hover:bg-surface-hover",
        outline: "border border-border bg-surface text-text hover:bg-surface-hover",
        /** the header's white Demo pill */
        pill: "bg-surface text-text shadow-pill hover:bg-surface-hover",
        /** outlined in ink; fills when its card is hovered (price cards) */
        card: "border border-ink bg-transparent text-text group-hover:bg-ink group-hover:text-text-on-media",
        /** the header's black Login pill */
        "pill-dark": "bg-ink text-text-on-media hover:bg-ink-hover",
      },
      size: {
        sm: "h-control-sm px-sm text-small",
        /** header pills: 40px, 14px text */
        md: "h-pill px-xs text-small",
        lg: "h-control-lg px-md text-body",
        /** 44px, 15px text (price cards) */
        card: "h-control px-sm text-ui",
        icon: "size-pill",
      },
      width: { auto: "", full: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "lg", width: "auto" },
  },
);

type Common = VariantProps<typeof buttonStyles> & {
  label: string;
  icon?: IconName;
  /** Draw a pencil underline on hover. Off by default: the original site's buttons have none. */
  scribble?: boolean;
  /** Show only the icon; the label becomes the accessible name. */
  hideLabel?: boolean;
  /** The home hero's button: rises in on load. */
  intro?: boolean;
};

type ButtonProps = Common &
  (
    | { href: string; type?: never; onClick?: never; expanded?: never; controls?: never }
    | {
        href?: never;
        type?: "button" | "submit";
        onClick?: () => void;
        /** For disclosure buttons: whether the controlled panel is open. */
        expanded?: boolean;
        /** For disclosure buttons: id of the controlled panel. */
        controls?: string;
      }
  );

function Inner({ label, icon, scribble = false, hideLabel }: Common) {
  return (
    <>
      {icon && <Icon name={icon} size="sm" />}
      {hideLabel ? <span className="sr-only">{label}</span> : <span>{label}</span>}
      {scribble && !hideLabel && <Icon name="scribble-single" size="underline" />}
    </>
  );
}

/** A button, or a link that looks like one when given an href. */
export function Button(props: ButtonProps) {
  const { variant, size, width, href, intro } = props;
  const className = cx(buttonStyles({ variant, size, width }), intro && "intro-cta");
  if (href !== undefined) {
    if (href.startsWith("/"))
      return (
        <NextLink href={href} className={className}>
          <Inner {...props} />
        </NextLink>
      );
    return (
      <a href={href} className={className} rel={href.startsWith("https://") ? "noopener" : undefined}>
        <Inner {...props} />
      </a>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-expanded={props.expanded}
      aria-controls={props.controls}
      className={className}
    >
      <Inner {...props} />
    </button>
  );
}
