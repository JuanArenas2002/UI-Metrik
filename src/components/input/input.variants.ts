import { cva, type VariantProps } from "../../lib";

export const inputVariants = cva(
  [
    "flex w-full rounded-md border bg-surface text-sm text-fg",
    "transition-colors duration-fast placeholder:text-fg-subtle",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-surface-muted",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "border-border-strong",
        error:   "border-danger focus-visible:ring-danger",
        success: "border-success focus-visible:ring-success",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
