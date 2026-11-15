import { Button, Container, Heading, PromptDraw, Section, Stack, Text } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function HeroSection({ section, context }: SectionProps<"hero">) {
  return (
    <Section id={section.id} space="hero">
      <Container align="center">
        <Stack gap="lg" align="center">
          <Heading level={headingLevel(context)} size="display" align="center" intro text={section.heading} />
          <Text size="lead-wide" tone="muted" align="center" intro text={section.lead} />
          <Button {...section.cta} intro />
        </Stack>
      </Container>
      <div className="intro-panel mt-3xl md:mt-4xl">
        <Container size="bleed">
          <PromptDraw demo={section.demo} />
        </Container>
      </div>
    </Section>
  );
}
