import { Fragment } from "react";
import { parseMarkup } from "@/lib/content/markup";
import { Link } from "./link";

/** Renders content mini-markup: *emphasis* and [links](href). */
export function RichText({ value }: { value: string }) {
  return (
    <>
      {parseMarkup(value).map((node, i) => {
        if (node.type === "em") return <em key={i}>{node.value}</em>;
        if (node.type === "link")
          return (
            <Link key={i} href={node.href} variant="inline">
              {node.value}
            </Link>
          );
        return <Fragment key={i}>{node.value}</Fragment>;
      })}
    </>
  );
}
