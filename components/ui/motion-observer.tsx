"use client";

import { useEffect } from "react";

const TARGETS = "[data-reveal]:not([data-in]), [data-draw]:not([data-in])";
/** Seconds between neighbours that arrive in the same frame (the original's GSAP stagger). */
const STAGGER = 0.12;
/** Like the original's ScrollTrigger start: "top 88%". */
const START = 0.88;

/**
 * Mounted once in the root layout. Elements marked [data-reveal] or
 * [data-draw] that start below the fold are set to data-pending (hidden by
 * globals.css), then data-in once their top passes 88% of the window, so they
 * fade up or draw in; neighbours that arrive together cascade.
 *
 * Checked on scroll rather than with an IntersectionObserver so that nothing
 * can be skipped: a restored scroll position on refresh, a jump to an anchor
 * or a fast fling reveals everything at or above the line, including content
 * already scrolled past. Anything on screen at load is never hidden.
 */
export function MotionObserver() {
  useEffect(() => {
    const pending = new Set<HTMLElement>();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (el: HTMLElement, delay: number) => {
      el.style.setProperty("--reveal-delay", `${delay}s`);
      el.setAttribute("data-in", "");
      el.removeAttribute("data-pending");
      pending.delete(el);
    };

    const check = () => {
      const line = window.innerHeight * START;
      const arriving = [...pending]
        .map((el) => ({ el, rect: el.getBoundingClientRect() }))
        .filter(({ rect }) => rect.top < line)
        .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
      // only what is actually on screen cascades; content already scrolled past just appears
      let i = 0;
      for (const { el, rect } of arriving) show(el, rect.bottom > 0 ? i++ * STAGGER : 0);
    };

    const collect = (root: ParentNode) => {
      // includes elements marked pending by an earlier mount (React's dev double-mount)
      root.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (reduced) return show(el, 0);
        if (!el.hasAttribute("data-pending") && el.getBoundingClientRect().top < window.innerHeight * START)
          return; // on screen already
        el.setAttribute("data-pending", "");
        pending.add(el);
      });
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        check();
      });
    };

    collect(document);
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // new content after client-side navigation
    const mo = new MutationObserver((records) => {
      const relevant = records.some((r) =>
        [...r.addedNodes].some(
          (n) => n instanceof Element && (n.matches(TARGETS) || n.querySelector(TARGETS)),
        ),
      );
      if (relevant) {
        collect(document);
        onScroll();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);
  return null;
}
