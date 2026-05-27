import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../lib";

export interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
}

const SIZES = { sm: "size-4", md: "size-5", lg: "size-6", xl: "size-8" } as const;

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { size = "md", label = "Cargando", className, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      role="status"
      aria-label={label}
      className={cn("animate-spin text-primary", SIZES[size], className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
});
