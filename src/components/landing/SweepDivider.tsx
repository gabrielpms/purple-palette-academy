import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

export function SweepDivider({ className }: { className?: string }) {
  const { ref } = useReveal<HTMLSpanElement>({ threshold: 0.5 });
  return <span ref={ref as any} className={cn("sweep-line", className)} />;
}
