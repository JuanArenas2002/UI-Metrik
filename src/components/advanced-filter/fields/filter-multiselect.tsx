import { cn } from "../../../lib";
import { ChipSelector } from "../../chip-selector";
import type { FilterComponent } from "../advanced-filter.types";

export const FilterMultiSelect: FilterComponent = ({ field, value, onChange, disabled, readOnly }) => {
  const options = (field.options ?? []).map((o) => ({ value: String(o.value), label: o.label }));
  const selected = Array.isArray(value) ? value.map(String) : [];
  const locked = disabled || readOnly;

  return (
    <div className={cn(locked && "pointer-events-none opacity-60")} aria-disabled={locked || undefined}>
      <ChipSelector options={options} value={selected} onValueChange={(v) => onChange(v)} />
    </div>
  );
};
