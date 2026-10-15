import type { ReactNode } from "react";

const INLINE_TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g;

/** Renders the **bold**, *italic*, and `code` markers used in project copy. */
export function renderInline(text: string): ReactNode[] {
  return text
    .split(INLINE_TOKEN)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="inline! rounded-md! bg-muted! px-1.5! py-0.5! text-[0.875em]! text-foreground!"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}
