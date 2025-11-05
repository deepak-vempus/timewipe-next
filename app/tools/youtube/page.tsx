import TranscriptCleaner from "@/app/components/TranscriptCleaner";
import { PLATFORMS } from "@/app/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Timestamps from YouTube Transcripts - Free Tool | TimeWipe",
  description: "Clean YouTube video transcripts by removing timestamps instantly. Free, fast, and privacy-first. Perfect for content creators, writers, and researchers.",
  keywords: "YouTube transcript, remove timestamps, clean YouTube transcript, YouTube video text, transcript cleaner",
};

export default function YouTubePage() {
  const platform = PLATFORMS.YOUTUBE;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-sm font-semibold text-red-600">YouTube Transcript Cleaner</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              Remove Timestamps from YouTube Transcripts
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Clean your YouTube video transcripts instantly. Perfect for creating blog posts,
              articles, and content from YouTube videos.
            </p>
          </div>

          {/* Transcript Cleaner Tool */}
          <div className="max-w-5xl mx-auto">
            <TranscriptCleaner
              title="Clean YouTube Transcript"
              description="Paste your YouTube transcript below and remove all timestamps instantly. Works with both auto-generated and manual transcripts."
              placeholder="Example YouTube transcript:

[00:00] Welcome to this video tutorial
[00:15] Today we'll be discussing...
[00:30] The first step is to...
[01:00] Next, you need to...

Paste your YouTube transcript here..."
            />
          </div>
        </div>
      </section>

      {/* How to Get YouTube Transcripts */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              How to Get YouTube Transcripts
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Open the YouTube Video
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Navigate to the YouTube video you want to transcribe. Make sure the video has captions available.
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
                    Click the three dots (...) below the video, then select "Show transcript" from the menu.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Alternatively, look for the "Transcript" button in the video description area.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07a5f] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                    Copy the Transcript
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Select all the text in the transcript panel and copy it. Then paste it into TimeWipe above to remove the timestamps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube-Specific Features */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              YouTube-Specific Features
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Blog Posts</h3>
                <p className="text-sm text-gray-600">
                  Convert YouTube videos into clean blog content
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Study Notes</h3>
                <p className="text-sm text-gray-600">
                  Create clean notes from educational videos
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2d1f14] mb-2">Research</h3>
                <p className="text-sm text-gray-600">
                  Extract clean quotes and information for research
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
