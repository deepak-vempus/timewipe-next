import TranscriptCleaner from "@/app/components/TranscriptCleaner";
import { PLATFORMS } from "@/app/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Timestamps from Loom Transcripts - Free Tool | TimeWipe",
  description: "Clean Loom video transcripts by removing timestamps instantly. Free, fast, and privacy-first. Perfect for teams, sales, and async communication.",
  keywords: "Loom transcript, remove timestamps, clean Loom transcript, Loom video text, transcript cleaner",
};

export default function LoomPage() {
  const platform = PLATFORMS.LOOM;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-semibold text-purple-600">Loom Transcript Cleaner</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              Remove Timestamps from Loom Transcripts
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Clean your Loom video transcripts instantly. Perfect for documentation, team communication,
              and repurposing video content.
            </p>
          </div>

          {/* Transcript Cleaner Tool */}
          <div className="max-w-5xl mx-auto">
            <TranscriptCleaner
              title="Clean Loom Transcript"
              description="Paste your Loom transcript below and remove all timestamps instantly."
              placeholder="Example Loom transcript:

0:00 Hey team, in this video I'll show you...
0:15 First, let's take a look at the dashboard
0:30 As you can see here, the metrics are...
0:45 Next, I want to highlight...

Paste your Loom transcript here..."
            />
          </div>
        </div>
      </section>

      {/* How to Get Loom Transcripts */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              How to Get Loom Transcripts
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Open Your Loom Video
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Go to your Loom library or open the Loom video link you want to transcribe.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Access the Transcript
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-2">
                    Look for the "Transcript" tab below the video player. Loom automatically generates transcripts for all videos.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Note: Transcripts are available for all Loom videos by default.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Copy and Clean
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Copy the transcript text and paste it into TimeWipe above. Click "Clean timestamps" to remove all time markers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loom-Specific Features */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Loom-Specific Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platform.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#ede7de] rounded-full flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#e07a5f]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Popular Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Team Docs</h3>
                <p className="text-sm text-gray-600">
                  Convert Loom videos into documentation
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Meeting Notes</h3>
                <p className="text-sm text-gray-600">
                  Create clean meeting summaries from Loom
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
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Sales Content</h3>
                <p className="text-sm text-gray-600">
                  Repurpose sales videos into written content
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-6">
              Need More Features?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Upgrade to Pro for API access, bulk processing, and advanced features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
              >
                View Pricing
              </Link>
              <Link
                href="/tools"
                className="px-8 py-3 border border-gray-300 text-[#2d1f14] font-semibold rounded-lg hover:bg-white transition-colors"
              >
                Explore All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
