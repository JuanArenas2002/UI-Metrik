import { cva, type VariantProps } from "../../lib";

export const alertVariants = cva(
  [
    "relative flex w-full gap-3 rounded-md border-l-4 px-4 py-3",
    "text-sm",
    "[&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:mt-0.5",
  ],
  {
    variants: {
      tone: {
        info:    "border-fg-muted bg-surface-muted text-fg",
        success: "border-success bg-success-soft text-fg",
        warning: "border-warning bg-warning-soft text-fg",
        danger:  "border-danger bg-danger-soft text-fg",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
