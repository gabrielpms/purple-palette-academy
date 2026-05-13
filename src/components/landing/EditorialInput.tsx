import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const EditorialInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full bg-white/5 border border-white/10 text-foreground",
        "placeholder:text-foreground/30",
        "px-5 py-4 text-[15px] outline-none rounded-[2px]",
        "transition-colors focus:border-primary/60 focus:bg-primary/[0.06]",
        className
      )}
      {...props}
    />
  );
});
EditorialInput.displayName = "EditorialInput";
