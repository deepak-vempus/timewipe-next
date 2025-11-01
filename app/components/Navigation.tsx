"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "../lib/constants";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
        {NAVIGATION.map((item) => {
          const isActive = pathname === item.href;
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
          </div>
        </nav>
      )}
    </>
  );
}

