import { Checkbox } from "../../checkbox";
import { Switch } from "../../switch";
import type { FilterComponent } from "../advanced-filter.types";

/** checkbox / switch / boolean · valor booleano. */
export const FilterBoolean: FilterComponent = ({ field, value, onChange, id, disabled, readOnly }) => {
  const checked = value === true;
  const locked = disabled || readOnly;

  if (field.type === "checkbox") {
    return (
      <Checkbox
        id={id}
        checked={checked}
        disabled={locked}
        onCheckedChange={(state) => onChange(state === true)}
      />
    );
  }
  return <Switch id={id} checked={checked} disabled={locked} onCheckedChange={(state) => onChange(state)} />;
};
