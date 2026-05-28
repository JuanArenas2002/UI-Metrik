import { Check, Plus, X } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib";

export interface ChipOption {
  value: string;
  label: string;
}

export interface ChipSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ChipOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  /** Permite quitar todos. Si false, mantiene al menos uno. */
  allowEmpty?: boolean;
}

/**
 * Selector de múltiples opciones en forma de chips toggleables.
 *
 * @example
 *   <ChipSelector options={tags} value={sel} onValueChange={setSel} />
 */
export const ChipSelector = forwardRef<HTMLDivElement, ChipSelectorProps>(function ChipSelector(
  { options, value, onValueChange, allowEmpty = true, className, ...props },
  ref,
) {
  const toggle = (v: string) => {
    const has = value.includes(v);
    if (has && !allowEmpty && value.length === 1) return;
    onValueChange(has ? value.filter((x) => x !== v) : [...value, v]);
  };
  return (
    <div ref={ref} role="group" className={cn("flex flex-wrap gap-2", className)} {...props}>
      {options.map((opt) => {
        const on = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium",
              "transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              on
                ? "border-primary bg-primary-soft text-primary"
                : "border-border-strong bg-surface text-fg-muted hover:bg-surface-muted hover:text-fg",
            )}
          >
            {on ? <Check className="size-3.5" /> : <Plus className="size-3.5 opacity-60" />}
            {opt.label}
            {on && <X className="size-3 opacity-50" />}
          </button>
        );
      })}
    </div>
  );
});
