import { cva, type VariantProps } from "../../lib";

export const containerVariants = cva("mx-auto w-full", {
  variants: {
    /** Ancho máximo del contenido. */
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-[1536px]",
      prose: "max-w-prose",
      full: "max-w-full",
    },
    /** Padding horizontal responsive. */
    padding: {
      none: "",
      sm: "px-3",
      md: "px-4 sm:px-6",
      lg: "px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: { size: "xl", padding: "lg" },
});

export type ContainerVariants = VariantProps<typeof containerVariants>;
