import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
