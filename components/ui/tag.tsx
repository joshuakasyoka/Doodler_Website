import { cva, type VariantProps } from "class-variance-authority";
import type { IconName } from "@/lib/icon-names";
import { Icon } from "./icon";

const tag = cva("inline-flex items-center gap-xs", {
  variants: {
    variant: {
      /** a white card with a name and a note under it (integrations) */
      card: "w-full rounded-sm bg-surface px-tag-x py-tag-y text-left",
      /** a small white label (certifications) */
      chip: "rounded-sm bg-surface px-sm py-xs",
    },
  },
  defaultVariants: { variant: "card" },
});

type TagProps = VariantProps<typeof tag> & { icon: IconName; label: string; note?: string };

/** A small labelled item: an integration, a certification. */
export function Tag({ icon, label, note, variant }: TagProps) {
  return (
    <span className={tag({ variant })}>
      <Icon name={icon} size="sm" />
      <span className="flex flex-col gap-2xs">
        <span
          className={`font-display leading-tight font-medium ${variant === "chip" ? "text-small" : "text-body"}`}
        >
          {label}
        </span>
        {note && <small className="font-display text-fine text-text-muted">{note}</small>}
      </span>
    </span>
  );
}
