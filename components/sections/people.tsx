import {
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  ReadMore,
  Reveal,
  Section,
  SectionHeader,
  Text,
} from "@/components/ui";
import { RichText } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function PeopleSection({ section, context }: SectionProps<"people">) {
  const level = headingLevel(context);
  const people = section.people.filter((person) => !person.hidden);
  const cols = Math.min(people.length, section.columns) as 2 | 3 | 4;
  const sizes =
    cols === 2
      ? "(min-width: 768px) 560px, 100vw"
      : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw";
  return (
    <Section id={section.id} space={section.columns === 2 ? "bottom" : "default"}>
      <Container>
        <Reveal>
          <SectionHeader level={level} eyebrow={section.eyebrow} heading={section.heading} />
        </Reveal>
        <Grid as="ul" cols={cols === 4 ? 4 : cols} gap="md">
          {people.map((person) => (
            <Reveal key={person.name} as="li" stretch>
              <Card as="article" pad="none" gap="none" radius="md" shadow="soft" clip fill>
                <Image
                  image={person.image}
                  radius="bottom"
                  sizes={sizes}
                  photosHidden={context.photosHidden}
                />
                <Card tone="none" pad="person" gap="2xs">
                  <div className="flex items-center justify-between gap-sm">
                    <Heading level={level === 1 ? 2 : 3} size="ui" text={person.name} />
                    <span className="grid size-plus place-items-center text-text-muted">
                      <Link
                        href={person.linkedin.href}
                        icon="linkedin"
                        label={person.linkedin.label}
                        variant="plain"
                      >
                        {null}
                      </Link>
                    </span>
                  </div>
                  <Text as="span" size="fine" tone="muted" text={person.role} />
                  <div
                    className={`mt-xs font-display text-text-muted ${cols === 2 ? "text-ui" : "text-small"}`}
                  >
                    <ReadMore more={context.labels.readMore} less={context.labels.readLess}>
                      <RichText value={person.bio} />
                    </ReadMore>
                  </div>
                </Card>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
