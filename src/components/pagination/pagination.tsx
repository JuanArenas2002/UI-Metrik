import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib";
import { buttonVariants } from "../button/button.variants";

export function Pagination({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="paginación"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export const PaginationContent = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<"ul">>(
  function PaginationContent({ className, ...props }, ref) {
    return <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />;
  },
);

export const PaginationItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<"li">>(
  function PaginationItem(props, ref) {
    return <li ref={ref} {...props} />;
  },
);

export interface PaginationLinkProps extends ComponentPropsWithoutRef<"a"> {
  isActive?: boolean;
  size?: "sm" | "md" | "icon";
}

export function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        "cursor-pointer",
        isActive && "border-primary text-primary",
        className,
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Anterior" size="sm" className={cn("gap-1 px-2.5", className)} {...props}>
      <ChevronLeft className="size-4" />
      <span>Anterior</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Siguiente" size="sm" className={cn("gap-1 px-2.5", className)} {...props}>
      <span>Siguiente</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span aria-hidden className={cn("flex size-10 items-center justify-center text-fg-subtle", className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">Más páginas</span>
    </span>
  );
}
