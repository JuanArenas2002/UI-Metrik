import { forwardRef, type HTMLAttributes } from "react";
import { Info, CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "../../lib";
import { alertVariants, type AlertVariants } from "./alert.variants";

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, AlertVariants {
  icon?: React.ReactNode | false;
}

const DEFAULT_ICONS = {
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  danger: <AlertOctagon />,
} as const;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, tone = "info", icon, children, ...props },
  ref,
) {
  const renderIcon = icon === false ? null : (icon ?? DEFAULT_ICONS[tone ?? "info"]);
  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ tone }), className)} {...props}>
      {renderIcon}
      <div className="flex-1">{children}</div>
    </div>
  );
});

export const AlertTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertTitle({ className, ...props }, ref) {
    return <div ref={ref} className={cn("font-semibold leading-tight mb-1", className)} {...props} />;
  },
);

export const AlertDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertDescription({ className, ...props }, ref) {
    return <div ref={ref} className={cn("text-fg-muted leading-snug", className)} {...props} />;
  },
);
