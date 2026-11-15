import { cva, type VariantProps } from "class-variance-authority";
import { RichText } from "./rich-text";

const quote = cva("flex flex-col", {
  variants: {
    size: { md: "gap-lg", lg: "gap-lg", xl: "gap-lg", pull: "gap-md" },
    align: { start: "", center: "mx-auto max-w-narrow items-center text-center" },
  },
  defaultVariants: { size: "md", align: "start" },
});

const text = cva("font-display text-balance", {
  variants: {
    size: {
      md: "text-subhead",
      lg: "text-statement",
      xl: "text-quote font-normal quoted",
      /** the inner pages' pull quote */
      pull: "text-pull font-medium quoted",
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
      {size === "pull" ? (
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
