import { Container, Image, Reveal, Section, Text, Thread } from "@/components/ui";
import type { SectionProps } from "./types";

export function ManifestPathSection({ section, context }: SectionProps<"manifest-path">) {
  return (
    <Section id={section.id} space="none">
      <Container align="center">
        {section.steps.map((step) => (
          <div key={step.statement} className="flex flex-col items-center">
            <Thread name={step.thread} />
            <Reveal>
              <Image image={step.image} layout="polaroid" sizes="330px" photosHidden={context.photosHidden} />
            </Reveal>
            <div className="mt-4xl">
              <Reveal>
                <Text size="manifest" align="center" text={step.statement} />
              </Reveal>
            </div>
            {step.sub && (
              <div className="mt-xl">
                <Reveal>
                  <Text size="manifest-follow" tone="muted" align="center" text={step.sub} />
                </Reveal>
              </div>
            )}
            {step.follow && (
              <div className="mt-lg">
                <Reveal>
                  <Text size="manifest-follow" tone="muted" align="center" text={step.follow} />
                </Reveal>
              </div>
            )}
          </div>
        ))}
      </Container>
    </Section>
  );
}
