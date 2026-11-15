/**
 * Everything editable on the site. Only lib/content reads this file; to add a
 * page, create it in ./pages and list it here (see CONTENT.md).
 */
export { site } from "./site";
export { credits } from "./credits";
export { en as translationsEn } from "./translations/en";

import { home } from "./pages/home";
import { product } from "./pages/product";
import { veiligheid } from "./pages/veiligheid";
import { prijzen } from "./pages/prijzen";
import { onderzoek } from "./pages/onderzoek";
import { overOns } from "./pages/over-ons";
import { gratisProberen } from "./pages/gratis-proberen";

/** Pages, keyed by the file they live in (used in error messages). */
export const pages = {
  "content/pages/home.ts": home,
  "content/pages/product.ts": product,
  "content/pages/veiligheid.ts": veiligheid,
  "content/pages/prijzen.ts": prijzen,
  "content/pages/onderzoek.ts": onderzoek,
  "content/pages/over-ons.ts": overOns,
  "content/pages/gratis-proberen.ts": gratisProberen,
};
