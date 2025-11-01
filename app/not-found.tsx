import Link from "next/link";
import { SITE_CONFIG } from "./lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#ede7de] flex items-center justify-center">
      <div className="px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-[#2d1f14] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2d1f14] mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-[#4a3c2f] mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors shadow-sm"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

