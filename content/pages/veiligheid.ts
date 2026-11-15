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
      heading: "Veiligheid *scherp in beeld*",
      lead: "In een zorggesprek deelt je cliënt het meest persoonlijke dat er is. Daarom verwerkt Doodler zo min mogelijk gegevens, alleen in Europa. Je invoer wordt direct verwijderd en nooit gebruikt om AI te trainen.",
      badges: [
        { icon: "badge-check", label: "ISO 27001" },
        { icon: "badge-check", label: "NEN 7510" },
        { icon: "badge-check", label: "AVG" },
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
          title: "Persoonsgegevens gaan eruit",
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
      // TODO(copy): placeholder until the interview with Matthijs Jantzen (GGz Centraal) gives the quote
      text: "[Quote van Matthijs Jantzen, GGz Centraal, over hoe GGz Centraal Doodler heeft beoordeeld en ingevoerd]",
      cite: "Matthijs Jantzen, GGz Centraal",
    },
    {
      type: "faq",
      id: "documentatie",
      heading: "Vragen over *je gegevens*",
      items: [
        {
          question: "Zijn jullie gecertificeerd?",
          answer: "Ja. Doodler is ISO 27001 en NEN 7510 gecertificeerd.",
        },
        { question: "Waar staan de gegevens?", answer: "In Europese datacenters, onder Europese wetgeving." },
        {
          question: "Traint het AI-model op onze data?",
          answer: "Nee. Je brontekst wordt niet bewaard en niet gebruikt om modellen te trainen.",
        },
        {
          question: "Hoe lang bewaren jullie een praatplaat?",
          answer: "Zolang jouw organisatie dat wil. Verwijderen kan altijd.",
        },
        {
          question: "Is er een verwerkersovereenkomst en DPIA?",
          answer: "Ja, op verzoek, net als onze verklaring van toepasselijkheid en certificaten.",
        },
      ],
      cta: {
        label: "Vraag DPIA documenten op",
        href: "mailto:support@doodler.app?subject=Documenten%20aanvragen",
      },
      note: "Een beveiligingsprobleem gezien? Mail [support@doodler.app](mailto:support@doodler.app).",
    },
  ],
} satisfies PageInput;
