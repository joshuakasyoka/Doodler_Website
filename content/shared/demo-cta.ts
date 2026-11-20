/**
 * The demo panel that closes a page, the same everywhere it appears (Pricing, Product, Home):
 * edit it here once.
 */
export const demoCta = {
  type: "cta-panel",
  id: "demo",
  icon: "people-doodle",
  heading: "Samen doodlen?",
  lead: "In een demo van 20 minuten laten we zien hoe Doodler werkt",
  button: {
    label: "Plan een demo",
    href: "https://calendar.google.com/appointments/schedules/AcZssZ3lTYadtR0IyEfnAs3Oost8-qK9OhRkZN835YrY8t5sIv2aIQKr5GuA235Qi73tZpPJHtjfc4-_",
    icon: "calendar-check",
    variant: "light",
  },
} as const;
