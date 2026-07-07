import type { DateRangeValue, FilterField, FilterValue, FilterValues } from "../advanced-filter.types";
import { isEmptyValue } from "./active-filters";
import { getInitialValues } from "./normalize-filters";

/**
 * Serializa los valores activos a query string (`URLSearchParams`) para
 * sincronizar filtros con la URL. Los valores vacíos se omiten.
 */
export function serializeFilters(values: FilterValues): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (isEmptyValue(value)) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else if (value && typeof value === "object") {
      const range = value as DateRangeValue;
      if (range.from) params.set(`${key}.from`, range.from);
      if (range.to) params.set(`${key}.to`, range.to);
    } else {
      params.set(key, String(value));
    }
  }
  return params.toString();
}

/**
 * Reconstruye los valores desde una query string, tipando cada campo según
 * su configuración (arrays, rangos, números y booleanos).
 */
export function deserializeFilters(query: string, fields: FilterField[]): FilterValues {
  const params = new URLSearchParams(query);
  const result = getInitialValues(fields);

  for (const field of fields) {
    const { key, type } = field;
    if (type === "multiselect" || type === "tags") {
      const all = params.getAll(key);
      if (all.length) result[key] = all;
    } else if (type === "daterange") {
      const from = params.get(`${key}.from`) ?? undefined;
      const to = params.get(`${key}.to`) ?? undefined;
      if (from || to) result[key] = { from, to };
    } else if (params.has(key)) {
      result[key] = coerce(params.get(key)!, type);
    }
  }
  return result;
}

function coerce(raw: string, type: FilterField["type"]): FilterValue {
  if (type === "number" || type === "year" || type === "slider") {
    const n = Number(raw);
    return Number.isNaN(n) ? raw : n;
  }
  if (type === "checkbox" || type === "switch" || type === "boolean") {
    return raw === "true";
  }
  return raw;
}
