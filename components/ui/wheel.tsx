"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./wheel.module.css";

type WheelItem = { label: string; note?: string };
type WheelProps = { items: WheelItem[]; label: string };

const TURN_MS = 2800;
const FIRST_MS = 500;

/**
 * A list that turns like a wheel: one item every few seconds, the current one
 * bright in the middle, looping round. It only turns while on screen, and not
 * at all for reduced motion. Screen readers get the plain list once.
 */
export function Wheel({ items, label }: WheelProps) {
  const n = items.length;
  const list = useRef<HTMLUListElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // the wheel opens with two values above the bright one, so the turn has something to come up from
  const [at, setAt] = useState(2);
  const [animate, setAnimate] = useState(false);
  const [offset, setOffset] = useState(0);

  // measure where each item's middle is, so the bright one sits in the centre
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      const li = el.children[at] as HTMLElement | undefined;
      if (li) setOffset(li.offsetTop + li.offsetHeight / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [at]);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let kick: ReturnType<typeof setTimeout> | undefined;
    const turn = () => {
      setAnimate(true);
      setAt((v) => v + 1);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        clearTimeout(kick);
        if (entry?.isIntersecting) {
          kick = setTimeout(turn, FIRST_MS);
          timer = setInterval(turn, TURN_MS);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
      clearTimeout(kick);
    };
  }, []);

  // once the copy has come round, jump back to where the copy and the original look the same
  useEffect(() => {
    if (at < n) return;
    const id = setTimeout(() => {
      setAnimate(false);
      setAt((v) => v - n);
    }, 950);
    return () => clearTimeout(id);
  }, [at, n]);

  // the measured offset is runtime data, applied straight to the element
  useLayoutEffect(() => {
    const el = list.current;
    if (el) el.style.transform = `translateY(${-offset}px)`;
  }, [offset]);

  const doubled = [...items, ...items];
  return (
    <div ref={box} className={s.window}>
      <ul className="sr-only" aria-label={label}>
        {items.map((item) => (
          <li key={item.label}>
            {item.label}
            {item.note ? ` (${item.note})` : ""}
          </li>
        ))}
      </ul>
      <ul ref={list} aria-hidden="true" className={animate ? `${s.list} ${s.turn}` : s.list}>
        {doubled.map((item, i) => {
          const gap = Math.abs((i % n) - (at % n));
          const distance = Math.min(gap, n - gap);
          return (
            <li key={`${item.label}-${i}`} className={distance === 0 ? `${s.item} ${s.on}` : s.item}>
              {item.label}
              {item.note && <span className={s.note}>{item.note}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
