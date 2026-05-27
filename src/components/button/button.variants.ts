import { cva, type VariantProps } from "../../lib";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "rounded-md ring-offset-bg transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:   "bg-primary text-primary-fg hover:bg-primary-hover",
        secondary: "bg-surface-muted text-fg hover:bg-border",
        outline:   "border border-border-strong bg-transparent text-fg hover:bg-surface-muted",
        ghost:     "bg-transparent text-fg hover:bg-surface-muted",
        danger:    "bg-danger text-white hover:bg-coral-700",
        link:      "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs [&_svg]:size-3.5",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-5",
        icon: "size-10 [&_svg]:size-4",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
