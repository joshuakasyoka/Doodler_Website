import { Container, Grid, Heading, Image, Section, Stack, Text, Video } from "@/components/ui";
import type { SectionProps } from "./types";

export function StorySection({ section, context }: SectionProps<"story">) {
  return (
    <Section id={section.id}>
      <Container>
        <Stack gap="head">
          {section.steps.map((step) => (
            <Grid key={step.title} cols="split" gap="2xl">
              <Stack gap="md" align="start">
                <Heading level={2} size="subhead" text={step.title} />
                <Text tone="muted" text={step.text} />
                {step.footnote && <Text size="small" tone="muted" text={step.footnote} />}
              </Stack>
              {step.video ? (
                <Video
                  playLabel={context.labels.playVideo}
                  video={step.video}
                  radius="md"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              ) : (
                <Image
                  image={step.image}
                  radius="md"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  photosHidden={context.photosHidden}
                />
              )}
            </Grid>
          ))}
        </Stack>
      </Container>
    </Section>
  );
}
