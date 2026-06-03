import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { cn } from "../../lib";
import { buttonVariants } from "../button/button.variants";

export type CalendarProps = DayPickerProps;

/**
 * Calendario basado en `react-day-picker` (v10), estilizado con tokens metrik.
 * Soporta `mode="single" | "multiple" | "range"`.
 *
 * Cuando se usa `captionLayout="dropdown"` (o `dropdown-months` / `dropdown-years`),
 * el caption se renderiza con `<select>` nativos estilizados; el `caption_label`
 * textual se oculta para no duplicar contenido.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout,
  ...props
}: CalendarProps) {
  const isDropdown = captionLayout === "dropdown" || captionLayout === "dropdown-months" || captionLayout === "dropdown-years";
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex w-full flex-col gap-4",
        month_caption: cn(
          "flex h-9 items-center px-9",
          isDropdown ? "justify-center gap-2" : "justify-center",
        ),
        caption_label: isDropdown ? "sr-only" : "text-sm font-medium capitalize",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        // ── dropdowns (captionLayout="dropdown*") ────────────────────────────
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative inline-flex items-center",
        dropdown: cn(
          // <select> nativo, estilizado como nuestros Input/Select
          "appearance-none cursor-pointer h-8 rounded-md border border-border bg-surface",
          "pl-2.5 pr-7 text-sm text-fg capitalize",
          "transition-colors duration-fast hover:border-border-strong",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ),
        months_dropdown: "capitalize",
        years_dropdown: "",
        chevron: "fill-fg-muted",
        // ── grid ─────────────────────────────────────────────────────────────
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-[11px] font-normal uppercase tracking-wide text-fg-subtle",
        week: "mt-1 flex w-full",
        day: cn(
          "relative size-9 p-0 text-center text-sm",
          "[&:has([aria-selected])]:bg-primary-soft",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-9 rounded-md p-0 font-normal aria-selected:opacity-100",
        ),
        range_start: "day-range-start rounded-l-md bg-primary text-primary-fg hover:bg-primary",
        range_end: "day-range-end rounded-r-md bg-primary text-primary-fg hover:bg-primary",
        range_middle: "rounded-none bg-primary-soft text-primary aria-selected:bg-primary-soft aria-selected:text-primary",
        selected: "rounded-md bg-primary text-primary-fg hover:bg-primary hover:text-primary-fg focus:bg-primary",
        today: "rounded-md bg-surface-muted font-semibold text-primary",
        outside: "text-fg-subtle opacity-50",
        disabled: "text-fg-subtle opacity-40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevClass }) => {
          // Cubrimos las 4 orientaciones (left/right para nav, down/up para dropdown).
          if (orientation === "left") return <ChevronLeft className={cn("size-4", chevClass)} />;
          if (orientation === "right") return <ChevronRight className={cn("size-4", chevClass)} />;
          if (orientation === "up") return <ChevronUp className={cn("size-4", chevClass)} />;
          return (
            <ChevronDown
              className={cn(
                "size-4 text-fg-muted",
                // Cuando el chevron pertenece a un <select> de dropdown, lo posicionamos
                // sobre el lado derecho (el <select> trae pr-7 para hacerle hueco).
                "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
                chevClass,
              )}
            />
          );
        },
      }}
      {...props}
    />
  );
}