"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui";

type Props = { openLabel: string; closeLabel: string; children: ReactNode };

/**
 * The small-screen menu: an icon button beside the Demo and Login pills and a
 * panel under the header. Escape closes it and returns focus to the button;
 * following a link closes it too.
 */
export function MobileMenu({ openLabel, closeLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapper = useRef<HTMLDivElement>(null);
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
      wrapper.current?.querySelector<HTMLButtonElement>(`[aria-controls="${panelId}"]`)?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, panelId]);

  return (
    <div ref={wrapper} className="lg:hidden">
      <Button
        label={open ? closeLabel : openLabel}
        icon={open ? "close" : "menu"}
        hideLabel
        variant="pill"
        size="icon"
        expanded={open}
        controls={panelId}
        onClick={() => setOpen((v) => !v)}
      />
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mt-xs rounded-md bg-surface p-xs text-text shadow-pill"
      >
        {children}
      </div>
    </div>
  );
}
