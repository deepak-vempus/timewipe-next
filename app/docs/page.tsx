import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - TimeWipe",
  description: "Complete documentation for TimeWipe including guides, tutorials, and API reference.",
};

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { title: "What is TimeWipe?", href: "/docs/intro" },
        { title: "Using the Web Tool", href: "/docs/web-tool" },
        { title: "Supported Formats", href: "/docs/formats" },
      ],
    },
    {
      title: "Platform Guides",
      items: [
        { title: "YouTube Transcripts", href: "/tools/youtube" },
        { title: "Loom Transcripts", href: "/tools/loom" },
        { title: "SRT Files", href: "/tools/srt" },
      ],
    },
    {
      title: "API Documentation",
      items: [
        { title: "API Overview", href: "/api" },
        { title: "Authentication", href: "/docs/api/auth" },
        { title: "Rate Limits", href: "/docs/api/rate-limits" },
      ],
    },
    {
      title: "Account & Billing",
      items: [
        { title: "Creating an Account", href: "/signup" },
        { title: "Managing Your Subscription", href: "/account/billing" },
        { title: "API Keys", href: "/account/api-keys" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">Documentation</h1>
          <p className="text-lg text-gray-600 mb-12">
            Everything you need to know about using TimeWipe
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#2d1f14] mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-[#e07a5f] transition-colors flex items-center gap-2"
                      >
                        <span className="text-[#e07a5f]">→</span>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#ede7de] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Can't find what you're looking for? Check out our FAQ or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#faq"
                className="px-6 py-2 bg-white text-[#2d1f14] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                View FAQ
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors text-center"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
