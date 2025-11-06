import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - TimeWipe",
  description: "Learn about TimeWipe, our mission, and how we're making transcript cleaning simple and accessible.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-8">About TimeWipe</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              TimeWipe is a specialized tool designed to make transcript cleaning effortless for creators, developers, and professionals worldwide.
            </p>

            <h2 className="text-2xl font-bold text-[#2d1f14] mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We believe that working with video transcripts shouldn't be tedious. TimeWipe was created to solve a simple but common problem: removing timestamps from transcripts quickly and reliably.
            </p>

            <h2 className="text-2xl font-bold text-[#2d1f14] mt-12 mb-4">Why TimeWipe?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#e07a5f] font-bold">•</span>
                <span><strong>Privacy First:</strong> All processing happens locally in your browser for the free tool</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e07a5f] font-bold">•</span>
                <span><strong>Always Free:</strong> Core functionality remains free forever</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e07a5f] font-bold">•</span>
                <span><strong>Developer Friendly:</strong> Simple API for programmatic access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e07a5f] font-bold">•</span>
                <span><strong>Platform Agnostic:</strong> Works with YouTube, Loom, SRT, and more</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2d1f14] mt-12 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Visit our{" "}
              <a href="/contact" className="text-[#e07a5f] hover:text-[#d4694e] font-semibold">
                contact page
              </a>{" "}
              to get in touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
