import TranscriptCleaner from "./components/TranscriptCleaner";
import { ToolCard } from "./components/ToolCard";
import { TestimonialCard } from "./components/TestimonialCard";
import { UseCaseCard } from "./components/UseCaseCard";
import { generateMetadata } from "./lib/metadata";
import { PLATFORMS, TESTIMONIALS, USE_CASES, FAQS, FEATURES } from "./lib/constants";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const metadata = generateMetadata({
  title: "Remove Timestamps from Transcripts",
  description: "Free online tool to remove timestamps from video transcripts. Clean YouTube, Loom, and SRT file transcripts instantly. No signup required.",
  path: "/",
  keywords: [
    "remove timestamps",
    "transcript cleaner",
    "clean transcripts",
    "youtube transcript cleaner",
    "loom transcript",
    "srt file cleaner",
    "timestamp remover",
    "free transcript tool",
  ],
});

export default function Home() {
  const generalFAQs = FAQS.filter((faq) => faq.category === "general" || !faq.category).slice(0, 6);
  const coreFeatures = FEATURES.filter((f) => f.category === "core").slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Tool */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d1f14] mb-6">
              Remove Timestamps from Transcripts Instantly
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
              Free tool for writers, creators, and professionals. Clean YouTube, Loom, and SRT
              transcripts with one click.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Check size={18} className="text-[#e07a5f]" />
                100% Free
              </span>
              <span className="flex items-center gap-2">
                <Check size={18} className="text-[#e07a5f]" />
                No Account Required
              </span>
              <span className="flex items-center gap-2">
                <Check size={18} className="text-[#e07a5f]" />
                Privacy First
              </span>
            </div>
          </div>

          {/* Main Tool */}
          <div className="max-w-5xl mx-auto">
            <TranscriptCleaner />
          </div>

          {/* Quick CTA */}
          <div className="max-w-3xl mx-auto text-center mt-8">
            <p className="text-gray-600 mb-4">
              Need API access or bulk processing?
            </p>
            <Link
              href="/pricing"
              className="text-[#e07a5f] hover:text-[#d4694e] font-semibold"
            >
              View Premium Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
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
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2d1f14] mb-2">100% Free Tool</h3>
                <p className="text-gray-600">
                  Basic timestamp removal is completely free with no limitations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
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
                <h3 className="text-xl font-bold text-[#2d1f14] mb-2">Privacy First</h3>
                <p className="text-gray-600">
                  All processing happens locally in your browser. Zero data sent to servers
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
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
                <h3 className="text-xl font-bold text-[#2d1f14] mb-2">Instant Results</h3>
                <p className="text-gray-600">
                  Clean timestamps in seconds. No signup, no waiting, just results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Tools Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Specialized Tools for Every Platform
              </h2>
              <p className="text-lg text-gray-600">
                Optimized timestamp removal for YouTube, Loom, and subtitle files
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(PLATFORMS).map((platform) => (
                <ToolCard key={platform.slug} platform={platform} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tools"
                className="text-[#e07a5f] hover:text-[#d4694e] font-semibold"
              >
                View All Tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#e07a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                  Paste or Upload
                </h3>
                <p className="text-gray-600">
                  Copy your transcript text or upload a file (TXT, SRT, VTT, SBV)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#e07a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                  Click Clean
                </h3>
                <p className="text-gray-600">
                  Click the "Clean timestamps" button and watch the magic happen
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#e07a5f] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">
                  Copy or Download
                </h3>
                <p className="text-gray-600">
                  Get your clean text instantly. Copy to clipboard or download as a file
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Preview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Free vs Premium
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-[#2d1f14] font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-[#2d1f14] font-semibold">Free</th>
                    <th className="text-center py-4 px-4 text-[#2d1f14] font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Timestamp removal</td>
                    <td className="text-center py-4 px-4">
                      <Check className="text-[#e07a5f] mx-auto" size={20} />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="text-[#e07a5f] mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Web UI access</td>
                    <td className="text-center py-4 px-4">
                      <Check className="text-[#e07a5f] mx-auto" size={20} />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="text-[#e07a5f] mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">API access</td>
                    <td className="text-center py-4 px-4">
                      <X className="text-gray-400 mx-auto" size={20} />
                    </td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">
                      10,000/mo
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Bulk processing</td>
                    <td className="text-center py-4 px-4">
                      <X className="text-gray-400 mx-auto" size={20} />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="text-[#e07a5f] mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Priority support</td>
                    <td className="text-center py-4 px-4">
                      <X className="text-gray-400 mx-auto" size={20} />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="text-[#e07a5f] mx-auto" size={20} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/pricing"
                className="inline-block px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
              >
                View Full Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Who Uses TimeWipe?
              </h2>
              <p className="text-lg text-gray-600">
                From content creators to researchers, TimeWipe fits every workflow
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {USE_CASES.map((useCase, index) => (
                <UseCaseCard
                  key={index}
                  title={useCase.title}
                  description={useCase.description}
                  icon={useCase.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Loved by Creators Worldwide
              </h2>
              <p className="text-lg text-gray-600">
                See what our users have to say about TimeWipe
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {generalFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group"
                >
                  <summary className="font-semibold text-[#2d1f14] cursor-pointer flex items-center justify-between list-none">
                    {faq.question}
                    <span className="text-[#e07a5f] group-open:rotate-90 transition-transform">
                      ▶
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-6">
              Ready for More Features?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Upgrade to Pro for API access, bulk processing, and priority support. Perfect for
              developers and teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
              >
                View Pricing Plans
              </Link>
              <Link
                href="/features"
                className="px-8 py-3 border border-gray-300 text-[#2d1f14] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Explore All Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
