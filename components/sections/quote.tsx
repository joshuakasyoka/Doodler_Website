import { Container, Quote, Reveal, Section, Thread } from "@/components/ui";
import type { SectionProps } from "./types";

export function QuoteSection({ section }: SectionProps<"quote">) {
  return (
    // A small quote sits close under the drawn line above it.
    <Section id={section.id} space={section.small ? "bottom" : section.thread ? "thread-in" : undefined}>
      {section.thread && (
        <Container>
          <Thread name={section.thread} />
        </Container>
      )}
      <Container align="center">
        <div className={section.small || section.thread ? "w-full max-w-photo" : "mt-4xl w-full max-w-photo"}>
          <Reveal>
            <Quote
              text={section.text}
              name={section.cite}
              size={section.small ? "pull-sm" : "pull"}
              align="center"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
