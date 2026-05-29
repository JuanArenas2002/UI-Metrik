import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";
import { gridVariants, type GridVariants } from "./grid.variants";

export interface GridProps extends HTMLAttributes<HTMLDivElement>, GridVariants {
  asChild?: boolean;
}

/**
 * Layout en cuadrícula CSS, con columnas y `gap` tipados. Para columnas
 * responsive usa `className` (p. ej. `className="md:grid-cols-3"`).
 *
 * @example
 *   <Grid cols={3} gap="lg">…</Grid>
 *   <Grid cols={1} className="md:grid-cols-2 lg:grid-cols-4">…</Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { className, cols, gap, flow, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} className={cn(gridVariants({ cols, gap, flow }), className)} {...props} />;
});
