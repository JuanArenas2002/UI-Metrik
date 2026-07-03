# Changelog

Todos los cambios significativos están aquí.

## [0.7.0] — 2026-07-03

### Added · componente `Footer`

- **`Footer`** — pie de página del sitio, responsive y accesible. Landmark
  `contentinfo` con `<nav aria-label>`, listas semánticas (`role="list"`),
  `aria-label` en redes y apertura segura de enlaces externos
  (`target="_blank" rel="noopener noreferrer"`, por prop `external` o
  autodetección del `href`).
- API totalmente opcional: `logo`, `brand`, `description`, `links`,
  `socialLinks`, `copyright`, además de `className` y `children` (slot en la
  barra inferior). Tipos: `FooterProps`, `FooterLinkGroup`, `FooterLinkItem`,
  `FooterSocialLink`. Vive en el core (sin dependencias pesadas).
- Showcase: reemplazado el footer maquetado a mano por el componente real.

### Changed · limpieza interna (sin cambios de API ni visuales)

- `Skeleton` deja de inyectar CSS en runtime (`document.createElement("style")`
  a nivel de módulo); el keyframe `metrik-shimmer` se movió a `globals.css`.
  Elimina un efecto secundario en import y mejora la pureza SSR/tree-shaking.
- `globals.css`: eliminados 7 `@keyframes` (`fade`/`zoom`/`slide-right`/`spin`)
  que ya emite el preset de Tailwind al usar las clases `animate-*` — se evita
  la duplicación en el `styles.css` publicado. Verificado que el CSS final del
  consumidor los sigue conteniendo (vía preset).
- `VisuallyHidden`: pasa a re-export directo del primitivo de Radix (era un
  alias sin lógica añadida).

## [0.6.0] — 2026-06-19

### Added · arquitectura modular y bundle governance

- **Entrypoints especializados** que aíslan las dependencias pesadas en chunks
  separados — el core deja de arrastrarlas:
  - `@juanarenas31/metrik-ui/charts` (aísla `recharts`)
  - `@juanarenas31/metrik-ui/table` (aísla `@tanstack/react-table`)
  - `@juanarenas31/metrik-ui/calendar` (aísla `react-day-picker`)
  - `@juanarenas31/metrik-ui/command` (aísla `cmdk`)
  - `@juanarenas31/metrik-ui/layout` · `@juanarenas31/metrik-ui/forms`
- **Code splitting real** vía `tsup` multi-entry: el `index.js` monolítico (~118 kB)
  se dividió en entries + chunks compartidos. Importar solo componentes básicos ya
  **no incorpora** gráficos, tablas avanzadas, calendarios ni command palettes
  (verificado con bundling de producción).
- **Bundle governance**: `pnpm size` / `pnpm size:check` con presupuestos
  `size-limit` por módulo (core +10 %, charts/table/calendar +15 %), guard de
  aislamiento del core (`scripts/check-core-isolation.mjs`) y workflows de CI que
  comentan el diff de tamaño en cada PR y fallan ante regresiones.

### Changed · BREAKING (menor) · dependencias pesadas → peer opcionales

- `recharts`, `@tanstack/react-table` y `react-day-picker` pasaron de
  `dependencies` a **`peerDependencies` opcionales**. Si usas `Chart*`, `DataTable`
  o `Calendar`/`DateRangePill`, instala la peer correspondiente (`pnpm add recharts`
  · `@tanstack/react-table` · `react-day-picker`). Sin cambios de API ni de props.

### Compat

- Sin cambios en la API pública del entry principal. React 18/19 y Tailwind v3/v4
  siguen soportados. Guía de migración en el README.

## [0.5.0] — 2026-06-09

### Added · Logo institucional (`MetrikLogo` · `MetrikMark`)

- **`MetrikMark`** — isotipo de Metri-K (la «M» de matriz de puntos) reconstruido como **SVG vectorial** a partir de la marca oficial: nítido a cualquier escala, sin assets ni loaders, y temable con los tokens `--metrik-teal-500` / `--metrik-coral-500` (con fallback al hex de marca si se usa sin el preset).
- **`MetrikLogo`** — lockup completo con eyebrow «Insight». Props: `variant` (`full` · `mark` · `wordmark`), `size` (`sm` · `md` · `lg`), `tagline` (texto o `false`). A11y: `role="img"` con `aria-label`, isotipo interno `aria-hidden`.
- Colores constantes (la marca no cambia en dark mode).
- Showcase: nueva sección **Marca · Logo** con copiar-y-pegar (componente React, SVG autónomo y colores de marca).

### Added · Tablas responsive en smartphones (cualquier OS)

- **`DataTable`**: nueva prop `stackOnMobile` (activa por defecto). En < 640px cada fila se convierte en una tarjeta etiqueta/valor en lugar de scroll horizontal; las etiquetas se derivan automáticamente de los headers.
- **`Table`** primitivo: nueva prop `stackable` (+ `containerClassName`). **`TableCell`**: nueva prop `label` → `data-label` para el modo apilado.
- Scroll táctil endurecido en todas las tablas: `overscroll-x-contain` (no secuestra el gesto «atrás» en iOS/Android), momentum en iOS y scrollbar fina.
- CSS del modo apilado compilado en `styles.css` (no depende del purge del consumidor).

## [0.4.1] — 2026-06-04

### Fixed · Button `asChild` rompía siempre con iconos

- `<Button asChild>` crasheaba con `React.Children.only expected to receive a single React element child` porque `Slot` recibía 3 hijos (leftIcon, children, rightIcon) aunque los iconos fueran `undefined`. La feature documentada de envolver `<Link>` / `<a>` era inutilizable.
- Fix canónico con `Slottable` de `@radix-ui/react-slot`: envuelve `{children}` para que Radix sepa cuál es el hijo "real" donde fusionar props, y permite hermanos (los iconos).
- Auditados los otros componentes con `asChild` (`Container`, `Stack`, `Grid`, `BreadcrumbLink`, `FormControl`): ninguno inyecta hijos extra → no requieren cambio.
- Showcase: el CTA del Hero vuelve a usar `<Button asChild><a href=...></a></Button>` como prueba viviente.

## [0.4.0] — 2026-06-04

### Added · familia cromática Blue + rol semántico Info

- **Nueva rampa `--metrik-blue-{50..950}`** (azure-steel académico, prima de Slate).
  - HEX: 50 #f1f6fb · 100 #dae8f6 · 200 #b7d0ec · 300 #87b1dd · 400 #6399d2 · 500 **#266cae** · 600 #205d97 · 700 #1a4977 · 800 #143657 · 900 #0c2440 · 950 #061425
- **Tokens semánticos `--metrik-info`, `--metrik-info-soft`, `--metrik-info-fg`** (light + dark).
- **`Badge tone="info"`** — nuevo tono.
- **Preset Tailwind**: `colors.blue.*` y `colors.info{,.soft,.fg}` expuestos.
- Jerarquía documentada: Primary (acción) · Accent (énfasis) · **Info (información)** · Success · Warning · Danger.

### Changed · visual breaking en `Alert tone="info"`

- `Alert tone="info"` ahora usa **azul real** (border-info bg-info-soft) en lugar del gris-neutro previo (`border-fg-muted bg-surface-muted`). Cualquier uso existente cambia visualmente de gris a azul — semánticamente correcto (es información, no neutro).

## [0.3.3] — 2026-06-04

### Polished · Calendar caption con dropdowns

- Alturas alineadas: caption row h-9, nav buttons size-8, selects h-8 → todo centrado.
- Caret de los selects mejor posicionado (right-2.5, size-3.5, sin solaparse al texto, `pointer-events-none`).
- Padding del select subido (`pl-3 pr-8`) para respirar; hover con `border-primary` + `bg-surface-muted`.
- `caption_label` ahora se oculta SOLO en `captionLayout="dropdown"`; en `dropdown-months`/`dropdown-years` permanece visible para mostrar la parte que no es selectable.
- `nav: inset-x-1 h-9 items-center` → flechas perfectamente alineadas con la fila del caption.

## [0.3.2] — 2026-05-29

### Improved · Calendar / FloatingDatePicker

- **Calendar** — soporte de `captionLayout="dropdown" | "dropdown-months" | "dropdown-years"` con los `<select>` de mes/año estilizados con tokens metrik (light/dark). Chevron de los dropdowns también temado.
- **FloatingDatePicker** — nuevas props opcionales (100% backward compatible):
  - `captionLayout` · default `"dropdown"` → navegación por dropdowns de una
  - `startMonth` / `endMonth` · acotan el rango navegable
  - `fromYear` / `toYear` · azúcar para `startMonth`/`endMonth`
  - Defaults sensatos: `startMonth = 1970-01`, `endMonth = añoActual+1, 12`

## [0.3.1] — 2026-05-29

### Added · layout

- **Container** — wrapper centrado con `size` (sm/md/lg/xl/2xl/prose/full) y padding responsive
- **Stack** — flex tipado (`direction`, `gap`, `align`, `justify`, `wrap`)
- **Grid** — cuadrícula CSS tipada (`cols`, `gap`, `flow`)
- Los tres con `cva`, `forwardRef`, `asChild` y variantes exportadas

## [0.3.0] — 2026-05-28

### Added · datos

- **DataTable** — tabla con orden, filtro por columna, paginación y visibilidad de columnas (TanStack Table)
- **Charts** — wrappers de recharts temados con tokens: `ChartContainer`, `ChartTooltip(Content)`, `ChartLegend(Content)`, `ChartStyle` + `ChartConfig`
- Publicada en npm como `@juanarenas31/metrik-ui`

## [0.2.0] — 2026-05-28

### Added · 31 componentes nuevos

- Formularios: FloatingInput/Select/Textarea/FileInput/DatePicker, RadioGroup, Form, RichTextEditor, ChipSelector, FileDropzone, DateRangePill, Combobox
- Disposición: Collapsible, ScrollArea
- Overlays: Sheet (Drawer), Command (cmdk), AlertDialog, HoverCard, ContextMenu
- Feedback: Sonner (Toaster)
- Mostrar: Calendar (react-day-picker), Table, VisuallyHidden, Breadcrumb, Pagination, EmptyState
- Controles: Progress, Slider, Toggle, ToggleGroup, Accordion
- Showcase ampliado (catálogo visual interactivo)

## [0.1.0] — 2026-05-27

### Added · primera release

- 19 componentes core: Alert, Avatar, Badge, Button, Card, Checkbox, Dialog, DropdownMenu, Input, Label, Popover, Select, Separator, Skeleton, Spinner, Switch, Tabs, Textarea, Tooltip
- 7 hooks: useTheme, useDisclosure, useMediaQuery, useDebounce, useLocalStorage, useClickOutside, useToggle
- Tokens semánticos con light/dark mode via clase `.dark` en `<html>`
- Preset de Tailwind plug-and-play
- Sistema de variantes con cva · todas las variantes tipadas
- Build esm + types con tsup · tree-shakeable · sub-path imports
- Documentación en README
