import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** highlight every Nth item with the blue accent */
  highlightEvery?: number;
  className?: string;
}

export function Marquee({ items, highlightEvery = 4, className }: MarqueeProps) {
  if (!items.length) return null;
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "overflow-hidden border-y border-border/60 py-5",
        className
      )}
    >
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "label-uppercase px-12 flex-shrink-0 transition-colors",
              i % highlightEvery === 0
                ? "text-primary"
                : "text-foreground/20 hover:text-foreground/60"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
