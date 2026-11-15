import { Container, Icon, Quote, Reveal, Section, Stack, Stat, Text } from "@/components/ui";
import type { SectionProps } from "./types";

export function ProofSection({ section }: SectionProps<"proof">) {
  return (
    <Section id={section.id} space="lg" label={section.eyebrow}>
      <Container align="center">
        <Icon name={section.icon} size="mark" draw />
        <div className="mt-lg">
          <Reveal>
            <Text as="span" size="eyebrow" tone="muted" text={section.eyebrow} />
          </Reveal>
        </div>
        <div className="mt-sm w-full max-w-proof">
          <Stack gap="2xl" align="center">
            <Reveal>
              <Quote
                text={section.quote.text}
                name={section.quote.name}
                role={section.quote.role}
                size="xl"
                align="center"
              />
            </Reveal>
            <Reveal>
              <Stat inline value={section.figure.value} label={section.figure.text} />
            </Reveal>
            <Reveal>
              <Text size="fine" tone="muted" align="center" text={section.source} />
            </Reveal>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
