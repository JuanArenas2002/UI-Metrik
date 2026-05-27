import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";

type DivProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, DivProps>(function Card(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-surface text-fg shadow-xs",
        "transition-shadow duration-fast",
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, DivProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />;
});

export const CardTitle = forwardRef<HTMLDivElement, DivProps>(function CardTitle(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("text-base font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
});

export const CardDescription = forwardRef<HTMLDivElement, DivProps>(function CardDescription(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("text-sm text-fg-muted", className)} {...props} />;
});

export const CardContent = forwardRef<HTMLDivElement, DivProps>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("px-5 pb-5", className)} {...props} />;
});

export const CardFooter = forwardRef<HTMLDivElement, DivProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 border-t border-border px-5 py-4", className)}
      {...props}
    />
  );
});
