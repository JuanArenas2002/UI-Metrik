import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "../../lib";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * En pantallas < 640px convierte cada fila en una tarjeta apilada
   * (etiqueta/valor) en lugar de scroll horizontal. Requiere `label` en
   * cada `TableCell`. Pensado para smartphones de cualquier OS.
   */
  stackable?: boolean;
  /** Clases para el contenedor con scroll (no para el `<table>`). */
  containerClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  function Table({ className, stackable, containerClassName, ...props }, ref) {
    return (
      <div
        className={cn(
          // Scroll horizontal robusto en táctil: momentum en iOS y sin
          // secuestrar el gesto «atrás» del navegador (iOS/Android).
          "relative w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]",
          stackable && "metrik-table-stack sm:overflow-x-auto",
          containerClassName,
        )}
      >
        <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
      </div>
    );
  },
);

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
  },
);

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        className={cn("border-t border-border bg-surface-muted/50 font-medium", className)}
        {...props}
      />
    );
  },
);

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-border transition-colors duration-fast",
          "hover:bg-surface-muted/60 data-[state=selected]:bg-primary-soft",
          className,
        )}
        {...props}
      />
    );
  },
);

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, ...props }, ref) {
    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-3 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-fg-subtle",
          "[&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Etiqueta de la columna · se muestra junto al valor en modo `stackable` (móvil). */
  label?: string;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, label, ...props }, ref) {
    return (
      <td
        ref={ref}
        data-label={label}
        className={cn("p-3 align-middle [&:has([role=checkbox])]:pr-0", className)}
        {...props}
      />
    );
  },
);

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cn("mt-4 text-sm text-fg-muted", className)} {...props} />;
  },
);
