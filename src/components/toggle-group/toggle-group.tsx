import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";
import { toggleVariants, type ToggleVariants } from "../toggle/toggle.variants";

const ToggleGroupContext = createContext<ToggleVariants>({ variant: "default", size: "md" });

export const ToggleGroup = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleVariants
>(function ToggleGroup({ className, variant, size, children, ...props }, ref) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("inline-flex items-center gap-1 rounded-md bg-surface-muted p-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

export const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ToggleVariants
>(function ToggleGroupItem({ className, variant, size, children, ...props }, ref) {
  const ctx = useContext(ToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({ variant: variant ?? ctx.variant, size: size ?? ctx.size }),
        "data-[state=on]:bg-surface data-[state=on]:shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
