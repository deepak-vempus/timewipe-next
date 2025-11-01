import Link from "next/link";
import Navigation from "./Navigation";
import { SITE_CONFIG } from "../lib/constants";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold text-[#2d1f14] hover:text-[#e07a5f] transition-colors flex items-center"
            aria-label={`${SITE_CONFIG.name} - Home`}
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Navigation */}
          <div className="relative flex items-center">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}

