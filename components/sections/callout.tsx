import {
  Card,
  Cluster,
  Container,
  Heading,
  Icon,
  Link,
  Reveal,
  Section,
  Stack,
  Tag,
  Text,
} from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function CalloutSection({ section, context }: SectionProps<"callout">) {
  return (
    <Section id={section.id} space="after">
      <Container align="center">
        <div className="w-full max-w-photo text-center">
          <Reveal>
            <Card radius="lg" pad="callout" gap="xs" align="center">
              <Icon name={section.icon} size="panel" draw />
              <Stack gap="xs" align="center">
                <Heading level={headingLevel(context)} size="subhead" align="center" text={section.heading} />
                <Text tone="muted" align="center" text={section.text} />
                {section.badges && (
                  <Cluster as="ul" gap="xs" justify="center">
                    {section.badges.map((badge) => (
                      <li key={badge.label}>
                        <Tag icon={badge.icon} label={badge.label} variant="chip" />
                      </li>
                    ))}
                  </Cluster>
                )}
                <Link href={section.link.href} icon={section.link.icon}>
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
