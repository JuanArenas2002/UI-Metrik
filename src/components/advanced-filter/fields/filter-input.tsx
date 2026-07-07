import { cn } from "../../../lib";
import { Input } from "../../input";
import type { FilterComponent, FilterType } from "../advanced-filter.types";

/** Mapea el tipo de filtro al `type` nativo del `<input>`. */
const INPUT_TYPE: Partial<Record<FilterType, string>> = {
  text: "text",
  number: "number",
  email: "email",
  password: "password",
  search: "search",
  date: "date",
  datetime: "datetime-local",
  month: "month",
  time: "time",
  year: "number",
};

const NUMERIC = new Set<FilterType>(["number", "year", "slider"]);

/** Control basado en `<Input>` nativo · sin dependencias pesadas. */
export const FilterInput: FilterComponent = ({ field, value, onChange, id, error, disabled, readOnly, size }) => {
  const numeric = NUMERIC.has(field.type);
  const display = typeof value === "string" || typeof value === "number" ? String(value) : "";

  const control = (
    <Input
      id={id}
      type={INPUT_TYPE[field.type] ?? "text"}
      size={size}
      state={error ? "error" : "default"}
      value={display}
      placeholder={field.placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={field.required}
      min={field.min}
      max={field.max}
      step={field.step}
      aria-invalid={error ? true : undefined}
      aria-errormessage={error ? `${id}-error` : undefined}
      className={field.icon ? "pl-9" : undefined}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(numeric ? (raw === "" ? "" : Number(raw)) : raw);
      }}
    />
  );

  if (!field.icon) return control;
  return (
    <div className="relative">
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle [&_svg]:size-4",
        )}
      >
        {field.icon}
      </span>
      {control}
    </div>
  );
};
