import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer size-[18px] shrink-0 rounded border-2 border-border-strong bg-surface",
          "transition-colors duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-fg",
          "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-fg",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          {props.checked === "indeterminate" ? (
            <Minus className="size-3" strokeWidth={3} />
          ) : (
            <Check className="size-3" strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
