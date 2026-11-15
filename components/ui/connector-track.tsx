"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./connector-track.module.css";

/**
 * Lays its children out and, on wide screens, threads a dotted hand-drawn
 * curve through every element marked data-dot (the white circles of the flow
 * steps). The dots are uncovered left to right once the track is in view.
 */
export function ConnectorTrack({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState("");
  const [box, setBox] = useState("0 0 0 0");
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const draw = () => {
      const t = el.getBoundingClientRect();
      const pts = [...el.querySelectorAll<HTMLElement>("[data-dot]")].map((d) => {
        const r = d.getBoundingClientRect();
        // layout position: ignore any reveal transform still running
        const shift = new DOMMatrixReadOnly(getComputedStyle(d.closest("[data-reveal]") ?? d).transform).m42;
        return [r.left - t.left + r.width / 2, r.top - t.top - shift + r.height / 2] as [number, number];
      });
      setBox(`0 0 ${t.width} ${t.height}`);
      if (pts.length < 2) return setPath("");
      const first = pts[0]!;
      const last = pts[pts.length - 1]!;
      // a short lead-in before the first circle and a rising run-on after the last
      pts.unshift([first[0] - 140, first[1] - 6]);
      pts.push([t.width + 20, last[1] - 34]);
      // a smooth curve through the points (Catmull-Rom as cubic Béziers)
      let d = `M${pts[0]![0]} ${pts[0]![1]}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i]!;
        const p1 = pts[i]!;
        const p2 = pts[i + 1]!;
        const p3 = pts[i + 2] ?? p2;
        d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
      }
      setPath(d);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
          setTimeout(draw, 1000); // after the steps have finished rising
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={track} className="relative">
      <svg className={s.line} viewBox={box} aria-hidden="true" data-drawn={drawn || undefined}>
        <mask id="connector-reveal" maskUnits="userSpaceOnUse" x="-4000" y="-1000" width="8000" height="3000">
          <path className={s.ink} d={path} pathLength={1} />
        </mask>
        <path className={s.dots} d={path} mask="url(#connector-reveal)" />
      </svg>
      {children}
    </div>
  );
}
