import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib";
import { buttonVariants, type ButtonVariants } from "./button.variants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /** Renderiza el hijo en lugar de un <button> · útil para envolver <Link>. */
  asChild?: boolean;
  /** Muestra un spinner y deshabilita el botón. */
  loading?: boolean;
  /** Icono a la izquierda del texto. */
  leftIcon?: ReactNode;
  /** Icono a la derecha del texto. */
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, fullWidth, asChild, loading, leftIcon, rightIcon, disabled, children, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Comp>
  );
});
