import type { Config } from "tailwindcss";

/**
 * Preset de Tailwind para @juanarenas31/metrik-ui.
 * Mapea los tokens (CSS vars) a las clases utility · bg-primary, text-fg-muted, etc.
 *
 *   // tailwind.config.ts
 *   import metrikPreset from "@juanarenas31/metrik-ui/tailwind-preset";
 *   export default { presets: [metrikPreset], content: [...] } satisfies Config;
 */
const preset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        bg:             "var(--metrik-bg)",
        surface:        "var(--metrik-surface)",
        "surface-muted": "var(--metrik-surface-muted)",
        "surface-elev":  "var(--metrik-surface-elev)",
        border:          "var(--metrik-border)",
        "border-strong": "var(--metrik-border-strong)",
        fg:             "var(--metrik-fg)",
        "fg-muted":     "var(--metrik-fg-muted)",
        "fg-subtle":    "var(--metrik-fg-subtle)",
        primary: {
          DEFAULT: "var(--metrik-primary)",
          hover:   "var(--metrik-primary-hover)",
          soft:    "var(--metrik-primary-soft)",
          fg:      "var(--metrik-primary-fg)",
        },
        accent: {
          DEFAULT: "var(--metrik-accent)",
          hover:   "var(--metrik-accent-hover)",
          soft:    "var(--metrik-accent-soft)",
          fg:      "var(--metrik-accent-fg)",
        },
        success: { DEFAULT: "var(--metrik-success)", soft: "var(--metrik-success-soft)" },
        danger:  { DEFAULT: "var(--metrik-danger)",  soft: "var(--metrik-danger-soft)" },
        warning: { DEFAULT: "var(--metrik-warning)", soft: "var(--metrik-warning-soft)" },
        info:    {
          DEFAULT: "var(--metrik-info)",
          soft:    "var(--metrik-info-soft)",
          fg:      "var(--metrik-info-fg)",
        },
        ring:    "var(--metrik-ring)",
        // raw palette · útil para charts
        teal:  { 50:"var(--metrik-teal-50)", 100:"var(--metrik-teal-100)", 200:"var(--metrik-teal-200)", 300:"var(--metrik-teal-300)", 400:"var(--metrik-teal-400)", 500:"var(--metrik-teal-500)", 600:"var(--metrik-teal-600)", 700:"var(--metrik-teal-700)", 800:"var(--metrik-teal-800)", 900:"var(--metrik-teal-900)", 950:"var(--metrik-teal-950)" },
        coral: { 50:"var(--metrik-coral-50)", 100:"var(--metrik-coral-100)", 200:"var(--metrik-coral-200)", 300:"var(--metrik-coral-300)", 400:"var(--metrik-coral-400)", 500:"var(--metrik-coral-500)", 600:"var(--metrik-coral-600)", 700:"var(--metrik-coral-700)", 800:"var(--metrik-coral-800)", 900:"var(--metrik-coral-900)", 950:"var(--metrik-coral-950)" },
        blue:  { 50:"var(--metrik-blue-50)",  100:"var(--metrik-blue-100)",  200:"var(--metrik-blue-200)",  300:"var(--metrik-blue-300)",  400:"var(--metrik-blue-400)",  500:"var(--metrik-blue-500)",  600:"var(--metrik-blue-600)",  700:"var(--metrik-blue-700)",  800:"var(--metrik-blue-800)",  900:"var(--metrik-blue-900)",  950:"var(--metrik-blue-950)" },
      },
      borderRadius: {
        sm:   "var(--metrik-radius-sm)",
        md:   "var(--metrik-radius-md)",
        lg:   "var(--metrik-radius-lg)",
        xl:   "var(--metrik-radius-xl)",
        full: "var(--metrik-radius-full)",
      },
      boxShadow: {
        xs: "var(--metrik-shadow-xs)",
        sm: "var(--metrik-shadow-sm)",
        md: "var(--metrik-shadow-md)",
        lg: "var(--metrik-shadow-lg)",
      },
      transitionDuration: {
        fast: "var(--metrik-duration-fast)",
        base: "var(--metrik-duration-base)",
        slow: "var(--metrik-duration-slow)",
      },
      transitionTimingFunction: { metrik: "var(--metrik-ease)" },
      zIndex: {
        sticky:   "var(--metrik-z-sticky)",
        dropdown: "var(--metrik-z-dropdown)",
        overlay:  "var(--metrik-z-overlay)",
        modal:    "var(--metrik-z-modal)",
        toast:    "var(--metrik-z-toast)",
      },
      keyframes: {
        "metrik-fade-in":  { from: { opacity: "0" }, to: { opacity: "1" } },
        "metrik-fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "metrik-zoom-in":  { from: { opacity: "0", transform: "scale(.96)" }, to: { opacity: "1", transform: "scale(1)" } },
        "metrik-zoom-out": { from: { opacity: "1", transform: "scale(1)" }, to: { opacity: "0", transform: "scale(.96)" } },
        "metrik-slide-in-right":  { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        "metrik-slide-out-right": { from: { transform: "translateX(0)" }, to: { transform: "translateX(100%)" } },
        "metrik-spin": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "fade-in":  "metrik-fade-in var(--metrik-duration-base) var(--metrik-ease)",
        "fade-out": "metrik-fade-out var(--metrik-duration-base) var(--metrik-ease)",
        "zoom-in":  "metrik-zoom-in var(--metrik-duration-base) var(--metrik-ease)",
        "zoom-out": "metrik-zoom-out var(--metrik-duration-base) var(--metrik-ease)",
        "slide-in-right":  "metrik-slide-in-right var(--metrik-duration-slow) var(--metrik-ease)",
        "slide-out-right": "metrik-slide-out-right var(--metrik-duration-slow) var(--metrik-ease)",
        spin: "metrik-spin 1s linear infinite",
      },
    },
  },
};

export default preset;
