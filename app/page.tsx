import TranscriptCleaner from "./components/TranscriptCleaner";
import { generateMetadata } from "./lib/metadata";

export const metadata = generateMetadata({
  title: "Remove Timestamps from Transcripts",
  description: "Free online tool to remove timestamps from video transcripts. Clean YouTube, Loom, and SRT file transcripts instantly. No signup required.",
  path: "/",
  keywords: [
    "remove timestamps",
    "transcript cleaner",
    "clean transcripts",
    "youtube transcript cleaner",
    "loom transcript",
    "srt file cleaner",
    "timestamp remover",
    "free transcript tool",
  ],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ede7de]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Main Tool */}
        <section className="mb-16">
          <TranscriptCleaner />
        </section>

        {/* Features Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Multiple Formats</h3>
              <p className="text-[#4a3c2f] text-sm">
                Supports various timestamp formats including 00:00, [00:00], 00:00:00, [00:00:00], and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">No Installation</h3>
              <p className="text-[#4a3c2f] text-sm">
                Accessible directly from your web browser. No software download or account required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Privacy First</h3>
              <p className="text-[#4a3c2f] text-sm">
                Your text is processed locally in your browser. No data is sent to any server.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Fast & Easy</h3>
              <p className="text-[#4a3c2f] text-sm">
                Clean timestamps in seconds. Simply paste your text or upload a file and click clean.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Large Files</h3>
              <p className="text-[#4a3c2f] text-sm">
                Capable of handling large batches of text efficiently.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">Free Forever</h3>
              <p className="text-[#4a3c2f] text-sm">
                100% free to use with no limitations or hidden costs.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f14] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-[#2d1f14] cursor-pointer list-none">
                What is TimeWipe?
              </summary>
              <p className="mt-4 text-[#4a3c2f]">
                TimeWipe is a specialized tool designed with writers and content creators in mind. It provides an easy way to remove various formats of timestamps from text content. Whether you&apos;re dealing with a YouTube transcript filled with timestamps or a conversation log jumbled with undesired time notations, TimeWipe makes your experience hassle-free.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-[#2d1f14] cursor-pointer list-none">
                What timestamp formats does TimeWipe support?
              </summary>
              <p className="mt-4 text-[#4a3c2f]">
                TimeWipe cleans timestamps in various formats, including 00:00, [00:00], 00:00:00, [00:00:00], 0:00:00.000, 0:00:00.000, and more. The tool also handles extra whitespace for a tidy final format.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-[#2d1f14] cursor-pointer list-none">
                Is my data safe?
              </summary>
              <p className="mt-4 text-[#4a3c2f]">
                Yes! Your text is processed entirely in your browser. No data is sent to any server, ensuring complete privacy and security of your transcripts.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-[#2d1f14] cursor-pointer list-none">
                Do I need to create an account?
              </summary>
              <p className="mt-4 text-[#4a3c2f]">
                No, TimeWipe is completely free to use with no account required. Simply paste your text or upload a file and start cleaning timestamps.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-[#2d1f14] cursor-pointer list-none">
                Can I use TimeWipe for large transcripts?
              </summary>
              <p className="mt-4 text-[#4a3c2f]">
                Yes, TimeWipe is capable of handling large batches of text efficiently. The tool processes your content locally, so there are no size limitations from server uploads.
              </p>
            </details>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d1f14] mb-4">
              What is TimeWipe?
            </h2>
            <p className="text-[#4a3c2f] leading-relaxed">
              TimeWipe is a specialized tool designed with writers and content creators in mind. It provides an easy way to remove various formats of timestamps from text content. It is perfect for individuals handling transcripts or any text-format document that includes timestamps and wishes to declutter it. Whether you&apos;re dealing with a YouTube transcript filled with timestamps or a conversation log jumbled with undesired time notations, TimeWipe is here to make your experience hassle-free.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
