"use client";

import { useEffect } from "react";

/**
 * The header takes the colour of the full-width block under it (beige over
 * beige, dark over the dark panels, with its text turning light), as on the
 * original site. Only the elements at one point are checked, once per frame.
 */
export function HeaderTone() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const under = (y: number) => {
      for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
        if (header.contains(el)) continue;
        if (el.getBoundingClientRect().width < window.innerWidth - 40) continue; // full width, or inset a little
        const bg = getComputedStyle(el).backgroundColor;
        if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
      }
      return getComputedStyle(document.body).backgroundColor;
    };
    const update = () => {
      const bg = under(header.getBoundingClientRect().bottom - 2);
      header.style.setProperty("--under", bg);
      const [r = 255, g = 255, b = 255] = (bg.match(/[\d.]+/g) ?? []).map(Number);
      header.toggleAttribute("data-on-dark", 0.299 * r + 0.587 * g + 0.114 * b < 110);
    };
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
