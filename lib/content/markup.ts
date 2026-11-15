/**
 * The content mini-markup, used in every copy field:
 *
 *   *text*          → emphasis (the italic accent in headings)
 *   [text](href)    → link
 *   \\*              → a literal asterisk (write "\\*" inside a TS string)
 *
 * Kept deliberately tiny so non-developers can edit copy safely.
 */
export type MarkupNode =
  | { type: "text"; value: string }
  | { type: "em"; value: string }
  | { type: "link"; value: string; href: string };

const TOKEN = /\\([*[\]\\])|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseMarkup(input: string): MarkupNode[] {
  const nodes: MarkupNode[] = [];
  let last = 0;
  for (const match of input.matchAll(TOKEN)) {
    const index = match.index;
    if (index > last) nodes.push({ type: "text", value: input.slice(last, index) });
    if (match[1] !== undefined) nodes.push({ type: "text", value: match[1] });
    else if (match[2] !== undefined) nodes.push({ type: "em", value: match[2] });
    else if (match[3] !== undefined && match[4] !== undefined)
      nodes.push({ type: "link", value: match[3], href: match[4] });
    last = index + match[0].length;
  }
  if (last < input.length) nodes.push({ type: "text", value: input.slice(last) });
  // merge neighbouring text nodes (escapes split them)
  return nodes.reduce<MarkupNode[]>((out, node) => {
    const prev = out[out.length - 1];
    if (prev?.type === "text" && node.type === "text") prev.value += node.value;
    else out.push({ ...node });
    return out;
  }, []);
}

/** Plain text (for <title>, alt text, aria labels, OG images). */
export function stripMarkup(input: string): string {
  return parseMarkup(input)
    .map((n) => n.value)
    .join("");
}

/** Markup that would render wrongly: an unmatched `*` or `[`. */
export function markupProblems(input: string): string[] {
  const rest = input.replace(TOKEN, "");
  const problems: string[] = [];
  if (rest.includes("*")) problems.push("unmatched * (emphasis needs an opening and closing *)");
  if (/\]\(/.test(rest)) problems.push("malformed link: use [text](https://…)");
  return problems;
}
