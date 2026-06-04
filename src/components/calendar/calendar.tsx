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
 * el caption se renderiza con `<select>` nativos estilizados. Cuando el modo es
 * `"dropdown"` completo, el `caption_label` textual se oculta para no duplicar
 * contenido; en los modos parciales se conserva visible para mostrar la parte
 * que no es dropdown.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout,
  ...props
}: CalendarProps) {
  const isAnyDropdown =
    captionLayout === "dropdown" ||
    captionLayout === "dropdown-months" ||
    captionLayout === "dropdown-years";
  const isFullDropdown = captionLayout === "dropdown";

  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex w-full flex-col gap-4",

        // ── caption (fila superior) ──────────────────────────────────────────
        // Misma altura para nav y caption (h-9 = 36px). Padding lateral reserva
        // el espacio que ocupan los botones absolutos de navegación.
        month_caption: cn(
          "flex h-9 items-center px-10",
          isAnyDropdown ? "justify-center gap-1.5" : "justify-center",
        ),
        caption_label: isFullDropdown
          ? "sr-only"
          : "inline-flex items-center text-sm font-medium capitalize",

        // ── nav (botones < >) ────────────────────────────────────────────────
        // Posicionado absolutamente sobre la misma fila del caption, con altura
        // explícita para que items-center centre los botones verticalmente.
        nav: "absolute inset-x-1 top-0 flex h-9 items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-8 rounded-md bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-8 rounded-md bg-transparent p-0 opacity-70 hover:opacity-100",
        ),

        // ── dropdowns (captionLayout="dropdown*") ────────────────────────────
        dropdowns: "flex items-center gap-1.5",
        dropdown_root: "relative inline-flex items-center",
        dropdown: cn(
          // <select> nativo, sin flecha del SO; alto = 32px (matchea nav size-8)
          "appearance-none cursor-pointer h-8 rounded-md border border-border-strong bg-surface",
          "pl-3 pr-8 text-sm font-medium leading-none text-fg capitalize",
          "transition-colors duration-fast",
          "hover:bg-surface-muted hover:border-primary",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ),
        months_dropdown: "capitalize",
        years_dropdown: "",
        chevron: "fill-fg-muted",

        // ── grid del mes ─────────────────────────────────────────────────────
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
          if (orientation === "left") return <ChevronLeft className={cn("size-4", chevClass)} />;
          if (orientation === "right") return <ChevronRight className={cn("size-4", chevClass)} />;
          if (orientation === "up") return <ChevronUp className={cn("size-4", chevClass)} />;
          // "down" → caret del <select>: posicionado a la derecha, centrado vertical,
          // sin capturar clicks (deja pasar el evento al <select>).
          return (
            <ChevronDown
              className={cn(
                "pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-fg-muted",
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