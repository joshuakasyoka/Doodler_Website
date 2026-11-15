import { Card, Container, Image, Link, Reveal, Section, Text } from "@/components/ui";
import type { SectionProps } from "./types";

export function LogoStripSection({ section }: SectionProps<"logo-strip">) {
  return (
    <Section id={section.id} space="lg-top">
      <Container align="center">
        <Reveal>
          <Text size="label" align="center" text={section.label} />
        </Reveal>
        <ul className="mt-2xl grid w-full max-w-logos grid-cols-3 gap-xs md:gap-md">
          {section.logos.map((logo) => (
            <Reveal key={logo.name} as="li">
              <Card radius="logo" pad="logo" align="center">
                <Image image={logo.image} layout={`logo-${logo.size}`} fit="contain" ink sizes="200px" />
              </Card>
            </Reveal>
          ))}
        </ul>
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
