import type { FilterComponent, FilterType } from "./advanced-filter.types";
import { FilterAutocomplete } from "./fields/filter-autocomplete";
import { FilterBoolean } from "./fields/filter-boolean";
import { FilterDateRange } from "./fields/filter-daterange";
import { FilterInput } from "./fields/filter-input";
import { FilterMultiSelect } from "./fields/filter-multiselect";
import { FilterRadio } from "./fields/filter-radio";
import { FilterSelect } from "./fields/filter-select";
import { FilterSlider } from "./fields/filter-slider";
import { FilterTags } from "./fields/filter-tags";
import { FilterTextarea } from "./fields/filter-textarea";

/**
 * Registry (patrón Factory) que resuelve el control de cada tipo de filtro.
 * Sustituye a un `switch` gigante y permite añadir tipos sin modificar el
 * componente principal, vía `registerFilterType`.
 */
const registry = new Map<string, FilterComponent>([
  ["text", FilterInput],
  ["number", FilterInput],
  ["email", FilterInput],
  ["password", FilterInput],
  ["search", FilterInput],
  ["date", FilterInput],
  ["datetime", FilterInput],
  ["month", FilterInput],
  ["time", FilterInput],
  ["year", FilterInput],
  ["textarea", FilterTextarea],
  ["select", FilterSelect],
  ["multiselect", FilterMultiSelect],
  ["checkbox", FilterBoolean],
  ["switch", FilterBoolean],
  ["boolean", FilterBoolean],
  ["radio", FilterRadio],
  ["slider", FilterSlider],
  ["daterange", FilterDateRange],
  ["autocomplete", FilterAutocomplete],
  ["tags", FilterTags],
]);

/** Registra o sobrescribe el control de un tipo (extensión abierta). */
export function registerFilterType(type: FilterType, component: FilterComponent): void {
  registry.set(type, component);
}

/** Resuelve el control de un tipo · cae a `FilterInput` si es desconocido. */
export function getFilterComponent(type: FilterType): FilterComponent {
  return registry.get(type) ?? FilterInput;
}
