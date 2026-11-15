import type { PageInput } from "@/lib/content/schemas/site";

export const gratisProberen = {
  path: "/gratis-proberen",
  title: "Probeer Doodler 14 dagen gratis",
  description:
    "Zie hoe een gesprek een tekening wordt die je cliënt mee naar huis neemt. Vraag 14 dagen gratis toegang tot Doodler aan.",
  sections: [
    {
      type: "trial",
      eyebrow: "Gratis uitproberen",
      heading: "Probeer Doodler 14 dagen gratis",
      leads: [
        "Zie hoe een gesprek een tekening wordt die je cliënt mee naar huis neemt.",
        "Doodler maakt met AI in enkele seconden hoogwaardige tekeningen op basis van bestanden zoals gesprekstranscripties en diagnostiekbrieven. Jij en je cliënt gebruiken die in het gesprek om samen tot een gedeeld beeld te komen van wat er speelt, wat het doel is en hoe de aanpak eruitziet.",
      ],
      card: {
        heading: "Wat je krijgt",
        items: [
          "14 dagen toegang tot Doodler",
          "Voorbeeldcasussen uit de jeugd-ggz en FACT om meteen mee te starten",
          "Een korte kennismaking als je dat fijn vindt, geen verplichting",
        ],
        cta: { label: "Vraag toegang aan", href: "https://form.typeform.com/to/VmMHTpku" },
        note: "Doodler is gemaakt voor zorgprofessionals. Daarom bekijken we elke aanvraag persoonlijk. Je hoort binnen één werkdag van ons.",
      },
    },
  ],
} satisfies PageInput;
