import type { DateRangeValue, FilterField, FilterValue, FilterValues } from "../advanced-filter.types";

/** `true` si el valor cuenta como "sin especificar" (no filtra nada). */
export function isEmptyValue(value: FilterValue): boolean {
  if (value === null || value === undefined || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") {
    const range = value as DateRangeValue;
    return !range.from && !range.to;
  }
  return false;
}

/** `true` si el campo tiene un valor activo (aplica filtro). */
export function isFieldActive(field: FilterField, values: FilterValues): boolean {
  return !isEmptyValue(values[field.key]);
}

/** Número de filtros con valor activo entre los campos visibles. */
export function countActiveFilters(fields: FilterField[], values: FilterValues): number {
  return fields.reduce((total, field) => (isFieldActive(field, values) ? total + 1 : total), 0);
}
