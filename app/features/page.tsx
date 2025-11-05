import { FEATURES, USE_CASES } from "../lib/constants";
import { FeatureCard } from "../components/FeatureCard";
import { UseCaseCard } from "../components/UseCaseCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - TimeWipe",
  description: "Explore all TimeWipe features including timestamp removal, API access, bulk processing, and more. Built for creators, developers, and teams.",
};

export default function FeaturesPage() {
  const coreFeatures = FEATURES.filter((f) => f.category === "core");
  const premiumFeatures = FEATURES.filter((f) => f.category === "premium");
  const apiFeatures = FEATURES.filter((f) => f.category === "api");
  const enterpriseFeatures = FEATURES.filter((f) => f.category === "enterprise");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">
              Powerful Features for Everyone
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              From free tools for individuals to enterprise-grade API access for teams.
              TimeWipe scales with your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features - Free for Everyone */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                FREE FOR EVERYONE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Core Features
              </h2>
              <p className="text-lg text-gray-600">
                Powerful timestamp removal tools, completely free
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} showBadge={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
                PRO PLAN
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Premium Features
              </h2>
              <p className="text-lg text-gray-600">
                Advanced capabilities for professionals and power users
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} showBadge={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                API ACCESS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Developer Features
              </h2>
              <p className="text-lg text-gray-600">
                Integrate timestamp removal into your applications
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} showBadge={false} />
              ))}
            </div>

            {/* API Example */}
            <div className="mt-12 bg-[#2d1f14] rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Quick API Example</h3>
              <pre className="bg-black/30 p-4 rounded overflow-x-auto text-sm">
                <code>{`// Remove timestamps via API
fetch('https://api.timewipe.com/v1/clean', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    text: '[00:00] Hello world [00:15] This is a test'
  })
})
.then(res => res.json())
.then(data => console.log(data.cleaned_text));
// Output: "Hello world This is a test"`}</code>
              </pre>
              <div className="mt-4">
                <Link
                  href="/api"
                  className="text-[#e07a5f] hover:text-[#d4694e] font-semibold"
                >
                  View Full API Documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
                ENTERPRISE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Enterprise Features
              </h2>
              <p className="text-lg text-gray-600">
                Mission-critical features for teams and organizations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} showBadge={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-4">
                Built For Your Workflow
              </h2>
              <p className="text-lg text-gray-600">
                See how different professionals use TimeWipe
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#ede7de]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Start with our free plan and upgrade when you need more features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
              >
                Try Free Tool
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3 border border-gray-300 text-[#2d1f14] font-semibold rounded-lg hover:bg-white transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
