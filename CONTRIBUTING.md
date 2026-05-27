# Contributing

¡Gracias por contribuir a `@unisimon/metrik-ui`!

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
- `src/hooks/` · hooks reutilizables
- `src/lib/` · utilidades (cn, cva)
- `src/styles/` · tokens.css y globals.css

## Reglas

1. Cada componente interactivo usa `forwardRef`.
2. Las variantes se definen con `cva` en `<name>.variants.ts` y se tipan con `VariantProps`.
3. Usa `Radix` para cualquier primitiva con foco/teclado/portal.
4. `asChild` disponible en triggers · usa `@radix-ui/react-slot`.
5. No uses colores primitivos directos — solo los tokens semánticos.
6. `peer-disabled` y `disabled:` en todo lo deshabilitable.
7. `focus-visible:ring-2 ring-ring ring-offset-2` en todo lo enfocable.

## Versionado

Usa `pnpm changeset` antes de hacer merge. Sigue semver.
