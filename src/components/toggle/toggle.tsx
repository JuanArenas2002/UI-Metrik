import * as TogglePrimitive from "@radix-ui/react-toggle";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";
import { toggleVariants, type ToggleVariants } from "./toggle.variants";

export interface ToggleProps
  extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    ToggleVariants {}

export const Toggle = forwardRef<ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  function Toggle({ className, variant, size, ...props }, ref) {
    return (
      <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
