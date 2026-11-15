import { Container, Heading, Icon, Reveal, Section, Text, Thread } from "@/components/ui";
import type { SectionProps } from "./types";

export function TimelineSection({ section }: SectionProps<"timeline">) {
  return (
    <Section id={section.id} space="steps">
      <Container align="center">
        <ol className="flex flex-col items-center gap-5xl">
          {section.steps.map((step) => (
            <li key={step.title} className="flex max-w-text flex-col items-center">
              <Reveal>
                <span className="grid size-dot place-items-center rounded-pill bg-surface shadow-dot">
                  <Icon name={step.icon} size="md" draw />
                </span>
              </Reveal>
              <div className="mt-lg">
                <Reveal>
                  <Heading level={2} size="step" align="center" text={step.title} />
                </Reveal>
              </div>
              <div className="mt-sm">
                <Reveal>
                  <Text size="manifest-follow" tone="muted" align="center" text={step.text} />
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
        {section.thread && <Thread name={section.thread} />}
      </Container>
    </Section>
  );
}
