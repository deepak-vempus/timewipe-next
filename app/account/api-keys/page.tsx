import DashboardLayout from "@/app/components/DashboardLayout";
import { Key, Copy, Trash2, Plus, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Keys - TimeWipe",
  description: "Generate and manage your Time Wipe API keys for programmatic access.",
};

export default function APIKeysPage() {
  // In a real app, fetch from database
  const apiKeys = [
    {
      id: "1",
      name: "Production Key",
      key: "tw_prod_************************abc123",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
    },
  ];

  const hasPremiumPlan = false; // Would come from database

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#2d1f14] mb-2">
                API Keys
              </h1>
              <p className="text-gray-600">Manage your API keys for programmatic access</p>
            </div>
            {hasPremiumPlan && (
              <button className="px-4 py-2 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors flex items-center gap-2">
                <Plus size={18} />
                Create New Key
              </button>
            )}
          </div>
        </div>

        {!hasPremiumPlan ? (
          /* Upgrade Required */
          <div className="bg-gradient-to-r from-[#e07a5f] to-[#d4694e] rounded-lg shadow-sm p-8 text-white text-center">
            <Key className="mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">API Access Requires Pro Plan</h2>
            <p className="mb-6 text-white/90 max-w-2xl mx-auto">
              Upgrade to Pro or Enterprise to access our API. Integrate timestamp removal into your applications with up to 10,000 requests per month.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-[#e07a5f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        ) : (
          /* API Keys List */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-[#2d1f14] mb-4">Your API Keys</h2>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-[#2d1f14]">{apiKey.name}</div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-[#e07a5f] transition-colors">
                        <Copy size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                    {apiKey.key}
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Documentation Link */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">API Documentation</h3>
              <p className="text-sm text-blue-800 mb-3">
                Learn how to integrate TimeWipe into your applications with our comprehensive API documentation.
              </p>
              <Link
                href="/api"
                className="inline-block text-sm text-blue-600 hover:text-blue-800 font-semibold"
              >
                View API Docs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
