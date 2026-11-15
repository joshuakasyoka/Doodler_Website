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
      heading: "Een visuele lijn *in de zorg*",
      byline: "Door Mayra Kapteijn, oprichter",
      lead: "Doodler is ontstaan vanuit de visie om de zorg meer te organiseren rondom cliënten, in plaats van dat cliënten hun weg in de zorg moeten vinden.",
      thread: "thread-long",
    },
    {
      type: "statement",
      id: "vraag",
      lead: "Na 10 jaar ontwerpend onderzoek in de wereld van zorg en welzijn kreeg ik een heel simpel idee:",
      text: "wat gebeurt er wanneer cliënt en behandelaar elkaar *beter gaan verstaan?*",
    },
    {
      type: "manifest-path",
      steps: [
        {
          thread: "thread-long-alt",
          image: manifestPhoto("manifest-gesprek-aan-tafel"),
          statement: "In een wereld waarin AI nieuwe manieren van werken mogelijk maakt,",
          sub: "vind ik dat we heel goed en diep moeten nadenken over het werk dat mensen, en het werk dat robots zouden moeten doen.",
        },
        {
          thread: "thread-loop",
          image: manifestPhoto("manifest-gang"),
          statement:
            "Wat ik in mijn 10 jaar als social designer heb geleerd is dat behandelaren én cliënten vooral het contact heel erg belangrijk vinden.",
          follow: "Dáár zit het grootste potentieel tot herstel, laat veel onderzoek zien.",
        },
        {
          thread: "thread-alt",
          image: manifestPhoto("manifest-werkplek-printer"),
          statement:
            "Dat contact ontstaat op dit moment vooral *ondanks* de technologie, in plaats van *dankzij* technologie.",
          follow:
            "Mijn visie is om technologie te ontwikkelen die menselijk contact niet vervangt, maar vooral ondersteunt.",
        },
        {
          thread: "thread-alt",
          image: manifestPhoto("manifest-praatplaten-op-tafel"),
          statement:
            "Ik wil de mensen in de zorg superkrachten geven, om zo met harde technologie *zachtere zorg* mogelijk te maken.",
          follow:
            "Want in dat zachte, het contact, het begrip, dáár zit het potentieel om mensen te motiveren, aan gezondheidsvaardigheden te werken, en onderliggende factoren aan te pakken.",
        },
      ],
    },
    {
      type: "statement",
      variant: "statement",
      thread: "thread-loop",
      text: "Ik denk dat zorg niet een “product” is op een markt, die altijd hetzelfde is, onafhankelijk van de ontvanger. Ik zie zorg als een interactie tussen twee personen.",
      follow:
        "En het zorgpotentieel wordt enorm vergroot wanneer die twee personen in die relatie tot hun recht komen.",
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
          linkedin: { href: "#", label: "Mayra Kapteijn op LinkedIn" }, // TODO(link)
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
          linkedin: { href: "#", label: "Nadine Komduur op LinkedIn" }, // TODO(link)
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
          linkedin: { href: "#", label: "Bram van Es op LinkedIn" }, // TODO(link)
        },
        {
          name: "Joshua Green",
          role: "Designer",
          hidden: true,
          bio: "Joshua Green doet een PhD over de ethische aspecten van AI aan de University of the Arts London.",
          image: {
            src: "/images/over-ons/team-joshua-green.webp",
            alt: "Getekend portret van Joshua Green",
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
          linkedin: { href: "#", label: "Joshua Green op LinkedIn" }, // TODO(link)
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
            width: 400,
            height: 400,
          },
          linkedin: { href: "#", label: "Siep Kosse op LinkedIn" }, // TODO(link)
        },
        {
          name: "Ayala Ohyon",
          role: "Voormalig hoofd AI bij Miro",
          bio: "Werkte acht jaar aan AI die teams helpt samen te werken.",
          image: {
            src: "/images/over-ons/advies-ayala-ohyon.webp",
            alt: "Ayala Ohyon",
            width: 500,
            height: 500,
          },
          linkedin: { href: "#", label: "Ayala Ohyon op LinkedIn" }, // TODO(link)
        },
      ],
    },
    {
      type: "cta-panel",
      id: "werken-bij",
      size: "compact",
      icon: "pencils",
      heading: "Wil je *meetekenen?*",
      lead: "Geen vacature die past? Schrijf ons toch: hallo@doodler.app",
      button: {
        label: "Stuur ons een e-mail",
        href: "mailto:hallo@doodler.app?subject=Open%20sollicitatie",
        icon: "mail",
        variant: "light",
      },
    },
  ],
} satisfies PageInput;
