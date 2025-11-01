import Link from "next/link";
import { SITE_CONFIG, NAVIGATION } from "../lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">About {SITE_CONFIG.name}</h2>
            <p className="text-sm text-[#4a3c2f] leading-relaxed">
              {SITE_CONFIG.description} Perfect for writers, content creators, and anyone working with transcripts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#4a3c2f] hover:text-[#e07a5f] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">Information</h2>
            <ul className="space-y-2 text-sm text-[#4a3c2f]">
              <li>
                <span className="font-medium">Privacy:</span> Your text is processed locally in your browser. No data is sent to any server.
              </li>
              <li>
                <span className="font-medium">Free:</span> 100% free to use, no account required.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-[#4a3c2f]">
            © {currentYear} {SITE_CONFIG.name}. Created by {SITE_CONFIG.creator}.
          </p>
        </div>
      </div>
    </footer>
  );
}

