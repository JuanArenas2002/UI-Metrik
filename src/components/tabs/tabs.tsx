import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { variant?: "underline" | "pill" }
>(function TabsList({ className, variant = "underline", ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-variant={variant}
      className={cn(
        "inline-flex items-center",
        variant === "underline" && "h-10 gap-6 border-b border-border w-full",
        variant === "pill" && "h-10 rounded-md bg-surface-muted p-1 gap-1",
        className,
      )}
      {...props}
    />
  );
});

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
        "transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        // underline variant (default)
        "[[data-variant=underline]_&]:px-1 [[data-variant=underline]_&]:py-2.5",
        "[[data-variant=underline]_&]:text-fg-muted [[data-variant=underline]_&]:border-b-2 [[data-variant=underline]_&]:border-transparent",
        "[[data-variant=underline]_&]:data-[state=active]:text-fg [[data-variant=underline]_&]:data-[state=active]:border-primary",
        // pill variant
        "[[data-variant=pill]_&]:rounded [[data-variant=pill]_&]:px-3.5 [[data-variant=pill]_&]:py-1.5",
        "[[data-variant=pill]_&]:text-fg-muted",
        "[[data-variant=pill]_&]:data-[state=active]:bg-surface [[data-variant=pill]_&]:data-[state=active]:text-fg [[data-variant=pill]_&]:data-[state=active]:shadow-xs",
        className,
      )}
      {...props}
    />
  );
});

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
        className,
      )}
      {...props}
    />
  );
});
