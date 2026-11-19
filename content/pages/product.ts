import type { PageInput } from "@/lib/content/schemas/site";
import { templateImages } from "../shared/templates";

const tile = (img: { src: string; width: number; height: number }, caption: string) => ({
  caption,
  image: { ...img, alt: caption },
});

export const product = {
  path: "/product",
  // headings on this page keep their accent words upright, as on the original
  emphasis: "upright",
  title: "Zo werkt Doodler | Doodles voor de zorg",
  description:
    "Van verslag, transcriptie of steekwoorden naar een praatplaat. Voor, tijdens of na een gesprek.",
  sections: [
    {
      type: "product-tour",
      id: "product",
      heading: "Een doodle staat *vliegensvlug klaar*",
      lead: "Upload een verslag, transcriptie of typ steekwoorden en binnen 30 seconden ligt er een doodle klaar die je zelf eenvoudig aanpast.",
      video: {
        src: "/videos/product/tour.mp4",
        label: "Rondleiding door Doodler: van gesprekstekst naar doodle",
        poster: {
          src: "/images/product/tour-poster.jpg",
          alt: "",
          decorative: true,
          width: 1920,
          height: 1200,
        },
        width: 1440,
        height: 900,
      },
    },
    {
      type: "facts",
      label: "Kernfeiten",
      items: [
        {
          icon: "fact-fast",
          title: "Vliegensvlug klaar",
          text: "Een doodle in 30 seconden, een losse tekening in enkele seconden.",
        },
        {
          icon: "fact-no-training",
          title: "Geen training nodig",
          text: "Een doodle maak je eenvoudig en intuïtief.",
        },
        {
          icon: "fact-home",
          title: "Doelen mee naar huis",
          text: "Print of deel de doodle na het gesprek.",
        },
        {
          icon: "fact-language",
          title: "In elke taal",
          text: "Laat de doodle automatisch vertalen naar de taal van je cliënt.",
        },
      ],
      quote: {
        text: "Dit wil ik gebruiken om op school te vertellen hoe mijn hoofd werkt.",
        cite: "Jongere, pilot jeugd-ggz",
        image: {
          src: "/images/product/doodle-keukentafel.webp",
          alt: "Een doodle uit een gesprek aan de keukentafel",
          width: 1200,
          height: 900,
          hidden: true,
          hideable: true,
        },
      },
      cta: {
        label: "Download het pilotrapport",
        href: "https://form.typeform.com/to/Nd4W1Pwj",
        icon: "download",
      },
    },
    {
      type: "template-carousel",
      id: "toepassingen",
      heading: "Waar gaat het gesprek *vandaag over?*",
      lead: "Voor elk type gesprek een template dat precies past bij de inhoud van het gesprek.",
      cards: [
        {
          // the original showed this name under the carousel (a data-name attribute)
          name: "Intakegesprek",
          title: "Hier hoop je op. Klopt dat?",
          text: "Sluit de intake af met een doodle die het gesprek samenvat, en check samen met je cliënt of het klopt.",
          tiles: [
            tile(templateImages.krachten[0], "Goed met taal"),
            tile(templateImages.krachten[1], "Blijven proberen"),
            tile(templateImages.krachten[2], "Makkelijk praten met anderen"),
            tile(templateImages.krachten[3], "Goede band met zus"),
          ],
        },
        {
          // the original showed this name under the carousel (a data-name attribute)
          name: "Adviesgesprek",
          title: "Dit lijkt een passende aanpak. Wat denk jij?",
          text: "Upload het verslag vooraf. Krachten, klachten, inzichten en advies komen terug in de doodle.",
          tiles: [
            tile(templateImages.aanpak[0], "Helpen omgaan met gevoelens"),
            tile(templateImages.aanpak[1], "Steun voor jonge helpers"),
            tile(templateImages.aanpak[2], "Ondersteuning voor je ouders"),
            tile(templateImages.aanpak[3], "Afstemming met school"),
          ],
        },
        {
          // the original showed this name under the carousel (a data-name attribute)
          name: "Psychodiagnostiek",
          title: "Zo werkt jouw hoofd",
          text: "Maak van het diagnostisch verslag een verhalende uitleg die je cliënt thuis kan navertellen.",
          tiles: [
            tile(templateImages.inzichten[0], "Zo werkt jouw hoofd"),
            tile(templateImages.inzichten[1], "Spanning in de relatie"),
            tile(templateImages.inzichten[2], "Iemand die je steunt"),
            tile(templateImages.inzichten[3], "Ruimte om te praten"),
          ],
        },
        {
          // the original showed this name under the carousel (a data-name attribute)
          name: "Vrij tekenen",
          title: "Hier wil ik naartoe.",
          text: "Laat Doodler live meetekenen tijdens je gesprekken. Bijvoorbeeld om behandeldoelen scherp te krijgen of een signaleringsplan visueel te maken.",
          tiles: [tile(templateImages.behandelplan, "Hier wil ik naartoe.")],
        },
      ],
      cta: {
        label: "Boek een demo",
        href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
        variant: "primary",
      },
    },
    {
      type: "integrations",
      id: "integraties",
      eyebrow: "Integraties",
      heading: "Binnenkort gekoppeld aan *je favoriete tools*",
      lead: "Zodat je al je werk vanuit één plek blijft doen.",
      // TODO(assets): swap these name tags for the partners' logos once we have them
      items: [
        { icon: "tag-medendo", name: "Medendo", note: "verwacht november 2026" },
        { icon: "tag-vertic", name: "Vertic.AI", note: "verwacht december 2026" },
        { icon: "tag-ontzorgd", name: "Ontzorgd", note: "verwacht december 2026" },
        { icon: "tag-medicore", name: "Medicore", note: "verwacht 2027" },
      ],
    },
    {
      type: "callout",
      id: "veiligheid",
      icon: "shield",
      heading: "Veiligheid voorop",
      text: "Wij anonimiseren alle gegevens automatisch voordat ze in AI worden ingevoerd. Data blijven in Europese datacenters en we gebruiken ze nooit om AI-modellen te trainen.",
      badges: [
        { icon: "badge-check", label: "ISO 27001" },
        { icon: "badge-check", label: "NEN 7510" },
      ],
      link: { label: "Zo gaan we om met jouw gegevens", href: "/veiligheid" },
    },
    {
      type: "faq",
      heading: "Veelgestelde vragen",
      items: [
        {
          question: "Wat is een doodle?",
          answer:
            "Een snelle, met AI gegenereerde tekening van een zorggesprek, die je samen met je cliënt bekijkt en aanpast. Doodler maakt hem op basis van een verslag, transcriptie of steekwoorden.",
        },
        {
          question: "Hebben behandelaren training nodig?",
          answer: "Nee. Log in met het Microsoft-account van je organisatie en begin.",
        },
        {
          question: "Hoe beginnen we?",
          answer:
            "Een paar behandelaren proberen Doodler uit in hun eigen gesprekken. Bevalt het, dan sluit de rest van het team aan.",
        },
        {
          question: "Wat kost Doodler?",
          answer:
            "Doodler is beschikbaar vanaf €2 per gesprek, of €15 per behandelaar per maand. [Prijzen](/prijzen)",
        },
        {
          question: "Werkt Doodler ook buiten de ggz?",
          answer:
            "Doodler is initieel gemaakt voor de ggz. Met onder andere het Institute for Positive Health verkennen we de somatische zorg. Wil jij samenwerken? Mail [mayra@doodler.app](mailto:mayra@doodler.app).",
        },
      ],
    },
    {
      type: "cta-panel",
      id: "demo",
      icon: "people-doodle",
      heading: "Samen doodlen?",
      button: {
        label: "Boek een demo",
        href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
        icon: "calendar-check",
        variant: "light",
      },
    },
  ],
} satisfies PageInput;
