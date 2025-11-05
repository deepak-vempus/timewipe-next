"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Key,
  BarChart3,
  Users
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Account Settings",
    href: "/account",
    icon: Settings,
  },
  {
    label: "Billing",
    href: "/account/billing",
    icon: CreditCard,
  },
  {
    label: "API Keys",
    href: "/account/api-keys",
    icon: Key,
  },
  {
    label: "Usage",
    href: "/account/usage",
    icon: BarChart3,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#ede7de]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#e07a5f] text-white"
                          : "text-gray-700 hover:bg-[#ede7de]"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Links */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-[#2d1f14] mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-[#e07a5f] transition-colors"
                >
                  Use Tool
                </Link>
                <Link
                  href="/api"
                  className="block text-gray-600 hover:text-[#e07a5f] transition-colors"
                >
                  API Docs
                </Link>
                <Link
                  href="/pricing"
                  className="block text-gray-600 hover:text-[#e07a5f] transition-colors"
                >
                  Upgrade Plan
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-[#e07a5f] transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
