# Contributing

¡Gracias por contribuir a `@juanarenas31/metrik-ui`!

## Setup

```bash
pnpm install
pnpm dev
```

## Estructura

- `src/components/<name>/` · cada componente vive en su carpeta con
  - `<name>.tsx` · implementación
  - `<name>.variants.ts` · cva variants (opcional)
  - `index.ts` · barrel del componente
- `src/entries/` · capa de distribución · barrels de los subpaths (`charts`,
  `table`, `calendar`, `command`, `layout`, `forms`)
- `src/hooks/` · hooks reutilizables
- `src/lib/` · utilidades (cn, cva)
- `src/styles/` · tokens.css y globals.css

## Entrypoints y dependencias pesadas

La librería se distribuye con un entry principal + subpaths que **aíslan las
dependencias pesadas** en chunks separados:

| Entry | Contenido | Dep pesada aislada |
|---|---|---|
| `@juanarenas31/metrik-ui` | core (Button, Card, Input, overlays, navegación…) | — |
| `@juanarenas31/metrik-ui/charts` | `Chart*` | `recharts` |
| `@juanarenas31/metrik-ui/table` | `Table`, `DataTable` | `@tanstack/react-table` |
| `@juanarenas31/metrik-ui/calendar` | `Calendar`, `DateRangePill`, `Floating*` | `react-day-picker` |
| `@juanarenas31/metrik-ui/command` | `Command*`, `Combobox` | `cmdk` |
| `@juanarenas31/metrik-ui/layout` | `Container`, `Stack`, `Grid`… | — |
| `@juanarenas31/metrik-ui/forms` | `Input`, `Select`, `Checkbox`… | — |

**Regla de oro:** un componente que dependa de una librería pesada **no puede
formar parte del core**. Debe declararse en su subpath correspondiente dentro de
[`src/entries/`](src/entries). Detalles en
[`docs/ARCHITECTURE-OPTIMIZATION.md`](docs/ARCHITECTURE-OPTIMIZATION.md).

## Reglas

1. Cada componente interactivo usa `forwardRef`.
2. Las variantes se definen con `cva` en `<name>.variants.ts` y se tipan con `VariantProps`.
3. Usa `Radix` para cualquier primitiva con foco/teclado/portal.
4. `asChild` disponible en triggers · usa `@radix-ui/react-slot`.
5. No uses colores primitivos directos — solo los tokens semánticos.
6. `peer-disabled` y `disabled:` en todo lo deshabilitable.
7. `focus-visible:ring-2 ring-ring ring-offset-2` en todo lo enfocable.

## Bundle governance

Cada PR pasa por dos guardias automáticas (workflow
[`.github/workflows/size.yml`](.github/workflows/size.yml)) que evitan que se
reintroduzcan dependencias pesadas en el core.

### 1. Presupuestos de tamaño (`size-limit`)

Definidos en [`.size-limit.json`](.size-limit.json). Miden el tamaño
**minificado + brotli** de cada bundle tree-shaken.

| Bundle | Baseline | Límite | Umbral |
|---|---|---|---|
| core | ~50.3 kB | 55 kB | +10 % |
| charts | ~7.8 kB | 9 kB | +15 % |
| table | ~33.4 kB | 38 kB | +15 % |
| calendar | ~28.6 kB | 33 kB | +15 % |

Los `limit` **codifican el umbral de crecimiento** sobre el baseline; si un cambio
los supera, CI falla.

```bash
pnpm size          # mide y muestra la tabla de tamaños
pnpm size:check    # falla si se exceden límites + ejecuta la guardia de aislamiento
```

> Las deps pesadas son `peerDependencies` opcionales, así que `size-limit` las
> externaliza: los presupuestos miden el *footprint propio* de cada entry
> (wrappers + deps empaquetadas como `@radix-ui/*`, `cmdk`, `sonner`).

### 2. Guardia de aislamiento del core

[`scripts/check-core-isolation.mjs`](scripts/check-core-isolation.mjs) empaqueta un
consumidor que importa solo componentes básicos y **falla si detecta** `recharts`,
`@tanstack/react-table`, `react-day-picker` o `cmdk` en el grafo del core. Es la red
de seguridad que `size-limit` no puede dar (esas deps, al ser peers externalizadas,
no sumarían bytes al presupuesto, pero este guard sí las detecta).

### Reporte en Pull Requests

`andresz1/size-limit-action` comenta en cada PR una tabla con **tamaño previo**
(rama base), **tamaño actual**, **diferencia absoluta** y **diferencia porcentual**.

### Re-baselining

Si un aumento de tamaño es intencional y justificado, actualiza el `limit`
correspondiente en `.size-limit.json` **en el mismo PR**, explicando el motivo.
Nunca subas un límite solo para silenciar CI.

### Checklist antes de abrir un PR

- [ ] `pnpm typecheck` y `pnpm lint` pasan.
- [ ] `pnpm build` genera `dist/` sin errores.
- [ ] `pnpm size:check` pasa (presupuestos + aislamiento del core).
- [ ] Si añadiste una dependencia pesada, vive tras su subpath en `src/entries/`.

## Versionado

Usa `pnpm changeset` antes de hacer merge. Sigue semver.
