import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  circle?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, circle, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-surface-muted",
        circle ? "rounded-full" : "rounded-md",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent",
        "before:translate-x-[-100%] before:animate-[metrik-shimmer_1.6s_infinite]",
        className,
      )}
      {...props}
    />
  );
});
// El keyframe `metrik-shimmer` vive en globals.css (styles.css) — sin inyección
// dinámica de CSS al importar el módulo (SSR-safe, sin efectos secundarios).
