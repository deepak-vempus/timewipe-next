import { PLATFORMS } from "../lib/constants";
import { ToolCard } from "../components/ToolCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tools - TimeWipe",
  description: "Explore all our timestamp removal tools for YouTube, Loom, SRT files, and more. Free, fast, and privacy-first transcript cleaning.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              All Tools
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Choose the right tool for your platform. Each tool is optimized for specific
              transcript formats while maintaining our privacy-first approach.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(PLATFORMS).map((platform) => (
              <ToolCard key={platform.slug} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TimeWipe */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Why Choose TimeWipe?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#e07a5f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Remove timestamps instantly with our optimized algorithms
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#e07a5f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">100% Private</h3>
                <p className="text-gray-600">
                  Your data stays in your browser. Nothing is sent to servers
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#e07a5f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Completely Free</h3>
                <p className="text-gray-600">No hidden fees, no account required to start</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
