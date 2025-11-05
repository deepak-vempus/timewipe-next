import Link from "next/link";
import { Icon } from "./Icon";
import { ArrowRight } from "lucide-react";
import type { Platform } from "@/app/lib/constants";

interface ToolCardProps {
  platform: Platform;
}

export function ToolCard({ platform }: ToolCardProps) {
  const { name, description, icon, href, features } = platform;

  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#e07a5f] transition-all h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#ede7de] rounded-lg group-hover:bg-[#e07a5f] transition-colors">
            <Icon
              name={icon}
              className="text-[#e07a5f] group-hover:text-white transition-colors"
              size={28}
            />
          </div>
          <h3 className="text-xl font-bold text-[#2d1f14]">{name}</h3>
        </div>

        <p className="text-gray-600 mb-4 flex-1">{description}</p>

        <ul className="space-y-2 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e07a5f] rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-[#e07a5f] font-semibold group-hover:gap-3 transition-all">
          <span>Use Tool</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
