"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type ReadMoreProps = { children: ReactNode; more: string; less: string };

/**
 * Cuts long text to three lines with a toggle to read the rest, only where the
 * text is actually cut (as the original site did for team bios).
 */
export function ReadMore({ children, more, less }: ReadMoreProps) {
  const box = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = box.current;
    if (el) setCut(el.scrollHeight > el.clientHeight + 1);
  }, []);

  return (
    <div>
      <div ref={box} className={open ? "" : "line-clamp-3"}>
        {children}
      </div>
      {(cut || open) && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="mt-xs font-display text-ui font-medium text-text underline-offset-4 hover:underline"
        >
          {open ? less : more}
        </button>
      )}
    </div>
  );
}
