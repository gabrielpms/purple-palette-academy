import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  withLine?: boolean;
  tone?: "blue" | "muted" | "cream";
}

export function SectionLabel({
  children,
  className,
  withLine = true,
  tone = "blue",
}: SectionLabelProps) {
  const { ref } = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const colorClass =
    tone === "blue"
      ? "text-primary"
      : tone === "cream"
        ? "text-cream"
        : "text-muted-foreground";

  return (
    <span
      ref={ref as any}
      className={cn(
        "label-uppercase inline-flex items-center gap-3 reveal-clip",
        colorClass,
        className
      )}
    >
      {withLine && <span className="editorial-divider" />}
      {children}
    </span>
  );
}
