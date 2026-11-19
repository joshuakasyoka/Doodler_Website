import type { SiteInput } from "@/lib/content/schemas/site";

/** Site-wide content: header, footer and interface strings. */
export const site = {
  name: "Doodler",

  // The original site showed grey placeholders for most photos ("hide-images").
  // Set to false to show every photo.
  photosHidden: true,

  header: {
    logoLabel: "Doodler",
    navLabel: "Hoofdmenu", // TODO(copy): new string, the original nav had no label
    nav: [
      { label: "Product", href: "/product" },
      { label: "Veiligheid", href: "/veiligheid" },
      { label: "Prijzen", href: "/prijzen" },
      { label: "Onderzoek", href: "/onderzoek" },
      { label: "Over ons", href: "/over-ons" },
    ],
    actions: [
      {
        label: "Demo",
        href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
      },
      { label: "Login", href: "https://start.doodler.app", primary: true },
    ],
    languageToggle: { label: "EN", ariaLabel: "Switch to English", hidden: true },
  },

  footer: {
    wordmarkLabel: "Doodler",
    navLabel: "Footer",
    // hallo@doodler.app and LinkedIn are taken out of the footer for now
    links: [
      { label: "Veiligheid", href: "/veiligheid" },
      { label: "Privacy", href: "#" }, // TODO(link): no privacy page yet
      { label: "Voorwaarden", href: "#" }, // TODO(link): no terms page yet
      { label: "Inloggen", href: "https://start.doodler.app" },
    ],
    legal: "Doodler is een product van Het Verbond B.V., Amsterdam, KvK 92846963.",
  },

  // TODO(copy): the original site had no copy for these; review before launch.
  ui: {
    skipLink: "Naar de inhoud",
    menuOpen: "Menu",
    menuClose: "Sluiten",
    playVideo: "Video afspelen",
    // from the original site's script (team bios cut to three lines)
    readMore: "Lees meer",
    readLess: "Lees minder",
    notFound: {
      title: "Pagina niet gevonden",
      heading: "Deze pagina *bestaat niet*",
      text: "De link klopt niet meer of de pagina is verhuisd.",
      link: { label: "Naar de homepage", href: "/" },
    },
    error: {
      title: "Er ging iets mis",
      heading: "Er ging *iets mis*",
      text: "Probeer het opnieuw. Blijft het misgaan, mail dan [hallo@doodler.app](mailto:hallo@doodler.app).",
      retry: "Probeer opnieuw",
    },
  },
} satisfies SiteInput;
