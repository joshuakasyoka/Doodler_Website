import { Container, Image, Reveal, Section, Text, Thread } from "@/components/ui";
import { ManifestBlock } from "./manifest-block";
import type { SectionProps } from "./types";

const SIZE = {
  big: "manifest",
  statement: "manifest",
  title: "manifest-title-wide",
  summary: "manifest-title",
} as const;

export function StatementSection({ section, context }: SectionProps<"statement">) {
  return (
    <Section id={section.id} space="none">
      <Container align="center">
        {section.thread && <Thread name={section.thread} />}
        {section.image && (
          <div className="mt-lg mb-2xl">
            <Reveal>
              <Image
                image={section.image}
                layout="polaroid"
                sizes="330px"
                priority={context.aboveFold}
                photosHidden={context.photosHidden}
              />
            </Reveal>
          </div>
        )}
        {section.lead && (
          <Reveal>
            <Text size="manifest-follow" tone="muted" align="center" text={section.lead} />
          </Reveal>
        )}
        {/* a manifest statement with a follow-up reads as a heading, a rule and its text */}
        {section.variant === "statement" && section.text && section.follow && (
          <div className="my-lg w-full">
            <ManifestBlock statement={section.text} body={[section.follow]} />
          </div>
        )}
        {section.text && !(section.variant === "statement" && section.follow) && (
          <div className={section.lead ? (section.variant === "summary" ? "mt-2xl" : "mt-lg") : "my-lg"}>
            <Reveal>
              <Text size={SIZE[section.variant]} align="center" text={section.text} />
            </Reveal>
          </div>
        )}
        {section.follow && section.variant !== "statement" && (
          <div className="mt-lg">
            <Reveal>
              <Text size="manifest-follow" tone="muted" align="center" text={section.follow} />
            </Reveal>
          </div>
        )}
      </Container>
    </Section>
  );
}
