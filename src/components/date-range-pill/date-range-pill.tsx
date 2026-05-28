import { CalendarRange, X } from "lucide-react";
import { forwardRef } from "react";
import type { DateRange } from "react-day-picker";
import { cn } from "../../lib";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export interface DateRangePillProps {
  value?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  numberOfMonths?: number;
  className?: string;
}

function fmt(d: Date) {
  return d.toLocaleDateString("es", { day: "2-digit", month: "short" });
}

/**
 * Pastilla compacta que abre un calendario de rango (desde–hasta).
 * Ideal para filtrar reportes por periodo.
 */
export const DateRangePill = forwardRef<HTMLButtonElement, DateRangePillProps>(function DateRangePill(
  { value, onValueChange, placeholder = "Periodo", disabled, numberOfMonths = 2, className },
  ref,
) {
  const hasRange = !!value?.from;
  const label = hasRange
    ? value!.to
      ? `${fmt(value!.from!)} – ${fmt(value!.to)}`
      : fmt(value!.from!)
    : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium",
            "transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasRange
              ? "border-primary bg-primary-soft text-primary"
              : "border-border-strong bg-surface text-fg-muted hover:bg-surface-muted",
            className,
          )}
        >
          <CalendarRange className="size-4" />
          {label}
          {hasRange && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Limpiar periodo"
              onClick={(e) => {
                e.stopPropagation();
                onValueChange?.(undefined);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onValueChange?.(undefined);
                }
              }}
              className="-mr-1 ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
            >
              <X className="size-3" />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onValueChange}
          numberOfMonths={numberOfMonths}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
});
