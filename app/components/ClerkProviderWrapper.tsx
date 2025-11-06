'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // If no publishable key or invalid key, render without Clerk
  if (!publishableKey || publishableKey.includes('placeholder') || publishableKey.length < 20) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}
