import { ReactNode, ElementType } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  threshold?: number;
}

export function RevealOnScroll({
  children,
  className,
  as: Tag = "div",
  threshold = 0.18,
}: RevealOnScrollProps) {
  const { ref } = useReveal<HTMLDivElement>({ threshold });
  return (
    <Tag ref={ref as any} className={cn(className)}>
      {children}
    </Tag>
  );
}
