import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { cn } from "../../lib";
import { buttonVariants } from "../button/button.variants";

export type CalendarProps = DayPickerProps;

/**
 * Calendario basado en `react-day-picker` (v10), estilizado con tokens metrik.
 * Soporta `mode="single" | "multiple" | "range"`.
 */
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex w-full flex-col gap-4",
        month_caption: "flex h-9 items-center justify-center px-9",
        caption_label: "text-sm font-medium capitalize",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
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
        Chevron: ({ orientation, className: chevClass }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", chevClass)} />
          ) : (
            <ChevronRight className={cn("size-4", chevClass)} />
          ),
      }}
      {...props}
    />
  );
}
