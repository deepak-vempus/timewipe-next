import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - TimeWipe",
  description: "Get in touch with the TimeWipe team. We're here to help with questions, feedback, and support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#ede7de]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6 text-center">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Have questions or need help? We're here for you.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#2d1f14] mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#2d1f14] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#2d1f14] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-[#2d1f14] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#2d1f14] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e07a5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d4694e] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Enterprise Inquiries</h3>
            <p className="text-sm text-blue-800">
              For Enterprise plans and custom solutions, please mention "Enterprise" in your subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
