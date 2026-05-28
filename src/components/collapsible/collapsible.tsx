import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export const CollapsibleContent = forwardRef<
  ElementRef<typeof CollapsiblePrimitive.Content>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-[metrik-collapse-down_var(--metrik-duration-base)_var(--metrik-ease)]",
        "data-[state=closed]:animate-[metrik-collapse-up_var(--metrik-duration-base)_var(--metrik-ease)]",
        className,
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
});

if (typeof document !== "undefined" && !document.getElementById("metrik-collapsible-anim")) {
  const style = document.createElement("style");
  style.id = "metrik-collapsible-anim";
  style.textContent =
    "@keyframes metrik-collapse-down{from{height:0}to{height:var(--radix-collapsible-content-height)}}" +
    "@keyframes metrik-collapse-up{from{height:var(--radix-collapsible-content-height)}to{height:0}}";
  document.head.appendChild(style);
}
