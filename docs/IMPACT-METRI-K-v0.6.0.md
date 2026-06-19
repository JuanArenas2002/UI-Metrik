# Impacto real en la app consumidora · Metri-K UI v0.6.0

Validación del efecto de actualizar `@juanarenas31/metrik-ui` de **0.5.0 → 0.6.0**
en la aplicación **Metri-K** (Vite 5 + React 18.2 + Tailwind v3), midiendo builds de
producción reales antes y después.

> **Metodología:** se instaló la build local de 0.6.0 vía `pnpm pack` + `file:`. Las
> métricas de tamaño se calculan directamente desde `dist/assets/*.js` (raw + gzip
> recomputado), no parseando la salida de Vite. La app se restauró a 0.5.0 al
> terminar. recharts resuelto en la app = 2.15.4 (satisface la peer opcional).

## Tabla comparativa

| Métrica | v0.5.0 | v0.6.0 | Variación |
|---|---|---|---|
| **JS entry (carga inicial)** | 545.0 kB | **369.2 kB** | **−175.8 kB (−32.3 %)** |
| **JS entry · gzip** | 160.1 kB | **111.8 kB** | **−48.3 kB (−30.2 %)** |
| JS total (todos los chunks) | 2648.8 kB | 2651.8 kB | +3.0 kB (+0.1 %) |
| JS total · gzip | 826.6 kB | 831.4 kB | +4.8 kB (+0.6 %) |
| Chunks JS | 58 | 63 | +5 |
| Módulos transformados | 4255 | 4267 | +12 |
| Build time (mediana) | ~14.4 s | ~15.2 s | ≈ igual (ruido) |

## Lectura de los resultados

El beneficio tangible está en el **chunk de entrada** —el que se descarga y parsea
en **cada** carga de la app—: baja **−30 % en gzip (−48 kB)**. Ese peso era código de
metrik-ui que el `index.js` monolítico de 0.5.0 forzaba al chunk compartido (Vite no
podía dividir un único módulo entre rutas). Con la build modular de 0.6.0, Vite deja
en el entry solo lo común y empuja el resto a chunks bajo demanda.

El **total** queda plano porque la app **sí usa** esos componentes en alguna ruta:
no desaparecen, se **reubican** del entry crítico a chunks de ruta / compartidos que
se cargan solo cuando hacen falta. El peso total de la app está dominado por sus
propias librerías de gráficos (`echarts` ~1 MB, `recharts` ~375 kB), ajenas a
metrik-ui.

### Qué se movió a carga bajo demanda

5 chunks nuevos (4 compartidos de metrik-ui + 1 de rutas), **91.3 kB raw / 27.9 kB
gz**, ya no en el entry:

| Chunk | raw | gzip | Contenido aprox. |
|---|---|---|---|
| `chunk-WBSVG3VB` | 65.5 kB | 17.8 kB | data-table / dropdown / table |
| `chunk-FZQU2KB6` | 16.1 kB | 6.1 kB | command (cmdk) / dialog |
| `chunk-CNIJFUIK` | 4.9 kB | 1.8 kB | popover |
| `chunk-BDXAQ2IC` | 4.4 kB | 1.9 kB | chart wrappers |
| `search` | 0.3 kB | 0.3 kB | ruta search |

- **Ningún chunk/ruta del baseline desapareció** (sin pérdida de funcionalidad).
- `recharts` permanece en su chunk aislado (~375 kB) porque la app lo usa
  directamente; no es responsabilidad de metrik-ui.

### Nuevas oportunidades de lazy loading

1. Importar los módulos pesados de metrik-ui por **subpath en el punto de uso**
   (`@juanarenas31/metrik-ui/table`, `/charts`, `/command`) para que Vite los
   asocie exactamente a la ruta que los necesita.
2. `echarts` (~1 MB) y `recharts` (~375 kB) son el mayor costo del bundle: candidatos
   a `import()` dinámico en las rutas de visualización (acción a nivel app, no de la
   librería).

## Validación de no-regresión

| Check | Resultado |
|---|---|
| Tests (vitest) | ✅ **30/30 passed** (5 archivos) |
| Errores de tipos | ✅ **11 pre-existentes en 0.5.0 y 0.6.0 — idénticos, 0 nuevos** |
| Errores que mencionen metrik-ui | ✅ **Ninguno** |
| peerDependencies | ✅ recharts 2.15.4 satisface `^2.15.0`; sin conflictos de metrik-ui |
| Warnings nuevos | ✅ Ninguno atribuible a metrik-ui (único peer no satisfecho: `eslint`, tooling propio de la app, pre-existente) |
| Build producción | ✅ exit 0 en ambas versiones |

> Los 11 errores de tipos son de código propio de la app (variables/imports sin usar
> en `MainLayout`, `useDashboardData`, `useRevistaFiltro`, `JournalsList`, y tipados
> de mocks en un test). Existen igual en 0.5.0: **no los introduce 0.6.0**.

## Recomendación final

> ## ✅ PUBLICAR AHORA

Evidencia real en el consumidor: **−30 % en el peso gzip de la carga inicial
(−48 kB)** y **−32 % en bytes del entry**, con **cero regresiones** (tests verdes,
sin errores de tipos nuevos, peers correctas, build estable). La modularización
produce un beneficio tangible fuera del entorno de la librería: cada visita a
Metri-K descarga y parsea menos JavaScript en el camino crítico.
