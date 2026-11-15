"use client";

import { useEffect } from "react";
import { Button, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { errorCopy } from "@/lib/content/client";

/** Error boundary for every page: a calm message and a retry. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Extension point: report to an error tracker here (see lib/services).
    console.error(error);
  }, [error]);

  return (
    <Section space="top">
      <Container size="narrow" align="center">
        <Stack gap="lg" align="center">
          <Heading level={1} size="display" align="center" text={errorCopy.heading} />
          <Text size="lead" tone="muted" align="center" text={errorCopy.text} />
          <Button label={errorCopy.retry} onClick={reset} />
        </Stack>
      </Container>
    </Section>
  );
}
