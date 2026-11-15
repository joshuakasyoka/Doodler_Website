import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import type { ReactNode } from "react";
import type { IconName } from "@/lib/icon-names";
import { Icon } from "./icon";

const link = cva("rounded-sm", {
  variants: {
    variant: {
      /** inside running text */
      inline: "underline decoration-1 underline-offset-2 hover:decoration-2",
      /**
       * a standalone link the size of a button: underlined at rest; on hover or
       * focus the underline gives way to a hand-drawn outline
       */
      text: "group relative inline-flex outline-target min-h-control-lg items-center gap-xs px-md font-body text-body",
      /** the same link with the outline only, no underline (the Product safety card) */
      outline:
        "relative inline-flex outline-target min-h-control-lg items-center gap-xs px-md font-body text-body",
      /** the header menu: the outline also marks the current page */
      nav: "relative inline-flex outline-target min-h-control items-center px-sm font-display text-ui",
      footer:
        "inline-flex min-h-control items-center text-fine text-text-muted hover:text-text hover:underline hover:underline-offset-4",
      plain: "",
    },
  },
  defaultVariants: { variant: "text" },
});

type LinkProps = VariantProps<typeof link> & {
  href: string;
  children: ReactNode;
  icon?: IconName;
  label?: string;
  current?: boolean;
  /** Put the icon after the label (an arrow) rather than before it. */
  iconEnd?: boolean;
};

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

/** Every link on the site. Internal paths use client-side navigation. */
export function Link({ href, children, icon, label, current, variant, iconEnd }: LinkProps) {
  const className = link({ variant });
  const underlined = variant === "text" || variant === undefined;
  const outlined = underlined || variant === "nav" || variant === "outline";
  const content = (
    <>
      {icon && !iconEnd && <Icon name={icon} size="sm" />}
      {children}
      {icon && iconEnd && <Icon name={icon} size="sm" />}
      {underlined && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-md bottom-sm h-[1.3px] bg-current transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0"
        />
      )}
      {outlined && (
        <svg
          className="link-outline pointer-events-none absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          <rect pathLength={1} />
        </svg>
      )}
    </>
  );
  if (isInternal(href))
    return (
      <NextLink
        href={href}
        className={className}
        aria-label={label}
        aria-current={current ? "page" : undefined}
      >
        {content}
      </NextLink>
    );
  const external = href.startsWith("https://");
  return (
    <a href={href} className={className} aria-label={label} rel={external ? "noopener" : undefined}>
      {content}
    </a>
  );
}
