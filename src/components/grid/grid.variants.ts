import { cva, type VariantProps } from "../../lib";

export const gridVariants = cva("grid", {
  variants: {
    /** Número de columnas. Para responsive, añade clases vía `className`. */
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-row-dense",
    },
  },
  defaultVariants: { cols: 1, gap: "md" },
});

export type GridVariants = VariantProps<typeof gridVariants>;
