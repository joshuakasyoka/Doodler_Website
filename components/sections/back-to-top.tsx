import { Button, Container, Section } from "@/components/ui";
import type { SectionProps } from "./types";

export function BackToTopSection({ section }: SectionProps<"back-to-top">) {
  return (
    <Section id={section.id} space="tight">
      <Container align="center">
        <Button {...section.button} />
      </Container>
    </Section>
  );
}
