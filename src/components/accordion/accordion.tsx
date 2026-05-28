import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border", className)} {...props} />;
});

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium text-fg",
          "transition-colors duration-fast hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-fg-muted transition-transform duration-base" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm text-fg-muted",
        "data-[state=open]:animate-[metrik-acc-down_var(--metrik-duration-base)_var(--metrik-ease)]",
        "data-[state=closed]:animate-[metrik-acc-up_var(--metrik-duration-base)_var(--metrik-ease)]",
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

if (typeof document !== "undefined" && !document.getElementById("metrik-accordion-anim")) {
  const style = document.createElement("style");
  style.id = "metrik-accordion-anim";
  style.textContent =
    "@keyframes metrik-acc-down{from{height:0}to{height:var(--radix-accordion-content-height)}}" +
    "@keyframes metrik-acc-up{from{height:var(--radix-accordion-content-height)}to{height:0}}";
  document.head.appendChild(style);
}
