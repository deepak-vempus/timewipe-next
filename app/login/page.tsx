import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In - TimeWipe",
  description: "Log in to your TimeWipe account to access premium features, API keys, and usage analytics.",
};

// Force dynamic rendering for auth pages
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#ede7de] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2d1f14] mb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to access your TimeWipe dashboard</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-lg rounded-lg",
            },
          }}
        />
      </div>
    </div>
  );
}
