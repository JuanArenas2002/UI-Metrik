import { File as FileIcon, UploadCloud, X } from "lucide-react";
import { forwardRef, useId, useState, type DragEvent } from "react";
import { cn } from "../../lib";

export interface FileDropzoneProps {
  /** Lista controlada de archivos. Si se omite, el componente la gestiona internamente. */
  value?: File[];
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  hint?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Zona de arrastrar-y-soltar archivos, con click de respaldo y lista de
 * archivos seleccionados.
 */
export const FileDropzone = forwardRef<HTMLInputElement, FileDropzoneProps>(function FileDropzone(
  { value, onFilesChange, accept, multiple = true, disabled, className, hint = "PNG, JPG, PDF · hasta 10 MB" },
  ref,
) {
  const inputId = useId();
  const [internal, setInternal] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const files = value ?? internal;

  const setFiles = (next: File[]) => {
    if (!value) setInternal(next);
    onFilesChange?.(next);
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    setFiles(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-8 text-center",
          "transition-colors duration-fast",
          dragging ? "border-primary bg-primary-soft" : "border-border-strong bg-surface hover:bg-surface-muted",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <UploadCloud className={cn("size-7", dragging ? "text-primary" : "text-fg-subtle")} />
        <div className="text-sm">
          <span className="font-medium text-primary">Haz click para subir</span>{" "}
          <span className="text-fg-muted">o arrastra aquí</span>
        </div>
        <p className="text-xs text-fg-subtle">{hint}</p>
        <input
          ref={ref}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2 text-sm"
            >
              <FileIcon className="size-4 shrink-0 text-fg-subtle" />
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <span className="shrink-0 text-xs text-fg-subtle">{formatSize(f.size)}</span>
              <button
                type="button"
                aria-label={`Quitar ${f.name}`}
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                className="shrink-0 rounded p-0.5 text-fg-subtle transition-colors hover:bg-surface-muted hover:text-danger"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
