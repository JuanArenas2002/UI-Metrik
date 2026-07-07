import { X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Input } from "../../input";
import type { FilterComponent } from "../advanced-filter.types";

/** Entrada libre de etiquetas · Enter añade, Backspace elimina la última. */
export const FilterTags: FilterComponent = ({ field, value, onChange, id, disabled, readOnly, size }) => {
  const tags = Array.isArray(value) ? value.map(String) : [];
  const [draft, setDraft] = useState("");
  const listId = field.options?.length ? `${id}-list` : undefined;
  const locked = disabled || readOnly;

  const add = (raw: string) => {
    const tag = raw.trim();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setDraft("");
  };
  const remove = (tag: string) => onChange(tags.filter((t) => t !== tag));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation(); // no dispara el "aplicar" del formulario
      add(draft);
    } else if (e.key === "Backspace" && draft === "") {
      const last = tags[tags.length - 1];
      if (last !== undefined) remove(last);
    }
  };

  return (
    <div>
      {tags.length > 0 && (
        <ul role="list" className="mb-1.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft py-0.5 pl-2.5 pr-1 text-xs font-medium text-primary">
                {tag}
                {!locked && (
                  <button
                    type="button"
                    aria-label={`Quitar ${tag}`}
                    onClick={() => remove(tag)}
                    className="grid size-4 place-items-center rounded-full hover:bg-primary/20"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Input
        id={id}
        list={listId}
        size={size}
        value={draft}
        placeholder={field.placeholder ?? "Escribe y pulsa Enter"}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {listId && (
        <datalist id={listId}>
          {field.options?.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};
