import { Check, ChevronDown, Eraser, RotateCcw, X } from "lucide-react";
import {
  forwardRef,
  memo,
  useCallback,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "../../lib";
import { Alert } from "../alert";
import { Badge } from "../badge";
import { Button } from "../button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { Spinner } from "../spinner";
import { TooltipProvider } from "../tooltip";
import { AdvancedFilterProvider, type AdvancedFilterContextValue } from "./advanced-filter.context";
import { advancedFilterVariants, fieldGridClass } from "./advanced-filter.styles";
import type { AdvancedFilterProps } from "./advanced-filter.types";
import { FilterRenderer } from "./filter-renderer";
import { useFilterState } from "./hooks/use-filter-state";
import { useFilterValidation } from "./hooks/use-filter-validation";
import { countActiveFilters } from "./utils/active-filters";
import { getVisibleFields } from "./utils/normalize-filters";

/**
 * Filtro avanzado universal, dirigido por configuración (`fields`). Renderiza
 * los controles con un registry extensible (sin `switch` gigante ni campos
 * quemados), y es totalmente accesible, responsive y componible dentro de
 * Dialog / Drawer / Popover / Sidebar.
 *
 * @example
 *   <AdvancedFilter fields={fields} values={values} onChange={setValues} onApply={apply} />
 */
export const AdvancedFilter = memo(
  forwardRef<HTMLElement, AdvancedFilterProps>(function AdvancedFilter(
    {
      fields,
      values,
      onChange,
      onApply,
      onReset,
      onClear,
      onClose,
      title = "Filtros",
      size = "md",
      variant = "outlined",
      color = "primary",
      orientation = "horizontal",
      collapsible = false,
      defaultCollapsed = false,
      loading = false,
      disabled = false,
      readOnly = false,
      status = "idle",
      statusMessage,
      emptyMessage = "No hay filtros disponibles.",
      showApply = true,
      showReset = true,
      showClear = true,
      showClose,
      applyLabel = "Aplicar",
      resetLabel = "Restablecer",
      clearLabel = "Limpiar",
      renderField,
      className,
      children,
    },
    ref,
  ) {
    const bodyId = useId();
    const { values: state, setValue, reset, clear } = useFilterState({ fields, values, onChange });
    const { errors, validate, reset: resetValidation } = useFilterValidation(fields, state);

    const visibleFields = useMemo(() => getVisibleFields(fields), [fields]);
    const activeCount = useMemo(() => countActiveFilters(visibleFields, state), [visibleFields, state]);

    const [open, setOpen] = useState(!defaultCollapsed);
    const expanded = collapsible ? open : true;
    const showCloseButton = showClose ?? Boolean(onClose);

    const handleApply = useCallback(() => {
      if (validate()) onApply?.(state);
    }, [validate, onApply, state]);

    const handleReset = useCallback(() => {
      resetValidation();
      onReset?.(reset());
    }, [reset, resetValidation, onReset]);

    const handleClear = useCallback(() => {
      resetValidation();
      onClear?.(clear());
    }, [clear, resetValidation, onClear]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Escape") {
          onClose?.();
        } else if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
          e.preventDefault();
          handleApply();
        }
      },
      [onClose, handleApply],
    );

    const ctx = useMemo<AdvancedFilterContextValue>(
      () => ({ size, variant, color, orientation, disabled, readOnly, renderField }),
      [size, variant, color, orientation, disabled, readOnly, renderField],
    );

    const header = (
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {collapsible ? (
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm text-fg outline-none"
              >
                <ChevronDown className={cn("size-4 transition-transform duration-fast", !expanded && "-rotate-90")} />
                <span className="truncate font-display font-semibold">{title}</span>
              </button>
            </CollapsibleTrigger>
          ) : (
            <h2 className="truncate font-display font-semibold text-fg">{title}</h2>
          )}
          {activeCount > 0 && (
            <Badge tone={color === "primary" ? "primary" : "neutral"} size="sm">
              {activeCount}
            </Badge>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {showClear && (
            <Button variant="ghost" size="sm" leftIcon={<Eraser />} onClick={handleClear} disabled={disabled}>
              {clearLabel}
            </Button>
          )}
          {showReset && (
            <Button variant="ghost" size="sm" leftIcon={<RotateCcw />} onClick={handleReset} disabled={disabled}>
              {resetLabel}
            </Button>
          )}
          {showApply && (
            <Button
              variant={color === "primary" ? "primary" : "secondary"}
              size="sm"
              leftIcon={<Check />}
              onClick={handleApply}
              loading={loading}
              disabled={disabled || readOnly}
            >
              {applyLabel}
            </Button>
          )}
          {showCloseButton && (
            <Button variant="ghost" size="icon" aria-label="Cerrar filtros" onClick={onClose}>
              <X />
            </Button>
          )}
        </div>
      </div>
    );

    const grid =
      visibleFields.length === 0 ? (
        <p className="py-6 text-center text-sm text-fg-muted">{emptyMessage}</p>
      ) : (
        <div className={fieldGridClass[orientation]} aria-busy={loading || undefined}>
          {visibleFields.map((field) => (
            <FilterRenderer
              key={field.key}
              field={field}
              value={state[field.key]}
              error={errors[field.key] ?? null}
              setValue={setValue}
            />
          ))}
        </div>
      );

    const body = (
      <div id={bodyId} className="relative mt-4">
        {grid}
        {children}
        {loading && (
          <div className="absolute inset-0 grid place-items-center rounded-md bg-surface/60">
            <Spinner />
          </div>
        )}
      </div>
    );

    const inner = (
      <>
        {header}
        {status !== "idle" && statusMessage != null && (
          <Alert tone={status === "error" ? "danger" : "success"} className="mt-3">
            {statusMessage}
          </Alert>
        )}
        {collapsible ? <CollapsibleContent>{body}</CollapsibleContent> : body}
      </>
    );

    return (
      <TooltipProvider>
        <AdvancedFilterProvider value={ctx}>
          <section
            ref={ref}
            role="search"
            aria-label={typeof title === "string" ? title : "Filtros"}
            data-disabled={disabled || undefined}
            data-readonly={readOnly || undefined}
            className={cn(advancedFilterVariants({ variant, size }), className)}
            onKeyDown={handleKeyDown}
          >
            {collapsible ? (
              <Collapsible open={expanded} onOpenChange={setOpen}>
                {inner}
              </Collapsible>
            ) : (
              inner
            )}
          </section>
        </AdvancedFilterProvider>
      </TooltipProvider>
    );
  }),
);
