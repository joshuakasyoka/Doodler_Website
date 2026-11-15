import {
  Button,
  Container,
  Grid,
  Reveal,
  Section,
  SectionHeader,
  Stack,
  Stat,
  Thread,
} from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function StatsSection({ section, context }: SectionProps<"stats">) {
  // without a heading of their own (the research findings) the stats are white cards on a branching line
  const cards = !section.heading;
  return (
    <Section id={section.id} space={section.thread ? "none" : "default"}>
      <Container align="center">
        {section.heading && (
          <SectionHeader
            level={headingLevel(context)}
            heading={section.heading}
            lead={section.lead}
            align="center"
          />
        )}
        {section.thread && <Thread name={section.thread} shape="wide" show="wide-screens" />}
        {section.threadNarrow && <Thread name={section.threadNarrow} show="narrow-screens" />}
        <Stack gap="2xl" align="center">
          <div className="w-full max-w-findings">
            <Grid cols={3} gap="xl">
              {section.items.map((item) => (
                <Reveal key={item.value + item.label}>
                  <Stat
                    card={cards}
                    value={item.value}
                    label={item.label}
                    labelLevel={cards ? 2 : undefined}
                    align="center"
                  />
                </Reveal>
              ))}
            </Grid>
          </div>
          {section.cta && <Button {...section.cta} />}
        </Stack>
      </Container>
    </Section>
  );
}
