import type { FilterField, FilterValue, FilterValues } from "../advanced-filter.types";

/** Valor "vacío" según el tipo, ignorando el `defaultValue` del campo. */
export function emptyValue(field: FilterField): FilterValue {
  switch (field.type) {
    case "multiselect":
    case "tags":
      return [];
    case "checkbox":
    case "switch":
    case "boolean":
      return false;
    case "daterange":
      return { from: undefined, to: undefined };
    default:
      return "";
  }
}

/** Valor por defecto sensato según el tipo, si el campo no declara `defaultValue`. */
function fallbackValue(field: FilterField): FilterValue {
  return field.defaultValue !== undefined ? field.defaultValue : emptyValue(field);
}

/** Valores iniciales derivados de la config (defaults por campo). */
export function getInitialValues(fields: FilterField[]): FilterValues {
  return Object.fromEntries(fields.map((field) => [field.key, fallbackValue(field)]));
}

/** Valores vacíos (para "limpiar"), ignorando defaults. */
export function getEmptyValues(fields: FilterField[]): FilterValues {
  return Object.fromEntries(fields.map((field) => [field.key, emptyValue(field)]));
}

/** Combina valores externos con los defaults de la config (los externos ganan). */
export function normalizeValues(fields: FilterField[], values: FilterValues = {}): FilterValues {
  return { ...getInitialValues(fields), ...values };
}

/** Campos que deben renderizarse (respeta `hidden` y `visible`). */
export function getVisibleFields(fields: FilterField[]): FilterField[] {
  return fields.filter((field) => !field.hidden && field.visible !== false);
}
