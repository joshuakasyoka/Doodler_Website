import { Container, Image, Link, Section, Stack, Text } from "@/components/ui";
import type { SectionProps } from "./types";

export function ShowcaseSection({ section, context }: SectionProps<"showcase">) {
  return (
    <Section id={section.id}>
      <Container>
        <Stack gap="xl" align="center">
          <Image
            image={section.image}
            radius="lg"
            sizes="(min-width: 1200px) 1120px, 100vw"
            photosHidden={context.photosHidden}
          />
          <Text as="div" size="big" align="center" text={section.quote} />
          <Link href={section.link.href}>{section.link.label}</Link>
        </Stack>
      </Container>
    </Section>
  );
}
