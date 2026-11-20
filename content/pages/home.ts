import type { PageInput } from "@/lib/content/schemas/site";
import { demoCta } from "../shared/demo-cta";
import { templateImages } from "../shared/templates";

const deco = (img: { src: string; width: number; height: number }) => ({ ...img, alt: "", decorative: true });

export const home = {
  path: "/",
  title: "Doodler | Doodles voor de zorg",
  description:
    "Doodler maakt vliegensvlug praatplaten van je zorggesprekken. Samen aanpassen en mee naar huis. Gemaakt met behandelaren en cliënten in de ggz.",
  sections: [
    {
      type: "hero",
      heading: "Herstel *in beeld*",
      lead: "Maak in 30 seconden een doodle voor wat jij en je cliënt bespreken. Geef deze visuele praatplaat mee naar huis en help je cliënt de regie te nemen.",
      cta: {
        label: "Plan een demo",
        href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
        icon: "calendar",
        variant: "primary",
      },
      demo: {
        label:
          "Een verslag wordt op Doodler gesleept, Doodler tekent per onderdeel vier doodles, je stapt door de onderdelen en print het resultaat",
        heading: "Adviesgesprek",
        dropTitle: "Sleep je verslag hierheen",
        dropHint: "Tekst, PDF of Word",
        fileName: "verslag-adviesgesprek.docx",
        phases: ["Persoonlijke gegevens verwijderen…", "Verhaallijn maken…", "Verhaallijn uittekenen…"],
        editText: "Zet een boek op tafel",
        editPlaceholder: "Beschrijf wat er anders moet in de tekening",
        drawLabel: "Tekenen",
        drawingLabel: "Tekenen...",
        redrawingLabel: "Opnieuw tekenen…",
        printLabel: "Printen",
        printBusyLabel: "PDF voorbereiden…",
        printReadyLabel: "Klaar om te printen",
        editImage: deco(templateImages.krachtenBoek),
        chapters: [
          {
            title: "Krachten",
            header: "Dit lijkt goed te gaan. Klopt dat?",
            cards: [
              { title: "Goed met taal", image: deco(templateImages.krachten[0]) },
              { title: "Blijven proberen", image: deco(templateImages.krachten[1]) },
              { title: "Makkelijk praten met anderen", image: deco(templateImages.krachten[2]) },
              { title: "Goede band met zus", image: deco(templateImages.krachten[3]) },
            ],
          },
          {
            title: "Klachten",
            header: "Dit lijkt lastig te gaan. Klopt dat?",
            cards: [
              { title: "Druk hoofd", image: deco(templateImages.klachten[0]) },
              { title: "Moeizaam slapen", image: deco(templateImages.klachten[1]) },
              { title: "Moeilijk overzicht houden", image: deco(templateImages.klachten[2]) },
              { title: "Lastige emoties", image: deco(templateImages.klachten[3]) },
            ],
          },
          {
            title: "Inzichten",
            header: "Hier lijkt de verklaring te liggen. Klopt dat?",
            cards: [
              { title: "Anderen niet willen belasten", image: deco(templateImages.inzichten[0]) },
              { title: "Botsing thuis", image: deco(templateImages.inzichten[1]) },
              { title: "Gevoelig door stress", image: deco(templateImages.inzichten[2]) },
              { title: "Veel willen zorgen", image: deco(templateImages.inzichten[3]) },
            ],
          },
          {
            title: "Aanpak",
            header: "Dit lijkt een passende aanpak. Wat denk jij?",
            cards: [
              { title: "Helpen omgaan met gevoelens", image: deco(templateImages.aanpak[0]) },
              { title: "Steun voor jonge helpers", image: deco(templateImages.aanpak[1]) },
              { title: "Ondersteuning voor je ouders", image: deco(templateImages.aanpak[2]) },
              { title: "Afstemming met school", image: deco(templateImages.aanpak[3]) },
            ],
          },
        ],
      },
    },
    {
      type: "logo-strip",
      label: "Al in de behandelkamer bij",
      logos: [
        {
          name: "GGz Centraal",
          size: "md",
          image: { src: "/images/logos/ggz-centraal.png", alt: "GGz Centraal", width: 1206, height: 495 },
        },
        {
          name: "Karakter",
          size: "sm",
          image: { src: "/images/logos/karakter.webp", alt: "Karakter", width: 693, height: 131 },
        },
        {
          name: "Kinderkliniek Almere",
          size: "lg",
          image: {
            src: "/images/logos/kinderkliniek-almere.webp",
            alt: "Kinderkliniek Almere",
            width: 533,
            height: 231,
          },
        },
      ],
      link: { label: "Lees hun verhalen", href: "/onderzoek" },
    },
    {
      type: "media-banner",
      id: "samen",
      heading: "Zij aan zij *met je cliënt*",
      lead: "Met een doodle hebben jij en je cliënt letterlijk hetzelfde beeld voor ogen. Zo werk je makkelijker samen aan één doel.",
      image: {
        src: "/images/home/banner-behandelkamer.webp",
        alt: "Een behandelaar en een cliënt bespreken samen een uitgeprinte doodle aan tafel",
        width: 1920,
        height: 1436,
      },
    },
    {
      type: "proof",
      id: "bewijs",
      icon: "papers-pencil",
      figureIcon: "people-doodle",
      eyebrow: "Uit het pilotonderzoek",
      quote: {
        text: "Het verlevendigt het gesprek en geeft houvast voor alle partijen.",
        name: "Karin de Rooij",
        role: "gz-psycholoog GGz Centraal",
      },
      figure: { value: "90%", text: "van de cliënten heeft liever adviesgesprekken met dan zonder doodles" },
      source: "Bron: pilot GGz Centraal en Karakter, 2025-2026",
    },
    {
      type: "flow-steps",
      id: "werkwijze",
      heading: "Voor elk moment *van zorg*",
      steps: [
        {
          icon: "flow-before",
          title: "Voor het gesprek",
          text: "Upload een verslag of brief en begin het gesprek vanuit een sterk visueel startpunt.",
        },
        {
          icon: "flow-during",
          title: "Tijdens het gesprek",
          text: "Maak doelen, voortgang en inzichten samen met je cliënt visueel en breng meer energie in de behandelkamer.",
        },
        {
          icon: "flow-after",
          title: "Na het gesprek",
          text: "Maak van de transcriptie een doodle die je direct aan je cliënt mee naar huis geeft.",
        },
      ],
    },
    {
      type: "template-list",
      id: "toepassingen",
      heading: "Een passend template *voor elk type gesprek*",
      items: [
        { label: "Intakegesprek" },
        { label: "Adviesgesprek" },
        { label: "Psychodiagnostiek" },
        { label: "Live tekenen" },
        { label: "Behandelgesprek", soon: true },
        { label: "Medicatiegesprek", soon: true },
        { label: "Signaleringsplan" },
      ],
      // the original site added this tag through CSS (content: "binnenkort")
      soonLabel: "binnenkort",
      cta: {
        label: "Bekijk de templates",
        href: "/product#toepassingen",
        variant: "outline-light",
      },
    },
    {
      type: "story",
      id: "story",
      hidden: true,
      steps: [
        {
          title: "Cliënt en behandelaar volgen elkaar niet altijd",
          text: "De toekomst van de zorg draait om slimmer samenwerken en de cliënt de regie geven. Dat kan alleen wanneer je dezelfde taal spreekt en hetzelfde doel voor ogen hebt. Nu volgt de gemiddelde cliënt maar de helft van een zorggesprek.\\*",
          footnote: "\\* Kessels, R.P.C. (2003)",
          image: {
            src: "/images/home/story-verwarde-client.webp",
            alt: "Getekende behandelaar aan het bureau en een verwarde cliënt met een kluwen in de tekstballon",
            width: 704,
            height: 396,
          },
          video: {
            src: "/videos/home/story-verwarde-client.mp4",
            poster: {
              src: "/images/home/story-verwarde-client.webp",
              alt: "",
              decorative: true,
              width: 704,
              height: 396,
            },
            width: 1280,
            height: 720,
          },
        },
        {
          title: "Samenwerking lukt beter als je elkaar verstaat",
          text: "Als jij en je cliënt precies hetzelfde voor ogen hebben, is het makkelijker om samen gericht aan behandeldoelen te werken.",
          image: {
            src: "/images/home/story-client-tekent-mee.webp",
            alt: "Getekende cliënt tekent op papier aan de salontafel terwijl de behandelaar meekijkt",
            width: 704,
            height: 396,
          },
          video: {
            src: "/videos/home/story-client-tekent-mee.mp4",
            poster: {
              src: "/images/home/story-client-tekent-mee.webp",
              alt: "",
              decorative: true,
              width: 704,
              height: 396,
            },
            width: 1280,
            height: 720,
            once: true,
          },
        },
        {
          title: "Eén team, één taak",
          text: "Met Doodler vertaal je zorggesprekken naar duidelijke praatplaten: doodles. Zo kan je cliënt thuis makkelijk navertellen wat jullie bespraken en werken jij, cliënt en het netwerk gemakkelijker samen aan dezelfde doelen.",
          image: {
            src: "/images/home/story-samen-over-doodle.webp",
            alt: "Getekende behandelaar en cliënt buigen zich samen over een doodle op de salontafel",
            width: 704,
            height: 396,
          },
          video: {
            src: "/videos/home/story-samen-over-doodle.mp4",
            poster: {
              src: "/images/home/story-samen-over-doodle.webp",
              alt: "",
              decorative: true,
              width: 704,
              height: 396,
            },
            width: 1280,
            height: 720,
            once: true,
          },
        },
      ],
    },
    {
      type: "stats",
      id: "onderzoek",
      hidden: true,
      heading: "Gevoed door wetenschap, getest in de praktijk",
      lead: "Onderzoek laat zien dat beelden gesprekken beter te volgen maken en leiden tot een meer doelgerichte behandeling.\\* Wij testten dit met de praatplaten van Doodler: drie maanden lang, met 46 behandelaren van GGz Centraal en Karakter, in ongeveer 150 adviesgesprekken.",
      items: [
        {
          value: "64%",
          label:
            "van de cliënten bekeek de praatplaat thuis terug of liet deze aan iemand in hun netwerk zien.",
        },
        { value: "85%", label: "van de behandelaren ervaarden meer betrokkenheid bij cliënten." },
        { value: "74%", label: "van de behandelaren verwachtte sneller behandeldoelen te behalen." },
      ],
      cta: {
        label: "Download het pilotrapport",
        href: "https://form.typeform.com/to/Nd4W1Pwj",
        icon: "download",
      },
    },
    {
      type: "testimonials",
      id: "quotes",
      hidden: true,
      items: [
        {
          text: "“Het verlevendigt het gesprek en geeft houvast voor alle partijen.”",
          name: "Karin de Rooij",
          role: "GZ-psycholoog",
          image: {
            src: "/images/home/testimonial-behandelaar-in-gesprek.webp",
            alt: "Portret van een behandelaar in gesprek met een cliënt",
            width: 1000,
            height: 1000,
          },
        },
        {
          text: "“De tekeningen zijn heel verhelderend, dat maakt het gesprek interactiever dan wanneer er alleen een verslag besproken wordt.”",
          name: "Ouder",
          role: "Cliëntfeedback",
          image: {
            src: "/images/home/testimonial-ouder-en-kind.webp",
            alt: "Een ouder en kind met een behandelaar aan tafel",
            width: 1000,
            height: 1000,
          },
        },
        {
          text: "“Ongelooflijk dat je zo snel zo’n uitdraai hebt. Dat kan niet op tegen je eigen tekenkunsten.”",
          name: "Behandelaar",
          role: "GGz Centraal",
          image: {
            src: "/images/home/testimonial-behandelaar-en-client.webp",
            alt: "Een behandelaar en een cliënt in gesprek aan tafel",
            width: 1000,
            height: 1000,
          },
        },
      ],
    },
    {
      type: "photo-feature",
      id: "praktijk",
      heading: "Een doodle reist mee *tot aan de keukentafel*",
      image: {
        src: "/images/home/doodle-op-koelkast.webp",
        alt: "Een uitgeprinte doodle over de aanpak hangt met een magneet op de koelkast",
        width: 1280,
        height: 703,
      },
      link: {
        label: "Plan een demo",
        href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
        icon: "arrow-link",
      },
    },
    {
      type: "showcase",
      id: "showcase",
      hidden: true,
      image: {
        src: "/images/home/doodle-op-koelkast.webp",
        alt: "Een uitgeprinte doodle over de aanpak hangt met een magneet op de koelkast",
        width: 1280,
        height: 703,
      },
      quote: "Onze missie is om elke cliënt aan het roer te laten staan van hun eigen herstel.",
      link: { label: "Bekijk ons manifest", href: "/over-ons#manifest" },
    },
    { ...demoCta, id: "cta", hidden: true },
    {
      type: "back-to-top",
      hidden: true,
      button: { label: "Terug naar boven", href: "#top", icon: "arrow-up", variant: "light" },
    },
  ],
} satisfies PageInput;
