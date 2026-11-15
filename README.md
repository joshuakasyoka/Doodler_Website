# Doodler website

The marketing site for [Doodler](https://doodler.app), rebuilt from the original static HTML as a
Next.js (App Router) site in strict TypeScript. It is static by default, its content is typed and
validated, and it is designed to take new sections and integrations without a rewrite.

> Editing copy, images or pages? See **[CONTENT.md](CONTENT.md)**. You never need to touch a component.

## Scripts

| Command                           | What it does                                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                     | Development server on http://localhost:3000                                                                                |
| `npm run build`                   | Production build. **Fails on any content error** (missing field, bad link, missing image, wrong image size)                |
| `npm run start`                   | Serve the production build                                                                                                 |
| `npm run lint`                    | ESLint (zero warnings), including the architecture rules below                                                             |
| `npm run typecheck`               | Generate route types, then `tsc --noEmit`                                                                                  |
| `npm test`                        | Vitest: schemas, content, registry, icons, markup                                                                          |
| `npm run test:e2e`                | Playwright: builds, then loads every page at 360px and 1440px; fails on console errors or sideways scroll                  |
| `npm run assets:check`            | Lists orphaned files in `/public`, broken content paths, bad names, files over 1 MB                                        |
| `npm run copy:audit`              | Proves every string from the original HTML is in `/content` (writes `COPY-AUDIT.md`; needs `assets-source/original-site/`) |
| `npm run format` / `format:check` | Prettier (with Tailwind class sorting)                                                                                     |
| `npm run check`                   | typecheck + lint + test + assets:check + build                                                                             |

Requires Node ≥ 20.9. First time running e2e tests: `npx playwright install chromium`.

## Architecture

```
app/                     routes: /, /[slug] (every other page), sitemap, robots, OG images, 404, error
  fonts/                 self-hosted variable fonts + their OFL licences
  api/webhooks/payments/ the one Route Handler (extension point, answers 501 until configured)
content/                 ALL copy and image references (typed TS objects) ← editors work here
lib/
  content/               the data layer: the ONLY code that reads /content
    schemas/             Zod schemas: fields, sections, page, site, credits
    index.ts             accessors: getSite(), getPage(path), getPages(), getPagePaths()…
  services/              integration providers (payments stub)
  env.ts                 typed, validated environment (fails the build on bad values)
  icon-names.ts          the typed list of sprite icons
components/
  ui/                    primitives: Button, Heading, Text, Image, Video, Icon, Card, Grid, Stack…
  sections/              one component per section type + registry.ts + render.tsx
  layout/                header, footer, skip link, consent slot
styles/tokens.css        THE design tokens: colour, type, spacing, radii, breakpoints, motion
public/
  images/<page>/<name>   serve-ready images, referenced only from /content
  videos/<page>/<name>   serve-ready videos (each < 1 MB)
  icons/sprite.svg       the single SVG sprite behind <Icon>
assets-source/           originals and masters (git-ignored, see its README)
scripts/                 assets:check, copy:audit, one-off migration scripts
tests/                   unit/ (Vitest) and e2e/ (Playwright)
```

### How a page renders

1. `content/pages/*.ts` describes a page as `{ path, title, description, sections: [...] }`.
2. `lib/content` validates everything with Zod when it is first imported (so at build time),
   checks every image and video exists, that each image's `width`/`height` match the file, and
   adds blur placeholders.
3. `app/[slug]/page.tsx` asks the data layer for the page and hands the sections to
   `components/sections/render.tsx`, which looks each `type` up in the registry.
4. Section components compose primitives from `components/ui`; primitives get their look from
   variants (class-variance-authority) built on the tokens.

Every page is statically generated (`○`/`●` in the build output). Nothing is server-rendered on
request except `POST /api/webhooks/payments`.

### Layering rules (enforced by ESLint)

- **No arbitrary values.** `w-[37px]`, `bg-[#fff]` and inline `style` fail lint. The Tailwind
  theme is reset (`--*: initial`) so _only_ tokens from `styles/tokens.css` exist as utilities.
  Need a new value? Add a token.
- **Sections compose primitives only.** Files in `components/sections` may import only from
  `@/components/ui`, `@/lib` and their own folder, and may not render raw `<button>`, `<a>`,
  `<img>`, `<svg>`, `<video>` or `<h1>`–`<h6>`.
- **Components never import `/content`.** Data arrives as props from `lib/content`.
- **Primitives don't restyle.** They expose variants, not `className`. If a section needs
  something a primitive can't do, add a variant to the primitive.

One documented exception: `components/ui/prompt-draw/` (the home hero animation) computes
per-frame transforms from its clock, so it may use `style`, and its co-located CSS module holds
the app-mockup's own stage coordinates and colours.

### Images and video

- `<Image>` wraps `next/image`: AVIF/WebP, responsive `srcset` with explicit `sizes`, lazy by
  default, `priority` (preload + `fetchpriority=high` + sync decode) only for the LCP image, blur
  placeholders generated at build time, dimensions always reserved.
- `<Video>` renders the poster as a real `next/image`. It autoplays (muted, only while on screen)
  on screens ≥ 768px without Save-Data or reduced motion. Elsewhere content videos show a play
  button and decorative ones stay still, so phones never download video unasked.
- To move to an image CDN, set `NEXT_PUBLIC_IMAGE_CDN_URL`; `lib/images/loader.ts` takes over
  and content paths stay the same.

### Motion

The original site used GSAP + ScrollTrigger. Every effect on it is triggered by time or by
arriving in view (three are tied to the scroll position, which CSS scroll-driven animations now do natively), so the rebuild reproduces them with CSS
and one IntersectionObserver instead of ~45 KB of library, using the same durations and easing
(`--ease-rise` is GSAP's `power3.out`):

| Effect                                                                                             | Where it lives                                                                 |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Hero entrance: header drops in, headline words rise out of a mask, button and animation panel rise | `globals.css` (`.intro-words`, `.intro-cta`, `.intro-panel`), pure CSS on load |
| Fade-up reveals, cascading 0.12 s between neighbours                                               | `<Reveal>` + `MotionObserver` + `globals.css`                                  |
| Hand-drawn icons drawing in                                                                        | `<Icon draw>` (every sprite path has `pathLength="1"`)                         |
| Footer wordmark uncovered from the bottom                                                          | `<Reveal variant="clip">`                                                      |
| Dotted curve through the flow steps, drawn left to right                                           | `<ConnectorTrack>`                                                             |
| Template list turning like a wheel every 2.8 s                                                     | `<Wheel>`                                                                      |
| Header tinting to the section under it, light text over dark panels                                | `components/layout/header-tone.tsx`                                            |
| Pencil drawing the page-intro signs, then lifting away                                             | `<PencilSign>` (drawings in `lib/signs.ts`)                                    |
| Drawn connecting lines uncovered top-down while scrolling                                          | `<Thread>` + `.scroll-uncover` (CSS scroll-driven)                             |
| Product tour video growing over the first screen of scrolling                                      | `.scroll-grow` (CSS scroll-driven)                                             |
| Dark CTA panels opening up (scale, corners) as they arrive                                         | `.scroll-open` (CSS scroll-driven)                                             |
| Product template carousel turning every 3.2 s                                                      | `<CardCarousel>`                                                               |
| Team bios cut to three lines with "Lees meer"                                                      | `<ReadMore>`                                                                   |
| Pencil outline round menu and text links, pencil underline under buttons                           | `outline-target` / `scribble-target` utilities                                 |

Content is never hidden by CSS alone: the observer only hides elements that start below the fold, so
anything on screen at load paints straight away (good for LCP), and nothing hides without JavaScript
or with `prefers-reduced-motion`. One deliberate difference from the original: the template wheel's dimmed items sit at 50% opacity
rather than 28% to keep AA contrast.

### Accessibility

Semantic landmarks (`header`/`nav`/`main`/`footer`), a skip link, one `<h1>` per page (the first
visible section owns it), visible focus rings, an accessible mobile menu (`aria-expanded`, Escape
closes and returns focus), native `<details>` accordions, alt text required by schema, AA
contrast tokens, and `prefers-reduced-motion` respected by every animation (CSS scroll-driven
reveals, icon draw-ins, the hero animation, video).

## Adding a section type

Exactly three places, and TypeScript fails the build until all three agree:

1. **Schema**: in `lib/content/schemas/sections.ts`, define it and add it to `sectionSchema`:
   ```ts
   export const divider = section("divider", { label: text });
   // …and add `divider` to the z.discriminatedUnion([...]) list
   ```
2. **Component**: `components/sections/divider.tsx`:
   ```tsx
   import { Container, Text } from "@/components/ui";
   import type { SectionProps } from "./types";

   export function DividerSection({ section }: SectionProps<"divider">) {
     return (
       <Container align="center">
         <Text size="eyebrow" tone="muted" text={section.label} />
       </Container>
     );
   }
   ```
3. **Registry**: one line in `components/sections/registry.ts`: `divider: DividerSection,`

Then use it in any page: `{ type: "divider", label: "…" }`. Run `npm test`: the registry test
checks every schema has exactly one component. (This exact change was made and reverted to verify
the three-file claim.)

## Adding an integration

Third-party services sit behind provider interfaces in `lib/services`, so nothing else imports a
vendor SDK.

1. Add the env vars to `lib/env.ts` (schema) and `.env.example` (documented).
2. Create `lib/services/<thing>.ts` exporting an interface (extending `ServiceProvider`) and an
   implementation; export an accessor from `lib/services/index.ts`.
3. Server work goes in a Route Handler under `app/api/…`, following
   `app/api/webhooks/payments/route.ts`: read the request, call the provider, answer with a status.
4. Client-side scripts (analytics, chat widgets) load via `next/script` from
   `components/layout/consent-slot.tsx`, and only after consent.

**Payments** (`lib/services/payments.ts`) is stubbed with Stripe in mind: `createCheckoutSession`
(Checkout Sessions with a quantity of seats per plan) and `parseWebhook` (signature check, then
our own `PaymentEvent` type). Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`, install
`stripe`, and fill in the two TODOs. **Analytics and cookie consent** have a named slot
(`ConsentSlot`) that renders nothing until `NEXT_PUBLIC_ANALYTICS_ID` is set. The original site
had no tracking.

## Performance budget

| Metric (Lighthouse mobile)                         | Budget                       | Now                                                                                                                           |
| -------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Performance / Accessibility / Best Practices / SEO | ≥ 95 each                    | Home, Veiligheid, Prijzen, Over ons, Gratis proberen 100/100/100/100 · Onderzoek 93 · Product 89 (both: image LCP, see below) |
| LCP                                                | < 2.5 s                      | 0.8 s (Product 3.3 s simulated)                                                                                               |
| Total Blocking Time                                | < 200 ms                     | 30–110 ms                                                                                                                     |
| CLS                                                | < 0.05                       | 0                                                                                                                             |
| First-load JS (transfer)                           | ≤ 170 KB                     | 152 KB                                                                                                                        |
| Any image in `/public`                             | ≤ 250 KB (≤ 1 MB hard limit) | largest 177 KB                                                                                                                |
| Any video                                          | ≤ 1 MB                       | largest 785 KB                                                                                                                |

**Product and Onderzoek LCP.** On phones the largest thing in the first screen is an image (the tour poster, the research photo). The poster image actually paints at about 150 ms. Lighthouse's simulated
throttling, though, ties an _image_ LCP to every script requested before it, and Next.js
requests its ~150 KB runtime at about 40 ms. Text LCPs (every other page) aren't affected. Options
if 95 on Product matters: a smaller poster above the fold on mobile, or moving the video below
the heading.

Choices that keep it fast: static generation; Server Components with three tiny client leaves
(nav link, mobile menu, video) plus the hero animation, which waits for idle, runs at 30 fps,
pauses off screen and stops for reduced motion; CSS inlined (`experimental.inlineCss`, ~8 KB);
self-hosted fonts with `display: swap`; no animation or UI libraries (GSAP was removed).

## Deployment

Zero-config on Vercel (`next build`). No Vercel-only features are used: the image optimiser,
Route Handler and `experimental.inlineCss` work with `next start` on any Node host. Set
`NEXT_PUBLIC_SITE_URL` per environment so canonical URLs, sitemap and OG tags point at the right
domain. Old `.html` URLs and `/team` 301-redirect to their new paths (`next.config.ts`).
