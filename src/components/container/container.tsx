import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";
import { containerVariants, type ContainerVariants } from "./container.variants";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, ContainerVariants {
  /** Renderiza el hijo en lugar de un `<div>` (Radix Slot). */
  asChild?: boolean;
}

/**
 * Contenedor centrado con ancho máximo y padding horizontal responsive.
 * La pieza base para componer el layout de una página.
 *
 * @example
 *   <Container size="lg">…</Container>
 *   <Container asChild><main>…</main></Container>
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size, padding, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} className={cn(containerVariants({ size, padding }), className)} {...props} />;
});
