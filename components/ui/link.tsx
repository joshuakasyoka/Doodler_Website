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
      /** a standalone link the size of a button; a hand-drawn outline draws round it on hover */
      text: "relative inline-flex outline-target min-h-control-lg items-center gap-xs px-md font-body text-body",
      /** a standalone link with a permanent underline under the label */
      underline:
        "relative inline-flex min-h-control-lg items-center gap-xs font-body text-body underline decoration-1 underline-offset-4",
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
};

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

/** Every link on the site. Internal paths use client-side navigation. */
export function Link({ href, children, icon, label, current, variant }: LinkProps) {
  const className = link({ variant });
  const outlined = variant === "text" || variant === "nav" || variant === undefined;
  const content = (
    <>
      {icon && <Icon name={icon} size="sm" />}
      {children}
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
