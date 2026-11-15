"use client";

import { useEffect, useRef, useState } from "react";
import type { Image as ImageData } from "@/lib/content";
import { Icon } from "./icon";
import { Image } from "./image";
import { RichText } from "./rich-text";
import s from "./card-carousel.module.css";

type CarouselCard = {
  name: string;
  title: string;
  text: string;
  tiles: { image: ImageData; caption: string }[];
};

type CardCarouselProps = { cards: CarouselCard[]; label: string };

const TURN_MS = 3200;

/**
 * A row of cards with one open in the middle; the row moves on by one every
 * few seconds while it is on screen, as on the original (not for reduced
 * motion, and paused while it has keyboard focus). The open card's name and line are shown underneath.
 * Every card's content is in the page for screen readers.
 */
export function CardCarousel({ cards, label }: CardCarouselProps) {
  const n = cards.length;
  const [at, setAt] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      if (timer !== undefined) return; // already turning: keep its rhythm
      timer = setInterval(() => {
        if (!paused.current) setAt((v) => (v + 1) % n);
      }, TURN_MS);
    };
    const stop = () => {
      clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [n]);

  const open = cards[at];
  return (
    <div>
      <div
        ref={stage}
        className={s.stage}
        role="region"
        aria-label={label}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
      >
        <ul className={s.track}>
          {cards.map((card, i) => {
            let d = (((i - at) % n) + n) % n;
            if (d > n / 2) d -= n;
            const offset = Math.max(-2, Math.min(2, d));
            const cls = [s.card, s[`d${offset}`], d === 0 ? s.open : "", Math.abs(d) >= 2 ? s.away : ""].join(
              " ",
            );
            return (
              <li key={card.name} className={cls} aria-current={d === 0 ? "true" : undefined}>
                <div className={s.head}>
                  <strong className={s.title}>
                    <RichText value={card.title} />
                  </strong>
                  <span className={s.plus}>
                    <Icon name="plus" size="sm" />
                  </span>
                </div>
                <div className={s.body}>
                  <p className="sr-only">
                    {card.name}: <RichText value={card.text} />
                  </p>
                  <div className={card.tiles.length > 1 ? s.grid : `${s.grid} ${s.one}`}>
                    {card.tiles.map((tile) => (
                      <figure key={tile.caption} className={s.tile}>
                        <span className={s.img}>
                          <Image image={tile.image} layout="fill" fit="contain" sizes="200px" />
                        </span>
                        <figcaption className={s.caption}>{tile.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {open && (
        <div className={s.desc} aria-hidden="true">
          <strong className={s.descTitle}>{open.name}</strong>
          <span>
            <RichText value={open.text} />
          </span>
        </div>
      )}
    </div>
  );
}
