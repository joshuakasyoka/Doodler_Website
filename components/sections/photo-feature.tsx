import { Container, Heading, Image, Link, Reveal, Section } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function PhotoFeatureSection({ section, context }: SectionProps<"photo-feature">) {
  return (
    <Section id={section.id}>
      <Container align="center">
        <Reveal>
          <Heading level={headingLevel(context)} align="center" measure="narrow" text={section.heading} />
        </Reveal>
        <div className="mt-2xl w-full max-w-photo md:mt-3xl">
          <Reveal>
            <Image
              image={section.image}
              radius="lg"
              sizes="(min-width: 800px) 760px, 100vw"
              photosHidden={context.photosHidden}
            />
          </Reveal>
        </div>
        <div className="mt-2xl">
          <Reveal>
            <Link href={section.link.href} icon={section.link.icon}>
              {section.link.label}
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
