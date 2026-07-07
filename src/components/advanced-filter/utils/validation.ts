import type { FilterField, FilterValue, FilterValues } from "../advanced-filter.types";
import { isEmptyValue } from "./active-filters";

/** Reglas declarativas, en orden. Cada una devuelve un mensaje o `null`. */
type Rule = (value: FilterValue, field: FilterField, values: FilterValues) => string | null;

const rules: Rule[] = [
  (value, field) => {
    const required = field.required ?? field.validation?.required;
    return required && isEmptyValue(value) ? (msg(field) ?? "Este campo es obligatorio.") : null;
  },
  (value, field) => {
    const { min } = field.validation ?? {};
    return min != null && typeof value === "number" && value < min
      ? (msg(field) ?? `El valor mínimo es ${min}.`)
      : null;
  },
  (value, field) => {
    const { max } = field.validation ?? {};
    return max != null && typeof value === "number" && value > max
      ? (msg(field) ?? `El valor máximo es ${max}.`)
      : null;
  },
  (value, field) => {
    const { minLength } = field.validation ?? {};
    return minLength != null && typeof value === "string" && value.length < minLength
      ? (msg(field) ?? `Mínimo ${minLength} caracteres.`)
      : null;
  },
  (value, field) => {
    const { maxLength } = field.validation ?? {};
    return maxLength != null && typeof value === "string" && value.length > maxLength
      ? (msg(field) ?? `Máximo ${maxLength} caracteres.`)
      : null;
  },
  (value, field) => {
    const { pattern } = field.validation ?? {};
    if (!pattern || typeof value !== "string" || value === "") return null;
    const re = typeof pattern === "string" ? new RegExp(pattern) : pattern;
    return re.test(value) ? null : (msg(field) ?? "Formato inválido.");
  },
  (value, field, values) => field.validation?.validate?.(value, values) ?? null,
];

function msg(field: FilterField): string | undefined {
  return field.validation?.message;
}

/** Valida un único campo · primer error encontrado o `null`. */
export function validateField(field: FilterField, value: FilterValue, values: FilterValues): string | null {
  for (const rule of rules) {
    const error = rule(value, field, values);
    if (error) return error;
  }
  return null;
}

/** Valida todos los campos · mapa `key -> mensaje` solo con los que fallan. */
export function validateAll(fields: FilterField[], values: FilterValues): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const error = validateField(field, values[field.key], values);
    if (error) errors[field.key] = error;
  }
  return errors;
}
