import { auth, currentUser } from "@clerk/nextjs/server";
import DashboardLayout from "../components/DashboardLayout";
import Link from "next/link";
import {
  FileText,
  Zap,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - TimeWipe",
  description: "Manage your TimeWipe account, view usage statistics, and access your API keys.",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  // In a real app, you'd fetch this data from your database
  const stats = {
    transcriptsCleaned: 156,
    apiCalls: 2847,
    charactersProcessed: 482350,
    plan: "Free", // This would come from your database
  };

  const recentActivity = [
    {
      action: "Cleaned YouTube transcript",
      timestamp: "2 hours ago",
      characters: 3450,
    },
    {
      action: "API call via clean endpoint",
      timestamp: "5 hours ago",
      characters: 1823,
    },
    {
      action: "Cleaned SRT file",
      timestamp: "1 day ago",
      characters: 5672,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d1f14] mb-2">
            Welcome back, {user?.firstName || "there"}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your TimeWipe account
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-[#e07a5f]" size={24} />
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <div className="text-2xl font-bold text-[#2d1f14] mb-1">
              {stats.transcriptsCleaned.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Transcripts Cleaned</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-[#e07a5f]" size={24} />
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                This Month
              </span>
            </div>
            <div className="text-2xl font-bold text-[#2d1f14] mb-1">
              {stats.apiCalls.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">API Calls</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-[#e07a5f]" size={24} />
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                Total
              </span>
            </div>
            <div className="text-2xl font-bold text-[#2d1f14] mb-1">
              {(stats.charactersProcessed / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-gray-600">Characters Processed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="text-[#e07a5f]" size={24} />
            </div>
            <div className="text-2xl font-bold text-[#2d1f14] mb-1">
              {stats.plan}
            </div>
            <div className="text-sm text-gray-600">Current Plan</div>
            {stats.plan === "Free" && (
              <Link
                href="/pricing"
                className="text-sm text-[#e07a5f] hover:text-[#d4694e] font-semibold mt-2 inline-block"
              >
                Upgrade →
              </Link>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2d1f14] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#e07a5f] hover:bg-[#ede7de] transition-all group"
            >
              <div className="p-2 bg-[#ede7de] rounded-lg group-hover:bg-white">
                <FileText className="text-[#e07a5f]" size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#2d1f14]">Use Tool</div>
                <div className="text-sm text-gray-600">Clean a transcript</div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-[#e07a5f]" size={18} />
            </Link>

            <Link
              href="/account/api-keys"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#e07a5f] hover:bg-[#ede7de] transition-all group"
            >
              <div className="p-2 bg-[#ede7de] rounded-lg group-hover:bg-white">
                <Zap className="text-[#e07a5f]" size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#2d1f14]">API Keys</div>
                <div className="text-sm text-gray-600">Manage your keys</div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-[#e07a5f]" size={18} />
            </Link>

            <Link
              href="/api"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#e07a5f] hover:bg-[#ede7de] transition-all group"
            >
              <div className="p-2 bg-[#ede7de] rounded-lg group-hover:bg-white">
                <TrendingUp className="text-[#e07a5f]" size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#2d1f14]">API Docs</div>
                <div className="text-sm text-gray-600">View documentation</div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-[#e07a5f]" size={18} />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2d1f14] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="p-2 bg-[#ede7de] rounded-lg">
                  <Clock className="text-[#e07a5f]" size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[#2d1f14]">{activity.action}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{activity.timestamp}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {activity.characters.toLocaleString()} chars
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA (if on free plan) */}
        {stats.plan === "Free" && (
          <div className="bg-gradient-to-r from-[#e07a5f] to-[#d4694e] rounded-lg shadow-sm p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
            <p className="mb-4 text-white/90">
              Get API access, bulk processing, and priority support for just $29/month
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-[#e07a5f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
