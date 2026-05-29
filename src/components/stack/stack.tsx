import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";
import { stackVariants, type StackVariants } from "./stack.variants";

export interface StackProps extends HTMLAttributes<HTMLDivElement>, StackVariants {
  asChild?: boolean;
}

/**
 * Layout flex en una dirección, con `gap`, alineación y justificación tipados.
 *
 * @example
 *   <Stack gap="lg">…</Stack>
 *   <Stack direction="row" align="center" justify="between">…</Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { className, direction, gap, align, justify, wrap, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    />
  );
});
