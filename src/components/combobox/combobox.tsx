import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Select con búsqueda (Popover + Command). Selección única.
 *
 * @example
 *   <Combobox options={programas} value={prog} onValueChange={setProg} />
 */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    onValueChange,
    placeholder = "Selecciona…",
    searchPlaceholder = "Buscar…",
    emptyText = "Sin resultados.",
    disabled,
    className,
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between font-normal", !selected && "text-fg-subtle", className)}
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => {
                    onValueChange?.(opt.value === value ? "" : opt.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-1 size-4", opt.value === value ? "opacity-100 text-primary" : "opacity-0")} />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
