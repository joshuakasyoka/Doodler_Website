import type { IconName } from "@/lib/icon-names";
import { Icon } from "./icon";

const SIZE: Partial<Record<IconName, "thread-tall" | "thread-mid">> = {
  "thread-long": "thread-tall",
  "thread-long-alt": "thread-tall",
  "thread-mid": "thread-mid",
};

type ThreadProps = {
  name: IconName;
  /** wide: spans the content width (the branching line). */
  shape?: "line" | "wide";
  show?: "always" | "wide-screens" | "narrow-screens";
  /** pull up into the block above (the timeline's closing line) */
  tuck?: boolean;
};

const visibility = {
  always: "flex",
  "wide-screens": "hidden md:flex",
  "narrow-screens": "flex md:hidden",
};

/** A hand-drawn connecting line between blocks, uncovered from the top down as it scrolls through. */
export function Thread({ name, shape = "line", show = "always", tuck }: ThreadProps) {
  const size = shape === "wide" ? "wide" : (SIZE[name] ?? "thread");
  return (
    <div
      className={`${visibility[show]} w-full justify-center ${tuck ? "-mt-thread-gap mb-thread-gap" : "my-thread-gap"}`}
      aria-hidden="true"
    >
      <span className={`scroll-uncover ${shape === "wide" ? "w-full max-w-findings" : "flex"}`}>
        <Icon name={name} size={size} />
      </span>
    </div>
  );
}
