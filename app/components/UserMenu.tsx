"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function UserMenu() {
  return (
    <>
      {/* Show when user is NOT logged in */}
      <SignedOut>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[#2d1f14] hover:text-[#e07a5f] transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#e07a5f] text-white px-4 py-2 rounded-lg hover:bg-[#d4694e] transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </SignedOut>

      {/* Show when user IS logged in */}
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#2d1f14] hover:text-[#e07a5f] transition-colors"
          >
            Dashboard
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
      </SignedIn>
    </>
  );
}
