"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Video as VideoData } from "@/lib/content";
import { Button } from "./button";
import { Image } from "./image";

const frame = cva("overflow-hidden", {
  variants: {
    layout: { intrinsic: "relative", fill: "absolute inset-0" },
    radius: { none: "", md: "rounded-md", lg: "rounded-lg" },
  },
  defaultVariants: { layout: "intrinsic", radius: "none" },
});

const media = cva("absolute inset-0 size-full transition-opacity", {
  variants: {
    fit: { cover: "object-cover", contain: "object-contain" },
    playing: { true: "opacity-100", false: "opacity-0" },
  },
  defaultVariants: { fit: "cover", playing: false },
});

type VideoProps = VariantProps<typeof frame> & {
  video: VideoData;
  sizes: string;
  fit?: "cover" | "contain";
  /** The poster is the page's LCP element. */
  priority?: boolean;
  /** Label for the play button shown where the video does not autoplay. */
  playLabel?: string;
};

type Mode = "poster" | "autoplay" | "click-to-play" | "playing";

const noop = () => () => undefined;
const QUERIES = ["(min-width: 48rem)", "(prefers-reduced-motion: reduce)"];
function subscribeToPreferences(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

/** Autoplay only where it is cheap and welcome: wide screens, no Save-Data, no reduced motion. */
function autoplayAllowed(): boolean {
  const wide = window.matchMedia("(min-width: 48rem)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return wide && !reduced && !saveData;
}

/**
 * Muted, inline video. The poster is a real next/image (optimised, space
 * reserved, the LCP candidate) and the server always renders just that.
 * After hydration the video autoplays while on screen where allowed; on phones,
 * with Save-Data or reduced motion, content videos get a play button and
 * decorative ones stay a still image, so mobile visitors never download them
 * unasked.
 */
export function Video({ video, sizes, fit = "cover", priority, playLabel, layout, radius }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userPlaying, setUserPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  // false on the server and during hydration, the real answer afterwards
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const canAutoplay = useSyncExternalStore(subscribeToPreferences, autoplayAllowed, () => false);

  const mode: Mode = !mounted
    ? "poster"
    : userPlaying
      ? "playing"
      : canAutoplay
        ? "autoplay"
        : video.label && playLabel
          ? "click-to-play"
          : "poster";

  useEffect(() => {
    const el = ref.current;
    if (!el || mode !== "autoplay") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const showVideo = mode === "autoplay" || mode === "playing";
  return (
    <div className={frame({ layout, radius })}>
      {/* The still sits under the video until the first frame is actually playing, then it goes away. */}
      <div
        className={
          layout === "fill"
            ? `absolute inset-0 ${visible ? "invisible" : ""}`
            : visible
              ? "invisible"
              : undefined
        }
      >
        <Image
          image={video.poster}
          sizes={sizes}
          priority={priority}
          layout={layout === "fill" ? "fill" : "intrinsic"}
          fit={fit}
        />
      </div>
      {showVideo && (
        <video
          ref={ref}
          className={media({ fit, playing: visible })}
          src={video.src}
          muted
          playsInline
          autoPlay={mode === "playing"}
          controls={mode === "playing"}
          loop={!video.once}
          preload="none"
          width={video.width}
          height={video.height}
          aria-label={video.label}
          aria-hidden={video.label ? undefined : true}
          onPlaying={() => setVisible(true)}
        />
      )}
      {mode === "click-to-play" && playLabel && (
        <div className="absolute inset-0 grid place-items-center">
          <Button
            label={playLabel}
            icon="play"
            variant="light"
            size="md"
            scribble={false}
            onClick={() => setUserPlaying(true)}
          />
        </div>
      )}
    </div>
  );
}
