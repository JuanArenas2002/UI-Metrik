# Changelog

Todos los cambios significativos están aquí.

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
