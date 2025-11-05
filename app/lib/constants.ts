export const SITE_CONFIG = {
  name: "TimeWipe",
  description: "Remove timestamps from video transcripts or any type of text file with ease. Clean YouTube, Loom, and SRT file transcripts instantly.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://timewipe.com",
  creator: "DeepakNess",
};

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  dropdown?: NavItem[];
}

export const NAVIGATION: NavItem[] = [
  {
    label: "Tools",
    href: "/tools",
    description: "All timestamp removal tools",
    dropdown: [
      {
        label: "All Tools",
        href: "/tools",
        description: "View all available tools",
      },
      {
        label: "YouTube Transcripts",
        href: "/tools/youtube",
        description: "Clean YouTube transcripts",
      },
      {
        label: "Loom Transcripts",
        href: "/tools/loom",
        description: "Clean Loom transcripts",
      },
      {
        label: "SRT Files",
        href: "/tools/srt",
        description: "Clean SRT subtitle files",
      },
    ],
  },
  {
    label: "Features",
    href: "/features",
    description: "Explore all features",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "View pricing plans",
  },
  {
    label: "API",
    href: "/api",
    description: "API documentation",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Resources and guides",
  },
];

export const TRANSCRIPT_TYPES = {
  GENERAL: "general",
  YOUTUBE: "youtube",
  LOOM: "loom",
  SRT: "srt",
} as const;

export type TranscriptType = typeof TRANSCRIPT_TYPES[keyof typeof TRANSCRIPT_TYPES];

export interface Platform {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  href: string;
}

export const PLATFORMS: Record<string, Platform> = {
  YOUTUBE: {
    name: "YouTube",
    slug: "youtube",
    description: "Remove timestamps from YouTube transcripts instantly",
    icon: "Youtube",
    color: "#FF0000",
    features: [
      "Handles YouTube's timestamp format",
      "Preserves speaker labels",
      "Works with auto-generated transcripts",
      "Maintains paragraph structure",
    ],
    href: "/tools/youtube",
  },
  LOOM: {
    name: "Loom",
    slug: "loom",
    description: "Clean Loom video transcripts effortlessly",
    icon: "Video",
    color: "#625DF5",
    features: [
      "Removes Loom timestamp format",
      "Preserves text formatting",
      "Quick copy/download options",
      "Privacy-first processing",
    ],
    href: "/tools/loom",
  },
  SRT: {
    name: "SRT Files",
    slug: "srt",
    description: "Process SRT, VTT, and subtitle files",
    icon: "FileText",
    color: "#10B981",
    features: [
      "Supports SRT, VTT, SBV formats",
      "Batch file processing",
      "Preserves subtitle structure option",
      "Export in multiple formats",
    ],
    href: "/tools/srt",
  },
};

export interface PricingPlan {
  name: string;
  price: number | string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  icon: string;
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  FREE: {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for occasional use and trying out TimeWipe",
    features: [
      "Basic timestamp removal",
      "Single file processing",
      "Web UI access",
      "All timestamp formats",
      "Privacy-first (local processing)",
      "Copy to clipboard",
      "Download as TXT",
    ],
    cta: "Start Free",
    ctaHref: "/",
    icon: "Sparkles",
  },
  PRO: {
    name: "Pro",
    price: 29,
    period: "month",
    description: "For professionals who need advanced features and API access",
    features: [
      "Everything in Free",
      "API access (10,000 requests/month)",
      "Bulk file processing",
      "Priority support",
      "Custom timestamp formats",
      "Usage analytics dashboard",
      "Team sharing (up to 3 members)",
      "Export to multiple formats",
    ],
    cta: "Start Free Trial",
    ctaHref: "/signup?plan=pro",
    highlighted: true,
    icon: "Zap",
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations with custom requirements",
    features: [
      "Everything in Pro",
      "Unlimited API requests",
      "Team workspaces",
      "Advanced integrations",
      "SLA guarantee (99.9% uptime)",
      "Dedicated support",
      "Custom feature development",
      "On-premise deployment option",
      "Advanced security & compliance",
    ],
    cta: "Contact Sales",
    ctaHref: "/contact?plan=enterprise",
    icon: "Building2",
  },
};

export interface Feature {
  title: string;
  description: string;
  icon: string;
  category: "core" | "premium" | "api" | "enterprise";
  plans: string[];
}

export const FEATURES: Feature[] = [
  {
    title: "Instant Timestamp Removal",
    description: "Remove timestamps from any transcript format with one click",
    icon: "Zap",
    category: "core",
    plans: ["free", "pro", "enterprise"],
  },
  {
    title: "Multiple Format Support",
    description: "Works with YouTube, Loom, SRT, VTT, and more",
    icon: "FileText",
    category: "core",
    plans: ["free", "pro", "enterprise"],
  },
  {
    title: "Privacy First",
    description: "All processing happens locally in your browser",
    icon: "Shield",
    category: "core",
    plans: ["free", "pro", "enterprise"],
  },
  {
    title: "No Account Required",
    description: "Use the basic tool without signing up",
    icon: "UserX",
    category: "core",
    plans: ["free"],
  },
  {
    title: "API Access",
    description: "Integrate timestamp removal into your applications",
    icon: "Code",
    category: "api",
    plans: ["pro", "enterprise"],
  },
  {
    title: "Bulk Processing",
    description: "Process multiple files at once",
    icon: "Layers",
    category: "premium",
    plans: ["pro", "enterprise"],
  },
  {
    title: "Priority Support",
    description: "Get help when you need it with priority email support",
    icon: "Headphones",
    category: "premium",
    plans: ["pro", "enterprise"],
  },
  {
    title: "Usage Analytics",
    description: "Track your usage with detailed analytics dashboard",
    icon: "BarChart3",
    category: "premium",
    plans: ["pro", "enterprise"],
  },
  {
    title: "Team Workspaces",
    description: "Collaborate with your team in shared workspaces",
    icon: "Users",
    category: "enterprise",
    plans: ["enterprise"],
  },
  {
    title: "Custom Integrations",
    description: "Build custom integrations with our flexible API",
    icon: "Webhook",
    category: "enterprise",
    plans: ["enterprise"],
  },
  {
    title: "SLA Guarantee",
    description: "99.9% uptime SLA for mission-critical applications",
    icon: "Award",
    category: "enterprise",
    plans: ["enterprise"],
  },
  {
    title: "Dedicated Support",
    description: "Direct line to our engineering team",
    icon: "Phone",
    category: "enterprise",
    plans: ["enterprise"],
  },
];

export interface FAQ {
  question: string;
  answer: string;
  category?: "general" | "pricing" | "technical" | "api";
}

export const FAQS: FAQ[] = [
  {
    question: "What is TimeWipe?",
    answer: "TimeWipe is a free tool that removes timestamps from transcripts. Whether you have YouTube transcripts, Loom recordings, or subtitle files, TimeWipe cleans them up instantly.",
    category: "general",
  },
  {
    question: "Is TimeWipe really free?",
    answer: "Yes! The basic timestamp removal tool is 100% free with no account required. We also offer Pro and Enterprise plans with additional features like API access and bulk processing.",
    category: "general",
  },
  {
    question: "How does TimeWipe work?",
    answer: "TimeWipe uses advanced pattern matching to identify and remove timestamp formats from your text. All processing happens locally in your browser, so your data never leaves your device (for the free web tool).",
    category: "technical",
  },
  {
    question: "What timestamp formats are supported?",
    answer: "TimeWipe supports all common timestamp formats including [00:00], [00:00:00], 00:00:00, 0:00:00.000, and more. It works with YouTube, Loom, SRT, VTT, and SBV files.",
    category: "technical",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required for the free web tool. However, creating an account unlocks additional features like API access, bulk processing, and usage analytics.",
    category: "general",
  },
  {
    question: "Is my data private?",
    answer: "Absolutely! For the free web tool, all processing happens locally in your browser. Your transcripts never touch our servers. For API users, we use enterprise-grade encryption and never store your transcript content.",
    category: "general",
  },
  {
    question: "What's the difference between Free and Pro?",
    answer: "The Free plan includes basic timestamp removal via the web UI. Pro adds API access, bulk file processing, priority support, and usage analytics. It's perfect for developers and professionals.",
    category: "pricing",
  },
  {
    question: "How do I access the API?",
    answer: "API access is available on the Pro and Enterprise plans. After signing up, you can generate API keys from your dashboard and start making requests. Check our API documentation for details.",
    category: "api",
  },
  {
    question: "What are the API rate limits?",
    answer: "Pro plans include 10,000 API requests per month. Enterprise plans have unlimited requests. All plans have reasonable rate limiting to ensure fair usage.",
    category: "api",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
    category: "pricing",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
    category: "pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through Stripe. Enterprise customers can also pay via invoice.",
    category: "pricing",
  },
];

export const FOOTER_LINKS = {
  about: [
    { label: "What is TimeWipe", href: "/#about" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  tools: [
    { label: "All Tools", href: "/tools" },
    { label: "YouTube Transcripts", href: "/tools/youtube" },
    { label: "Loom Transcripts", href: "/tools/loom" },
    { label: "SRT Files", href: "/tools/srt" },
  ],
  resources: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "API Docs", href: "/api" },
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/docs" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const USE_CASES = [
  {
    title: "Content Creators",
    description: "Clean YouTube transcripts for blog posts, articles, and social media content",
    icon: "PenTool",
  },
  {
    title: "Researchers",
    description: "Process interview transcripts and remove timestamps for analysis",
    icon: "FlaskConical",
  },
  {
    title: "Students",
    description: "Clean lecture transcripts for better study materials",
    icon: "GraduationCap",
  },
  {
    title: "Developers",
    description: "Integrate timestamp removal into your apps via API",
    icon: "Code",
  },
  {
    title: "Marketers",
    description: "Repurpose video content into written format quickly",
    icon: "Megaphone",
  },
  {
    title: "Podcasters",
    description: "Convert podcast transcripts into clean show notes",
    icon: "Mic",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: "SJ",
    content: "TimeWipe saves me hours every week. I can quickly turn my YouTube transcripts into blog posts without the messy timestamps.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "MC",
    content: "The API is fantastic! We integrated it into our video platform and it works flawlessly. Great documentation too.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Researcher",
    avatar: "ER",
    content: "Perfect for cleaning interview transcripts. The privacy-first approach is exactly what I need for sensitive research data.",
    rating: 5,
  },
];
