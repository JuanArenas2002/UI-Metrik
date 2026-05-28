import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const menuSurface = cn(
  "z-dropdown min-w-[10rem] overflow-hidden rounded-md border border-border bg-surface-elev p-1 text-fg shadow-md",
  "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
);

const itemBase = cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
  "data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export const ContextMenuContent = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(function ContextMenuContent({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content ref={ref} className={cn(menuSurface, className)} {...props} />
    </ContextMenuPrimitive.Portal>
  );
});

export const ContextMenuItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean; destructive?: boolean }
>(function ContextMenuItem({ className, inset, destructive, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        itemBase,
        inset && "pl-8",
        destructive && "data-[highlighted]:bg-danger-soft data-[highlighted]:text-danger",
        className,
      )}
      {...props}
    />
  );
});

export const ContextMenuCheckboxItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(function ContextMenuCheckboxItem({ className, children, checked, ...props }, ref) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(itemBase, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="size-4 text-primary" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});

export const ContextMenuRadioItem = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(function ContextMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <ContextMenuPrimitive.RadioItem ref={ref} className={cn(itemBase, "pl-8", className)} {...props}>
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current text-primary" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});

export const ContextMenuLabel = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(function ContextMenuLabel({ className, inset, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-[10px] uppercase tracking-wider text-fg-subtle", inset && "pl-8", className)}
      {...props}
    />
  );
});

export const ContextMenuSeparator = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
});

export function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-[11px] tracking-widest text-fg-subtle", className)} {...props} />;
}

export const ContextMenuSubTrigger = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(function ContextMenuSubTrigger({ className, inset, children, ...props }, ref) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(itemBase, "data-[state=open]:bg-primary-soft", inset && "pl-8", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
});

export const ContextMenuSubContent = forwardRef<
  ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(function ContextMenuSubContent({ className, ...props }, ref) {
  return <ContextMenuPrimitive.SubContent ref={ref} className={cn(menuSurface, className)} {...props} />;
});
