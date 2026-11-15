import { cx } from "@/lib/cx";
import { cva, type VariantProps } from "class-variance-authority";
import { Fragment } from "react";
import { parseMarkup } from "@/lib/content/markup";
import { RichText } from "./rich-text";

const heading = cva("", {
  variants: {
    size: {
      display: "font-display text-display font-medium",
      title: "font-display text-title font-medium",
      statement: "font-display text-statement font-normal",
      subhead: "font-display text-subhead font-medium",
      stat: "font-display text-stat font-medium",
      ui: "font-display text-body font-semibold",
      /** the manifest pages' titles: large and regular weight */
      manifest: "max-w-manifest font-display text-manifest-title font-normal",
      /** timeline steps */
      step: "font-display text-step font-normal",
      /** a quiet heading in the UI font (the template panel) */
      intro: "font-body text-subhead font-normal",
    },
    align: { start: "", center: "mx-auto text-center" },
    tone: { default: "", muted: "text-text-muted", inherit: "text-current" },
    /** narrow: wraps two-line section titles the way the original does */
    measure: { default: "", narrow: "max-w-heading", short: "max-w-title" },
  },
  compoundVariants: [
    { size: "display", measure: "default", class: "max-w-title" },
    { size: "title", measure: "default", class: "max-w-title-wide" },
  ],
  defaultVariants: { size: "title", align: "start", tone: "default", measure: "default" },
});

type HeadingProps = VariantProps<typeof heading> & {
  /** The document level, independent of how big it looks. */
  level: 1 | 2 | 3 | 4;
  /** Copy in content mini-markup. */
  text: string;
  id?: string;
  /** The home hero: each word rises out of a mask as the page opens. */
  intro?: boolean;
};

/** Splits copy into masked words, keeping emphasis on the emphasised ones. */
function Words({ value }: { value: string }) {
  const words = parseMarkup(value).flatMap((node) =>
    node.value
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, em: node.type === "em" })),
  );
  return (
    <>
      {words.map(({ word, em }, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="w">
            <span>{em ? <em>{word}</em> : word}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function Heading({ level, text, id, intro, size, align, tone, measure }: HeadingProps) {
  const Tag = `h${level}` as const;
  const className = heading({ size, align, tone, measure });
  return (
    <Tag id={id} className={cx(className, intro && "intro-words")}>
      {intro ? <Words value={text} /> : <RichText value={text} />}
    </Tag>
  );
}
