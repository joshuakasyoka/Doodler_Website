import { cva, type VariantProps } from "class-variance-authority";
import { RichText } from "./rich-text";

const quote = cva("flex flex-col", {
  variants: {
    size: { md: "gap-lg", lg: "gap-lg", xl: "gap-lg", pull: "gap-md", "pull-sm": "gap-md" },
    align: { start: "", center: "mx-auto max-w-narrow items-center text-center" },
  },
  defaultVariants: { size: "md", align: "start" },
});

const text = cva("text-balance", {
  variants: {
    size: {
      md: "font-display text-subhead",
      lg: "font-display text-statement",
      xl: "quoted font-display text-quote font-normal",
      /** the inner pages' pull quote */
      pull: "quoted font-display text-pull font-medium",
      /** a long pull quote: the intro text's size, in the display face at a light weight */
      "pull-sm":
        "quoted-lg max-w-manifest-lead font-display text-manifest-lead font-light whitespace-pre-line text-text",
    },
  },
  defaultVariants: { size: "md" },
});

type QuoteProps = VariantProps<typeof quote> & {
  text: string;
  name: string;
  role?: string;
};

/** A quotation with who said it. xl and pull add typographic quotation marks. */
export function Quote({ text: value, name, role, size, align }: QuoteProps) {
  return (
    <figure className={quote({ size, align })}>
      <blockquote className={text({ size })}>
        <RichText value={value} />
      </blockquote>
      {size === "pull" || size === "pull-sm" ? (
        <figcaption className="font-body text-ui text-text-muted">{name}</figcaption>
      ) : (
        <figcaption className="flex flex-col font-body">
          <strong className="text-body font-semibold">{name}</strong>
          {role && <span className="text-small text-text-muted">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
