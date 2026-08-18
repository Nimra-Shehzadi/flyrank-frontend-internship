import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id?: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function SectionHeader({ id, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 text-center sm:mb-10", className)}>
      <h2
        id={id}
        className="text-2xl font-bold tracking-tight text-white xs:text-3xl sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400 sm:text-base">{subtitle}</p>
    </div>
  );
}
