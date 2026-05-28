import { cva, type VariantProps } from "../../lib";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
    "transition-colors duration-fast",
    "hover:bg-surface-muted hover:text-fg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-primary-soft data-[state=on]:text-primary",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border-strong bg-transparent",
      },
      size: {
        sm: "h-8 min-w-8 px-2 [&_svg]:size-3.5",
        md: "h-10 min-w-10 px-2.5 [&_svg]:size-4",
        lg: "h-12 min-w-12 px-4 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
