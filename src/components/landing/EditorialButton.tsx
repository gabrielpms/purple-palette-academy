import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "white" | "blue" | "ghost";

interface EditorialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: ReactNode;
}

const sizes = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3.5 text-[12px]",
  lg: "px-9 py-4 text-[13px]",
};

const variants: Record<Variant, string> = {
  white:
    "bg-white text-background hover:bg-primary hover:text-primary-foreground",
  blue:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost:
    "bg-transparent text-foreground border border-border hover:border-primary hover:text-primary",
};

export const EditorialButton = forwardRef<HTMLButtonElement, EditorialButtonProps>(
  ({ variant = "white", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "btn-sweep inline-flex items-center justify-center gap-2",
          "font-ui font-semibold uppercase tracking-[0.12em]",
          "transition-colors duration-200 rounded-[2px]",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);
EditorialButton.displayName = "EditorialButton";
