import { auth, currentUser } from "@clerk/nextjs/server";
import DashboardLayout from "../components/DashboardLayout";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  CreditCard,
  Key,
  BarChart3
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings - TimeWipe",
  description: "Manage your TimeWipe account settings, profile, and preferences.",
};

// Force dynamic rendering for protected pages
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const accountInfo = [
    {
      icon: User,
      label: "Name",
      value: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Not set",
    },
    {
      icon: Mail,
      label: "Email",
      value: user?.emailAddresses[0]?.emailAddress || "Not set",
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Unknown",
    },
  ];

  const quickLinks = [
    {
      icon: CreditCard,
      label: "Billing & Subscription",
      description: "Manage your plan and payment methods",
      href: "/account/billing",
    },
    {
      icon: Key,
      label: "API Keys",
      description: "Generate and manage API keys",
      href: "/account/api-keys",
    },
    {
      icon: BarChart3,
      label: "Usage Statistics",
      description: "View your usage and analytics",
      href: "/account/usage",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d1f14] mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2d1f14]">Profile Information</h2>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12",
                },
              }}
            />
          </div>

          <div className="space-y-4">
            {accountInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="p-2 bg-[#ede7de] rounded-lg">
                    <Icon className="text-[#e07a5f]" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">{info.label}</div>
                    <div className="font-medium text-[#2d1f14]">{info.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              To update your profile information, use the profile button above. This will open Clerk's
              user profile manager where you can update your name, email, password, and more.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2d1f14] mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#e07a5f] hover:bg-[#ede7de] transition-all group"
                >
                  <div className="p-2 bg-[#ede7de] rounded-lg w-fit group-hover:bg-white">
                    <Icon className="text-[#e07a5f]" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2d1f14] mb-1">{link.label}</div>
                    <div className="text-sm text-gray-600">{link.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Account Security</h3>
              <p className="text-sm text-blue-800">
                Your account is protected by Clerk's enterprise-grade authentication. We never store
                your password and all data is encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
