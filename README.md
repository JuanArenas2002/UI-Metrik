# @unisimon/metrik-ui

> Librería de componentes React para construir **dashboards analíticos** de la Unidad de Ciencia de los Datos · Universidad Simón Bolívar.

[![npm](https://img.shields.io/badge/npm-v0.1.0-0a4838)](#)
[![license](https://img.shields.io/badge/license-MIT-2bbfa0)](./LICENSE)
[![types](https://img.shields.io/badge/types-included-f26b7a)](#)

Inspirada en shadcn/ui · Radix · Mantine. Construida sobre **React 18+ · TypeScript · TailwindCSS · Radix Primitives · CVA**.

---

## ✨ Características

- **22+ componentes** accesibles (ARIA · keyboard · focus visible)
- **Tokens semánticos** para light + dark mode con un sólo `.dark` en `<html>`
- **Tree-shakeable** · cada componente se importa de su sub-path
- **`forwardRef` + `asChild`** en todo lo interactivo
- **Sistema de variantes tipadas** con `class-variance-authority`
- **TypeScript 5** estricto · types incluidos
- **Preset de Tailwind** plug-and-play · mapea tokens a clases utility
- **Hooks reutilizables** · `useTheme`, `useDisclosure`, `useMediaQuery`, `useDebounce`, `useLocalStorage`…

---

## 📦 Instalación

```bash
# pnpm
pnpm add @unisimon/metrik-ui

# npm
npm install @unisimon/metrik-ui

# yarn
yarn add @unisimon/metrik-ui
```

**peerDependencies** que debes tener instaladas:

```bash
pnpm add react react-dom tailwindcss
```

---

## 🚀 Setup en 3 pasos

### 1 · Importa los estilos base

En tu archivo de estilos global (`globals.css` o `index.css`):

```css
@import "@unisimon/metrik-ui/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

> Solo necesitas el preset si quieres usar las clases utility (`bg-primary`, `text-fg-muted`, etc.). Si prefieres usar las CSS variables directamente, importa únicamente `tokens.css`.

### 2 · Agrega el preset de Tailwind

En `tailwind.config.ts`:

```ts
import metrikPreset from "@unisimon/metrik-ui/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [metrikPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@unisimon/metrik-ui/dist/**/*.js",
  ],
} satisfies Config;
```

### 3 · Empieza a usar componentes

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@unisimon/metrik-ui";
import { TrendingUp } from "lucide-react";

export function KPI() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Estudiantes activos</CardTitle>
          <Badge tone="primary" dot>+4.2%</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tabular-nums">12 488</div>
        <Button variant="outline" size="sm" className="mt-4" leftIcon={<TrendingUp />}>
          Ver tendencia
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## 🌗 Dark mode

```tsx
import { useTheme, Switch } from "@unisimon/metrik-ui";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <Switch
      checked={resolvedTheme === "dark"}
      onCheckedChange={toggleTheme}
      aria-label="Cambiar tema"
    />
  );
}
```

Para evitar el "flash of unstyled content" en SSR, inyecta este script en tu `<head>`:

```html
<script>
  (function () {
    var t = localStorage.getItem("metrik-theme") || "system";
    var d = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", d);
    document.documentElement.classList.toggle("light", !d);
  })();
</script>
```

---

## 📚 Componentes

| Componente        | Sub-path                              | Descripción                                  |
|-------------------|---------------------------------------|----------------------------------------------|
| `Alert`         | `@unisimon/metrik-ui`              | Avisos · info · success · warning · danger  |
| `Avatar`        | `@unisimon/metrik-ui`              | Imagen de usuario con fallback              |
| `Badge`         | `@unisimon/metrik-ui`              | Etiquetas pequeñas · 7 tonos · 3 tamaños    |
| `Button`        | `@unisimon/metrik-ui`              | 6 variantes · 4 tamaños · loading · iconos  |
| `Card`          | `@unisimon/metrik-ui`              | Compound · Header/Title/Description/Content/Footer |
| `Checkbox`      | `@unisimon/metrik-ui`              | Checkbox accesible · indeterminate          |
| `Dialog`        | `@unisimon/metrik-ui`              | Modal · focus trap · scroll-lock · portal   |
| `DropdownMenu`  | `@unisimon/metrik-ui`              | Menú con checkbox · radio · sub-menús       |
| `Input`         | `@unisimon/metrik-ui`              | Input texto · 3 tamaños · estados error/success |
| `Label`         | `@unisimon/metrik-ui`              | Label semántico · required                  |
| `Popover`       | `@unisimon/metrik-ui`              | Popover con anchor opcional                 |
| `Select`        | `@unisimon/metrik-ui`              | Select accesible · grupos · keyboard nav    |
| `Separator`     | `@unisimon/metrik-ui`              | Línea divisoria · horizontal/vertical       |
| `Skeleton`      | `@unisimon/metrik-ui`              | Loading placeholder con shimmer             |
| `Spinner`       | `@unisimon/metrik-ui`              | Indicador de carga · 4 tamaños              |
| `Switch`        | `@unisimon/metrik-ui`              | Toggle on/off                               |
| `Tabs`          | `@unisimon/metrik-ui`              | Tabs · underline o pill                     |
| `Textarea`      | `@unisimon/metrik-ui`              | Textarea con estado invalid                 |
| `Tooltip`       | `@unisimon/metrik-ui`              | Tooltip · provider + content                |

### Hooks

| Hook                | Descripción                                                   |
|---------------------|---------------------------------------------------------------|
| `useTheme`        | Light · dark · system con persistencia en localStorage        |
| `useDisclosure`   | Estado open/close para overlays                               |
| `useMediaQuery`   | Suscríbete a media queries · incluye `useBreakpoint.lg()`   |
| `useDebounce`     | Valor debounced · útil para búsquedas                         |
| `useLocalStorage` | Estado sincronizado con localStorage                          |
| `useClickOutside` | Cierra paneles cuando el usuario hace click afuera            |
| `useToggle`       | Helper para booleanos                                         |

### Utilidades

| Export       | Descripción                                                   |
|--------------|---------------------------------------------------------------|
| `cn(...)`  | Combina clases de Tailwind resolviendo conflictos (twMerge)   |
| `cva`      | Re-export de class-variance-authority                         |

---

## 🎨 Tokens

Los tokens se exponen como **CSS variables**. Puedes usarlos:

- vía clases utility de Tailwind (`bg-primary`, `text-fg-muted`, `border-border`…)
- vía variables CSS directas (`var(--metrik-primary)`, `var(--metrik-fg)`…)

### Color · semántico

| Token              | Light            | Dark             | Uso                          |
|--------------------|------------------|------------------|------------------------------|
| `--metrik-bg`            | slate-50  | slate-950 | Fondo de la app           |
| `--metrik-surface`       | white     | slate-900 | Cards, panels             |
| `--metrik-surface-muted` | slate-100 | slate-800 | Hover states              |
| `--metrik-border`        | slate-200 | slate-700 | Bordes sutiles            |
| `--metrik-fg`            | slate-800 | slate-50  | Texto principal           |
| `--metrik-fg-muted`      | slate-500 | slate-400 | Texto secundario          |
| `--metrik-primary`       | teal-500  | teal-400  | CTA principal             |
| `--metrik-accent`        | coral-500 | coral-400 | Resaltar, alertas         |
| `--metrik-success`       | teal-600  | teal-400  | Estados positivos         |
| `--metrik-danger`        | coral-600 | coral-400 | Errores, destructivos     |
| `--metrik-warning`       | amber-500 | amber-300 | Advertencias              |

### Radius · shadow · motion

`rounded-{sm,md,lg,xl,full}` · `shadow-{xs,sm,md,lg}` · `duration-{fast,base,slow}` · `ease-metrik`

### Z-index

`z-{sticky,dropdown,overlay,modal,toast}` · 10 · 100 · 1000 · 1100 · 1500

---

## 🔧 Tree-shaking

Para máximo control sobre el bundle, importa por sub-path cuando trabajes con bundlers que no eliminan barrels eficientemente:

```ts
// re-export root (~ tree-shake estándar)
import { Button } from "@unisimon/metrik-ui";

// alternativa equivalente · idéntico resultado con esbuild/vite/turbopack
import { Button } from "@unisimon/metrik-ui";
```

Todos los componentes están marcados como side-effect-free excepto los archivos `.css`, lo cual permite a tu bundler eliminar cualquier componente no usado.

---

## 🛠️ Desarrollo local

```bash
git clone <repo>
cd metrik-ui
pnpm install
pnpm dev        # tsup watch
pnpm typecheck
pnpm lint
pnpm build
```

---

## 📐 Convenciones

- **Naming** · `PascalCase` para componentes, `camelCase + use*` para hooks
- **Compound components** para piezas con múltiples partes (`Card.Header`, `Dialog.Footer`…)
- **`asChild` prop** disponible donde tiene sentido (Button, Trigger primitives) usando `Radix Slot`
- **Variantes** tipadas con `cva`, exportadas como `<Component>Variants` para extender

---

## 🗺️ Roadmap

- [ ] **v0.2** · DataTable · Toast · Drawer · Slider · DatePicker · FileUpload
- [ ] **v0.3** · Charts (recharts wrappers) · KPIWidget · StatsCard · ActivityFeed
- [ ] **v0.4** · Layouts pre-armados (DashboardLayout · AuthLayout · AdminLayout)
- [ ] **v1.0** · Documentación interactiva (Storybook + Astro Starlight) · CI/CD · npm público

---

## 📄 Licencia

[MIT](./LICENSE) © 2026 Universidad Simón Bolívar · Unidad de Ciencia de los Datos
