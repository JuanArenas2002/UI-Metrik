import { useEffect, useState } from "react";

/**
 * Hook para escuchar media queries.
 * @example
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const useBreakpoint = {
  sm: () => useMediaQuery("(min-width: 640px)"),
  md: () => useMediaQuery("(min-width: 768px)"),
  lg: () => useMediaQuery("(min-width: 1024px)"),
  xl: () => useMediaQuery("(min-width: 1280px)"),
  "2xl": () => useMediaQuery("(min-width: 1536px)"),
};
