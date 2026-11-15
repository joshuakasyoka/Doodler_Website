# Editing the Doodler website

Everything you can read on the site lives in the **`content/`** folder. You never need to open
`components/` or `app/`. If you make a mistake (an empty field, a broken link, an image that
doesn't exist), the build stops and tells you exactly which file and field to fix, so nothing
broken can go live.

```
content/
  site.ts                header menu, footer, and interface text (menu button, 404 page…)
  pages/home.ts          one file per page
  pages/product.ts
  pages/veiligheid.ts
  pages/prijzen.ts
  pages/onderzoek.ts
  pages/over-ons.ts
  pages/gratis-proberen.ts
  shared/templates.ts    the template doodles used on Home and Product
  credits.ts             where third-party logos, photos, quotes and fonts come from
  translations/en.ts     English versions captured from the old site (not live yet)
```

## Change some text

1. Open the page's file, e.g. `content/pages/prijzen.ts`.
2. Find the sentence and change only the text between the quotes:
   ```ts
   lead: "Begin met een kleine groep en breid uit wanneer je wilt.",
   ```
3. Save, then run `npm run dev` and check http://localhost:3000.

Small formatting codes work in any text:

| Write                                  | You get                                            |
| -------------------------------------- | -------------------------------------------------- |
| `Herstel *in beeld*`                   | Herstel _in beeld_ (the italic accent in headings) |
| `[Prijzen](/prijzen)`                  | a link to the Prijzen page                         |
| `[mail ons](mailto:hallo@doodler.app)` | an email link                                      |
| `\\*`                                  | a literal asterisk, e.g. for a footnote marker     |

Links must start with `/` (a page on this site), `#` (a spot on the same page),
`https://` or `mailto:`.

**Hiding without deleting.** Add `hidden: true` to any section (or a team member) to take it
off the site while keeping it in the file. Several old sections are kept this way; search for
`hidden: true`.

**Placeholders still to fill in.** Search the content folder for `TODO`. Links set to `"#"`
(Privacy, Voorwaarden, LinkedIn, demo booking, pilot report download) and the Matthijs Jantzen
quote are waiting for real values.

## Add or replace an image

1. **Export it** at the size in the table below (2× the largest size it is shown, for sharp
   phones and retina screens), as **JPEG** (photos), **PNG** (logos, drawings with transparency)
   or **WebP**. Keep each file under 250 KB where you can; the hard limit is 1 MB. The site
   makes the modern AVIF/WebP versions and smaller sizes for you.
2. **Name it** in lowercase with dashes, no spaces or version numbers:
   `team-mayra-kapteijn.jpg`, not `Mayra FINAL v2.JPG`.
3. **Put it** in `public/images/<page>/`, e.g. `public/images/over-ons/`.
4. **Reference it** in the content file with all four fields:
   ```ts
   image: {
     src: "/images/over-ons/team-mayra-kapteijn.jpg",
     alt: "Portret van Mayra Kapteijn",   // what the image shows, for screen readers
     width: 800,                           // the file's real pixel size
     height: 800,
   },
   ```
   Use `alt: ""` with `decorative: true` only for purely decorative images.
5. Run `npm run assets:check`. It lists any image no page uses and any path that points
   nowhere. Delete images you no longer use.

The build checks that the file exists and that `width` and `height` match the file's real
proportions.

Keep originals (camera RAW, PSD, Figma exports, big masters) out of `public/`; put them in
`assets-source/` (see its README).

### Recommended image sizes

| Where                                      | Shown at most (CSS px) | Export at   | Format                | Notes                                                       |
| ------------------------------------------ | ---------------------- | ----------- | --------------------- | ----------------------------------------------------------- |
| Home banner poster (behind the video)      | 1200                   | 2400 × 1350 | JPEG                  | current file is 1024 wide: fine, it's dimmed behind a scrim |
| Home "Reist mee tot de koelkastdeur" photo | 1120                   | 2240 wide   | JPEG                  | current 1280                                                |
| Logo strip                                 | 44 high (≈ 200 wide)   | 400 wide    | PNG with transparency | shown in one colour                                         |
| Template doodles (hero and Product)        | 240 per tile           | 1040 wide   | WebP/PNG              |                                                             |
| Product tour poster                        | 1120                   | 1920 × 1200 | JPEG                  | the first frame of the video                                |
| Onderzoek / Over ons wide photos           | 768                    | 1536 wide   | JPEG                  | manifest photos are 1000 wide now                           |
| Team portraits (4 across)                  | 280                    | 800 × 800   | JPEG                  | square                                                      |
| Advisor portraits (2 across)               | 500                    | 800 × 800   | JPEG                  | square                                                      |
| Testimonial photos (hidden section)        | 400                    | 1000 × 1000 | JPEG                  | square                                                      |
| Story drawings (hidden section)            | 560                    | 1120 × 630  | WebP/PNG              | current 704: re-export before un-hiding                     |
| Social share image (optional `ogImage`)    | 1200                   | 1200 × 630  | JPEG                  | otherwise generated from the title                          |

## Add a video

Same rules as images: `public/videos/<page>/<name>.mp4`, H.264, no audio track, under 1 MB
(about 10–30 seconds at 1280 px wide). Every video needs a `poster` image, and a `label`
describing it unless it is purely decorative.

## Add a page

1. Copy an existing page file, e.g. `content/pages/gratis-proberen.ts` →
   `content/pages/nieuwe-pagina.ts`, and rename the exported name (`export const nieuwePagina`).
2. Set `path: "/nieuwe-pagina"`, a `title` (shown in the browser tab and search results) and a
   `description` (one or two sentences for search results).
3. Build the page from **sections**. Each has a `type` and its fields. The section types in use:

   | Type                | Looks like                                                                   |
   | ------------------- | ---------------------------------------------------------------------------- |
   | `hero`              | big title, intro, button and the drawing animation (home)                    |
   | `page-intro`        | drawn icon, small label, big centred title (Veiligheid, Onderzoek, Over ons) |
   | `product-tour`      | title, intro and a video                                                     |
   | `pricing`           | price cards                                                                  |
   | `trial`             | title on the left, a card with a checklist and a button on the right         |
   | `logo-strip`        | a row of partner logos                                                       |
   | `media-banner`      | a rounded banner with video, title and email field                           |
   | `proof`             | a quote next to a big figure                                                 |
   | `flow-steps`        | three icons with a title and text                                            |
   | `template-list`     | dark panel with a list of conversation types                                 |
   | `template-carousel` | swipeable cards with example doodles                                         |
   | `facts`             | four small cards, a quote and a button                                       |
   | `stats`             | three big figures                                                            |
   | `statement`         | a large centred sentence, optionally with photo and intro                    |
   | `manifest-path`     | photos and statements connected by drawn lines                               |
   | `timeline`          | numbered steps going down the page                                           |
   | `integrations`      | labelled chips                                                               |
   | `callout`           | a card with an icon, title, text and link                                    |
   | `people`            | team or advisor cards                                                        |
   | `faq`               | questions that open and close                                                |
   | `quote`             | a large centred quote                                                        |
   | `cta-panel`         | dark panel with icon, title and button                                       |
   | `photo-feature`     | title, photo and link                                                        |
   | `thread`            | just a drawn connecting line                                                 |

   Your editor autocompletes the fields once you type `type: "…"`, and the build tells you what
   is missing.

4. Register the page in `content/index.ts` by adding one line to `pages`:
   ```ts
   "content/pages/nieuwe-pagina.ts": nieuwePagina,
   ```
5. To add it to the menu, add `{ label: "Nieuwe pagina", href: "/nieuwe-pagina" }` to
   `header.nav` in `content/site.ts`.

The sitemap, search-engine tags and the social share image are generated for you.

## Image migration map (old site → this site)

Old paths are relative to `Doodler Website/site/assets/img/`. Images the old pages no longer
used were not migrated (`cta*`, `quote-behandelaar-1/1b/1c/2/2b`, `quote-ouder`, `-2`, `-3`,
`team-*-side` (except Joshua's), `team-mayra.webp`, `team-nadine.webp`, `team-bram.webp`,
`advisor-lee`, `statement.webp`, `practice-room`, `step-3.orig`, `step-text`, `step-adjust`,
`step-overview`, `doodle-advies/diagnostiek/intake`, `logo-*.webp/png`); they remain in the old
folder.

| Old                                       | New                                                       |
| ----------------------------------------- | --------------------------------------------------------- |
| `hero.webp`                               | `/images/home/banner-behandelkamer.webp`                  |
| `statement-fridge.webp`                   | `/images/home/doodle-op-koelkast.webp`                    |
| `step-1.webp`                             | `/images/home/story-verwarde-client.webp`                 |
| `step-2.webp`                             | `/images/home/story-client-tekent-mee.webp`               |
| `step-3.webp`                             | `/images/home/story-samen-over-doodle.webp`               |
| `quote-behandelaar-1d.webp`               | `/images/home/testimonial-behandelaar-in-gesprek.webp`    |
| `quote-ouder-4.webp`                      | `/images/home/testimonial-ouder-en-kind.webp`             |
| `quote-behandelaar-3.webp`                | `/images/home/testimonial-behandelaar-en-client.webp`     |
| `mock/krachten-1…4.webp`                  | `/images/templates/krachten-1…4.webp`                     |
| `mock/klachten-1…4.webp`                  | `/images/templates/klachten-1…4.webp`                     |
| `mock/inzichten-1…4.webp`                 | `/images/templates/inzichten-1…4.webp`                    |
| `mock/aanpak-1…4.webp`                    | `/images/templates/aanpak-1…4.webp`                       |
| `doodle-behandelplan.webp`                | `/images/templates/behandelplan-hier-wil-ik-naartoe.webp` |
| `product-keukentafel.webp`                | `/images/product/doodle-keukentafel.webp`                 |
| `doodler-tour-poster.jpg`                 | `/images/product/tour-poster.jpg`                         |
| `statement-2.webp`                        | `/images/onderzoek/praatplaten-aan-tafel.webp`            |
| `story-1.webp`                            | `/images/over-ons/manifest-gesprek-aan-tafel.webp`        |
| `story-2.webp`                            | `/images/over-ons/manifest-gang.webp`                     |
| `story-3.webp`                            | `/images/over-ons/manifest-werkplek-printer.webp`         |
| `story-4.webp`                            | `/images/over-ons/manifest-praatplaten-op-tafel.webp`     |
| `team-mayra-photo.webp`                   | `/images/over-ons/team-mayra-kapteijn.webp`               |
| `team-nadine-photo.webp`                  | `/images/over-ons/team-nadine-komduur.webp`               |
| `team-bram-photo.webp`                    | `/images/over-ons/team-bram-van-es.webp`                  |
| `team-joshua.webp`                        | `/images/over-ons/team-joshua-green.webp`                 |
| `team-joshua-side.webp`                   | `/images/over-ons/team-joshua-green-profiel.webp`         |
| `advisor-siep.webp`                       | `/images/over-ons/advies-siep-kosse.webp`                 |
| `advisor-ayala.webp`                      | `/images/over-ons/advies-ayala-ohyon.webp`                |
| GGz Centraal logo (base64 in `site.css`)  | `/images/logos/ggz-centraal.png`                          |
| Karakter logo (base64 in `site.css`)      | `/images/logos/karakter.webp`                             |
| Kinderkliniek logo (base64 in `site.css`) | `/images/logos/kinderkliniek-almere.webp`                 |
| `../favicon.svg`                          | `app/icon.svg`                                            |
| `../logo.svg` + 53 inline SVGs            | symbols in `/icons/sprite.svg`                            |

Videos (old: `site/assets/media/`, re-encoded to H.264 without audio and under 1 MB; originals
in `assets-source/videos/`):

| Old                         | New                                        | Size    |
| --------------------------- | ------------------------------------------ | ------- |
| `hero.mp4` (2.4 MB)         | `/videos/home/banner-behandelkamer.mp4`    | 0.77 MB |
| `doodler-tour.mp4` (2.3 MB) | `/videos/product/tour.mp4`                 | 0.75 MB |
| `step-1.mp4` (2.4 MB)       | `/videos/home/story-verwarde-client.mp4`   | 0.17 MB |
| `step-2.mp4` (0.6 MB)       | `/videos/home/story-client-tekent-mee.mp4` | 0.17 MB |
| `step-3.mp4` (0.7 MB)       | `/videos/home/story-samen-over-doodle.mp4` | 0.23 MB |
