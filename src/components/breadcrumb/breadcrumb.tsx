import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib";

export const Breadcrumb = forwardRef<HTMLElement, ComponentPropsWithoutRef<"nav">>(
  function Breadcrumb(props, ref) {
    return <nav ref={ref} aria-label="breadcrumb" {...props} />;
  },
);

export const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<"ol">>(
  function BreadcrumbList({ className, ...props }, ref) {
    return (
      <ol
        ref={ref}
        className={cn("flex flex-wrap items-center gap-1.5 text-sm text-fg-muted", className)}
        {...props}
      />
    );
  },
);

export const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<"li">>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
  },
);

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(function BreadcrumbLink({ className, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cn("transition-colors duration-fast hover:text-fg", className)}
      {...props}
    />
  );
});

export const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<"span">>(
  function BreadcrumbPage({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-medium text-fg", className)}
        {...props}
      />
    );
  },
);

export function BreadcrumbSeparator({ children, className, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li role="presentation" aria-hidden className={cn("[&>svg]:size-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span role="presentation" aria-hidden className={cn("flex size-9 items-center justify-center", className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">Más</span>
    </span>
  );
}
