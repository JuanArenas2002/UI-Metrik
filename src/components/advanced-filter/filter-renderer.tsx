import { Info } from "lucide-react";
import { memo, useCallback, type ReactNode } from "react";
import { cn } from "../../lib";
import { Label } from "../label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { useAdvancedFilterContext } from "./advanced-filter.context";
import type { FilterControlProps, FilterField, FilterValue } from "./advanced-filter.types";
import { getFilterComponent } from "./filter-registry";

export interface FilterRendererProps {
  field: FilterField;
  value: FilterValue;
  error?: string | null;
  /** Setter estable (para que `React.memo` evite renders innecesarios). */
  setValue: (key: string, value: FilterValue) => void;
}

/** Controles cuyo label va en línea a la derecha del control. */
const INLINE_TYPES = new Set(["checkbox", "switch", "boolean"]);

/** Ancho de campo → columnas de la grilla (clases estáticas de Tailwind). */
const COL_SPAN: Record<number, string> = {
  1: "sm:col-span-1", 2: "sm:col-span-2", 3: "sm:col-span-3", 4: "sm:col-span-4",
  5: "sm:col-span-5", 6: "sm:col-span-6", 7: "sm:col-span-7", 8: "sm:col-span-8",
  9: "sm:col-span-9", 10: "sm:col-span-10", 11: "sm:col-span-11", 12: "sm:col-span-12",
};

function FilterRendererBase({ field, value, error, setValue }: FilterRendererProps): ReactNode {
  const { size, disabled, readOnly, orientation, renderField } = useAdvancedFilterContext();
  const id = field.id ?? `filter-${field.key}`;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  const onChange = useCallback((next: FilterValue) => setValue(field.key, next), [setValue, field.key]);

  const controlProps: FilterControlProps = {
    field,
    value,
    onChange,
    id,
    error,
    disabled: disabled || field.disabled,
    readOnly,
    size,
  };

  // Precedencia: render del campo > override global > registry.
  const control = field.render
    ? field.render(controlProps)
    : renderField
      ? renderField(controlProps)
      : renderRegistered(controlProps);

  const inline = INLINE_TYPES.has(field.type);
  const span = orientation === "horizontal" ? (COL_SPAN[Number(field.width)] ?? "sm:col-span-4") : undefined;

  const label = field.label != null && (
    <Label id={labelId} htmlFor={id} required={field.required} className={inline ? "cursor-pointer" : undefined}>
      {field.label}
    </Label>
  );

  const tooltip = field.tooltip != null && (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" aria-label="Más información" className="text-fg-subtle hover:text-fg">
          <Info className="size-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>{field.tooltip}</TooltipContent>
    </Tooltip>
  );

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", span)}>
      {inline ? (
        <div className="flex items-center gap-2.5">
          {control}
          {label}
          {tooltip}
        </div>
      ) : (
        <>
          {(label || tooltip) && (
            <div className="flex items-center gap-1.5">
              {label}
              {tooltip}
            </div>
          )}
          {control}
        </>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function renderRegistered(props: FilterControlProps): ReactNode {
  const Control = getFilterComponent(props.field.type);
  return <Control {...props} />;
}

export const FilterRenderer = memo(FilterRendererBase);
