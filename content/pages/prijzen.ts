import type { PageInput } from "@/lib/content/schemas/site";

const plan = { label: "Plan een gesprek", href: "/product#demo", variant: "primary", size: "md" } as const;

export const prijzen = {
  path: "/prijzen",
  title: "Prijzen | Doodler",
  description:
    "Doodler kost € 15 per behandelaar per maand voor maximaal 10 tekensessies. Begin klein met een kerngroep en breid uit wanneer je wilt.",
  sections: [
    {
      type: "pricing",
      id: "prijzen",
      eyebrow: "Prijzen",
      heading: "Betaal alleen voor *wie ermee werkt*",
      lead: "Begin met een kleine groep en breid uit wanneer je wilt.",
      plans: [
        {
          icon: "price-pay-per-use",
          name: "Pay-per-use",
          amount: "€ 2",
          unit: "per gesprek",
          description: "Voor wie het eerst wil proberen",
          features: ["Geen vaste kosten", "Alle standaardtemplates"],
          cta: plan,
        },
        {
          icon: "price-standard",
          name: "Standaard",
          amount: "€ 15",
          unit: "per behandelaar per maand",
          description: "Voor wie Doodler een vaste plek geeft",
          features: ["10 gesprekken"],
          cta: plan,
        },
        {
          icon: "price-plus",
          name: "Plus",
          amount: "€ 25",
          unit: "per behandelaar per maand",
          description: "Voor wie het in veel gesprekken gebruikt",
          features: ["20 gesprekken"],
          cta: plan,
        },
        {
          icon: "price-organisation",
          name: "Voor je organisatie",
          amount: "Op maat",
          description: "Voor teams en instellingen",
          features: ["Adoptieprogramma", "Maatwerk templates", "KPI-rapportage"],
          cta: plan,
        },
      ],
      // TODO(link): no terms page yet
      terms: { label: "Lees onze Algemene Voorwaarden", href: "#" },
    },
    {
      type: "cta-panel",
      id: "demo",
      icon: "people-doodle",
      heading: "Samen doodlen?",
      lead: "In een demo van 20 minuten laten we zien hoe Doodler werkt",
      // TODO(link): the demo booking link
      button: { label: "Plan een demo", href: "#", icon: "calendar-check", variant: "light" },
    },
  ],
} satisfies PageInput;
