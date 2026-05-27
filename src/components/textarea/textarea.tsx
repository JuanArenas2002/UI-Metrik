import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      data-invalid={invalid || undefined}
      className={cn(
        "flex min-h-[88px] w-full rounded-md border bg-surface px-3 py-2.5 text-sm text-fg",
        "transition-colors duration-fast placeholder:text-fg-subtle resize-y",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-surface-muted",
        invalid ? "border-danger focus-visible:ring-danger" : "border-border-strong",
        className,
      )}
      {...props}
    />
  );
});
