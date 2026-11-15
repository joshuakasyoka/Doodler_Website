import { ConnectorTrack, Container, Heading, Icon, Reveal, Section, Text } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

/** The steps sit at different heights on the dotted line (wide screens). */
const STAGGER = ["lg:mt-step-1", "lg:mt-step-2", ""];

export function FlowStepsSection({ section, context }: SectionProps<"flow-steps">) {
  return (
    <Section id={section.id} space="lg-bottom">
      <Container>
        <Reveal>
          <Heading level={headingLevel(context)} align="center" measure="narrow" text={section.heading} />
        </Reveal>
        <div className="mt-2xl md:mt-3xl">
          <ConnectorTrack>
            <ol className="relative grid gap-2xl pt-2xl lg:grid-cols-3 lg:gap-3xl">
              {section.steps.map((step, i) => (
                <li key={step.title} className={STAGGER[i % STAGGER.length]}>
                  <Reveal>
                    <div className="flex flex-col items-start gap-sm">
                      <span
                        data-dot
                        className="mb-xs grid size-dot place-items-center rounded-pill bg-surface shadow-dot"
                      >
                        <Icon name={step.icon} size="dot" draw />
                      </span>
                      <Heading level={3} size="subhead" text={step.title} />
                      <Text tone="muted" text={step.text} />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </ConnectorTrack>
        </div>
      </Container>
    </Section>
  );
}
