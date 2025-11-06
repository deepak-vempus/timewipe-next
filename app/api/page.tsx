import Link from "next/link";
import { Code, Key, Zap, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation - TimeWipe",
  description: "Learn how to integrate TimeWipe timestamp removal into your applications with our REST API.",
  keywords: ["API", "REST API", "timestamp removal API", "developer API", "integration"],
};

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-[#ede7de] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              TimeWipe API Documentation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Integrate powerful timestamp removal into your applications. Simple, fast, and reliable REST API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup?plan=pro"
                className="px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
              >
                Get API Access
              </Link>
              <Link
                href="/account/api-keys"
                className="px-8 py-3 border border-gray-300 text-[#2d1f14] font-semibold rounded-lg hover:bg-white transition-colors"
              >
                Manage API Keys
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-[#e07a5f]" size={28} />
                </div>
                <h3 className="font-semibold text-[#2d1f14] mb-2">Fast Response</h3>
                <p className="text-sm text-gray-600">Average response time under 100ms</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-[#e07a5f]" size={28} />
                </div>
                <h3 className="font-semibold text-[#2d1f14] mb-2">Secure</h3>
                <p className="text-sm text-gray-600">HTTPS encryption and API key authentication</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="text-[#e07a5f]" size={28} />
                </div>
                <h3 className="font-semibold text-[#2d1f14] mb-2">Simple</h3>
                <p className="text-sm text-gray-600">RESTful API with JSON responses</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="text-[#e07a5f]" size={28} />
                </div>
                <h3 className="font-semibold text-[#2d1f14] mb-2">Reliable</h3>
                <p className="text-sm text-gray-600">99.9% uptime SLA on Enterprise plans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-8">Getting Started</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-3">1. Get Your API Key</h3>
                <p className="text-gray-600 mb-4">
                  Sign up for a Pro or Enterprise plan and generate your API key from the dashboard.
                </p>
                <Link href="/pricing" className="text-[#e07a5f] hover:text-[#d4694e] font-semibold">
                  View Pricing →
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-3">2. Make Your First Request</h3>
                <p className="text-gray-600 mb-4">Base URL:</p>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm mb-4">
                  https://api.timewipe.com/v1
                </div>
                <p className="text-gray-600">
                  Include your API key in the Authorization header with all requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-8">API Endpoints</h2>

            {/* Clean Endpoint */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded font-mono text-sm font-semibold">
                  POST
                </span>
                <span className="font-mono text-lg">/v1/clean</span>
              </div>

              <p className="text-gray-600 mb-6">Remove timestamps from a transcript.</p>

              <h4 className="font-semibold text-[#2d1f14] mb-3">Request Body:</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`{
  "text": "[00:00] Welcome to this video..."
}`}</code></pre>
              </div>

              <h4 className="font-semibold text-[#2d1f14] mb-3">Example (cURL):</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <pre className="text-sm"><code>{`curl -X POST https://api.timewipe.com/v1/clean \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "[00:00] Hello [00:15] World"}'`}</code></pre>
              </div>

              <h4 className="font-semibold text-[#2d1f14] mb-3">Response:</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`{
  "success": true,
  "cleaned_text": "Hello World",
  "characters_processed": 25,
  "timestamps_removed": 2
}`}</code></pre>
              </div>
            </div>

            {/* Bulk Endpoint */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded font-mono text-sm font-semibold">
                  POST
                </span>
                <span className="font-mono text-lg">/v1/bulk</span>
              </div>

              <p className="text-gray-600 mb-6">Process multiple transcripts in a single request.</p>

              <h4 className="font-semibold text-[#2d1f14] mb-3">Request Body:</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`{
  "texts": [
    "[00:00] First transcript...",
    "[00:00] Second transcript..."
  ]
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-8">Rate Limits</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-[#2d1f14] font-semibold">Plan</th>
                    <th className="text-left py-3 text-[#2d1f14] font-semibold">Requests/Month</th>
                    <th className="text-left py-3 text-[#2d1f14] font-semibold">Rate Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3">Pro</td>
                    <td className="py-3">10,000</td>
                    <td className="py-3">100 req/minute</td>
                  </tr>
                  <tr>
                    <td className="py-3">Enterprise</td>
                    <td className="py-3">Unlimited</td>
                    <td className="py-3">1,000 req/minute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sign up for Pro or Enterprise to get API access
            </p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
