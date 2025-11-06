"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface UserMenuProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function UserMenu({ mobile = false, onNavigate }: UserMenuProps) {
  const handleClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <>
      {/* Show when user is NOT logged in */}
      <SignedOut>
        <div className={mobile ? "flex flex-col gap-2 w-full" : "flex items-center gap-3"}>
          <Link
            href="/login"
            onClick={handleClick}
            className={
              mobile
                ? "block w-full text-center text-sm font-medium text-[#2d1f14] hover:text-[#e07a5f] transition-colors py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                : "text-sm font-medium text-[#2d1f14] hover:text-[#e07a5f] transition-colors"
            }
          >
            Log In
          </Link>
          <Link
            href="/signup"
            onClick={handleClick}
            className={
              mobile
                ? "block w-full text-center text-sm font-semibold bg-[#e07a5f] text-white px-4 py-2 rounded-lg hover:bg-[#d4694e] transition-colors"
                : "text-sm font-semibold bg-[#e07a5f] text-white px-4 py-2 rounded-lg hover:bg-[#d4694e] transition-colors"
            }
          >
            Sign Up
          </Link>
        </div>
      </SignedOut>

      {/* Show when user IS logged in */}
      <SignedIn>
        <div className={mobile ? "flex flex-col items-center gap-3" : "flex items-center gap-4"}>
          <Link
            href="/dashboard"
            onClick={handleClick}
            className={
              mobile
                ? "block w-full text-center text-sm font-semibold bg-[#e07a5f] text-white px-4 py-2 rounded-lg hover:bg-[#d4694e] transition-colors"
                : "text-sm font-medium text-[#2d1f14] hover:text-[#e07a5f] transition-colors"
            }
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
