import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TimeWipe",
  description: "TimeWipe privacy policy. Learn how we protect your data and respect your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At TimeWipe, we take your privacy seriously. This policy explains how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Data Collection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Free Web Tool:</strong> When you use our free web tool, all processing happens locally in your browser. We do not collect, store, or transmit your transcript data.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Account Information:</strong> When you create an account, we collect your email address and name through our authentication provider (Clerk).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">How We Use Your Data</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• To provide and improve our services</li>
                <li>• To communicate with you about your account</li>
                <li>• To process payments for premium plans</li>
                <li>• To provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">API Usage</h2>
              <p className="text-gray-700 leading-relaxed">
                When you use our API, we temporarily process your transcript data to remove timestamps. We do not store the content of your transcripts. We only log metadata such as request timestamps and character counts for billing and analytics purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                We use the following third-party services:
              </p>
              <ul className="space-y-2 text-gray-700 mt-4">
                <li>• <strong>Clerk:</strong> Authentication and user management</li>
                <li>• <strong>Stripe:</strong> Payment processing</li>
                <li>• <strong>Supabase:</strong> Database and API infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, correct, or delete your personal information. Contact us at the email provided to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#2d1f14] mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this privacy policy, please contact us through our{" "}
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
