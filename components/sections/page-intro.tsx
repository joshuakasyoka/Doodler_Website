import { Cluster, Container, Heading, PencilSign, Reveal, Section, Tag, Text, Thread } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function PageIntroSection({ section, context }: SectionProps<"page-intro">) {
  return (
    <Section id={section.id} space="hero">
      <Container align="center">
        <PencilSign name={section.sign} />
        <Reveal>
          <Text as="span" size="eyebrow" tone="muted" text={section.eyebrow} />
        </Reveal>
        <div className="mt-sm">
          <Reveal>
            <Heading level={headingLevel(context)} size="manifest" align="center" text={section.heading} />
          </Reveal>
        </div>
        {section.byline && (
          <div className="mt-sm">
            <Reveal>
              <Text size="byline" tone="muted" text={section.byline} />
            </Reveal>
          </div>
        )}
        {section.lead && (
          <div className="mt-xl">
            <Reveal>
              <Text size="manifest-lead" tone="muted" align="center" text={section.lead} />
            </Reveal>
          </div>
        )}
        {section.badges && (
          <div className="mt-lg">
            <Reveal>
              <Cluster as="ul" gap="xs" justify="center">
                {section.badges.map((badge) => (
                  <li key={badge.label}>
                    <Tag icon={badge.icon} label={badge.label} variant="chip" />
                  </li>
                ))}
              </Cluster>
            </Reveal>
          </div>
        )}
        {section.thread && <Thread name={section.thread} />}
      </Container>
    </Section>
  );
}
