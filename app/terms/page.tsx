import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - TimeWipe",
  description: "TimeWipe terms of service. Read our terms and conditions for using the service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using TimeWipe, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Use of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TimeWipe provides timestamp removal services through both a free web interface and paid API access. You agree to use the service only for lawful purposes and in accordance with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">API Usage</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• You must not exceed your plan's API rate limits</li>
                <li>• You must keep your API keys secure and confidential</li>
                <li>• You are responsible for all activity under your API keys</li>
                <li>• We reserve the right to suspend access for violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Paid plans are billed monthly or annually. All fees are non-refundable except as required by law or as specified in our refund policy (14-day money-back guarantee).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Use the service for any illegal purpose</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Interfere with or disrupt the service</li>
                <li>• Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TimeWipe is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Questions about these terms? Contact us through our{" "}
                <a href="/contact" className="text-[#e07a5f] hover:text-[#d4694e] font-semibold">
                  contact page
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
