import { useCallback, useMemo, useState } from "react";
import type { FilterField, FilterValue, FilterValues } from "../advanced-filter.types";
import { getEmptyValues, getInitialValues, normalizeValues } from "../utils/normalize-filters";

export interface UseFilterStateOptions {
  fields: FilterField[];
  /** Valores externos · activa el modo controlado. */
  values?: FilterValues;
  onChange?: (values: FilterValues) => void;
}

export interface FilterStateApi {
  values: FilterValues;
  setValue: (key: string, value: FilterValue) => void;
  setValues: (values: FilterValues) => void;
  /** Restaura los valores por defecto de la config. */
  reset: () => FilterValues;
  /** Vacía todos los campos. */
  clear: () => FilterValues;
}

/**
 * Estado de los filtros con modo controlado/no controlado unificado.
 * Fuente única de verdad: sin estados duplicados.
 */
export function useFilterState({ fields, values, onChange }: UseFilterStateOptions): FilterStateApi {
  const controlled = values !== undefined;
  const [internal, setInternal] = useState<FilterValues>(() => getInitialValues(fields));

  const current = useMemo(
    () => normalizeValues(fields, controlled ? values : internal),
    [fields, controlled, values, internal],
  );

  const commit = useCallback(
    (next: FilterValues) => {
      if (!controlled) setInternal(next);
      onChange?.(next);
      return next;
    },
    [controlled, onChange],
  );

  const setValue = useCallback(
    (key: string, value: FilterValue) => commit({ ...current, [key]: value }),
    [commit, current],
  );

  const setValues = useCallback((next: FilterValues) => commit(next), [commit]);
  const reset = useCallback(() => commit(getInitialValues(fields)), [commit, fields]);
  const clear = useCallback(() => commit(getEmptyValues(fields)), [commit, fields]);

  return { values: current, setValue, setValues, reset, clear };
}
