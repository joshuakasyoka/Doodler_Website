import type { PageInput } from "@/lib/content/schemas/site";

// Every figure on this page is copied exactly from the pilot report: change them only against the report.
export const onderzoek = {
  path: "/onderzoek",
  title: "Pilotrapport | Praatplaten getest in de ggz",
  description:
    "46 behandelaren van GGz Centraal en Karakter gebruikten Doodler in adviesgesprekken. Lees wat het deed voor begrip en betrokkenheid.",
  sections: [
    {
      type: "page-intro",
      id: "onderzoek",
      sign: "research",
      eyebrow: "Onderzoek",
      heading: "Gebaseerd op wetenschap, *getest in de praktijk*",
      lead: "Doodler is geïnspireerd op de zelfdeterminatietheorie en motiverende gespreksvoering, en ontwikkeld met behandelaren en cliënten. Drie maanden lang gebruikten 46 behandelaren van GGz Centraal en Karakter Doodler in adviesgesprekken in de jeugd-ggz.",
      thread: "thread-mid",
    },
    {
      type: "statement",
      variant: "summary",
      imageSize: "large",
      image: {
        src: "/images/onderzoek/praatplaten-aan-tafel.webp",
        alt: "Vier mensen bespreken uitgeprinte praatplaten aan een tafel",
        width: 1280,
        height: 960,
      },
    },
    {
      type: "stats",
      thread: "thread-branch",
      threadNarrow: "thread-short",
      items: [
        { value: "90%", label: "van de behandelaren zag *meer begrip* bij de cliënt" },
        { value: "85%", label: "zag *meer betrokkenheid*" },
        { value: "8.6", label: "*aanbevelingsscore* van behandelaren" },
      ],
    },
    {
      type: "quote",
      id: "quote",
      thread: "thread",
      text: "Met dit soort plaatjes kan het gesprek sneller to the point komen.",
      cite: "Cliënt, deeltijdgroep Fornhese",
    },
    {
      type: "cta-panel",
      id: "download",
      icon: "paper-download",
      heading: "Download het *pilotrapport*",
      button: {
        label: "Download het pilotrapport",
        href: "https://form.typeform.com/to/Nd4W1Pwj",
        icon: "download-pill",
        variant: "light",
      },
      source: "Bron: pilotrapport GGz Centraal en Karakter",
    },
  ],
} satisfies PageInput;
