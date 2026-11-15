import { Container, Heading, Reveal, Section, Text, Video } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function ProductTourSection({ section, context }: SectionProps<"product-tour">) {
  return (
    <Section id={section.id} space="tour">
      <Container align="center">
        <Reveal>
          <Heading level={headingLevel(context)} align="center" measure="short" text={section.heading} />
        </Reveal>
        <div className="mt-md">
          <Reveal>
            <Text size="lead-xl" tone="muted" align="center" text={section.lead} />
          </Reveal>
        </div>
        {/* the video card grows a little over the first screen of scrolling */}
        <div className="scroll-grow mt-xl w-full max-w-tour md:mt-2xl">
          <div className="overflow-hidden rounded-md bg-surface shadow-float">
            <Video
              video={section.video}
              priority={context.first}
              playLabel={context.labels.playVideo}
              sizes="(min-width: 1200px) 1100px, 100vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
