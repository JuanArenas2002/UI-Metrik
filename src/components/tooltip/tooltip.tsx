import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-dropdown overflow-hidden rounded-md bg-fg px-2.5 py-1.5 text-xs text-bg shadow-md",
          "animate-fade-in data-[state=closed]:animate-fade-out",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
