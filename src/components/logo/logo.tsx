import { forwardRef, type ComponentPropsWithoutRef, type SVGProps } from "react";
import { cn } from "../../lib";

/**
 * Colores de marca · usan los tokens del tema cuando están disponibles y
 * caen al hex de marca si la librería se usa sin el preset de Tailwind.
 * La marca NO cambia con light/dark: la identidad es constante.
 */
const BRAND_TEAL = "var(--metrik-teal-500, #2bbfa0)";
const BRAND_CORAL = "var(--metrik-coral-500, #f26b7a)";

/* -------------------------------------------------------------------------- */
/*  MetrikMark · isotipo (la «M» de matriz de puntos)                          */
/* -------------------------------------------------------------------------- */

export interface MetrikMarkProps extends Omit<SVGProps<SVGSVGElement>, "title"> {
  /** Texto accesible. Pásalo a `""`/usa `aria-hidden` si va junto a un wordmark. */
  title?: string;
}

/**
 * Isotipo de Metri-K, reconstruido como vector a partir de la marca oficial:
 * crisp a cualquier tamaño y temable con los tokens `--metrik-teal-500` /
 * `--metrik-coral-500`.
 *
 * @example
 *   <MetrikMark className="h-10 w-10" />
 */
export const MetrikMark = forwardRef<SVGSVGElement, MetrikMarkProps>(function MetrikMark(
  { className, title = "Metri-K", "aria-hidden": ariaHidden, ...props },
  ref,
) {
  const labelled = !ariaHidden && title;
  return (
    <svg
      ref={ref}
      viewBox="18 14 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={ariaHidden}
      className={cn("h-9 w-9 shrink-0 select-none", className)}
      {...props}
    >
      <g fill={BRAND_TEAL}>
        <circle cx="27.15" cy="19.37" r="2.72" />
        <circle cx="27.14" cy="27.03" r="2.44" />
        <circle cx="33.57" cy="29.85" r="2.45" />
        <circle cx="27.16" cy="33.94" r="2.17" />
        <circle cx="40.13" cy="36.14" r="2.18" />
        <circle cx="33.59" cy="38.3" r="2.16" />
        <circle cx="46.58" cy="41.3" r="1.89" />
        <circle cx="27.17" cy="42.41" r="1.9" />
        <circle cx="40.12" cy="43.04" r="1.89" />
        <circle cx="33.62" cy="45.96" r="1.9" />
        <circle cx="46.85" cy="47.85" r="1.62" />
        <circle cx="40.1" cy="50.3" r="1.63" />
        <circle cx="27.13" cy="50.32" r="1.63" />
        <circle cx="33.57" cy="52.77" r="1.61" />
        <circle cx="46.83" cy="54.4" r="2.16" />
        <circle cx="27.16" cy="57.7" r="1.37" />
        <circle cx="33.1" cy="60.41" r="1.35" />
        <circle cx="27.18" cy="65.99" r="1.34" />
        <circle cx="27.17" cy="74.18" r="1.35" />
      </g>
      <g fill={BRAND_CORAL}>
        <circle cx="72.64" cy="19.36" r="2.72" />
        <circle cx="72.66" cy="27.03" r="2.44" />
        <circle cx="67.19" cy="32.29" r="2.45" />
        <circle cx="72.63" cy="33.94" r="2.17" />
        <circle cx="53.38" cy="37.49" r="1.88" />
        <circle cx="59.96" cy="38.58" r="2.16" />
        <circle cx="67.19" cy="39.78" r="2.17" />
        <circle cx="72.63" cy="42.41" r="1.91" />
        <circle cx="53.1" cy="44.7" r="1.63" />
        <circle cx="59.94" cy="45.51" r="1.89" />
        <circle cx="67.18" cy="46.9" r="1.89" />
        <circle cx="72.67" cy="50.32" r="1.63" />
        <circle cx="53.09" cy="50.98" r="2.17" />
        <circle cx="59.93" cy="52.77" r="1.62" />
        <circle cx="67.19" cy="54.41" r="1.62" />
        <circle cx="72.64" cy="57.7" r="1.37" />
        <circle cx="67.19" cy="61.22" r="1.35" />
        <circle cx="72.62" cy="65.99" r="1.34" />
        <circle cx="72.63" cy="74.18" r="1.35" />
      </g>
    </svg>
  );
});

/* -------------------------------------------------------------------------- */
/*  MetrikLogo · lockup completo (isotipo + wordmark «Insight / Metri-K»)       */
/* -------------------------------------------------------------------------- */

type LogoSize = "sm" | "md" | "lg";
type LogoVariant = "full" | "mark" | "wordmark";

const SIZES: Record<LogoSize, { mark: string; gap: string; eyebrow: string; word: string }> = {
  sm: { mark: "h-7 w-7", gap: "gap-2", eyebrow: "text-[10px]", word: "text-[15px]" },
  md: { mark: "h-9 w-9", gap: "gap-2.5", eyebrow: "text-[12px]", word: "text-[18px]" },
  lg: { mark: "h-12 w-12", gap: "gap-3", eyebrow: "text-[15px]", word: "text-[24px]" },
};

export interface MetrikLogoProps extends ComponentPropsWithoutRef<"div"> {
  /** `full` = isotipo + wordmark · `mark` = solo isotipo · `wordmark` = solo texto. */
  variant?: LogoVariant;
  size?: LogoSize;
  /** Eyebrow sobre «Metri-K». Pásalo a `false` para ocultarlo. */
  tagline?: string | false;
}

/**
 * Logo institucional de Metri-K. Por defecto muestra el lockup completo con el
 * eyebrow «Insight». Autocontenido: no requiere assets ni el preset de Tailwind.
 *
 * @example
 *   <MetrikLogo />
 *   <MetrikLogo variant="mark" size="lg" />
 *   <MetrikLogo tagline={false} />
 */
export const MetrikLogo = forwardRef<HTMLDivElement, MetrikLogoProps>(function MetrikLogo(
  { variant = "full", size = "md", tagline = "Insight", className, ...props },
  ref,
) {
  const s = SIZES[size];
  const showMark = variant !== "wordmark";
  const showWord = variant !== "mark";
  const label = tagline ? `${tagline} · Metri-K` : "Metri-K";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("inline-flex min-w-0 items-center", s.gap, className)}
      {...props}
    >
      {showMark && <MetrikMark aria-hidden className={cn(s.mark, "object-contain")} />}

      {showWord && (
        <div className="flex min-w-0 flex-col leading-none">
          {tagline && (
            <span className={cn("font-bold leading-none tracking-[0.15em] text-fg", s.eyebrow)}>
              {tagline}
            </span>
          )}
          <span className={cn("mt-0.5 font-extrabold leading-none tracking-tight text-fg", s.word)}>
            Metri
            <span style={{ color: BRAND_TEAL }}>-</span>
            <span style={{ color: BRAND_CORAL }}>K</span>
          </span>
        </div>
      )}
    </div>
  );
});
