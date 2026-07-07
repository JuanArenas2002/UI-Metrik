import { cva, type VariantProps } from "../../lib";

/** Estilos del contenedor · variantes de superficie y densidad. */
export const advancedFilterVariants = cva("rounded-lg transition-colors duration-fast", {
  variants: {
    variant: {
      outlined: "border border-border bg-surface",
      filled: "border border-transparent bg-surface-muted",
      ghost: "border border-transparent bg-transparent",
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: { variant: "outlined", size: "md" },
});

export type AdvancedFilterVariants = VariantProps<typeof advancedFilterVariants>;

/** Clases de la grilla de campos según la orientación. */
export const fieldGridClass = {
  horizontal: "grid grid-cols-1 gap-4 sm:grid-cols-12",
  vertical: "grid grid-cols-1 gap-4",
} as const;
