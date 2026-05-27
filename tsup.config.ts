import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "tailwind-preset": "src/tailwind-preset.ts",
  },
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"],
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
  onSuccess: async () => {
    // Copy CSS files to dist
    const fs = await import("node:fs/promises");
    await fs.copyFile("src/styles/tokens.css", "dist/tokens.css");
    await fs.copyFile("src/styles/globals.css", "dist/styles.css");
  },
});
