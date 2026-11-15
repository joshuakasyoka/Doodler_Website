import { cva, type VariantProps } from "class-variance-authority";
import { RichText } from "./rich-text";

const stat = cva("flex flex-col gap-xs", {
  variants: { align: { start: "", center: "items-center text-center" } },
  defaultVariants: { align: "start" },
});

type StatProps = VariantProps<typeof stat> & {
  /** inline: the figure set in bold within one sentence ("90% van de cliënten…"). */
  inline?: boolean;
  /** card: a white card with a big figure (the research findings). */
  card?: boolean;
  value: string;
  label: string;
  /** Render the label as a heading (when the stats have no heading of their own). */
  labelLevel?: 2 | 3;
};

/** A big figure with its explanation. */
export function Stat({ value, label, labelLevel, align, inline, card }: StatProps) {
  if (card) {
    const Label = labelLevel ? (`h${labelLevel}` as const) : "p";
    return (
      <div className="flex h-full flex-col gap-card-pad rounded-md bg-surface p-card-pad text-left shadow-soft">
        <strong className="font-display text-stat-xl font-normal">{value}</strong>
        <Label className="font-display text-stat-label font-medium">
          <RichText value={label} />
        </Label>
      </div>
    );
  }
  if (inline)
    return (
      <p className="mx-auto max-w-measure text-center font-display text-subhead">
        <strong className="font-medium">{value}</strong> <RichText value={label} />
      </p>
    );
  const Label = labelLevel ? (`h${labelLevel}` as const) : "p";
  return (
    <div className={stat({ align })}>
      <strong className="font-display text-stat font-medium">{value}</strong>
      <Label className="max-w-measure font-display text-subhead font-normal">
        <RichText value={label} />
      </Label>
    </div>
  );
}
