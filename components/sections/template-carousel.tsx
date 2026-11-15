import { CardCarousel, Container, Heading, Link, Reveal, Section } from "@/components/ui";
import { stripMarkup } from "@/lib/content/markup";
import { headingLevel, type SectionProps } from "./types";

export function TemplateCarouselSection({ section, context }: SectionProps<"template-carousel">) {
  return (
    <Section id={section.id} space="carousel">
      <Container size="bleed">
        <div className="overflow-hidden rounded-lg bg-bg pt-3xl pb-2xl md:pt-4xl md:pb-3xl">
          <Reveal>
            <Heading level={headingLevel(context)} align="center" measure="short" text={section.heading} />
          </Reveal>
          <div className="mt-xl md:mt-2xl">
            <CardCarousel cards={section.cards} label={stripMarkup(section.heading)} />
          </div>
          {section.footLink && !section.footLink.hidden && (
            <div className="mt-xl flex justify-center">
              <Link href={section.footLink.href}>{section.footLink.label}</Link>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
