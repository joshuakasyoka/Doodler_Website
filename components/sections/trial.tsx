import { Button, Card, Container, Heading, Reveal, Section, Text } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function TrialSection({ section, context }: SectionProps<"trial">) {
  const level = headingLevel(context);
  const { card } = section;
  const [first, ...rest] = section.leads;
  return (
    <Section id={section.id} space="trial">
      <Container>
        <div className="flex flex-col gap-2xl lg:flex-row lg:items-start lg:gap-4xl">
          <div className="flex flex-col items-start lg:flex-4">
            <Reveal>
              <Text as="span" size="eyebrow" tone="muted" text={section.eyebrow} />
            </Reveal>
            <div className="mt-sm">
              <Reveal>
                <Heading level={level} size="title" text={section.heading} />
              </Reveal>
            </div>
            {first && (
              <div className="mt-md max-w-intro">
                <Reveal>
                  <Text size="lead" text={first} />
                </Reveal>
              </div>
            )}
            {rest.map((lead) => (
              <div key={lead} className="mt-md max-w-intro">
                <Reveal>
                  <Text size="lead" tone="muted" text={lead} />
                </Reveal>
              </div>
            ))}
          </div>
          <div className="lg:flex-3">
            <Reveal>
              <Card radius="lg" pad="lg" gap="md">
                <Heading level={level === 1 ? 2 : 3} size="subhead" text={card.heading} />
                <ul className="flex flex-col gap-xs">
                  {card.items.map((item) => (
                    <li key={item} className="check flex items-center gap-sm rounded-md bg-bg px-lg py-md">
                      <Text as="span" size="ui" tone="muted" text={item} />
                    </li>
                  ))}
                </ul>
                <div className="mt-md">
                  <Button {...card.cta} width="full" />
                </div>
                <Text size="fine" tone="muted" text={card.note} />
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
