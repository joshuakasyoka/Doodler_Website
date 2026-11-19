import { z } from "zod";
import { button, href, iconName, image, link, markup, quote, text, thread, video } from "./fields";

/**
 * One schema per section type. A page is an ordered array of these.
 *
 * To add a section type (README → "Adding a section type"):
 *   1. add its schema here and to `sectionSchema` below,
 *   2. add its component in components/sections/,
 *   3. add one line to components/sections/registry.ts.
 * TypeScript fails the build until all three agree.
 */

const base = {
  /** Anchor id, so links like /product#demo land here. */
  id: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  /** Kept in content but not rendered. */
  hidden: z.boolean().optional(),
};

const section = <T extends string, S extends z.ZodRawShape>(type: T, shape: S) =>
  z.object({ type: z.literal(type), ...base, ...shape });

/* ---------- Home ---------- */

export const promptDrawDemo = z.object({
  /** Screen-reader description of the whole animation. */
  label: text,
  heading: text,
  dropTitle: text,
  dropHint: text,
  fileName: text,
  phases: z.array(text).length(3),
  editText: text,
  editPlaceholder: text,
  drawLabel: text,
  drawingLabel: text,
  redrawingLabel: text,
  printLabel: text,
  printBusyLabel: text,
  printReadyLabel: text,
  /** The first doodle once it is redrawn with the edit (editText). */
  editImage: image.optional(),
  chapters: z
    .array(
      z.object({
        title: text,
        header: text,
        cards: z.array(z.object({ title: text, image })).length(4),
      }),
    )
    .min(1),
});

export const hero = section("hero", {
  heading: markup,
  lead: markup,
  cta: button,
  demo: promptDrawDemo,
});

export const logoStrip = section("logo-strip", {
  label: markup,
  logos: z
    .array(
      z.object({
        name: text,
        image,
        /** Display height: sm for wide wordmarks, lg for compact marks, so they look equally heavy. */
        size: z.enum(["sm", "md", "lg"]).default("md"),
      }),
    )
    .min(1),
  link,
});

export const mediaBanner = section("media-banner", {
  heading: markup,
  lead: markup,
  video,
  signup: z.object({
    label: text,
    placeholder: text,
    button: text,
    /** Where the form goes (GET); the address is not sent anywhere yet. */
    action: href,
  }),
});

export const proof = section("proof", {
  /** Drawn above the quote, the first fact. */
  icon: iconName,
  /** Drawn above the figure, the second fact. */
  figureIcon: iconName,
  eyebrow: text,
  quote,
  figure: z.object({ value: text, text: markup }),
  source: markup,
});

export const flowSteps = section("flow-steps", {
  heading: markup,
  steps: z.array(z.object({ icon: iconName, title: markup, text: markup })).min(1),
});

export const templateList = section("template-list", {
  heading: markup,
  /** soon: marked with soonLabel ("binnenkort"). */
  items: z.array(z.object({ label: text, soon: z.boolean().optional() })).min(1),
  soonLabel: text,
  cta: button,
});

export const story = section("story", {
  steps: z
    .array(
      z.object({
        title: markup,
        text: markup,
        footnote: markup.optional(),
        image,
        video: video.optional(),
      }),
    )
    .min(1),
});

export const testimonials = section("testimonials", {
  items: z.array(quote.extend({ image })).min(1),
});

export const photoFeature = section("photo-feature", {
  heading: markup,
  image,
  link,
});

export const showcase = section("showcase", {
  image,
  quote: markup,
  link,
});

export const backToTop = section("back-to-top", { button });

/* ---------- Shared across pages ---------- */

export const stats = section("stats", {
  heading: markup.optional(),
  lead: markup.optional(),
  /** Drawn line splitting into one branch per stat. */
  thread: thread.optional(),
  /** The line used instead on narrow screens, where the stats stack. */
  threadNarrow: thread.optional(),
  items: z.array(z.object({ value: text, label: markup })).min(1),
  cta: button.optional(),
});

export const ctaPanel = section("cta-panel", {
  /** full: a tall panel (default); compact: sized to its content. */
  size: z.enum(["full", "compact"]).default("full"),
  /** Drawn line leading into the panel. */
  thread: thread.optional(),
  icon: iconName,
  heading: markup,
  lead: markup.optional(),
  button,
  source: markup.optional(),
});

export const quoteBlock = section("quote", {
  text: markup,
  cite: text,
  /** Set a long quote smaller than the default pull quote. */
  small: z.boolean().optional(),
  /** Drawn line above the quote, leading into it. */
  thread: thread.optional(),
});

export const faq = section("faq", {
  heading: markup,
  items: z.array(z.object({ question: markup, answer: markup })).min(1),
  cta: button.optional(),
  note: markup.optional(),
});

export const pageIntro = section("page-intro", {
  /** The drawing the pencil makes above the title (lib/signs.ts). */
  sign: z.enum(["shield", "research", "manifest"]),
  eyebrow: text,
  heading: markup,
  byline: markup.optional(),
  lead: markup.optional(),
  badges: z.array(z.object({ icon: iconName, label: text })).optional(),
  thread: thread.optional(),
});

export const statement = section("statement", {
  /** Drawn line above the block. */
  thread: thread.optional(),
  image: image.optional(),
  lead: markup.optional(),
  /**
   * big: a large line (40px); title: as large as a section title (54px);
   * summary: as large as the page title, under a photo; statement: a manifest
   * statement with an optional follow-up.
   */
  variant: z.enum(["big", "title", "summary", "statement"]).default("big"),
  text: markup,
  follow: markup.optional(),
});

export const threadDivider = section("thread", { thread });

/* ---------- Product ---------- */

export const productTour = section("product-tour", {
  heading: markup,
  lead: markup,
  video: video.refine((v) => v.label !== undefined, "the product tour video needs a label"),
});

export const facts = section("facts", {
  label: text,
  items: z.array(z.object({ icon: iconName, title: markup, text: markup })).min(1),
  quote: z.object({
    text: markup,
    cite: text,
    image: image.extend({ hidden: z.boolean().optional() }).optional(),
  }),
  cta: button,
});

export const templateCarousel = section("template-carousel", {
  heading: markup,
  /** A line under the heading. */
  lead: markup.optional(),
  cards: z
    .array(
      z.object({
        /** The conversation type, shown under the carousel while the card is open. */
        name: text,
        title: markup,
        text: markup,
        tiles: z.array(z.object({ image, caption: text })).min(1),
      }),
    )
    .min(1),
  cta: button.optional(),
});

export const integrations = section("integrations", {
  eyebrow: text,
  heading: markup,
  lead: markup,
  items: z.array(z.object({ icon: iconName, name: text, note: text })).min(1),
});

export const callout = section("callout", {
  icon: iconName,
  heading: markup,
  text: markup,
  badges: z.array(z.object({ icon: iconName, label: text })).optional(),
  link,
});

/* ---------- Veiligheid ---------- */

export const timeline = section("timeline", {
  steps: z.array(z.object({ icon: iconName, title: markup, text: markup })).min(1),
  thread: thread.optional(),
});

/* ---------- Over ons ---------- */

export const manifestPath = section("manifest-path", {
  steps: z
    .array(
      z.object({
        thread,
        image,
        statement: markup,
        /** Second half of a two-part statement, set smaller on the same line. */
        sub: markup.optional(),
        follow: markup.optional(),
      }),
    )
    .min(1),
});

export const people = section("people", {
  eyebrow: text,
  heading: markup,
  columns: z.union([z.literal(2), z.literal(4)]),
  people: z
    .array(
      z.object({
        name: text,
        role: text,
        bio: markup,
        image,
        /** Side profile shown on hover. */
        sideImage: image.optional(),
        linkedin: z.object({ href, label: text }),
        hidden: z.boolean().optional(),
      }),
    )
    .min(1),
});

/* ---------- Prijzen ---------- */

export const pricing = section("pricing", {
  eyebrow: text,
  heading: markup,
  lead: markup,
  plans: z
    .array(
      z.object({
        icon: iconName,
        name: text,
        amount: text,
        unit: text.optional(),
        description: markup,
        features: z.array(text).min(1),
        cta: button,
      }),
    )
    .min(1),
  terms: link,
});

/* ---------- Gratis proberen ---------- */

export const trial = section("trial", {
  eyebrow: text,
  heading: markup,
  leads: z.array(markup).min(1),
  card: z.object({
    heading: markup,
    items: z.array(markup).min(1),
    cta: button,
    note: markup,
  }),
});

/* ---------- The union ---------- */

export const sectionSchema = z.discriminatedUnion("type", [
  hero,
  logoStrip,
  mediaBanner,
  proof,
  flowSteps,
  templateList,
  story,
  testimonials,
  photoFeature,
  showcase,
  backToTop,
  stats,
  ctaPanel,
  quoteBlock,
  faq,
  pageIntro,
  statement,
  threadDivider,
  productTour,
  facts,
  templateCarousel,
  integrations,
  callout,
  timeline,
  manifestPath,
  people,
  pricing,
  trial,
]);

export type Section = z.output<typeof sectionSchema>;
export type SectionInput = z.input<typeof sectionSchema>;
export type SectionType = Section["type"];
/** Props of one section type, e.g. SectionOf<"hero">. */
export type SectionOf<T extends SectionType> = Extract<Section, { type: T }>;
export type PromptDrawDemo = z.output<typeof promptDrawDemo>;
