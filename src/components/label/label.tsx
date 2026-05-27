import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(function Label(
  { className, required, children, ...props },
  ref,
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium text-fg leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {children}
      {required ? <span className="ml-0.5 text-danger" aria-hidden>*</span> : null}
    </LabelPrimitive.Root>
  );
});
