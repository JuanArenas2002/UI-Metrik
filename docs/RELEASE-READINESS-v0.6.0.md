# Release Readiness Report · @juanarenas31/metrik-ui v0.6.0

**Fecha:** 2026-06-19 · **Rama:** `main` · **Versión objetivo:** `0.6.0`

## Recomendación final

> ## ✅ APTO PARA PUBLICAR (con observaciones menores no bloqueantes)

Todos los gates técnicos de release están en verde y verificados con evidencia
ejecutable. Las observaciones (§Riesgos) son de tooling/documentación y no afectan
al artefacto publicado ni a su comportamiento en runtime.

---

## Resumen de validación

| # | Área | Comando / verificación | Resultado |
|---|---|---|---|
| 1 | Lockfile | `pnpm install --frozen-lockfile` | ✅ "Lockfile is up to date" · exit 0 |
| 2 | Typecheck | `pnpm typecheck` (`tsc --noEmit`) | ✅ exit 0 |
| 3 | Build | `pnpm build` (tsup) | ✅ ESM + DTS · exit 0 |
| 4 | Bundle governance | `pnpm size:check` | ✅ 4/4 presupuestos + aislamiento · exit 0 |
| 5 | Exports (runtime) | smoke test import de 7 subpaths | ✅ 7/7 cargan con exports esperados |
| 6 | Artefactos | js + d.ts + js.map por entry | ✅ 7/7 completos |
| 7 | Compatibilidad | peer ranges + APIs React | ✅ 18/19 · sin APIs version-specific |

---

## Estado del build

`tsup` multi-entry, ESM, `target es2022`, `splitting + treeshake`, DTS por entry.

- 8 entries (`index`, `charts`, `table`, `calendar`, `command`, `layout`, `forms`,
  `tailwind-preset`) + 12 chunks compartidos.
- `index.js`: **44.6 kB** (antes monolito de ~118 kB).
- DTS generados para todos los entries. Sourcemaps presentes (`*.js.map`).
- CSS (`styles.css`, `tokens.css`) copiados a `dist/` por el hook `onSuccess`.

## Estado del tree-shaking

Verificado con bundling de producción (esbuild, minify):

- `import { Button, Card, Badge, Input, Avatar, Separator, Tooltip }` desde el entry
  principal → **0 referencias** a `recharts`, `@tanstack/react-table`,
  `react-day-picker`, `cmdk`. Bundle core ≈ 24.6 kB (min).
- Baseline v0.5.0 (solo `Button`) arrastraba **las 4** deps pesadas. Reducción
  > 90 % en apps que no usan gráficos/tablas/calendar.
- Control positivo: `import … from "…/charts"` sí incluye `recharts`.

## Estado del code splitting

Cada dependencia pesada quedó aislada en un único chunk:

```
recharts              → chunk dedicado (solo /charts e index→Chart)
@tanstack/react-table → chunk dedicado (solo /table  e index→DataTable)
react-day-picker      → chunk dedicado (solo /calendar)
cmdk                  → chunk dedicado (solo /command)
```

Los entries re-exportan vía `export { … } from './chunk-…'` (re-export puro,
tree-shakeable).

## Estado del bundle governance

| Bundle | Tamaño | Límite | Margen |
|---|---|---|---|
| core | 50.27 kB | 55 kB (+10 %) | ✅ |
| charts | 7.82 kB | 9 kB (+15 %) | ✅ |
| table | 33.41 kB | 38 kB (+15 %) | ✅ |
| calendar | 28.64 kB | 33 kB (+15 %) | ✅ |

- `size-limit` + `.size-limit.json` con presupuestos por módulo.
- `scripts/check-core-isolation.mjs`: guard que falla si el core arrastra una dep
  pesada. **Test negativo confirmado** (detecta `recharts` si `ChartContainer` se
  cuela en el core).

## Estado de CI

- `.github/workflows/ci.yml` — pipeline principal: install (frozen) → typecheck →
  build → `size:check`. **Falla** ante exceso de presupuesto o fuga de dep pesada.
- `.github/workflows/size.yml` — comenta en cada PR el diff de tamaño (previo,
  actual, Δ absoluta y %) vía `andresz1/size-limit-action`.

## Estado de la documentación

- `README.md` — entrypoints modulares documentados, peerDeps opcionales, guía de
  migración v0.5.x→0.6.0, sección tree-shaking corregida, badge a v0.6.0.
- `CONTRIBUTING.md` — sección de bundle governance, scripts, re-baselining,
  checklist de PR.
- `CHANGELOG.md` — entrada `[0.6.0]` con Added / BREAKING (menor) / Compat.
- `docs/ARCHITECTURE-OPTIMIZATION.md` — auditoría e ingeniería de la refactorización.

## Compatibilidad

| Objetivo | Estado | Nota |
|---|---|---|
| React 18 | ✅ | peer `^18 \|\| ^19`; sin APIs exclusivas de una versión |
| React 19 | ✅ | idem; `recharts@2.15` declara peer React 19 |
| Tailwind v3 | ✅ | preset JS (`tailwind-preset`) + `styles.css` |
| Tailwind v4 | ⚠️ | ver Riesgo #2 |

---

## Riesgos detectados

| # | Riesgo | Severidad | Bloquea release | Mitigación |
|---|---|---|---|---|
| 1 | `eslint`/`prettier` declarados en scripts y `eslint.config.js` presente, pero **no instalados** → `pnpm lint`/`format` fallan; excluidos del CI | Baja | No | `pnpm add -D eslint prettier` (+ plugins) o retirar scripts en un PR aparte |
| 2 | `tailwind-preset` es estilo Tailwind **v3** (array `presets`). En v4 (CSS-first) el preset JS no aplica igual; los usuarios v4 deben consumir los tokens vía `@import ".../tokens.css"` | Media-baja | No | Documentar uso v4 con CSS tokens; pre-existente, no es regresión de 0.6.0 |
| 3 | Presupuestos de charts/table/calendar miden solo el wrapper (las peers se externalizan en size-limit) | Baja | No | Cubierto por el guard de aislamiento del core (by design) |
| 4 | El core aún co-ubica algunos `@radix-ui/*`/`sonner` por chunking (~2–12 kB) | Muy baja | No | Aceptable; optimización fina opcional (subpath `/feedback`) |
| 5 | Publicación requiere `npm login` con acceso al scope `@juanarenas31` | — | — | `publishConfig.access: public` ya configurado; verificar sesión antes de publicar |

---

## Checklist de publicación

- [x] `version` = `0.6.0` en `package.json`
- [x] Build, typecheck, size:check verdes
- [x] Exports verificados (runtime + artefactos)
- [x] CHANGELOG, README, CONTRIBUTING actualizados
- [ ] Commit + tag (comandos abajo) — **requiere autorización del responsable**
- [ ] `npm whoami` confirma sesión con acceso al scope
- [ ] `pnpm publish --access public`
