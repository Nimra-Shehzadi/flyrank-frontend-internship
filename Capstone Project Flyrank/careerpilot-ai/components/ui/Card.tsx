import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
  ariaLabel?: string;
  hover?: boolean;
}

export function Card({
  children,
  className,
  as: Component = "div",
  id,
  ariaLabel,
  hover = true,
}: CardProps) {
  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "rounded-2xl border border-white/10 bg-navy-900/70 p-4 backdrop-blur-sm sm:p-6",
        "shadow-lg shadow-black/25",
        hover && "card-hover hover:border-emerald-500/25",
        className
      )}
    >
      {children}
    </Component>
  );
}
