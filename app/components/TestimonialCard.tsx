import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export function TestimonialCard({ name, role, avatar, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-[#e07a5f] text-[#e07a5f]" />
        ))}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">&ldquo;{content}&rdquo;</p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#ede7de] flex items-center justify-center text-[#2d1f14] font-semibold">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-[#2d1f14]">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
