import { Container, Reveal, Section, SectionHeader, Tag } from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function IntegrationsSection({ section, context }: SectionProps<"integrations">) {
  return (
    <Section id={section.id} space="lg">
      <Container align="center">
        <Reveal>
          <SectionHeader
            level={headingLevel(context)}
            eyebrow={section.eyebrow}
            heading={section.heading}
            lead={section.lead}
            align="center"
          />
        </Reveal>
        <div className="w-full max-w-tags">
          <Reveal>
            <ul className="grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item) => (
                <li key={item.name} className="flex">
                  <Tag icon={item.icon} label={item.name} note={item.note} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
