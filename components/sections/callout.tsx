import { Card, Container, Heading, Icon, Link, Reveal, Section, Stack, Text } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function CalloutSection({ section, context }: SectionProps<"callout">) {
  return (
    <Section id={section.id} space="after">
      <Container align="center">
        <div className="w-full max-w-photo text-left">
          <Reveal>
            <Card radius="lg" pad="callout" gap="xs">
              <Icon name={section.icon} size="panel" draw />
              <Stack gap="xs" align="start">
                <Heading level={headingLevel(context)} size="subhead" text={section.heading} />
                <Text tone="muted" text={section.text} />
                <Link href={section.link.href} icon={section.link.icon} variant="outline">
                  {section.link.label}
                </Link>
              </Stack>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
