import { Toaster as SonnerToaster, toast, type ToasterProps } from "sonner";
import { useTheme } from "../../hooks/use-theme";

/**
 * Toaster (tostadora) basado en `sonner`. Sincroniza el tema con `useTheme`
 * y estiliza las notificaciones con los tokens de metrik.
 *
 * @example
 *   // monta una sola vez cerca de la raíz
 *   <Toaster />
 *   // dispara desde cualquier parte
 *   toast.success("Reporte guardado");
 */
export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      theme={resolvedTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface-elev group-[.toaster]:text-fg group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-md group-[.toaster]:rounded-md",
          description: "group-[.toast]:text-fg-muted",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-fg",
          cancelButton: "group-[.toast]:bg-surface-muted group-[.toast]:text-fg-muted",
          success: "group-[.toaster]:[&_svg]:text-success",
          error: "group-[.toaster]:[&_svg]:text-danger",
          warning: "group-[.toaster]:[&_svg]:text-warning",
        },
      }}
      {...props}
    />
  );
}

export { toast };
export type { ToasterProps };
