import { cn } from "@/lib/utils";

type TextareaSize = "default" | "large";

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
  inputSize?: TextareaSize;
}

const sizeStyles: Record<TextareaSize, string> = {
  default: "min-h-[120px]",
  large: "min-h-[200px] sm:min-h-[240px]",
};

export function Textarea({
  label,
  hint,
  error,
  inputSize = "default",
  className,
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-semibold text-slate-200">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        className={cn(
          "w-full resize-y rounded-xl border bg-navy-950/60 px-3 py-3 text-sm text-white sm:px-4",
          "placeholder:text-slate-500 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
          "hover:border-white/25 hover:bg-navy-950/80",
          error
            ? "border-red-400/60 focus-visible:ring-red-400"
            : "border-white/10",
          sizeStyles[inputSize],
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
