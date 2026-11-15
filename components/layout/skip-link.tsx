/** First focusable element on every page: jumps past the header. */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-sm bg-ink px-md py-sm text-text-on-media focus:not-sr-only focus:fixed focus:top-xs focus:left-xs"
    >
      {label}
    </a>
  );
}
