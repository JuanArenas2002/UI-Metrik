import { useCallback, useEffect, useState } from "react";

/**
 * Estado sincronizado con localStorage · serializa con JSON.
 * @example
 *   const [filters, setFilters] = useLocalStorage("metrik-filters", { period: "month" });
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota / serialize errors are silent */
    }
  }, [key, value]);

  const remove = useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, remove] as const;
}
