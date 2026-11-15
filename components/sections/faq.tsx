import { Button, Container, Disclosure, Heading, Reveal, Section, Stack, Text } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function FaqSection({ section, context }: SectionProps<"faq">) {
  const group = `faq-${section.id ?? "vragen"}`;
  return (
    <Section id={section.id} space="after">
      <Container align="center">
        <Reveal>
          <Heading level={headingLevel(context)} align="center" text={section.heading} />
        </Reveal>
        <div className="mt-2xl w-full max-w-faq text-left">
          <Reveal>
            <ul className="flex flex-col gap-xs">
              {section.items.map((item) => (
                <li key={item.question}>
                  <Disclosure summary={item.question} group={group}>
                    <Text size="inherit" tone="inherit" text={item.answer} />
                  </Disclosure>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        {(section.cta || section.note) && (
          <div className="mt-2xl">
            <Reveal>
              <Stack gap="md" align="center">
                {section.cta && <Button {...section.cta} />}
                {section.note && <Text size="fine" tone="muted" align="center" text={section.note} />}
              </Stack>
            </Reveal>
          </div>
        )}
      </Container>
    </Section>
  );
}
