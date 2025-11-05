import TranscriptCleaner from "@/app/components/TranscriptCleaner";
import { PLATFORMS } from "@/app/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Timestamps from SRT Files - Subtitle Cleaner | TimeWipe",
  description: "Clean SRT, VTT, and subtitle files by removing timestamps instantly. Free subtitle file cleaner. Supports all major subtitle formats.",
  keywords: "SRT cleaner, VTT cleaner, subtitle timestamps, remove SRT timestamps, subtitle file cleaner",
};

export default function SRTPage() {
  const platform = PLATFORMS.SRT;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-semibold text-green-600">SRT & Subtitle File Cleaner</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              Remove Timestamps from SRT Files
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Clean SRT, VTT, and other subtitle files instantly. Remove timestamps and sequence numbers
              to extract just the text content.
            </p>
          </div>

          {/* Transcript Cleaner Tool */}
          <div className="max-w-5xl mx-auto">
            <TranscriptCleaner
              title="Clean SRT/Subtitle File"
              description="Paste your SRT file content below and remove all timestamps and sequence numbers instantly."
              placeholder="Example SRT file:

1
00:00:00,000 --> 00:00:05,000
Welcome to this tutorial video

2
00:00:05,500 --> 00:00:10,000
Today we'll be learning about...

3
00:00:10,500 --> 00:00:15,000
The first step is to...

Paste your SRT file content here..."
              fileLabel="Or upload your SRT/VTT file"
            />
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Supported Subtitle Formats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#e07a5f]">SRT</span>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">SubRip (.srt)</h3>
                <p className="text-sm text-gray-600">
                  Most common subtitle format used by YouTube, VLC, and video editors
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#e07a5f]">VTT</span>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">WebVTT (.vtt)</h3>
                <p className="text-sm text-gray-600">
                  Web standard for HTML5 video, used by Vimeo and modern web players
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-16 h-16 bg-[#ede7de] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#e07a5f]">SBV</span>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">SubViewer (.sbv)</h3>
                <p className="text-sm text-gray-600">
                  YouTube's preferred format for uploading custom subtitles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SRT-Specific Features */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Subtitle Cleaning Features
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

      {/* How to Use */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              How to Clean SRT Files
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Upload or Paste Your File
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Either upload your SRT/VTT/SBV file directly, or open it in a text editor and copy-paste the content.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Clean Timestamps
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Click "Clean timestamps" to remove all sequence numbers, timestamps, and formatting markers.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Copy or Download
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Copy the cleaned text to your clipboard or download it as a text file for later use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
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
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Content Creation</h3>
                <p className="text-sm text-gray-600">
                  Extract dialogue for scripts and content
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">SEO & Indexing</h3>
                <p className="text-sm text-gray-600">
                  Create text versions for search engines
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Translation</h3>
                <p className="text-sm text-gray-600">
                  Prepare subtitle text for translation services
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
