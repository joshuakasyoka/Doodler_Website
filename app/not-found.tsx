import type { Metadata } from "next";
import { Button, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { getSite } from "@/lib/content";

const copy = getSite().ui.notFound;

export const metadata: Metadata = { title: copy.title, robots: { index: false } };

export default function NotFound() {
  return (
    <Section space="top">
      <Container size="narrow" align="center">
        <Stack gap="lg" align="center">
          <Heading level={1} size="display" align="center" text={copy.heading} />
          <Text size="lead" tone="muted" align="center" text={copy.text} />
          <Button href={copy.link.href} label={copy.link.label} />
        </Stack>
      </Container>
    </Section>
  );
}
