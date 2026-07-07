import type { DateRangeValue, FilterValue, FilterValues } from "../advanced-filter.types";
import { isEmptyValue } from "./active-filters";

/** Objeto plano listo para una API, omitiendo valores vacíos. */
export function buildQuery(values: FilterValues): Record<string, unknown> {
  const query: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(values)) {
    if (isEmptyValue(value)) continue;
    query[key] = normalize(value);
  }
  return query;
}

function normalize(value: FilterValue): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const range = value as DateRangeValue;
    return { from: range.from, to: range.to };
  }
  return value;
}
