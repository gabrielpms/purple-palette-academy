import { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

interface EditorialHeadingProps {
  children: ReactNode;
  /** Plain text, will be word-revealed. Use `children` for rich content with <em>. */
  text?: string;
  as?: ElementType;
  className?: string;
  /** Mark the last word italic+cream (editorial accent) when using `text`. */
  italicLast?: boolean;
}

/**
 * Editorial serif heading with word-by-word reveal.
 * - Pass `text` for animated split.
 * - Or pass `children` (already containing <span class="word-reveal"><span>…</span></span>)
 */
export function EditorialHeading({
  children,
  text,
  as: Tag = "h2",
  className,
  italicLast = false,
}: EditorialHeadingProps) {
  const { ref } = useReveal<HTMLHeadingElement>({ threshold: 0.2 });

  let content: ReactNode = children;
  if (text) {
    const words = text.split(" ");
    content = words.map((word, i) => {
      const isLast = i === words.length - 1;
      const inner = italicLast && isLast ? <em>{word}</em> : word;
      return (
        <span
          key={i}
          className="word-reveal"
          style={{ marginRight: "0.18em" }}
        >
          <span style={{ transitionDelay: `${i * 60}ms` }}>{inner}</span>
        </span>
      );
    });
  }

  return (
    <Tag
      ref={ref as any}
      className={cn(
        "font-display leading-[0.95] tracking-tight",
        className
      )}
    >
      {content}
    </Tag>
  );
}
