"use client";

import { useEffect, useRef } from "react";
import { signs, type SignName } from "@/lib/signs";
import s from "./pencil-sign.module.css";

/**
 * The drawn sign above the manifest-style page titles: a pencil draws each
 * stroke in turn with a short lift between strokes, then lifts away and fades,
 * leaving the drawing. Fully drawn (and no pencil) without JavaScript or for
 * reduced motion. Ported from the original site's site.js.
 */
export function PencilSign({ name }: { name: SignName }) {
  const sign = signs[name];
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = svg.current;
    if (!root) return;
    const lines = [...root.querySelectorAll<SVGPathElement>(`.${s.line}`)];
    const pen = root.querySelector<SVGGElement>(`.${s.pen}`);
    const lens = lines.map((l) => l.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    const pt = (i: number, d: number) => lines[i]!.getPointAtLength(d);
    const origin = pt(0, 0);
    const last = lines.length - 1;
    const finish = pt(last, lens[last]!);
    const moveTo = (x: number, y: number) =>
      pen?.setAttribute("transform", `translate(${x - origin.x} ${y - origin.y})`);
    const ink = (i: number, d: number) => {
      const l = lines[i]!;
      l.style.strokeDasharray = `${lens[i]}`;
      l.style.strokeDashoffset = `${lens[i]! - d}`;
    };
    root.setAttribute("data-ready", "");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((_, i) => ink(i, lens[i]!));
      if (pen) pen.style.opacity = "0";
      return;
    }

    const WRITE = sign.write;
    const LIFT = 260;
    const AWAY = 700;
    const RISE = 60;
    type Step = { draw?: number; from?: DOMPoint; to?: DOMPoint; dur: number };
    const steps: Step[] = [];
    lines.forEach((_, i) => {
      steps.push({ draw: i, dur: (WRITE * lens[i]!) / total });
      if (i < last) steps.push({ from: pt(i, lens[i]!), to: pt(i + 1, 0), dur: LIFT });
    });
    const drawn = steps.reduce((a, st) => a + st.dur, 0);
    const ease = (k: number) => (1 - Math.cos(Math.PI * k)) / 2;

    lines.forEach((_, i) => ink(i, 0));
    let start: number | undefined;
    let raf = 0;
    const frame = (now: number) => {
      start ??= now;
      let t = now - start;
      if (t < drawn) {
        let done = 0;
        for (const st of steps) {
          if (t >= st.dur) {
            t -= st.dur;
            if (st.draw !== undefined) {
              ink(st.draw, lens[st.draw]!);
              done = st.draw + 1;
            }
            continue;
          }
          const k = ease(t / st.dur);
          if (st.draw !== undefined) {
            const d = k * lens[st.draw]!;
            const p = pt(st.draw, d);
            ink(st.draw, d);
            moveTo(p.x, p.y);
            done = st.draw + 1;
          } else if (st.from && st.to) {
            moveTo(st.from.x + (st.to.x - st.from.x) * k, st.from.y + (st.to.y - st.from.y) * k);
          }
          break;
        }
        for (let i = done; i < lines.length; i++) ink(i, 0);
      } else {
        lines.forEach((_, i) => ink(i, lens[i]!));
        const k = Math.min(1, (t - drawn) / AWAY);
        const e = ease(k);
        moveTo(finish.x + RISE * e, finish.y - RISE * e);
        if (pen) pen.style.opacity = `${1 - e}`;
        if (k === 1) return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [sign]);

  return (
    <svg ref={svg} className={s.sign} viewBox={sign.viewBox} aria-hidden="true" focusable="false">
      {sign.lines.map((d) => (
        <path key={d} className={s.line} d={d} />
      ))}
      {/* the pencil's own artwork, from lib/signs.ts (trusted, generated from the original site) */}
      <g className={s.pen} dangerouslySetInnerHTML={{ __html: sign.pen }} />
    </svg>
  );
}
