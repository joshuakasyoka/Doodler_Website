import type { SectionType } from "@/lib/content";
import { BackToTopSection } from "./back-to-top";
import { CalloutSection } from "./callout";
import { CtaPanelSection } from "./cta-panel";
import { FactsSection } from "./facts";
import { FaqSection } from "./faq";
import { FlowStepsSection } from "./flow-steps";
import { HeroSection } from "./hero";
import { IntegrationsSection } from "./integrations";
import { LogoStripSection } from "./logo-strip";
import { ManifestPathSection } from "./manifest-path";
import { MediaBannerSection } from "./media-banner";
import { PageIntroSection } from "./page-intro";
import { PeopleSection } from "./people";
import { PhotoFeatureSection } from "./photo-feature";
import { PricingSection } from "./pricing";
import { ProductTourSection } from "./product-tour";
import { ProofSection } from "./proof";
import { QuoteSection } from "./quote";
import { ShowcaseSection } from "./showcase";
import { StatementSection } from "./statement";
import { StatsSection } from "./stats";
import { StorySection } from "./story";
import { TemplateCarouselSection } from "./template-carousel";
import { TemplateListSection } from "./template-list";
import { TestimonialsSection } from "./testimonials";
import { ThreadSection } from "./thread";
import { TimelineSection } from "./timeline";
import { TrialSection } from "./trial";
import type { SectionComponent } from "./types";

/**
 * Section `type` → component. The schema for each type lives in
 * lib/content/schemas/sections.ts; TypeScript requires exactly one entry
 * here per schema, so a missing or misspelled type fails the build.
 */
export const registry: { [T in SectionType]: SectionComponent<T> } = {
  hero: HeroSection,
  "logo-strip": LogoStripSection,
  "media-banner": MediaBannerSection,
  proof: ProofSection,
  "flow-steps": FlowStepsSection,
  "template-list": TemplateListSection,
  story: StorySection,
  testimonials: TestimonialsSection,
  "photo-feature": PhotoFeatureSection,
  showcase: ShowcaseSection,
  "back-to-top": BackToTopSection,
  stats: StatsSection,
  "cta-panel": CtaPanelSection,
  quote: QuoteSection,
  faq: FaqSection,
  "page-intro": PageIntroSection,
  statement: StatementSection,
  thread: ThreadSection,
  "product-tour": ProductTourSection,
  facts: FactsSection,
  "template-carousel": TemplateCarouselSection,
  integrations: IntegrationsSection,
  callout: CalloutSection,
  timeline: TimelineSection,
  "manifest-path": ManifestPathSection,
  people: PeopleSection,
  pricing: PricingSection,
  trial: TrialSection,
};
