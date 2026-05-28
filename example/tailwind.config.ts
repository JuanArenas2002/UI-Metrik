import metrikPreset from "@juanarenas31/metrik-ui/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [metrikPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@juanarenas31/metrik-ui/dist/**/*.js",
  ],
} satisfies Config;
