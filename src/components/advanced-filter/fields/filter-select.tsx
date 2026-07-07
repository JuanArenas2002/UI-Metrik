import { cn } from "../../../lib";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../select";
import type { FilterComponent, FilterSize } from "../advanced-filter.types";

const TRIGGER_SIZE: Record<FilterSize, string> = {
  sm: "h-8 text-xs",
  md: "h-10",
  lg: "h-12 text-base",
};

export const FilterSelect: FilterComponent = ({ field, value, onChange, id, error, disabled, readOnly, size }) => {
  const options = field.options ?? [];
  return (
    <Select
      value={value === "" || value == null ? undefined : String(value)}
      onValueChange={onChange}
      disabled={disabled || readOnly}
    >
      <SelectTrigger
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(TRIGGER_SIZE[size], error && "border-danger focus-visible:ring-danger")}
      >
        <SelectValue placeholder={field.placeholder ?? "Seleccionar…"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
