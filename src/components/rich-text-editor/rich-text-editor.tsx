import { Bold, Italic, Link2, List, ListOrdered, Underline } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib";

export interface RichTextEditorProps {
  /** HTML inicial (no controlado). */
  defaultValue?: string;
  /** Se dispara con el HTML cada vez que cambia el contenido. */
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

type Cmd = { icon: ReactNode; label: string; run: () => void };

/**
 * Editor de texto enriquecido ligero, basado en `contenteditable` +
 * `document.execCommand` (sin dependencias). Soporta negrita, cursiva,
 * subrayado, listas y enlaces. Para necesidades avanzadas, migrar a Tiptap.
 */
export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(function RichTextEditor(
  { defaultValue = "", onChange, placeholder = "Escribe aquí…", className, disabled },
  ref,
) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
    // solo en montaje
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    onChange?.(editorRef.current?.innerHTML ?? "");
  };

  const commands: Cmd[] = [
    { icon: <Bold className="size-4" />, label: "Negrita", run: () => exec("bold") },
    { icon: <Italic className="size-4" />, label: "Cursiva", run: () => exec("italic") },
    { icon: <Underline className="size-4" />, label: "Subrayado", run: () => exec("underline") },
    { icon: <List className="size-4" />, label: "Lista", run: () => exec("insertUnorderedList") },
    { icon: <ListOrdered className="size-4" />, label: "Lista numerada", run: () => exec("insertOrderedList") },
    {
      icon: <Link2 className="size-4" />,
      label: "Enlace",
      run: () => {
        const url = window.prompt("URL del enlace:");
        if (url) exec("createLink", url);
      },
    },
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-md border border-border-strong bg-surface",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-bg",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface-muted/50 p-1">
        {commands.map((c) => (
          <button
            key={c.label}
            type="button"
            title={c.label}
            aria-label={c.label}
            onMouseDown={(e) => {
              e.preventDefault();
              c.run();
            }}
            className="grid size-8 place-items-center rounded text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg"
          >
            {c.icon}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable={!disabled}
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        onInput={() => onChange?.(editorRef.current?.innerHTML ?? "")}
        className={cn(
          "metrik-rte min-h-[7rem] px-3 py-2.5 text-sm leading-relaxed text-fg outline-none",
          "[&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5",
          "empty:before:pointer-events-none empty:before:text-fg-subtle empty:before:content-[attr(data-placeholder)]",
        )}
      />
    </div>
  );
});
