import { Label } from "../../label";
import { RadioGroup, RadioGroupItem } from "../../radio-group";
import type { FilterComponent } from "../advanced-filter.types";

export const FilterRadio: FilterComponent = ({ field, value, onChange, id, disabled, readOnly }) => {
  const options = field.options ?? [];
  return (
    <RadioGroup
      value={value == null || value === "" ? undefined : String(value)}
      onValueChange={onChange}
      disabled={disabled || readOnly}
      aria-labelledby={`${id}-label`}
    >
      {options.map((opt) => {
        const optionId = `${id}-${opt.value}`;
        return (
          <div key={String(opt.value)} className="flex items-center gap-2">
            <RadioGroupItem id={optionId} value={String(opt.value)} disabled={opt.disabled} />
            <Label htmlFor={optionId} className="cursor-pointer text-sm font-normal text-fg">
              {opt.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
