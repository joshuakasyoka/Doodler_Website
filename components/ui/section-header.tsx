import { cva, type VariantProps } from "class-variance-authority";
import { Heading } from "./heading";
import { Text } from "./text";

const header = cva("mb-head flex flex-col gap-md", {
  variants: { align: { start: "items-start", center: "items-center text-center" } },
  defaultVariants: { align: "start" },
});

type SectionHeaderProps = VariantProps<typeof header> & {
  level: 1 | 2;
  heading: string;
  eyebrow?: string;
  lead?: string;
  size?: "display" | "title";
};

/** The eyebrow, heading and lead that open a section. */
export function SectionHeader({ level, heading, eyebrow, lead, size = "title", align }: SectionHeaderProps) {
  const center = align === "center" ? "center" : "start";
  return (
    <header className={header({ align })}>
      {eyebrow && <Text as="span" size="eyebrow" tone="muted" text={eyebrow} />}
      <Heading level={level} size={size} align={center} text={heading} />
      {lead && <Text size="lead" tone="muted" align={center} text={lead} />}
    </header>
  );
}
