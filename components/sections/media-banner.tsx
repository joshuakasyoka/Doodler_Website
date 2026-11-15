import { Button, Container, Heading, Input, Reveal, Section, Stack, Text, Video } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function MediaBannerSection({ section, context }: SectionProps<"media-banner">) {
  const { signup } = section;
  return (
    <Section id={section.id} space="panel">
      <Container size="bleed">
        <div className="relative isolate grid min-h-banner place-items-center overflow-hidden rounded-lg bg-media px-lg py-3xl text-text-on-media md:px-2xl lg:rounded-xl">
          <div className="absolute inset-0 -z-10">
            <Video video={section.video} layout="fill" sizes="(min-width: 1440px) 1408px, 100vw" />
            <div className="absolute inset-0 scrim" />
          </div>
          <Reveal full>
            <Stack gap="lg" align="center">
              <Heading
                level={headingLevel(context)}
                size="title"
                align="center"
                tone="inherit"
                text={section.heading}
              />
              <Text size="lead" tone="dim" align="center" text={section.lead} />
              {/* The address is not sent anywhere yet: the form only opens the trial page. */}
              <form
                action={signup.action}
                method="get"
                className="mt-2xs flex w-full max-w-signup items-center gap-2xs rounded-field border border-on-media-line p-2xs"
              >
                <Input
                  id={`${section.id ?? "banner"}-email`}
                  type="email"
                  tone="media"
                  label={signup.label}
                  placeholder={signup.placeholder}
                  autoComplete="email"
                />
                <Button type="submit" label={signup.button} variant="light" size="md" scribble={false} />
              </form>
            </Stack>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
