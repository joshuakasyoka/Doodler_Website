"use client";

/**
 * PromptDraw: the scripted, looping hero animation on the home page.
 * Every frame is a pure function of one clock `t` (seconds), so the loop is
 * deterministic and can be paused or frozen on any moment.
 *
 *   1. A verslag is dragged onto the card; Doodler works through its phases.
 *   2. A 2 × 2 grid of doodles builds; one is edited and redrawn; the stepper
 *      walks through the sections.
 *   3. Printen is clicked, the PDF is prepared, and the loop starts again.
 *
 * Ported from the original site's bundle (app-animation/src/PromptDraw.jsx).
 * All copy and images arrive as props from content. Per-frame transforms and
 * opacities are computed values, so this file may use `style` (see README).
 */
import { getImageProps } from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react";
import type { PromptDrawDemo } from "@/lib/content";
import { Icon } from "../icon";
import s from "./prompt-draw.module.css";

const W = 1280;
const TYPE = 0.045; // seconds per typed character

function timeline(demo: PromptDrawDemo) {
  const grab = 0.6;
  const hover = 1.45;
  const drop = 1.95;
  const gen = drop + 0.45;
  const phase = demo.phases.map((_, i) => gen + 0.2 + i * 0.85);
  const flowIn = gen + 2.55;
  const frames = flowIn + 0.25;
  const draws = flowIn + 0.6;
  const pick = flowIn + 3.0;
  const barIn = pick + 0.25;
  const inputClick = pick + 0.95;
  const typeStart = inputClick + 0.1;
  const typeEnd = typeStart + demo.editText.length * TYPE;
  const drawClick = typeEnd + 0.55;
  const drawn = drawClick + 1.8;
  const barOut = drawn + 0.7;
  const stepIn = barOut + 0.2;
  const first = barOut + 1.1;
  const next = Array.from({ length: Math.max(0, demo.chapters.length - 1) }, (_, i) => first + i * 1.6);
  const lastNext = next[next.length - 1] ?? first;
  const stepOut = lastNext + 1.3;
  const printClick = stepOut + 0.95;
  const printReady = printClick + 0.9;
  const fadeOut = printReady + 1.0;
  const loop = fadeOut + 0.8;
  return {
    grab,
    hover,
    drop,
    gen,
    phase,
    flowIn,
    frames,
    draws,
    edit: { pick, barIn, inputClick, typeStart, typeEnd, drawClick, drawn, barOut },
    stepIn,
    next,
    stepOut,
    printClick,
    printReady,
    fadeOut,
    loop,
  };
}
type Timeline = ReturnType<typeof timeline>;

// pointer path (only the dragged file follows it)
const OFF: [number, number] = [1330, 700];
const PICK: [number, number] = [1170, 600];
/**
 * Narrow boxes zoom in on the app card (300, 104, 680 × 394), trimming the
 * backdrop to an even 26px round it: just room for the step tabs and the edit
 * bar, which hang a little below the card.
 */
const CROP = { x: 274, y: 78, w: 732, h: 446 };
/** Below this box width (CSS px) the cropped view is used. */
const CROP_BELOW = 640;
/** In the cropped view the file waits over the card's bottom-right corner, inside the frame. */
const PICK_CROP: [number, number] = [870, 470];
const DROP: [number, number] = [640, 300];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const pop = (p: number) => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const within = (t: number, a: number, b: number) => t >= a && t < b;

function fileAt(t: number, T: Timeline, crop: boolean): [number, number] {
  const pick = crop ? PICK_CROP : PICK;
  const path: [number, number, number][] = [
    [0, ...OFF],
    [0.3, ...pick],
    [T.grab, ...pick],
    [T.drop - 0.1, ...DROP],
    [T.drop + 0.25, ...DROP],
  ];
  for (let i = 1; i < path.length; i++) {
    const [t1, x1, y1] = path[i]!;
    const [t0, x0, y0] = path[i - 1]!;
    if (t <= t1) {
      const p = ease(prog(t, t0, t1));
      return [x0 + (x1 - x0) * p, y0 + (y1 - y0) * p];
    }
  }
  return DROP;
}

const stepAt = (t: number, T: Timeline) => T.next.filter((n) => t >= n + 0.05).length;
const enteredAt = (step: number, T: Timeline) =>
  step === 0 ? T.flowIn : (T.next[step - 1] ?? T.flowIn) + 0.05;

type Props = { demo: PromptDrawDemo };
type ImgProps = ImgHTMLAttributes<HTMLImageElement>;
type Frame = {
  t: number;
  T: Timeline;
  demo: PromptDrawDemo;
  images: Map<string, ImgProps>;
  /** The narrow, zoomed-in view. */
  crop: boolean;
};

function Spinner({ light }: { light?: boolean }) {
  return <span className={light ? `${s.spinner} ${s.spinnerLight}` : s.spinner} />;
}

function DropZone({ t, T, demo }: Frame) {
  const hover = within(t, T.hover, T.drop + 0.1);
  const prompt = 1 - ease(prog(t, T.drop, T.drop + 0.3));
  const phase = T.phase.filter((p) => t >= p).length - 1;
  return (
    <div className={`${s.canvas} ${s.drop} ${hover ? s.dropHover : ""}`}>
      <div className={s.dropPrompt} style={{ opacity: prompt }}>
        <span className={s.dropIcon}>
          <Icon name="upload" size="sm" />
        </span>
        <span className={s.dropTitle}>{demo.dropTitle}</span>
        <span className={s.dropHint}>{demo.dropHint}</span>
      </div>
      {t >= T.drop && (
        <div
          className={s.dropBusy}
          style={{ opacity: 1 - prompt, transform: `translateY(${prompt * 10}px)` }}
        >
          <div className={s.fileRow}>
            <Icon name="document" size="sm" />
            {demo.fileName}
          </div>
          {t >= T.gen && (
            <div className={s.status}>
              <Spinner />
              {demo.phases[Math.max(0, phase)]}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Stepper({ t, T, demo }: Frame) {
  const step = stepAt(t, T);
  const o = ease(prog(t, T.stepIn, T.stepIn + 0.3)) * (1 - ease(prog(t, T.stepOut, T.stepOut + 0.3)));
  if (o <= 0) return null;
  return (
    <div className={s.steps} style={{ opacity: o, transform: `translate(-50%, ${(1 - o) * 10}px)` }}>
      <span className={s.thumb} style={{ transform: `translateX(${step * 100}%)` }} />
      {demo.chapters.map((c, i) => (
        <span key={c.title} className={i === step ? `${s.step} ${s.stepActive}` : s.step}>
          {c.title}
        </span>
      ))}
    </div>
  );
}

type TileProps = {
  card: PromptDrawDemo["chapters"][number]["cards"][number];
  frame: number;
  draw: number;
  selected: boolean;
  redrawing: boolean;
  redrawingLabel: string;
  img: ImgProps | undefined;
};

function Tile({ card, frame, draw, selected, redrawing, redrawingLabel, img }: TileProps) {
  return (
    <div
      className={selected ? `${s.tile} ${s.tileSelected}` : s.tile}
      style={{ opacity: frame, transform: `scale(${0.94 + 0.06 * pop(frame)})` }}
    >
      <div className={s.tileImg}>
        {draw < 1 && frame >= 1 && !redrawing && <Spinner />}
        {redrawing && (
          <div className={s.tileBusy}>
            <Spinner />
            {redrawingLabel}
          </div>
        )}
        {/* next/image props computed once (getImageProps), so frames stay cheap */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt="" is in img */}
        <img {...img} style={{ opacity: draw, transform: `scale(${0.96 + 0.04 * draw})` }} />
      </div>
      <div className={s.tileTitle} style={{ opacity: draw }}>
        {card.title}
      </div>
    </div>
  );
}

function Framework({ t, T, demo, images }: Frame) {
  const step = stepAt(t, T);
  const chapter = demo.chapters[step] ?? demo.chapters[0]!;
  const t0 = enteredAt(step, T);
  const head = prog(t, t0 + 0.05, t0 + 0.5);
  const first = step === 0;
  const frames = chapter.cards.map((_, i) =>
    first ? ease(prog(t, T.frames + i * 0.12, T.frames + i * 0.12 + 0.35)) : 1,
  );
  const draws = chapter.cards.map((_, i) =>
    first
      ? ease(prog(t, T.draws + i * 0.38, T.draws + i * 0.38 + 0.5))
      : 0.3 + 0.7 * ease(prog(t, t0 + i * 0.06, t0 + i * 0.06 + 0.4)),
  );
  const e = T.edit;
  const selected = first && within(t, e.pick, e.barOut);
  const redrawing = first && within(t, e.drawClick, e.drawn);
  if (first && t >= e.drawClick)
    draws[0] =
      t < e.drawn
        ? 1 - 0.75 * ease(prog(t, e.drawClick, e.drawClick + 0.3))
        : 0.25 + 0.75 * ease(prog(t, e.drawn, e.drawn + 0.5));
  const room =
    t < e.barOut + 0.15
      ? ease(prog(t, e.barIn, e.barIn + 0.3))
      : 1 - ease(prog(t, T.fadeOut, T.fadeOut + 0.4));
  const headStyle: CSSProperties = first
    ? { opacity: clamp(head * 2), transform: `scale(${0.7 + 0.3 * pop(head)})` }
    : { opacity: 0.4 + 0.6 * head, transform: `scale(${0.94 + 0.06 * pop(head)})` };
  return (
    <>
      <div className={s.heading} style={headStyle}>
        {chapter.header}
      </div>
      <div className={s.canvas} style={{ paddingBottom: 12 + 22 * room }}>
        <div className={s.grid}>
          {chapter.cards.map((c, i) => (
            <Tile
              key={`${step}-${c.title}`}
              card={c}
              frame={frames[i] ?? 1}
              draw={draws[i] ?? 1}
              selected={selected && i === 0}
              redrawing={redrawing && i === 0}
              redrawingLabel={demo.redrawingLabel}
              img={images.get(
                // once redrawn, the edited doodle shows what was asked for
                step === 0 && i === 0 && demo.editImage && t >= e.drawn ? demo.editImage.src : c.image.src,
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function EditBar({ t, T, demo }: Frame) {
  const e = T.edit;
  const o = ease(prog(t, e.barIn, e.barIn + 0.3)) * (1 - ease(prog(t, e.barOut, e.barOut + 0.3)));
  if (o <= 0) return null;
  const text =
    t >= e.typeStart
      ? demo.editText.slice(0, Math.round(demo.editText.length * prog(t, e.typeStart, e.typeEnd)))
      : "";
  const focused = within(t, e.inputClick, e.drawClick);
  const busy = within(t, e.drawClick, e.drawn);
  return (
    <div className={s.controls} style={{ opacity: o, transform: `translateY(${(1 - o) * 10}px)` }}>
      <div className={focused ? `${s.input} ${s.inputFocus}` : s.input}>
        {text}
        {focused && <i className={s.caret} />}
        {!text && <span className={s.placeholder}>{demo.editPlaceholder}</span>}
      </div>
      <span className={within(t, e.drawClick, e.drawClick + 0.15) ? `${s.btn} ${s.pressed}` : s.btn}>
        {busy ? <Spinner light /> : <Icon name="send" size="sm" />}
        {busy ? demo.drawingLabel : demo.drawLabel}
      </span>
    </div>
  );
}

function PrintButton({ t, T, demo }: Frame) {
  const o =
    ease(prog(t, T.stepOut + 0.15, T.stepOut + 0.45)) * (1 - ease(prog(t, T.fadeOut, T.fadeOut + 0.4)));
  if (o <= 0) return null;
  const busy = within(t, T.printClick, T.printReady);
  const label = busy ? demo.printBusyLabel : t >= T.printReady ? demo.printReadyLabel : demo.printLabel;
  return (
    <div className={s.print} style={{ opacity: o, transform: `translate(-50%, ${(1 - o) * 10}px)` }}>
      <span className={within(t, T.printClick, T.printClick + 0.15) ? `${s.btn} ${s.pressed}` : s.btn}>
        {busy ? <Spinner light /> : <Icon name="print" size="sm" />}
        {label}
      </span>
    </div>
  );
}

function Card(props: Frame) {
  const { t, T, demo } = props;
  const back = t >= T.fadeOut;
  const flow = ease(prog(t, T.flowIn, T.flowIn + 0.4)) * (1 - ease(prog(t, T.fadeOut, T.fadeOut + 0.5)));
  return (
    <div className={s.card}>
      {(t < T.flowIn + 0.4 || back) && (
        <div className={s.layer} style={{ opacity: 1 - flow }}>
          <div className={s.heading}>{demo.heading}</div>
          <DropZone {...props} t={back ? 0 : t} />
        </div>
      )}
      {within(t, T.flowIn, T.fadeOut + 0.5) && (
        <div className={s.layer} style={{ opacity: flow }}>
          <Framework {...props} />
        </div>
      )}
    </div>
  );
}

function DraggedFile({ t, T, demo, crop }: Frame) {
  const [x, y] = fileAt(t, T, crop);
  const o = prog(t, T.grab - 0.2, T.grab) * (1 - prog(t, T.drop, T.drop + 0.15));
  if (o <= 0) return null;
  return (
    <div
      className={s.fileChip}
      style={{ transform: `translate(${x - 110}px, ${y - 20}px) rotate(-3deg)`, opacity: o }}
    >
      <Icon name="document" size="sm" />
      {demo.fileName}
    </div>
  );
}

/** The hero animation. Pauses off screen; frozen on one frame for reduced motion. */
export function PromptDraw({ demo }: Props) {
  const T = timeline(demo);
  const stillAt = (T.next[0] ?? T.flowIn + 4) - 0.8;
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [t, setT] = useState(stillAt);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => entry && setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      threshold: 0.1,
    });
    io.observe(el);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  // start once the page has settled, so the animation never competes with loading
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const start = () => setIdle(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1500);
    return () => clearTimeout(id);
  }, []);

  const images = useMemo(() => {
    const map = new Map<string, ImgProps>();
    const all = demo.chapters.flatMap((chapter) => chapter.cards.map((card) => card.image));
    if (demo.editImage) all.push(demo.editImage);
    for (const image of all)
      map.set(
        image.src,
        getImageProps({
          src: image.src,
          width: image.width,
          height: image.height,
          alt: "",
          sizes: "(min-width: 1024px) 220px, 30vw",
          quality: 75,
        }).props,
      );
    return map;
  }, [demo]);

  const running = idle && visible && !reduced;
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // ~30 fps is plenty for this animation and halves the work per second
      if (now - last >= 1000 / 30) {
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        setT((v) => (v + dt) % T.loop);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, T.loop]);

  const shown = reduced ? stillAt : t;
  // on narrow screens the card gets the width; the backdrop is cropped round it
  const crop = width > 0 && width < CROP_BELOW;
  const scale = width / (crop ? CROP.w : W);
  const frame: Frame = { t: shown, T, demo, images, crop };
  return (
    <div
      ref={box}
      className={s.root}
      role="img"
      aria-label={demo.label}
      style={crop ? { aspectRatio: `${CROP.w} / ${CROP.h}` } : undefined}
    >
      <div
        className={s.stage}
        style={{
          transform: crop ? `scale(${scale}) translate(${-CROP.x}px, ${-CROP.y}px)` : `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <div className={s.inner} aria-hidden="true">
          <Stepper {...frame} />
          <Card {...frame} />
          <EditBar {...frame} />
          <PrintButton {...frame} />
          <DraggedFile {...frame} />
        </div>
      </div>
    </div>
  );
}
