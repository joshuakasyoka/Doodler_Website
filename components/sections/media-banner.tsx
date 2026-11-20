import { Container, Heading, Image, Reveal, Section, Stack, Text, Video } from "@/components/ui";
import { SignupForm } from "./signup-form";
import { headingLevel, type SectionProps } from "./types";

export function MediaBannerSection({ section, context }: SectionProps<"media-banner">) {
  const { signup } = section;
  return (
    <Section id={section.id} space="panel">
      <Container size="bleed">
        <div className="relative isolate grid min-h-banner place-items-center overflow-hidden rounded-lg bg-media px-lg py-3xl text-text-on-media md:px-2xl lg:rounded-xl">
          <div className="absolute inset-0 -z-10">
            {section.image ? (
              <Image
                image={section.image}
                layout="fill"
                quality="backdrop"
                sizes="(min-width: 1440px) 1408px, 100vw"
              />
            ) : (
              section.video && (
                <Video video={section.video} layout="fill" sizes="(min-width: 1440px) 1408px, 100vw" />
              )
            )}
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
              {signup && (
                <SignupForm
                  id={`${section.id ?? "banner"}-email`}
                  label={signup.label}
                  placeholder={signup.placeholder}
                  button={signup.button}
                  action={signup.action}
                />
              )}
            </Stack>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
