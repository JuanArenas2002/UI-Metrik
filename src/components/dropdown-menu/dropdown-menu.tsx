import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../lib";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-dropdown min-w-[10rem] overflow-hidden rounded-md border border-border bg-surface-elev p-1 text-fg shadow-md",
          "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean; destructive?: boolean }
>(function DropdownMenuItem({ className, inset, destructive, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        destructive && "data-[highlighted]:bg-danger-soft data-[highlighted]:text-danger",
        className,
      )}
      {...props}
    />
  );
});

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4 text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(function DropdownMenuLabel({ className, inset, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-[10px] uppercase tracking-wider text-fg-subtle",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
});

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
});

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-[11px] tracking-widest text-fg-subtle", className)} {...props} />;
}

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(function DropdownMenuSubTrigger({ className, inset, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-primary-soft data-[state=open]:bg-primary-soft",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});

export const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-dropdown min-w-[10rem] overflow-hidden rounded-md border border-border bg-surface-elev p-1 text-fg shadow-md",
        "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
        className,
      )}
      {...props}
    />
  );
});
