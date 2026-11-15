import { Button, Card, Container, Grid, Icon, Image, Quote, Reveal, Section, Text } from "@/components/ui";
import type { SectionProps } from "./types";

export function FactsSection({ section, context }: SectionProps<"facts">) {
  const { quote } = section;
  return (
    <Section id={section.id} space="block" label={section.label}>
      <Container>
        <Grid cols={4} gap="md">
          {section.items.map((item) => (
            <Reveal key={item.title} stretch>
              <Card as="article" radius="md" pad="md" gap="xs" fill>
                <span className="mb-xs">
                  <Icon name={item.icon} size="lg" draw />
                </span>
                <Text as="strong" size="card-title" text={item.title} />
                <Text size="ui" tone="muted" text={item.text} />
              </Card>
            </Reveal>
          ))}
        </Grid>
        <div className="mx-auto mt-5xl max-w-photo">
          {quote.image && !quote.image.hidden && (
            <div className="mb-xl">
              <Image
                image={quote.image}
                radius="lg"
                sizes="(min-width: 800px) 760px, 100vw"
                photosHidden={context.photosHidden}
              />
            </div>
          )}
          <Reveal>
            <Quote text={quote.text} name={quote.cite} size="pull" align="center" />
          </Reveal>
        </div>
        <div className="mt-2xl flex justify-center md:mt-3xl">
          <Button {...section.cta} />
        </div>
      </Container>
    </Section>
  );
}
