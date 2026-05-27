import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";
import { badgeVariants, type BadgeVariants } from "./badge.variants";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone, size, dot, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ tone, size, dot }), className)} {...props}>
      {dot ? <span className="size-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  );
});
