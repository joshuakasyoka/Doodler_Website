import type { ReactNode } from "react";
import { Icon } from "./icon";
import { RichText } from "./rich-text";

type DisclosureProps = {
  summary: string;
  children: ReactNode;
  /** Disclosures sharing a group name open one at a time. */
  group?: string;
};

/** An accordion row on native <details>: keyboard-operable with no JavaScript. */
export function Disclosure({ summary, children, group }: DisclosureProps) {
  return (
    <details name={group} className="group rounded-md bg-surface">
      <summary className="flex cursor-pointer items-center justify-between gap-lg rounded-md px-lg py-md font-display text-question font-medium md:px-faq-x md:py-faq-y">
        <span>
          <RichText value={summary} />
        </span>
        <span className="grid size-plus shrink-0 place-items-center rounded-pill bg-bg transition-transform group-open:rotate-45 motion-reduce:transition-none">
          <Icon name="plus" size="xs" />
        </span>
      </summary>
      <div className="px-lg pb-md font-display text-body text-text-muted md:px-faq-x md:pb-faq-y">
        {children}
      </div>
    </details>
  );
}
