import { cva, type VariantProps } from "../../lib";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5",
    "text-xs font-semibold tracking-wide",
    "transition-colors duration-fast",
  ],
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-fg-muted",
        primary: "bg-primary-soft text-primary",
        accent:  "bg-accent-soft text-accent",
        info:    "bg-info-soft text-info",
        success: "bg-success-soft text-success",
        danger:  "bg-danger-soft text-danger",
        warning: "bg-warning-soft text-warning",
        solid:   "bg-fg text-bg",
      },
      size: {
        sm: "h-5 px-2 text-[10px]",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm",
      },
      dot: { true: "pl-2" },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
