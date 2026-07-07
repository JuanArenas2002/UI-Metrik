import { useCallback, useMemo, useState } from "react";
import type { FilterField, FilterValues } from "../advanced-filter.types";
import { validateAll } from "../utils/validation";

export interface FilterValidationApi {
  /** Errores visibles (solo tras `validate()` o campos "tocados"). */
  errors: Record<string, string>;
  isValid: boolean;
  /** Ejecuta la validación completa y expone los errores. Devuelve validez. */
  validate: () => boolean;
  /** Limpia los errores visibles. */
  reset: () => void;
}

/**
 * Validación derivada de la config. La verdad se computa con `useMemo`; los
 * errores solo se muestran tras invocar `validate()` (evita ruido al escribir).
 */
export function useFilterValidation(fields: FilterField[], values: FilterValues): FilterValidationApi {
  const [show, setShow] = useState(false);

  const allErrors = useMemo(() => validateAll(fields, values), [fields, values]);
  const isValid = useMemo(() => Object.keys(allErrors).length === 0, [allErrors]);
  const errors = show ? allErrors : EMPTY;

  const validate = useCallback(() => {
    setShow(true);
    return Object.keys(allErrors).length === 0;
  }, [allErrors]);

  const reset = useCallback(() => setShow(false), []);

  return { errors, isValid, validate, reset };
}

const EMPTY: Record<string, string> = {};
