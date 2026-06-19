import { defineConfig } from "tsup";

/**
 * Build multi-entry de Metri-K UI.
 *
 * Cada entry produce un chunk independiente. Las dependencias pesadas
 * (recharts, @tanstack/react-table, react-day-picker, cmdk) sólo se referencian
 * desde su subpath correspondiente, de modo que un consumidor que importe
 * únicamente el core nunca las arrastra a su bundle.
 *
 * `splitting: true` extrae el código compartido (cn, cva, tokens…) a chunks
 * comunes, evitando duplicación entre entries.
 */
export default defineConfig({
  entry: {
    index: "src/index.ts",
    charts: "src/entries/charts.ts",
    table: "src/entries/table.ts",
    calendar: "src/entries/calendar.ts",
    command: "src/entries/command.ts",
    layout: "src/entries/layout.ts",
    forms: "src/entries/forms.ts",
    "tailwind-preset": "src/tailwind-preset.ts",
  },
  format: ["esm"],
  target: "es2022",
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  minify: false,
  // Todas las dependencias y peerDependencies se externalizan por defecto;
  // se listan explícitamente las peers para dejar la intención clara.
  external: ["react", "react-dom", "tailwindcss"],
  esbuildOptions(options) {
    // Directiva "use client" a nivel de chunk: necesaria para RSC (Next.js App Router).
    options.banner = { js: '"use client";' };
  },
  onSuccess: async () => {
    // Copia los CSS al dist (tsup no procesa CSS plano).
    const fs = await import("node:fs/promises");
    await fs.copyFile("src/styles/tokens.css", "dist/tokens.css");
    await fs.copyFile("src/styles/globals.css", "dist/styles.css");
  },
});
