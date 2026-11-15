import type { z } from "zod";

/** Thrown when content fails validation; the message is written for editors. */
export class ContentError extends Error {
  override name = "ContentError";
}

function describe(path: PropertyKey[], data: unknown): string {
  let node: unknown = data;
  const parts: string[] = [];
  for (const key of path) {
    if (typeof key === "number") {
      const item = Array.isArray(node) ? node[key] : undefined;
      const type =
        item && typeof item === "object" && "type" in item
          ? ` (${String((item as { type: unknown }).type)})`
          : "";
      parts.push(`[${key}]${type}`);
    } else {
      parts.push(parts.length ? `.${String(key)}` : String(key));
    }
    node = node && typeof node === "object" ? (node as Record<PropertyKey, unknown>)[key] : undefined;
  }
  return parts.join("") || "(root)";
}

/** Parse `data` or throw a ContentError listing every problem with its location. */
export function parseContent<S extends z.ZodType>(schema: S, data: unknown, file: string): z.output<S> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const lines = result.error.issues.map((issue) => `  • ${describe(issue.path, data)}: ${issue.message}`);
  throw new ContentError(`\n\nContent error in ${file}:\n${lines.join("\n")}\n`);
}
