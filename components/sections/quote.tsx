import { Container, Quote, Reveal, Section } from "@/components/ui";
import type { SectionProps } from "./types";

export function QuoteSection({ section }: SectionProps<"quote">) {
  return (
    <Section id={section.id}>
      <Container align="center">
        <div className="mt-4xl w-full max-w-photo">
          <Reveal>
            <Quote text={section.text} name={section.cite} size="pull" align="center" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
