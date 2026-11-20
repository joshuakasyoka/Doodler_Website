import type { PageInput } from "@/lib/content/schemas/site";
import { demoCta } from "../shared/demo-cta";

const plan = {
  label: "Plan een gesprek",
  href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
  variant: "primary",
  size: "md",
} as const;

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
      heading: "Een passend pakket *voor elke organisatie*",
      lead: "Test het uit met een kleine groep of neem contact op voor maatwerk implementatie",
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
      // TODO(link): no terms page yet; hidden until there is one
      terms: { label: "Lees onze Algemene Voorwaarden", href: "#", hidden: true },
    },
    demoCta,
  ],
} satisfies PageInput;
