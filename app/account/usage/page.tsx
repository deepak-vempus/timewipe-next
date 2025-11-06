import DashboardLayout from "@/app/components/DashboardLayout";
import { BarChart3, TrendingUp, Zap, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usage Statistics - TimeWipe",
  description: "View your TimeWipe usage statistics and analytics.",
};

// Force dynamic rendering for protected pages
export const dynamic = 'force-dynamic';

export default function UsagePage() {
  // In a real app, fetch from database
  const usage = {
    currentMonth: {
      apiCalls: 0,
      transcripts: 12,
      characters: 45230,
    },
    limit: {
      apiCalls: 0, // 0 for free plan
      description: "Free Plan - No API access",
    },
    history: [
      { month: "January 2024", transcripts: 12, characters: 45230 },
      { month: "December 2023", transcripts: 8, characters: 32100 },
      { month: "November 2023", transcripts: 15, characters: 58940 },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d1f14] mb-2">
            Usage Statistics
          </h1>
          <p className="text-gray-600">Track your TimeWipe usage and analytics</p>
        </div>

        {/* Current Month Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#ede7de] rounded-lg">
                <Zap className="text-[#e07a5f]" size={24} />
              </div>
              <div className="text-sm font-semibold text-gray-600">API Calls</div>
            </div>
            <div className="text-3xl font-bold text-[#2d1f14] mb-1">
              {usage.currentMonth.apiCalls.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">{usage.limit.description}</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#ede7de] rounded-lg">
                <FileText className="text-[#e07a5f]" size={24} />
              </div>
              <div className="text-sm font-semibold text-gray-600">Transcripts</div>
            </div>
            <div className="text-3xl font-bold text-[#2d1f14] mb-1">
              {usage.currentMonth.transcripts}
            </div>
            <div className="text-sm text-gray-600">This month</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#ede7de] rounded-lg">
                <TrendingUp className="text-[#e07a5f]" size={24} />
              </div>
              <div className="text-sm font-semibold text-gray-600">Characters</div>
            </div>
            <div className="text-3xl font-bold text-[#2d1f14] mb-1">
              {(usage.currentMonth.characters / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-gray-600">Processed</div>
          </div>
        </div>

        {/* Usage History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2d1f14] mb-6">Usage History</h2>
          <div className="space-y-4">
            {usage.history.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-[#2d1f14]">{record.month}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {record.transcripts} transcripts • {record.characters.toLocaleString()} characters
                  </div>
                </div>
                <BarChart3 className="text-gray-400" size={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA for Free Users */}
        {usage.limit.apiCalls === 0 && (
          <div className="bg-gradient-to-r from-[#e07a5f] to-[#d4694e] rounded-lg shadow-sm p-6 text-white">
            <h2 className="text-xl font-bold mb-2">Want More Analytics?</h2>
            <p className="mb-4 text-white/90">
              Upgrade to Pro to get detailed API usage analytics, charts, and insights.
            </p>
            <a
              href="/pricing"
              className="inline-block bg-white text-[#e07a5f] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
