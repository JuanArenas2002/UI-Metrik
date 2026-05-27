import metrikPreset from "@unisimon/metrik-ui/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [metrikPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@unisimon/metrik-ui/dist/**/*.js",
  ],
} satisfies Config;
