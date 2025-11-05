import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - TimeWipe",
  description: "Tips, tutorials, and updates about transcript cleaning, video content, and TimeWipe features.",
};

export default function BlogPage() {
  const posts = [
    {
      title: "How to Get YouTube Transcripts in 3 Easy Steps",
      excerpt: "Learn the fastest way to extract transcripts from YouTube videos and clean them for your content.",
      date: "2024-01-15",
      slug: "how-to-get-youtube-transcripts",
      category: "Tutorial",
    },
    {
      title: "5 Ways Content Creators Use TimeWipe",
      excerpt: "Discover how bloggers, podcasters, and video creators save time with timestamp removal.",
      date: "2024-01-10",
      slug: "content-creators-use-timewipe",
      category: "Use Cases",
    },
    {
      title: "Integrating TimeWipe API into Your Application",
      excerpt: "A developer's guide to integrating transcript cleaning into your workflow with our REST API.",
      date: "2024-01-05",
      slug: "integrating-timewipe-api",
      category: "Developer",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-6">Blog</h1>
          <p className="text-lg text-gray-600 mb-12">
            Tips, tutorials, and updates from the TimeWipe team
          </p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#e07a5f] hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#ede7de] text-[#e07a5f] rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-600">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#2d1f14] mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#e07a5f] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#e07a5f] hover:text-[#d4694e] font-semibold"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">More blog posts coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
