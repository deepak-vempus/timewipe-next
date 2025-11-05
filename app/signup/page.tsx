import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - TimeWipe",
  description: "Create your free TimeWipe account to access premium features, API access, and bulk processing.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#ede7de] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2d1f14] mb-2">Get Started Free</h1>
          <p className="text-gray-600">Create your account and start cleaning transcripts</p>
        </div>
        <SignUp
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
