import { Icon } from "./Icon";
import type { Feature } from "@/app/lib/constants";

interface FeatureCardProps {
  feature: Feature;
  showBadge?: boolean;
}

export function FeatureCard({ feature, showBadge = false }: FeatureCardProps) {
  const { title, description, icon, category } = feature;

  const categoryColors: Record<string, string> = {
    core: "bg-blue-100 text-blue-800",
    premium: "bg-purple-100 text-purple-800",
    api: "bg-green-100 text-green-800",
    enterprise: "bg-orange-100 text-orange-800",
  };

  const categoryLabels: Record<string, string> = {
    core: "Free",
    premium: "Pro",
    api: "API",
    enterprise: "Enterprise",
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#ede7de] rounded-lg">
          <Icon name={icon} className="text-[#e07a5f]" size={24} />
        </div>
        {showBadge && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category]}`}
          >
            {categoryLabels[category]}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
