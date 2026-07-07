import { Textarea } from "../../textarea";
import type { FilterComponent } from "../advanced-filter.types";

export const FilterTextarea: FilterComponent = ({ field, value, onChange, id, error, disabled, readOnly }) => (
  <Textarea
    id={id}
    invalid={Boolean(error)}
    value={typeof value === "string" ? value : ""}
    placeholder={field.placeholder}
    disabled={disabled}
    readOnly={readOnly}
    required={field.required}
    aria-invalid={error ? true : undefined}
    aria-errormessage={error ? `${id}-error` : undefined}
    onChange={(e) => onChange(e.target.value)}
  />
);
