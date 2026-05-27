import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib";
import { inputVariants, type InputVariants } from "./input.variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariants {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, state, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      data-state={state}
      className={cn(inputVariants({ size, state }), className)}
      {...props}
    />
  );
});
