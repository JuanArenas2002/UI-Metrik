import { Input } from "../../input";
import type { FilterComponent } from "../advanced-filter.types";

/** Autocompletado nativo (`<input list>` + `<datalist>`) · sin dependencias. */
export const FilterAutocomplete: FilterComponent = ({ field, value, onChange, id, error, disabled, readOnly, size }) => {
  const listId = `${id}-list`;
  const options = field.options ?? [];

  return (
    <>
      <Input
        id={id}
        list={listId}
        size={size}
        state={error ? "error" : "default"}
        value={typeof value === "string" ? value : ""}
        placeholder={field.placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      <datalist id={listId}>
        {options.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </datalist>
    </>
  );
};
