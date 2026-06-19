# Optimización arquitectónica · @juanarenas31/metrik-ui

> Objetivo: convertir la librería en un design system **modular, escalable y
> completamente tree-shakeable**, sin romper la API pública principal.
> Documento base para la versión **0.6.0**.

---

## 1. Auditoría de empaquetado (hallazgos)

### 1.1 Estado previo (v0.5.0)

| Aspecto | Estado v0.5.0 |
|---|---|
| Entry points | **1** (`src/index.ts`) + `tailwind-preset` |
| `dist/index.js` | **~118 KB** en un **único módulo** monolítico |
| `splitting` | `true` — pero **sin efecto**: con un solo entry no hay nada que dividir |
| `sideEffects` | `["**/*.css"]` ✅ (correcto: JS marcado como libre de efectos) |
| Dependencias pesadas | `recharts`, `@tanstack/react-table`, `react-day-picker`, `cmdk` en `dependencies` |
| Deps externalizadas en build | ✅ (no se inlinean; tsup externaliza `dependencies` por defecto) |

### 1.2 Causa raíz del problema

Las dependencias pesadas **sí estaban externalizadas** (no se inlineaban en el
`.js` publicado). El problema real estaba en la **forma del módulo de salida**:

- `src/index.ts` hacía `export * from "./components"`, y tsup lo compilaba a **un
  solo módulo `index.js` de 118 KB** con todos los componentes y con
  `import … from 'recharts' | '@tanstack/react-table' | 'cmdk' | 'react-day-picker'`
  como sentencias de nivel superior **en el mismo módulo** que `Button`.
- Cuando una app consumidora hacía `import { Button } from "@juanarenas31/metrik-ui"`,
  el bundler cargaba ese módulo monolítico y **no lograba podar** las importaciones
  pesadas con fiabilidad (un único módulo con re-exports + directiva `"use client"`
  limita el DCE inter-módulo).

**Evidencia empírica** (bundling real con esbuild, `import { Button }` desde el
`dist` v0.5.0):

```
bundle resultante: 60 KB  (¡solo para Button!)
recharts            -> 1   ❌ arrastrado
react-day-picker    -> 1   ❌ arrastrado
@tanstack/react-table -> 1 ❌ arrastrado
cmdk                -> 1   ❌ arrastrado
sonner              -> 2   ❌ arrastrado
```

Esto explica los bundles consumidores **> 500 KB** y los "miles de módulos
transformados" en dev (Vite pre-bundlea el módulo gigante y todas sus deps).

### 1.3 Componentes ↔ dependencias pesadas

| Dependencia | Peso aprox. (consumidor) | Componentes que la consumen |
|---|---|---|
| `recharts` | ~400 KB | `Chart*` |
| `@tanstack/react-table` | ~120 KB | `DataTable` |
| `react-day-picker` | ~40 KB | `Calendar`, `DateRangePill`, `Floating*` |
| `cmdk` | ~15 KB | `Command*`, `Combobox` |
| `sonner` | ~12 KB | `Toaster` |
| `@radix-ui/*` (23 pkgs) | ~2–6 KB c/u | múltiples |

---

## 2. Nueva arquitectura de distribución

Entrypoint principal **intacto** (compatibilidad) + 6 subpaths especializados que
**aíslan físicamente** cada dependencia pesada en su propio chunk.

```
@juanarenas31/metrik-ui            → core + re-export de todo (compat. v0.5.x)
@juanarenas31/metrik-ui/charts     → Chart*            (aísla recharts)
@juanarenas31/metrik-ui/table      → Table, DataTable  (aísla @tanstack/react-table)
@juanarenas31/metrik-ui/calendar   → Calendar, DateRangePill, Floating* (aísla react-day-picker)
@juanarenas31/metrik-ui/command    → Command*, Combobox (aísla cmdk)
@juanarenas31/metrik-ui/layout     → Container, Stack, Grid, Separator, ScrollArea
@juanarenas31/metrik-ui/forms      → Input, Select, Checkbox, Radio, Switch, Slider, Form…
```

### 2.1 Categorización del design system (escalabilidad futura)

| Categoría | Componentes | Subpath sugerido |
|---|---|---|
| **Core UI** | Button, Badge, Avatar, Card, Skeleton, Spinner, Tooltip, Separator, Logo | `.` (raíz) |
| **Forms** | Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Slider, Form, Toggle, ToggleGroup, ChipSelector, FileDropzone, RichTextEditor | `/forms` |
| **Data Display** | Table, DataTable, Progress, EmptyState, Pagination, Breadcrumb | `/table` (tablas) + raíz |
| **Charts** | ChartContainer, ChartTooltip, ChartLegend… | `/charts` |
| **Overlays** | Dialog, AlertDialog, Sheet, Popover, HoverCard, DropdownMenu, ContextMenu, Tooltip, Command | raíz + `/command` |
| **Navigation** | Tabs, Breadcrumb, Pagination, Accordion, Collapsible | raíz |
| **Layout** | Container, Stack, Grid, ScrollArea, Separator | `/layout` |

> El árbol `src/components/<componente>/` ya es modular por componente; **no se
> reubicaron carpetas** para evitar churn. La categorización se expresa mediante
> los **entry barrels** en `src/entries/`, que es la capa de distribución.

### 2.2 Estructura de carpetas resultante

```
src/
├─ index.ts                 # entry principal (re-exporta todo · compat)
├─ entries/                 # ← NUEVO · capa de distribución modular
│  ├─ charts.ts
│  ├─ table.ts
│  ├─ calendar.ts
│  ├─ command.ts
│  ├─ layout.ts
│  └─ forms.ts
├─ components/<comp>/        # un componente por carpeta (sin cambios)
├─ hooks/
├─ lib/
└─ styles/
```

---

## 3. Configuración de build (`tsup.config.ts`)

- **8 entry points** (`index` + 6 subpaths + `tailwind-preset`).
- `splitting: true` → ahora **sí actúa**: extrae código compartido (`cn`, `cva`,
  primitivos comunes) a chunks reutilizados entre entries, sin duplicación.
- `treeshake: true`, `format: ["esm"]`, `target: "es2022"`.
- `dts: true` → genera tipos por entry (`charts.d.ts`, `table.d.ts`, …).
- Deps pesadas externalizadas (comportamiento por defecto de tsup) + listadas como
  peers opcionales.

Cada dependencia pesada queda **aislada en un único chunk**:

```
recharts              → chunk-BDXAQ2IC.js   (solo lo importa /charts e index→Chart)
@tanstack/react-table → chunk-WBSVG3VB.js   (solo /table   e index→DataTable)
react-day-picker      → chunk-OCQZCAY5.js   (solo /calendar e index→Calendar)
cmdk                  → chunk-FZQU2KB6.js   (solo /command  e index→Command)
```

El `index.js` re-exporta esos símbolos vía `export { Chart… } from './chunk-…'`
(re-export puro, **tree-shakeable**): si el consumidor no usa `Chart`, el bundler
descarta esa línea y el chunk de recharts **nunca se carga**.

---

## 4. Verificación de tree-shaking

Bundling real (esbuild, `--minify`, deps externas) de un consumidor que importa
**solo componentes básicos desde el entry principal**:

```js
import { Button, Card, Badge, Input, Avatar, Separator, Tooltip }
  from "@juanarenas31/metrik-ui";
```

| Métrica | v0.5.0 (solo Button) | v0.6.0 (7 componentes) |
|---|---|---|
| Tamaño bundle | **60 KB** | **28 KB** |
| `recharts` | ❌ 1 | ✅ **0** |
| `@tanstack/react-table` | ❌ 1 | ✅ **0** |
| `react-day-picker` | ❌ 1 | ✅ **0** |
| `cmdk` | ❌ 1 | ✅ **0** |

**Control positivo** — `import { ChartContainer } from "…/charts"` sí incluye
`recharts` (1 ref). El aislamiento funciona en ambos sentidos.

✅ **Criterio de éxito cumplido**: los componentes básicos no incorporan gráficos,
tablas avanzadas, calendarios ni command palettes.

> Nota honesta: el bundle core (28 KB) aún arrastra algunos `@radix-ui/*` y
> `sonner` por co-ubicación en chunks compartidos. Es marginal (2–12 KB) frente a
> los ~575 KB de deps pesadas ya eliminadas, y el bundler del consumidor suele
> depurarlo aún más. Optimización fina opcional (§7).

---

## 5. Dependencias pesadas → peerDependencies opcionales

Migradas de `dependencies` a `peerDependencies` **opcionales**
(`peerDependenciesMeta.optional = true`) y conservadas en `devDependencies` para
el build/tipos de la propia librería:

| Dependencia | Decisión | Justificación |
|---|---|---|
| `recharts` | → peer opcional | ~400 KB. Solo `/charts`. Evita instalación/bundle a quien no grafica; el consumidor controla la versión y deduplica. |
| `@tanstack/react-table` | → peer opcional | ~120 KB. Solo `DataTable`. Headless y de versionado activo: mejor que lo fije el consumidor. |
| `react-day-picker` | → peer opcional | Acoplado a `date-fns`/locale. Solo fechas. Peer evita duplicar date pickers. |
| `cmdk`, `sonner`, `@radix-ui/*` | **se mantienen como `dependencies`** | Ligeras y transversales a muchos componentes core; como peer generarían fricción desproporcionada. |

Patrón estándar en librerías de charts/tablas (recharts/tanstack ya son peers en
muchos ecosistemas). Quien use `/charts`, `/table` o `/calendar` instala la peer
correspondiente (npm la avisa).

---

## 6. Métricas comparativas (resumen)

### Paquete publicado (`dist/`)
| | v0.5.0 | v0.6.0 |
|---|---|---|
| Entry points JS | 2 | 8 |
| `index.js` | 118 KB (monolito) | **44–48 KB** |
| Chunks compartidos | 0 | 12 |
| Total JS `dist` | ~128 KB | ~164 KB* |

\* El paquete publicado pesa algo más (overhead de splitting), pero **eso no llega
al consumidor**: lo que importa es el bundle final de la app, que baja
drásticamente.

### Bundle del consumidor (lo que de verdad cuenta)
| Escenario | v0.5.0 | v0.6.0 |
|---|---|---|
| Solo componentes básicos | 60 KB **+ recharts/tanstack/daypicker/cmdk** (≈ 575 KB de deps) | **28 KB, 0 deps pesadas** |
| Reducción estimada del bundle | — | **> 90 %** en apps que no usan charts/tablas/calendar |

---

## 7. Recomendaciones para 0.6.0 y futuro

1. **Publicar 0.6.0** con multi-entry + peers opcionales (implementado).
2. **Documentar** los subpaths como vía recomendada para módulos pesados
   (`import { Chart } from "@juanarenas31/metrik-ui/charts"`).
3. **Optimización fina opcional** (residual radix/sonner): aislar `Toaster`/`Sonner`
   en su propio subpath `/feedback` o forzar chunking por componente con
   `entry` por componente si se busca el 100 % de granularidad.
4. **v0.7+**: considerar subpaths adicionales `/overlays`, `/navigation`,
   `/feedback` siguiendo la categorización de §2.1.
5. **CI**: añadir un check de `size-limit`/`bundlewatch` que falle si el entry core
   vuelve a arrastrar una dep pesada (regresión).

---

## 8. Compatibilidad y breaking changes

### Compatibilidad mantenida
- ✅ React 18 y 19 (`peerDependencies: ^18 || ^19`).
- ✅ Tailwind v3.4 y v4 (preset y CSS sin cambios).
- ✅ API pública del entry raíz **idéntica**: todo lo que se importaba de
  `@juanarenas31/metrik-ui` sigue disponible.
- ✅ Directiva `"use client"` preservada (RSC / Next App Router).

### Breaking changes (menores) y migración

| Cambio | Impacto | Migración |
|---|---|---|
| `recharts` → peer opcional | Apps que usan `Chart` deben tenerla instalada | `pnpm add recharts` (la mayoría ya la tiene) |
| `@tanstack/react-table` → peer opcional | Apps con `DataTable` | `pnpm add @tanstack/react-table` |
| `react-day-picker` → peer opcional | Apps con `Calendar`/`DateRangePill` | `pnpm add react-day-picker` |

> No hay cambios en nombres de componentes ni en imports existentes. Los subpaths
> son **aditivos**. Recomendado publicar como **minor 0.6.0** con nota de release
> destacando las 3 peers opcionales.
