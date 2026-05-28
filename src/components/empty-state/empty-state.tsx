import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Acción opcional (p. ej. un <Button>). */
  action?: ReactNode;
}

/**
 * Estado vacío · para listas, tablas o resultados sin datos.
 *
 * @example
 *   <EmptyState icon={<Inbox />} title="Sin reportes" description="Crea el primero." action={<Button>Nuevo</Button>} />
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, action, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong",
        "bg-surface px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="grid size-12 place-items-center rounded-full bg-surface-muted text-fg-subtle [&_svg]:size-6">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        {description && <p className="mx-auto max-w-sm text-sm text-fg-muted">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
});
