"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "../lib/constants";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            const hasDropdown = item.dropdown && item.dropdown.length > 0;

            if (hasDropdown) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive
                        ? "text-[#e07a5f] font-semibold"
                        : "text-[#2d1f14] hover:text-[#e07a5f]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.dropdown?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-3 hover:bg-[#ede7de] transition-colors"
                        >
                          <div className="font-medium text-[#2d1f14]">{subItem.label}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-600 mt-0.5">
                              {subItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors flex items-center ${
                  isActive
                    ? "text-[#e07a5f] font-semibold"
                    : "text-[#2d1f14] hover:text-[#e07a5f]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Section - Desktop */}
        <div className="flex items-center gap-3 ml-auto">
          <UserMenu />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg text-[#2d1f14] hover:bg-[#e07a5f]/10 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">
            {NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              const hasDropdown = item.dropdown && item.dropdown.length > 0;

              if (hasDropdown) {
                return (
                  <div key={item.href}>
                    <button
                      className="w-full px-6 py-4 text-sm font-medium text-left transition-colors border-b border-gray-100 flex items-center justify-between"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      <span className={isActive ? "text-[#e07a5f] font-semibold" : "text-[#2d1f14]"}>
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === item.label && (
                      <div className="bg-gray-50">
                        {item.dropdown?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-8 py-3 text-sm text-[#2d1f14] hover:text-[#e07a5f] border-b border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-4 text-sm font-medium transition-colors border-b border-gray-100 ${
                    isActive
                      ? "text-[#e07a5f] font-semibold"
                      : "text-[#2d1f14] hover:text-[#e07a5f]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Auth Section - Mobile */}
            <div className="px-6 py-4">
              <UserMenu mobile={true} onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
