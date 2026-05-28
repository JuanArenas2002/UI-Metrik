import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(function HoverCardContent({ className, align = "center", sideOffset = 6, ...props }, ref) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-dropdown w-64 rounded-md border border-border bg-surface-elev p-4 text-fg shadow-md outline-none",
          "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
});
