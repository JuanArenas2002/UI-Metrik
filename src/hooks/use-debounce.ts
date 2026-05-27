import { useEffect, useState } from "react";

/**
 * Devuelve el valor después de un retraso · útil para inputs de búsqueda.
 * @example
 *   const debounced = useDebounce(query, 300);
 *   useEffect(() => fetch("/api?q=" + debounced), [debounced]);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
