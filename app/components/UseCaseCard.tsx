import { Icon } from "./Icon";

interface UseCaseCardProps {
  title: string;
  description: string;
  icon: string;
}

export function UseCaseCard({ title, description, icon }: UseCaseCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-3 bg-[#ede7de] rounded-lg w-fit mb-4">
        <Icon name={icon} className="text-[#e07a5f]" size={28} />
      </div>
      <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
