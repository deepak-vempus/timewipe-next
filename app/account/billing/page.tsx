import DashboardLayout from "@/app/components/DashboardLayout";
import { PRICING_PLANS } from "@/app/lib/constants";
import { CreditCard, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing - TimeWipe",
  description: "Manage your TimeWipe subscription, billing, and payment methods.",
};

// Force dynamic rendering for protected pages
export const dynamic = 'force-dynamic';

export default function BillingPage() {
  // In a real app, fetch from database
  const subscription = {
    plan: "Free",
    status: "active",
    nextBillingDate: null,
    amount: 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d1f14] mb-2">
            Billing & Subscription
          </h1>
          <p className="text-gray-600">Manage your plan and payment methods</p>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2d1f14] mb-4">Current Plan</h2>
          <div className="flex items-center justify-between p-4 bg-[#ede7de] rounded-lg">
            <div>
              <div className="text-2xl font-bold text-[#2d1f14]">{subscription.plan}</div>
              <div className="text-sm text-gray-600 mt-1">
                {subscription.plan === "Free"
                  ? "Free forever - No credit card required"
                  : `$${subscription.amount}/month`}
              </div>
            </div>
            {subscription.plan === "Free" && (
              <Link
                href="/pricing"
                className="px-6 py-2 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors"
              >
                Upgrade Plan
              </Link>
            )}
          </div>
        </div>

        {/* Available Plans */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2d1f14] mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(PRICING_PLANS).map((plan) => (
              <div
                key={plan.name}
                className={`border-2 rounded-lg p-6 ${
                  plan.highlighted
                    ? "border-[#e07a5f]"
                    : "border-gray-200"
                }`}
              >
                <div className="text-xl font-bold text-[#2d1f14] mb-2">{plan.name}</div>
                <div className="text-3xl font-bold text-[#2d1f14] mb-4">
                  {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                  {plan.period && <span className="text-base font-normal text-gray-600">/{plan.period}</span>}
                </div>
                <Link
                  href={plan.ctaHref}
                  className={`block w-full text-center py-2 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-[#e07a5f] text-white hover:bg-[#d4694e]"
                      : "border border-gray-300 text-[#2d1f14] hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Payment Integration Coming Soon</h3>
              <p className="text-sm text-yellow-800">
                Stripe payment integration will be enabled once you configure your Stripe keys. Contact support if you need help setting this up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
