import { Slot } from "@radix-ui/react-slot";
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type FormHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib";
import { Label } from "../label";

/**
 * Form ligero · sin react-hook-form. `FormField` cablea ids y errores entre
 * Label / Control / Message para accesibilidad. Para validación, pásale el
 * mensaje de error a `<FormField error="...">` o a `<FormMessage>`.
 */
export const Form = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  function Form({ className, ...props }, ref) {
    return <form ref={ref} className={cn("space-y-5", className)} {...props} />;
  },
);

type FieldContext = { id: string; error?: string };
const FormFieldContext = createContext<FieldContext | null>(null);

function useField() {
  const ctx = useContext(FormFieldContext);
  if (!ctx) throw new Error("useField debe usarse dentro de <FormField>");
  return ctx;
}

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  error?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { className, error, ...props },
  ref,
) {
  const id = useId();
  return (
    <FormFieldContext.Provider value={{ id, error }}>
      <div ref={ref} className={cn("space-y-1.5", className)} {...props} />
    </FormFieldContext.Provider>
  );
});

export const FormLabel = forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof Label>
>(function FormLabel({ className, ...props }, ref) {
  const { id, error } = useField();
  return (
    <Label ref={ref} htmlFor={id} className={cn(error && "text-danger", className)} {...props} />
  );
});

export const FormControl = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof Slot>
>(function FormControl(props, ref) {
  const { id, error } = useField();
  return (
    <Slot
      ref={ref}
      id={id}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? `${id}-msg` : undefined}
      {...props}
    />
  );
});

export function FormDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-fg-muted", className)} {...props} />;
}

export function FormMessage({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { id, error } = useField();
  const body = error ?? children;
  if (!body) return null;
  return (
    <p id={`${id}-msg`} className={cn("text-xs font-medium text-danger", className)} {...props}>
      {body}
    </p>
  );
}
