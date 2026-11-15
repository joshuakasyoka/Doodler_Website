import { Container, Icon, Quote, Section, Stat, Text } from "@/components/ui";
import type { SectionProps } from "./types";

/**
 * Two facts from the pilot, one per scroll. The stage sticks while the section
 * is tall, and CSS scroll timelines crossfade the facts and draw each icon.
 * Without scroll timelines (or with reduced motion) both facts show at once.
 */
export function ProofSection({ section }: SectionProps<"proof">) {
  return (
    <Section id={section.id} space="none" label={section.eyebrow}>
      <div className="proof-scroll">
        <div className="proof-stage">
          <Container align="center">
            <div className="proof-marks mb-lg">
              <div className="proof-mark proof-mark-1">
                <Icon name={section.icon} size="mark" draw />
              </div>
              <div className="proof-mark proof-mark-2">
                <Icon name={section.figureIcon} size="mark" />
              </div>
            </div>
            <div className="proof-dip">
              <Text as="span" size="eyebrow" tone="muted" text={section.eyebrow} />
            </div>
            <div className="proof-facts mt-lg w-full max-w-proof">
              <div className="proof-fact proof-fact-1">
                <Quote
                  text={section.quote.text}
                  name={section.quote.name}
                  role={section.quote.role}
                  size="xl"
                  align="center"
                />
                <Source text={section.source} className="proof-source-1" />
              </div>
              <div className="proof-fact proof-fact-2">
                <Stat inline value={section.figure.value} label={section.figure.text} />
                <Source text={section.source} />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}

/**
 * Each fact carries the source line, so the spacing follows whichever fact is
 * showing (the facts share one slot, which is as tall as the taller one).
 */
function Source({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className ? `mt-md ${className}` : "mt-md"}>
      <Text size="fine" tone="muted" align="center" text={text} />
    </div>
  );
}
