import { createContext, useContext, type ReactNode } from "react";
import type {
  FilterColor,
  FilterControlProps,
  FilterOrientation,
  FilterSize,
  FilterVariant,
} from "./advanced-filter.types";

/** Configuración compartida por todos los controles (evita prop-drilling). */
export interface AdvancedFilterContextValue {
  size: FilterSize;
  variant: FilterVariant;
  color: FilterColor;
  orientation: FilterOrientation;
  disabled: boolean;
  readOnly: boolean;
  /** Override global de render, resuelto por el `FilterRenderer`. */
  renderField?: (props: FilterControlProps) => ReactNode;
}

const AdvancedFilterContext = createContext<AdvancedFilterContextValue | null>(null);

export const AdvancedFilterProvider = AdvancedFilterContext.Provider;

export function useAdvancedFilterContext(): AdvancedFilterContextValue {
  const ctx = useContext(AdvancedFilterContext);
  if (!ctx) {
    throw new Error("Los controles de filtro deben renderizarse dentro de <AdvancedFilter>.");
  }
  return ctx;
}
