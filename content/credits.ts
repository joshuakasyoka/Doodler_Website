import type { CreditInput } from "@/lib/content/schemas/site";

/**
 * Third-party material used on the site: where it came from and under what
 * licence. Entries with `attribution` are shown on the site.
 */
export const credits = [
  {
    subject: "GGz Centraal logo",
    kind: "logo",
    source: "GGz Centraal (pilot partner)",
    licence: "Used with permission of the organisation",
    usedIn: ["/images/logos/ggz-centraal.png"],
    todo: "Confirm written permission to show the logo.",
  },
  {
    subject: "Karakter logo",
    kind: "logo",
    source: "Karakter Kinder- en Jeugdpsychiatrie (pilot partner)",
    licence: "Used with permission of the organisation",
    usedIn: ["/images/logos/karakter.webp"],
    todo: "Confirm written permission to show the logo.",
  },
  {
    subject: "Kinderkliniek Almere logo",
    kind: "logo",
    source: "Kinderkliniek Almere",
    licence: "Used with permission of the organisation",
    usedIn: ["/images/logos/kinderkliniek-almere.webp"],
    todo: "Confirm written permission to show the logo.",
  },
  {
    subject: "Quotes from the pilot (Karin de Rooij, clients, parents, practitioners)",
    kind: "quote",
    source: "Pilot GGz Centraal en Karakter, 2025-2026",
    licence: "Quoted with consent of the participants",
    usedIn: ["/", "/product", "/onderzoek"],
    todo: "Confirm consent records for named quotes.",
  },
  {
    subject: "Manifest, banner, research and testimonial photography",
    kind: "photo",
    source: "Unknown: carried over from the previous site",
    licence: "Unknown",
    usedIn: [
      "/images/over-ons/manifest-gesprek-aan-tafel.webp",
      "/images/over-ons/manifest-gang.webp",
      "/images/over-ons/manifest-werkplek-printer.webp",
      "/images/over-ons/manifest-praatplaten-op-tafel.webp",
      "/images/home/banner-behandelkamer.webp",
      "/images/home/doodle-op-koelkast.webp",
      "/images/onderzoek/praatplaten-aan-tafel.webp",
      "/images/home/testimonial-behandelaar-in-gesprek.webp",
      "/images/home/testimonial-ouder-en-kind.webp",
      "/images/home/testimonial-behandelaar-en-client.webp",
    ],
    todo: "Record the source and licence (own shoot, stock or generated) for each photo.",
  },
  {
    subject: "Bricolage Grotesque",
    kind: "font",
    source: "Mathieu Triay, via Google Fonts",
    licence: "SIL Open Font License 1.1 (app/fonts/OFL-bricolage-grotesque.txt)",
    usedIn: ["app/fonts/bricolage-grotesque-latin-variable.woff2"],
  },
  {
    subject: "DM Sans",
    kind: "font",
    source: "Colophon Foundry, via Google Fonts",
    licence: "SIL Open Font License 1.1 (app/fonts/OFL-dm-sans.txt)",
    usedIn: ["app/fonts/dm-sans-latin-variable.woff2"],
  },
] satisfies CreditInput[];
