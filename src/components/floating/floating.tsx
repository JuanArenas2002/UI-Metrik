import { CalendarDays, Upload } from "lucide-react";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../../lib";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

/* ── estilos compartidos del patrón "floating label" ─────────────────────── */
const fieldBase = cn(
  "peer block w-full rounded-md border border-border-strong bg-surface px-3 pb-2 pt-5 text-sm text-fg",
  "transition-colors duration-fast",
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-surface-muted",
);

const labelFloat = cn(
  "pointer-events-none absolute left-3 top-2 z-10 origin-[0] -translate-y-0 scale-75 text-fg-subtle",
  "transition-all duration-fast",
);

/** Label que flota según placeholder-shown / focus (para input y textarea). */
const labelAuto = cn(
  "pointer-events-none absolute left-3 top-4 z-10 origin-[0] text-fg-subtle transition-all duration-fast",
  "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
  "-translate-y-2.5 scale-75",
  "peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-primary",
);

export interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(function FloatingInput(
  { label, id, className, ...props },
  ref,
) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div className="relative">
      <input ref={ref} id={fieldId} placeholder=" " className={cn(fieldBase, "h-14", className)} {...props} />
      <label htmlFor={fieldId} className={labelAuto}>
        {label}
      </label>
    </div>
  );
});

export interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  function FloatingTextarea({ label, id, className, ...props }, ref) {
    const auto = useId();
    const fieldId = id ?? auto;
    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={fieldId}
          placeholder=" "
          className={cn(fieldBase, "min-h-[6rem] resize-y", className)}
          {...props}
        />
        <label htmlFor={fieldId} className={labelAuto}>
          {label}
        </label>
      </div>
    );
  },
);

export interface FloatingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(function FloatingSelect(
  { label, id, className, children, ...props },
  ref,
) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div className="relative">
      <select
        ref={ref}
        id={fieldId}
        className={cn(fieldBase, "h-14 appearance-none pr-9", className)}
        {...props}
      >
        {children}
      </select>
      <label htmlFor={fieldId} className={labelFloat}>
        {label}
      </label>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
});

export interface FloatingFileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const FloatingFileInput = forwardRef<HTMLInputElement, FloatingFileInputProps>(
  function FloatingFileInput({ label, id, className, ...props }, ref) {
    const auto = useId();
    const fieldId = id ?? auto;
    return (
      <div className="relative">
        <label htmlFor={fieldId} className={labelFloat}>
          {label}
        </label>
        <div className={cn(fieldBase, "flex h-14 items-center gap-2 text-fg-muted")}>
          <Upload className="size-4 shrink-0 text-fg-subtle" />
          <input
            ref={ref}
            id={fieldId}
            type="file"
            className={cn(
              "w-full cursor-pointer text-xs text-fg-muted outline-none",
              "file:mr-3 file:rounded-md file:border-0 file:bg-primary-soft file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary",
              className,
            )}
            {...props}
          />
        </div>
      </div>
    );
  },
);

export interface FloatingDatePickerProps {
  label: string;
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
  /** Formateador del valor mostrado. Por defecto `toLocaleDateString("es")`. */
  format?: (date: Date) => string;
  /**
   * Layout del encabezado del calendario. Default: `"dropdown"` (selectores
   * de mes y año). Usa `"label"` para volver al modo flechas-solamente.
   */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  /** Mes mínimo navegable. Controla también el rango del dropdown de años. */
  startMonth?: Date;
  /** Mes máximo navegable. */
  endMonth?: Date;
  /** Atajo: año mínimo. Equivale a `startMonth = new Date(fromYear, 0, 1)`. */
  fromYear?: number;
  /** Atajo: año máximo. Equivale a `endMonth = new Date(toYear, 11, 31)`. */
  toYear?: number;
}

export const FloatingDatePicker = forwardRef<HTMLButtonElement, FloatingDatePickerProps>(
  function FloatingDatePicker(
    {
      label,
      value,
      onValueChange,
      disabled,
      className,
      format,
      captionLayout = "dropdown",
      startMonth,
      endMonth,
      fromYear,
      toYear,
    },
    ref,
  ) {
    const fmt =
      format ?? ((d: Date) => d.toLocaleDateString("es", { day: "2-digit", month: "long", year: "numeric" }));

    // Defaults sensatos: 1970 → año siguiente al actual.
    const resolvedStart =
      startMonth ?? (fromYear !== undefined ? new Date(fromYear, 0, 1) : new Date(1970, 0, 1));
    const resolvedEnd =
      endMonth ??
      (toYear !== undefined ? new Date(toYear, 11, 31) : new Date(new Date().getFullYear() + 1, 11, 31));

    return (
      <Popover>
        <div className="relative">
          <PopoverTrigger asChild>
            <button
              ref={ref}
              type="button"
              disabled={disabled}
              className={cn(fieldBase, "flex h-14 items-center justify-between text-left", className)}
            >
              <span className={cn("text-sm", value ? "text-fg" : "text-transparent")}>
                {value ? fmt(value) : "·"}
              </span>
              <CalendarDays className="size-4 shrink-0 text-fg-subtle" />
            </button>
          </PopoverTrigger>
          <label className={labelFloat}>{label}</label>
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onValueChange}
            captionLayout={captionLayout}
            startMonth={resolvedStart}
            endMonth={resolvedEnd}
            defaultMonth={value ?? resolvedEnd}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);
