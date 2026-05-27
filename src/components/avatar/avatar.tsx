import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cva, type VariantProps } from "../../lib";
import { cn } from "../../lib";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full bg-surface-muted text-fg-muted",
  {
    variants: {
      size: {
        sm: "size-6 text-[10px]",
        md: "size-9 text-xs",
        lg: "size-12 text-sm",
        xl: "size-16 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  function Avatar({ className, size, ...props }, ref) {
    return <AvatarPrimitive.Root ref={ref} className={cn(avatarVariants({ size }), className)} {...props} />;
  },
);

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return <AvatarPrimitive.Image ref={ref} className={cn("aspect-square size-full object-cover", className)} {...props} />;
});

export const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn("flex size-full items-center justify-center font-semibold uppercase", className)}
      {...props}
    />
  );
});
