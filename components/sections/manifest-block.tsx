import { Reveal, Text } from "@/components/ui";

type ManifestBlockProps = {
  /** The large line, read as the block's heading. */
  statement: string;
  /** The paragraphs under it, in order. */
  body: (string | undefined)[];
  size?: "manifest" | "manifest-title-wide";
};

/**
 * A manifest statement set like an article section: the statement as a heading, a thin rule under it,
 * then its paragraphs in the body size. Centred, as the rest of the manifest.
 */
export function ManifestBlock({ statement, body, size = "manifest" }: ManifestBlockProps) {
  const paragraphs = body.filter((p): p is string => Boolean(p));
  return (
    <div className="flex w-full flex-col items-center">
      <Reveal>
        <Text size={size} align="center" text={statement} />
      </Reveal>
      {paragraphs.length > 0 && (
        <>
          <hr className="mt-xl w-full max-w-manifest-text border-0 border-t border-border" />
          <div className="mt-xl flex flex-col gap-lg">
            {paragraphs.map((p) => (
              <Reveal key={p}>
                <Text size="manifest-follow" tone="muted" align="center" text={p} />
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
