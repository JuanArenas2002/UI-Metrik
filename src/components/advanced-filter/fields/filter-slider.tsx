import { Slider } from "../../slider";
import type { FilterComponent } from "../advanced-filter.types";

export const FilterSlider: FilterComponent = ({ field, value, onChange, id, disabled, readOnly }) => {
  const min = field.min ?? 0;
  const max = field.max ?? 100;
  const step = field.step ?? 1;
  const current = typeof value === "number" ? value : min;

  return (
    <div className="flex items-center gap-3">
      <Slider
        id={id}
        className="flex-1"
        value={[current]}
        min={min}
        max={max}
        step={step}
        disabled={disabled || readOnly}
        aria-labelledby={`${id}-label`}
        onValueChange={([next]) => onChange(next)}
      />
      <span className="w-10 shrink-0 text-right text-sm tabular-nums text-fg-muted">{current}</span>
    </div>
  );
};
