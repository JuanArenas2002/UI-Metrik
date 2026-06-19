#!/usr/bin/env node
/**
 * Guardia de aislamiento del core bundle.
 *
 * Empaqueta (con esbuild, tree-shaking de producción) un consumidor que importa
 * únicamente componentes básicos desde el entry principal y verifica que NINGUNA
 * dependencia pesada termine en el grafo resultante.
 *
 * Complementa a size-limit: como recharts / @tanstack/react-table /
 * react-day-picker son peerDependencies, size-limit las externaliza y no las
 * "vería" si se colaran en el core. Este guard sí las detecta y hace fallar CI.
 *
 * Uso:  node scripts/check-core-isolation.mjs   (requiere `dist/` ya construido)
 */
import { build } from "esbuild";

/** Componentes básicos que el core DEBE poder importar sin arrastrar peso. */
const CORE_IMPORTS = [
  "Button",
  "Card",
  "Badge",
  "Input",
  "Avatar",
  "Separator",
  "Tooltip",
];

/** Dependencias que NUNCA deben aparecer en el core bundle. */
const FORBIDDEN = ["recharts", "@tanstack/react-table", "react-day-picker", "cmdk"];

const entry = `
import { ${CORE_IMPORTS.join(", ")} } from "./dist/index.js";
console.log(${CORE_IMPORTS.join(", ")});
`;

const result = await build({
  stdin: { contents: entry, resolveDir: process.cwd(), loader: "js" },
  bundle: true,
  format: "esm",
  minify: true,
  write: false,
  metafile: true,
  // Mantener los node_modules como statements externos: si una dep pesada es
  // alcanzable, su import quedará visible en el output / metafile.
  packages: "external",
  logLevel: "silent",
});

const code = result.outputFiles[0].text;
const inputs = Object.keys(result.metafile.inputs);

const offenders = FORBIDDEN.filter((dep) => {
  const inOutput = code.includes(`"${dep}"`) || code.includes(`'${dep}'`);
  const inGraph = inputs.some((f) => f.includes(`node_modules/${dep}/`));
  return inOutput || inGraph;
});

const bytes = result.outputFiles[0].contents.byteLength;

if (offenders.length > 0) {
  console.error("\n❌ Aislamiento del core ROTO. Dependencias pesadas detectadas en el core bundle:");
  for (const dep of offenders) console.error(`   · ${dep}`);
  console.error(
    "\nEl core de @juanarenas31/metrik-ui no debe arrastrar gráficos, tablas avanzadas,\n" +
      "calendarios ni command palettes. Mueve el componente a su subpath\n" +
      "(/charts, /table, /calendar, /command) en src/entries/.\n"
  );
  process.exit(1);
}

console.log(
  `\n✅ Core aislado correctamente · ${CORE_IMPORTS.length} componentes · ` +
    `${(bytes / 1024).toFixed(1)} kB (min) · sin deps pesadas: ${FORBIDDEN.join(", ")}\n`
);
