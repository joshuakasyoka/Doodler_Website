import { Container, Thread } from "@/components/ui";
import type { SectionProps } from "./types";

export function ThreadSection({ section }: SectionProps<"thread">) {
  return (
    <div id={section.id}>
      <Container>
        <Thread name={section.thread} />
      </Container>
    </div>
  );
}
