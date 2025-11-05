import Link from "next/link";
import { Icon } from "./Icon";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/app/lib/constants";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const { name, price, period, description, features, cta, ctaHref, highlighted, icon } = plan;

  return (
    <div
      className={`relative bg-white rounded-lg p-8 flex flex-col ${
        highlighted
          ? "border-2 border-[#e07a5f] shadow-lg scale-105"
          : "border border-gray-200 shadow-sm"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e07a5f] text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#ede7de] rounded-lg">
          <Icon name={icon} className="text-[#e07a5f]" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-[#2d1f14]">{name}</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          {typeof price === "number" ? (
            <>
              <span className="text-4xl font-bold text-[#2d1f14]">${price}</span>
              {period && <span className="text-gray-600">/{period}</span>}
            </>
          ) : (
            <span className="text-4xl font-bold text-[#2d1f14]">{price}</span>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-6 min-h-[3rem]">{description}</p>

      <Link
        href={ctaHref}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center mb-6 ${
          highlighted
            ? "bg-[#e07a5f] text-white hover:bg-[#d4694e]"
            : "border border-gray-300 text-[#2d1f14] hover:bg-gray-50"
        }`}
      >
        {cta}
      </Link>

      <div className="space-y-3 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="text-[#e07a5f]" size={18} />
            </div>
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
