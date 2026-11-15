import { Button, Container, Heading, Icon, Reveal, Section, Text, Thread } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function CtaPanelSection({ section, context }: SectionProps<"cta-panel">) {
  return (
    <Section id={section.id} space="inset">
      {section.thread && (
        <Container>
          <Thread name={section.thread} />
        </Container>
      )}
      <Container size="bleed">
        {/* the panel opens up (scale and corners) as it arrives */}
        <div
          className={`scroll-open flex flex-col ${section.size === "compact" ? "py-6xl" : "min-h-final py-2xl"} items-center justify-center gap-lg rounded-lg bg-ink px-2xl text-center text-text-on-media lg:rounded-xl`}
        >
          <Icon name={section.icon} size="panel" draw />
          <Reveal>
            <Heading level={headingLevel(context)} align="center" tone="inherit" text={section.heading} />
          </Reveal>
          {section.lead && (
            <Reveal>
              <Text size="lead" tone="dim" align="center" text={section.lead} />
            </Reveal>
          )}
          <Reveal>
            <Button {...section.button} />
          </Reveal>
          {section.source && <Text size="fine" tone="soft" align="center" text={section.source} />}
        </div>
      </Container>
    </Section>
  );
}
