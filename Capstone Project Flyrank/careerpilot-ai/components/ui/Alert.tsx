import { cn } from "@/lib/utils";

interface AlertProps {
  title: string;
  message: string;
  variant?: "error" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  error: "border-red-500/30 bg-red-500/10 text-red-200",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  info: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
};

export function Alert({ title, message, variant = "error", className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border p-4 animate-fade-in",
        variantStyles[variant],
        className
      )}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{message}</p>
    </div>
  );
}
