/**
 * The template doodles, shared by the home hero animation and the Product
 * template carousel. Each image is referenced from content by path.
 */
const tile = (src: string, height = 514) => ({ src, width: 1040, height });

export const templateImages = {
  /** krachten-1 redrawn with a book on the table: the hero animation's edit */
  krachtenBoek: tile("/images/templates/krachten-1-boek.webp", 442),
  krachten: [
    tile("/images/templates/krachten-1.webp", 442),
    tile("/images/templates/krachten-2.webp"),
    tile("/images/templates/krachten-3.webp"),
    tile("/images/templates/krachten-4.webp"),
  ],
  klachten: [
    tile("/images/templates/klachten-1.webp"),
    tile("/images/templates/klachten-2.webp"),
    tile("/images/templates/klachten-3.webp"),
    tile("/images/templates/klachten-4.webp"),
  ],
  inzichten: [
    tile("/images/templates/inzichten-1.webp"),
    tile("/images/templates/inzichten-2.webp"),
    tile("/images/templates/inzichten-3.webp"),
    tile("/images/templates/inzichten-4.webp"),
  ],
  aanpak: [
    tile("/images/templates/aanpak-1.webp"),
    tile("/images/templates/aanpak-2.webp"),
    tile("/images/templates/aanpak-3.webp"),
    tile("/images/templates/aanpak-4.webp", 442),
  ],
  behandelplan: tile("/images/templates/behandelplan-hier-wil-ik-naartoe.webp", 580),
} as const;
