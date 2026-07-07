import { Input } from "../../input";
import type { DateRangeValue, FilterComponent } from "../advanced-filter.types";

export const FilterDateRange: FilterComponent = ({ field, value, onChange, id, error, disabled, readOnly, size }) => {
  const range: DateRangeValue =
    value && typeof value === "object" && !Array.isArray(value) ? (value as DateRangeValue) : {};

  const patch = (next: Partial<DateRangeValue>) => onChange({ from: range.from, to: range.to, ...next });
  const state = error ? "error" : "default";

  return (
    <div className="flex items-center gap-2">
      <Input
        id={id}
        type="date"
        size={size}
        state={state}
        value={range.from ?? ""}
        max={range.to}
        disabled={disabled}
        readOnly={readOnly}
        aria-label="Desde"
        onChange={(e) => patch({ from: e.target.value || undefined })}
      />
      <span aria-hidden className="shrink-0 text-sm text-fg-subtle">
        —
      </span>
      <Input
        type="date"
        size={size}
        state={state}
        value={range.to ?? ""}
        min={range.from}
        disabled={disabled}
        readOnly={readOnly}
        aria-label="Hasta"
        onChange={(e) => patch({ to: e.target.value || undefined })}
      />
    </div>
  );
};
