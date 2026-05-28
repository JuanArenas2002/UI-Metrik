import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Color de la barra. */
  tone?: "primary" | "success" | "danger" | "warning";
}

const TONE = {
  primary: "bg-primary",
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
} as const;

export const Progress = forwardRef<ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  function Progress({ className, value, tone = "primary", ...props }, ref) {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-surface-muted", className)}
        value={value}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("size-full flex-1 transition-transform duration-slow ease-metrik", TONE[tone])}
          style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  },
);
