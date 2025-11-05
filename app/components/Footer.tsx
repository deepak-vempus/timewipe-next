import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "../lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">About</h2>
            <ul className="space-y-2">
              {FOOTER_LINKS.about.map((item) => (
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

          {/* Tools Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">Tools</h2>
            <ul className="space-y-2">
              {FOOTER_LINKS.tools.map((item) => (
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

          {/* Resources Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">Resources</h2>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((item) => (
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

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#2d1f14] mb-4">Support</h2>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((item) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#4a3c2f]">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-sm text-[#4a3c2f]">
              Created by{" "}
              <a
                href={`https://github.com/${SITE_CONFIG.creator}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e07a5f] hover:underline"
              >
                {SITE_CONFIG.creator}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
