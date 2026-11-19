"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button, Icon, Logo } from "@/components/ui";
import styles from "./mobile-menu.module.css";

type Item = { label: string; href: string; primary?: boolean };

type Props = {
  logoLabel: string;
  navLabel: string;
  openLabel: string;
  closeLabel: string;
  nav: Item[];
  /** Demo and Login: Demo becomes the full-width button, Login joins the links. */
  actions: Item[];
};

/**
 * The small-screen header: a centred pill with the logo and a menu (hamburger) button.
 * Opening it widens the pill into a card that drops down over the page, with
 * the links set large and the primary action as a full-width button.
 * Escape, a tap outside or following a link closes it.
 */
export function MobileMenu({ logoLabel, navLabel, openLabel, closeLabel, nav, actions }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const frame = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!frame.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // the header's primary pill is Login; in the menu the button is for the demo
  const cta = actions.find((a) => !a.primary) ?? actions[0];
  const links = [...nav, ...actions.filter((a) => a !== cta)];
  const isInternal = (href: string) => href.startsWith("/");

  return (
    <div className={styles.root}>
      <div ref={frame} className={styles.frame} data-open={open ? "" : undefined}>
        <div className={styles.card}>
          <div className={styles.bar}>
            <NextLink href="/" aria-label={logoLabel} className={styles.logo}>
              <Logo />
            </NextLink>
            <button
              ref={toggle}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? closeLabel : openLabel}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size="md" />
            </button>
          </div>
          <div id={panelId} className={styles.panel} inert={!open}>
            <div className={styles.inner}>
              <nav aria-label={navLabel}>
                <ul className={styles.links}>
                  {links.map((item) => (
                    <li key={item.href}>
                      {isInternal(item.href) ? (
                        <NextLink
                          href={item.href}
                          className={styles.link}
                          aria-current={pathname === item.href ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </NextLink>
                      ) : (
                        <a
                          href={item.href}
                          className={styles.link}
                          target={item.href.startsWith("https://") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              {cta && (
                <div className={styles.cta}>
                  <Button href={cta.href} label={cta.label} variant="primary" width="full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
