import type { ReactElement, ReactNode } from "react";

/** Tipos de control soportados. Extensible vía el registry sin tocar el core. */
export type FilterType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "search"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "switch"
  | "radio"
  | "autocomplete"
  | "date"
  | "datetime"
  | "daterange"
  | "month"
  | "time"
  | "year"
  | "slider"
  | "tags"
  | "boolean"
  // permite tipos personalizados registrados por el consumidor
  | (string & {});

export interface FilterOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DateRangeValue {
  from?: string;
  to?: string;
}

/** Valor de un filtro. Cada control conoce y coacciona su forma concreta. */
export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | DateRangeValue
  | null
  | undefined;

export type FilterValues = Record<string, FilterValue>;

export interface FilterValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp | string;
  /** Validador personalizado · devuelve mensaje de error o `null` si es válido. */
  validate?: (value: FilterValue, values: FilterValues) => string | null;
  /** Mensaje por defecto cuando falla una regla declarativa. */
  message?: string;
}

export interface FilterField {
  id?: string;
  key: string;
  label?: ReactNode;
  placeholder?: string;
  type: FilterType;
  required?: boolean;
  disabled?: boolean;
  /** No se renderiza (equivalente a `visible: false`). */
  hidden?: boolean;
  /** Por defecto `true`. `false` no se renderiza. */
  visible?: boolean;
  defaultValue?: FilterValue;
  options?: FilterOption[];
  multiple?: boolean;
  min?: number;
  max?: number;
  step?: number;
  validation?: FilterValidation;
  tooltip?: ReactNode;
  icon?: ReactNode;
  /** Ancho del campo en la grilla (columnas 1-12) o CSS explícito. */
  width?: number | string;
  /** Render personalizado de ESTE campo · máxima prioridad. */
  render?: (props: FilterControlProps) => ReactNode;
}

export type FilterSize = "sm" | "md" | "lg";
export type FilterVariant = "outlined" | "filled" | "ghost";
export type FilterColor = "primary" | "secondary";
export type FilterOrientation = "horizontal" | "vertical";
export type FilterStatus = "idle" | "loading" | "error" | "success";

/** Props que recibe cada control del registry. Contrato desacoplado del primitivo. */
export interface FilterControlProps {
  field: FilterField;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  id: string;
  error?: string | null;
  disabled?: boolean;
  readOnly?: boolean;
  size: FilterSize;
}

/** Un control es una función pura `props -> UI`. */
export type FilterComponent = (props: FilterControlProps) => ReactElement | null;

export interface AdvancedFilterProps {
  /** Configuración declarativa de los campos. Sin campos quemados. */
  fields: FilterField[];
  /** Valores actuales (controlado). Si se omite, opera en modo no controlado. */
  values?: FilterValues;
  onChange?: (values: FilterValues) => void;
  onApply?: (values: FilterValues) => void;
  onReset?: (values: FilterValues) => void;
  onClear?: (values: FilterValues) => void;
  onClose?: () => void;

  title?: ReactNode;
  size?: FilterSize;
  variant?: FilterVariant;
  color?: FilterColor;
  orientation?: FilterOrientation;

  /** Cabecera colapsable. */
  collapsible?: boolean;
  defaultCollapsed?: boolean;

  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Banner de estado (error/success) en la cabecera. */
  status?: FilterStatus;
  statusMessage?: ReactNode;
  /** Mensaje cuando no hay campos visibles. */
  emptyMessage?: ReactNode;

  showApply?: boolean;
  showReset?: boolean;
  showClear?: boolean;
  showClose?: boolean;
  applyLabel?: ReactNode;
  resetLabel?: ReactNode;
  clearLabel?: ReactNode;

  /** Override global de render para cualquier campo. */
  renderField?: (props: FilterControlProps) => ReactNode;

  className?: string;
  children?: ReactNode;
}
