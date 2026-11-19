import type { PageInput } from "@/lib/content/schemas/site";

// TODO(alt): the four manifest photos had empty alt text in the original; they are
// marked decorative until descriptions are written.
const manifestPhoto = (name: string) => ({
  src: `/images/over-ons/${name}.webp`,
  alt: "",
  decorative: true,
  width: 1000,
  height: 746,
});

export const overOns = {
  path: "/over-ons",
  title: "Over Doodler | Team en raad van advies",
  description:
    "Een klein team uit social design, onderzoek en AI, met adviseurs uit zorg, wetenschap en techniek. Lees het manifest van oprichter Mayra Kapteijn.",
  sections: [
    {
      type: "page-intro",
      id: "manifest",
      sign: "manifest",
      eyebrow: "Manifest",
      heading: "Iedereen regie over hun *eigen gezondheid*",
      byline: "Mayra Kapteijn, oprichter Doodler",
      thread: "thread-long",
    },
    {
      // the opening paragraph, under the line that leads down from the title
      type: "statement",
      id: "inleiding",
      lead: "In een wereld waarin AI nieuwe manieren van werken mogelijk maakt, moeten we goed nadenken over het werk dat mensen, en het werk dat robots zouden moeten doen. Als social designer heb ik in misschien wel honderd interviews door de jaren heen geleerd wat belangrijk is: regie en relatie. Dáár zit het grootste potentieel tot herstel, laat veel onderzoek zien. Maar er is weinig technologie die die dingen nu gemakkelijker maakt, en dus cliënten helpt de regie te voeren in dat contact met de zorg.",
    },
    {
      type: "manifest-path",
      steps: [
        {
          thread: "thread-long-alt",
          image: manifestPhoto("manifest-gesprek-aan-tafel"),
          statement: "“Het zorgpotentieel wordt enorm vergroot wanneer cliënt de regie kan voeren”",
          follow:
            "Na 10 jaar ontwerpend onderzoek in de wereld van zorg en welzijn kreeg ik een heel simpel idee: wat gebeurt er wanneer cliënt, behandelaar en het netwerk als één team gaan samenwerken?",
        },
        {
          thread: "thread-loop",
          image: manifestPhoto("manifest-werkplek-printer"),
          statement:
            "Mijn visie is om technologie te ontwikkelen die menselijk contact niet vervangt, maar vooral gemakkelijker maakt.",
          follow:
            "Om zo met harde technologie, zachtere zorg mogelijk te maken. Want in dat zachte, het contact, het begrip, dáár zit het potentieel om mensen te motiveren, aan gezondheidsvaardigheden te werken, en onderliggende factoren aan te pakken.",
        },
        {
          thread: "thread-alt",
          image: manifestPhoto("manifest-gang"),
          statement:
            "“Met Doodler willen we cliënten, hun netwerk, en behandelaren supercommunicators maken.”",
          follow:
            "Doodler blijft zich doorontwikkelen als platform voor meer regie en betere samenwerking in de zorg. Vandaag de dag werken we met meer dan 50 behandelaren in de zorg. Volgend jaar zijn dat er hopelijk meer dan duizend. We gaan het voor iedereen mogelijk maken om hun gezondheid te begrijpen, en het eigen te maken.",
        },
      ],
    },
    {
      type: "statement",
      variant: "statement",
      thread: "thread-alt",
      image: manifestPhoto("manifest-praatplaten-op-tafel"),
      text: "“Ik denk dat zorg niet een ‘product’ is op een markt, die altijd hetzelfde is, onafhankelijk van de ontvanger. Ik zie zorg als een interactie tussen meerdere personen.”",
    },
    { type: "thread", thread: "thread" },
    {
      type: "people",
      id: "team",
      eyebrow: "Team",
      heading: "Wie *Doodler* maakt",
      columns: 4,
      people: [
        {
          name: "Mayra Kapteijn",
          role: "Oprichter",
          bio: "Mayra Kapteijn heeft een achtergrond in de sociale psychologie en social design. Ze werkte eerder aan Peerby en 29k en leidde social design bureaus (ink). en Het Verbond. Daar werkte ze voor mooie opdrachtgevers als Gemeente Amsterdam, Erasmus Universiteit, ABN AMRO en HEMA. Na zo’n vijftig projecten geleid te hebben ging het ondernemerschap kriebelen, wilde ze zelf iets bouwen. Mayra woont met haar partner en baby op een woonboot in Amsterdam.",
          image: {
            src: "/images/over-ons/team-mayra-kapteijn.webp",
            alt: "Portret van Mayra Kapteijn",
            width: 800,
            height: 800,
          },
          linkedin: {
            href: "https://www.linkedin.com/in/mayrakapteijn/",
            label: "Mayra Kapteijn op LinkedIn",
          },
        },
        {
          name: "Nadine Komduur",
          role: "Merkstrateeg en copywriter",
          bio: "Nadine heeft een achtergrond in economische psychologie, merkstrategie en social design. Eerder werkte ze bij het sociaal ontwerpbureau Afdeling Buitengewone Zaken. Bij Doodler werkt ze mee aan waar het merk voor staat en vertaalt ze dat naar woorden. Nadine woont in Berlijn.",
          image: {
            src: "/images/over-ons/team-nadine-komduur.webp",
            alt: "Portret van Nadine Komduur",
            width: 800,
            height: 800,
          },
          linkedin: {
            href: "https://www.linkedin.com/in/nadine-komduur-a2b83812a/",
            label: "Nadine Komduur op LinkedIn",
          },
        },
        {
          name: "Bram van Es",
          role: "Tech lead",
          bio: "Bram van Es is raketgeleerde en Machine Learning expert. Bij het UMC Utrecht onderzoekt hij wat AI kan doen om hartritmestoornissen te voorspellen. Als tech lead bij Doodler werkt hij aan verantwoorde implementatie. Hij droomt ervan Doodler op zijn eigen AI-model te laten draaien. Bram woont samen met zijn partner en hun kat in Castricum.",
          image: {
            src: "/images/over-ons/team-bram-van-es.webp",
            alt: "Portret van Bram van Es",
            width: 670,
            height: 670,
          },
          linkedin: {
            href: "https://www.linkedin.com/in/bram-van-es-9005913/",
            label: "Bram van Es op LinkedIn",
          },
        },
        {
          name: "Joshua Green",
          role: "Designer",
          bio: "Joshua Green doet een PhD over de ethische aspecten van AI aan de University of the Arts London.",
          image: {
            src: "/images/over-ons/team-joshua-green.webp",
            alt: "Portret van Joshua Green",
            width: 800,
            height: 800,
          },
          sideImage: {
            src: "/images/over-ons/team-joshua-green-profiel.webp",
            alt: "",
            decorative: true,
            width: 764,
            height: 764,
          },
          linkedin: {
            href: "https://www.linkedin.com/in/josh-green-5829641b5/",
            label: "Joshua Green op LinkedIn",
          },
        },
      ],
    },
    {
      type: "people",
      id: "raad-van-advies",
      eyebrow: "Raad van advies",
      heading: "Wie met ons *meedenkt*",
      columns: 2,
      people: [
        {
          name: "Siep Kosse",
          role: "Oud-CEO van Medicore",
          bio: "Leidde vijftien jaar een EPD-leverancier en weet hoe nieuwe zorgtechnologie aansluit op bestaande systemen.",
          image: {
            src: "/images/over-ons/advies-siep-kosse.webp",
            alt: "Siep Kosse",
            width: 1000,
            height: 1000,
          },
          linkedin: { href: "https://www.linkedin.com/in/siepkosse/", label: "Siep Kosse op LinkedIn" },
        },
        {
          name: "Ayala Ohyon",
          role: "Voormalig hoofd AI bij Miro",
          bio: "Werkte acht jaar aan AI die teams helpt samen te werken.",
          image: {
            src: "/images/over-ons/advies-ayala-ohyon.webp",
            alt: "Ayala Ohyon",
            width: 1000,
            height: 1000,
          },
          linkedin: { href: "https://www.linkedin.com/in/ayalaohyon/", label: "Ayala Ohyon op LinkedIn" },
        },
      ],
    },
    {
      type: "cta-panel",
      id: "werken-bij",
      size: "compact",
      icon: "pencils",
      heading: "Wil je *meetekenen?*",
      lead: "Geen vacature die past? Schrijf ons toch: mayra@doodler.app",
      button: {
        label: "Stuur ons een e-mail",
        href: "mailto:mayra@doodler.app?subject=Open%20sollicitatie",
        icon: "mail",
        variant: "light",
      },
    },
  ],
} satisfies PageInput;
