import { Button, CardCarousel, Container, Heading, Reveal, Section, Text } from "@/components/ui";
import { stripMarkup } from "@/lib/content/markup";
import { headingLevel, type SectionProps } from "./types";

export function TemplateCarouselSection({ section, context }: SectionProps<"template-carousel">) {
  return (
    <Section id={section.id} space="carousel">
      <Container size="bleed">
        <div className="overflow-hidden rounded-lg bg-bg pt-3xl pb-2xl md:pt-4xl md:pb-3xl">
          <Reveal>
            <Heading level={headingLevel(context)} align="center" measure="short" text={section.heading} />
            {section.lead && (
              <div className="mt-md px-md">
                <Text size="lead" tone="muted" align="center" text={section.lead} />
              </div>
            )}
          </Reveal>
          <div className="mt-xl md:mt-2xl">
            <CardCarousel cards={section.cards} label={stripMarkup(section.heading)} />
          </div>
          {section.cta && (
            <div className="mt-xl flex justify-center">
              <Button {...section.cta} />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
