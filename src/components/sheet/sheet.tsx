import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cva, type VariantProps } from "../../lib";
import { cn } from "../../lib";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-overlay bg-slate-950/50 backdrop-blur-sm",
        "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
        className,
      )}
      {...props}
    />
  );
});

const sheetVariants = cva(
  [
    "fixed z-modal flex flex-col gap-4 bg-surface p-6 shadow-lg transition-transform",
    "data-[state=open]:animate-fade-in",
  ],
  {
    variants: {
      side: {
        right:  "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-border data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right",
        left:   "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-border data-[state=open]:animate-[metrik-slide-in-left_var(--metrik-duration-slow)_var(--metrik-ease)] data-[state=closed]:animate-[metrik-slide-out-left_var(--metrik-duration-slow)_var(--metrik-ease)]",
        top:    "inset-x-0 top-0 w-full border-b border-border data-[state=open]:animate-[metrik-slide-in-top_var(--metrik-duration-slow)_var(--metrik-ease)] data-[state=closed]:animate-[metrik-slide-out-top_var(--metrik-duration-slow)_var(--metrik-ease)]",
        bottom: "inset-x-0 bottom-0 w-full border-t border-border data-[state=open]:animate-[metrik-slide-in-bottom_var(--metrik-duration-slow)_var(--metrik-ease)] data-[state=closed]:animate-[metrik-slide-out-bottom_var(--metrik-duration-slow)_var(--metrik-ease)]",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

export const SheetContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(function SheetContent({ className, side = "right", children, ...props }, ref) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4 rounded-sm text-fg-muted opacity-70 transition-opacity",
            "hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <X className="size-4" />
          <span className="sr-only">Cerrar</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
});

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}

export const SheetTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold tracking-tight text-fg", className)} {...props} />;
});

export const SheetDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} className={cn("text-sm text-fg-muted", className)} {...props} />;
});

if (typeof document !== "undefined" && !document.getElementById("metrik-sheet-anim")) {
  const style = document.createElement("style");
  style.id = "metrik-sheet-anim";
  style.textContent =
    "@keyframes metrik-slide-in-left{from{transform:translateX(-100%)}to{transform:translateX(0)}}" +
    "@keyframes metrik-slide-out-left{from{transform:translateX(0)}to{transform:translateX(-100%)}}" +
    "@keyframes metrik-slide-in-top{from{transform:translateY(-100%)}to{transform:translateY(0)}}" +
    "@keyframes metrik-slide-out-top{from{transform:translateY(0)}to{transform:translateY(-100%)}}" +
    "@keyframes metrik-slide-in-bottom{from{transform:translateY(100%)}to{transform:translateY(0)}}" +
    "@keyframes metrik-slide-out-bottom{from{transform:translateY(0)}to{transform:translateY(100%)}}";
  document.head.appendChild(style);
}
