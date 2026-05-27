import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "metrik-theme";

function resolveSystem(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: Theme) {
  if (typeof document === "undefined") return;
  const resolved = theme === "system" ? resolveSystem() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.classList.toggle("light", resolved === "light");
}

/**
 * Hook para controlar el tema · light · dark · system.
 * Persiste en localStorage y reacciona a prefers-color-scheme.
 *
 * @example
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 *   <Switch checked={theme === "dark"} onCheckedChange={v => setTheme(v ? "dark" : "light")} />
 */
export function useTheme(defaultTheme: Theme = "system") {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (window.localStorage.getItem(STORAGE_KEY) as Theme | null) ?? defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
    theme === "system" ? resolveSystem() : theme,
  );

  useEffect(() => {
    apply(theme);
    setResolvedTheme(theme === "system" ? resolveSystem() : theme);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      apply("system");
      setResolvedTheme(resolveSystem());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
