import { Card, Container, Grid, Image, Quote, Section } from "@/components/ui";
import type { SectionProps } from "./types";

export function TestimonialsSection({ section, context }: SectionProps<"testimonials">) {
  return (
    <Section id={section.id}>
      <Container>
        <Grid cols={3}>
          {section.items.map((item) => (
            <Card key={item.name + item.text} as="figure" pad="none" clip>
              <Image
                image={item.image}
                sizes="(min-width: 768px) 33vw, 100vw"
                photosHidden={context.photosHidden}
              />
              <Card tone="none" pad="md">
                <Quote text={item.text} name={item.name} role={item.role} />
              </Card>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
