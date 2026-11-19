import {
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Icon,
  Link,
  Reveal,
  Section,
  SectionHeader,
  Text,
} from "@/components/ui";
import { headingLevel, type SectionProps } from "./types";

export function PricingSection({ section, context }: SectionProps<"pricing">) {
  const level = headingLevel(context);
  return (
    <Section id={section.id} space="lg-top">
      <Container>
        <div className="max-w-section-head">
          <Reveal>
            <SectionHeader
              level={level}
              eyebrow={section.eyebrow}
              heading={section.heading}
              lead={section.lead}
            />
          </Reveal>
        </div>
        <Grid cols={4} gap="md">
          {section.plans.map((plan) => (
            <Reveal key={plan.name} stretch>
              <Card as="article" radius="md" pad="price" gap="sm" shadow="soft" lift fill>
                <Icon name={plan.icon} size="lg" draw />
                <Heading level={level === 1 ? 2 : 3} size="subhead" text={plan.name} />
                <div className="flex flex-col gap-2xs">
                  <Text as="span" size="amount" text={plan.amount} />
                  {plan.unit && <Text as="small" size="small" tone="muted" text={plan.unit} />}
                </div>
                <Text size="ui" tone="muted" text={plan.description} />
                <ul className="mt-2xs flex flex-1 flex-col gap-xs border-t border-border pt-md">
                  {plan.features.map((feature) => (
                    <li key={feature} className="tick font-display text-ui">
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-lg">
                  <Button {...plan.cta} variant="card" size="card" width="full" />
                </div>
              </Card>
            </Reveal>
          ))}
        </Grid>
        {!section.terms.hidden && (
          <div className="mt-xl text-center font-body text-fine text-text-muted">
            <Link href={section.terms.href} variant="inline">
              {section.terms.label}
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
