import { Button, Card, Container, Heading, Section, Wheel } from "@/components/ui";
import { stripMarkup } from "@/lib/content/markup";
import { headingLevel, type SectionProps } from "./types";

export function TemplateListSection({ section, context }: SectionProps<"template-list">) {
  const items = section.items.map((item) => ({
    label: item.label,
    note: item.soon ? section.soonLabel : undefined,
  }));
  return (
    <Section id={section.id} space="panel-y">
      <Container size="bleed">
        <Card tone="ink" radius="xl" pad="none" clip>
          <div className="flex min-h-wheel flex-col items-center gap-xl px-md pt-4xl pb-2xl text-center lg:flex-row lg:gap-3xl lg:px-3xl lg:py-0 lg:text-left">
            <div className="lg:flex-1">
              <Heading level={headingLevel(context)} size="intro" tone="inherit" text={section.heading} />
            </div>
            <div className="w-full self-stretch lg:flex-2">
              <Wheel items={items} label={stripMarkup(section.heading)} />
            </div>
            <div className="flex justify-center lg:flex-1 lg:justify-end">
              <Button {...section.cta} />
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
