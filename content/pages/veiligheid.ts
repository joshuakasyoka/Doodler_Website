import type { PageInput } from "@/lib/content/schemas/site";

export const veiligheid = {
  path: "/veiligheid",
  title: "Veiligheid en privacy | Doodler",
  emphasis: "upright",
  description:
    "Privacy first: persoonsgegevens eruit vóór verwerking, alles in Europa, geen training op jouw data. ISO 27001 en NEN 7510.",
  sections: [
    {
      type: "page-intro",
      id: "veiligheid",
      sign: "shield",
      eyebrow: "Veiligheid",
      heading: "Veiligheid *voorop*",
      lead: "AI-visualisatie kan veel waarde toevoegen, maar moet veilig geborgd worden. Daarom werken we vanaf de start met pseudonimisering en nulretentie, en zijn we AVG-proof.",
      badges: [
        { icon: "badge-check", label: "ISO 27001" },
        { icon: "badge-check", label: "NEN 7510" },
      ],
      thread: "thread-mid",
    },
    {
      type: "statement",
      id: "tijdlijn",
      variant: "title",
      text: "Wat gebeurt er *met jouw tekst?*",
    },
    {
      type: "timeline",
      steps: [
        {
          icon: "step-input",
          title: "Je voert tekst in",
          text: "Een verslag, transcriptie of je eigen steekwoorden.",
        },
        {
          icon: "step-pseudonymise",
          title: "Pseudonimisering",
          text: "Namen en andere herleidbare gegevens worden automatisch gepseudonimiseerd.",
        },
        {
          icon: "step-ai",
          title: "AI maakt een verhaallijn",
          text: "Via Microsoft Azure, in een Europees datacenter en volgens Europese wetgeving.",
        },
        {
          icon: "step-delete",
          title: "De brontekst wordt verwijderd",
          text: "Direct na verwerking, en nooit gebruikt om AI te trainen.",
        },
        {
          icon: "step-store",
          title: "Alleen de doodle blijft bewaard",
          text: "Zonder herleidbare cliëntgegevens en opgeslagen in de veilige omgeving van jouw organisatie.",
        },
      ],
      thread: "thread-out",
    },
    {
      type: "quote",
      id: "quote",
      text: "De samenwerking met Doodler ervaart GGz Centraal als open, zorgvuldig en constructief. Binnen de organisatie is het team: Privacy en Informatiebeveiliging binnen GGz Centraal vanaf het begin bij het ontwikkelproces van Doodler betrokken. Wanneer er vragen en aandachtspunten zijn wordt dit altijd op een fijne manier besproken en zien wij dat Doodler hier met daadkracht op reageert. Wat wij erg waarderen aan Doodler is dat er ten alle tijden transparantie is over de gemaakte keuzes. Voor GGz Centraal is deze open samenwerking essentieel bij het verantwoord innoveren met AI binnen de geestelijke gezondheidszorg.",
      cite: "Anne-Aimée Wollerich, ISO & Privacy Officer GGz Centraal",
      small: true,
    },
    {
      type: "faq",
      id: "documentatie",
      heading: "Vragen over *je gegevens*",
      items: [
        {
          question: "Zijn jullie gecertificeerd?",
          answer: "Ja. Wij zijn ISO 27001 en NEN 7510 gecertificeerd.",
        },
        { question: "Waar staan de gegevens?", answer: "In Europese datacenters, onder Europese wetgeving." },
        {
          question: "Traint het AI-model op onze data?",
          answer:
            "Nee. Je gegevens worden nooit gebruikt om AI te trainen. Niet door ons, en niet door Microsoft.",
        },
        {
          question: "Hoe lang bewaren jullie een doodle?",
          answer: "Zolang jouw organisatie dat wil. Verwijderen kan altijd.",
        },
        {
          question: "Welke documentatie is beschikbaar?",
          answer:
            "Onze standaard verwerkersovereenkomst, DPIA, informatiebeleid, ISO 27001 en NEN 7510 certificaten (vanaf eind november 2026) en verklaring van toepasselijkheid. Mail om deze op te vragen: [jaap@doodler.app](mailto:jaap@doodler.app)",
        },
      ],
      cta: {
        label: "Vraag DPIA documenten op",
        href: "mailto:jaap@doodler.app?subject=Documenten%20aanvragen",
      },
      note: "Een beveiligingsprobleem gezien? Mail [support@doodler.app](mailto:support@doodler.app).",
    },
  ],
} satisfies PageInput;
