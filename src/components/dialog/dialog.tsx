import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
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

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Esconde el botón de cierre por defecto (× en la esquina). */
  hideCloseButton?: boolean;
}

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ className, hideCloseButton, children, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-modal w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
          "rounded-lg border border-border bg-surface p-6 shadow-lg",
          "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
          "focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {!hideCloseButton ? (
          <DialogPrimitive.Close
            aria-label="Cerrar"
            className={cn(
              "absolute right-4 top-4 rounded-sm p-1 text-fg-muted opacity-70",
              "transition-opacity hover:opacity-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 pb-4", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-fg-muted", className)}
      {...props}
    />
  );
});
