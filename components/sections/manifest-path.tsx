import { Container, Image, Reveal, Section, Thread } from "@/components/ui";
import { ManifestBlock } from "./manifest-block";
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
            <div className="mt-4xl w-full">
              <ManifestBlock statement={step.statement} body={[step.sub, step.follow]} />
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}
