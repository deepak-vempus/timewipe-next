import { PRICING_PLANS, FAQS } from "../lib/constants";
import { PricingCard } from "../components/PricingCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans - TimeWipe",
  description: "Choose the perfect plan for your needs. Free forever plan available. Pro and Enterprise plans with API access, bulk processing, and more.",
};

export default function PricingPage() {
  const pricingFAQs = FAQS.filter((faq) => faq.category === "pricing");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              Choose Your Plan
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Start for free, upgrade when you need more. All plans include our privacy-first
              timestamp removal tool.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PricingCard plan={PRICING_PLANS.FREE} />
            <PricingCard plan={PRICING_PLANS.PRO} />
            <PricingCard plan={PRICING_PLANS.ENTERPRISE} />
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Compare Features
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-[#2d1f14] font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-[#2d1f14] font-semibold">Free</th>
                    <th className="text-center py-4 px-4 text-[#2d1f14] font-semibold">Pro</th>
                    <th className="text-center py-4 px-4 text-[#2d1f14] font-semibold">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Core Features */}
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-3 px-4 font-semibold text-[#2d1f14]">
                      Core Features
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Timestamp removal</td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">All timestamp formats</td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Privacy-first processing</td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>

                  {/* Advanced Features */}
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-3 px-4 font-semibold text-[#2d1f14]">
                      Advanced Features
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">API access</td>
                    <td className="text-center py-4 px-4 text-gray-400">-</td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">
                      10,000/month
                    </td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Bulk file processing</td>
                    <td className="text-center py-4 px-4 text-gray-400">-</td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Usage analytics</td>
                    <td className="text-center py-4 px-4 text-gray-400">-</td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg
                        className="w-5 h-5 text-[#e07a5f] mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>

                  {/* Support */}
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-3 px-4 font-semibold text-[#2d1f14]">
                      Support
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Email support</td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">Community</td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">Priority</td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">Dedicated</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">SLA guarantee</td>
                    <td className="text-center py-4 px-4 text-gray-400">-</td>
                    <td className="text-center py-4 px-4 text-gray-400">-</td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">99.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] text-center mb-12">
              Pricing FAQ
            </h2>
            <div className="space-y-4">
              {pricingFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 group"
                >
                  <summary className="font-semibold text-[#2d1f14] cursor-pointer flex items-center justify-between">
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our team is here to help. Contact us to discuss your specific needs or learn more about
              Enterprise features.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
