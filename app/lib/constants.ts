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
}

export const NAVIGATION: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Remove timestamps from any transcript",
  },
  // Future navigation items - uncomment when pages are created
  // {
  //   label: "YouTube",
  //   href: "/youtube",
  //   description: "Clean YouTube transcripts",
  // },
  // {
  //   label: "Loom",
  //   href: "/loom",
  //   description: "Clean Loom transcripts",
  // },
  // {
  //   label: "SRT File",
  //   href: "/srt",
  //   description: "Clean SRT file transcripts",
  // },
];

export const TRANSCRIPT_TYPES = {
  GENERAL: "general",
  YOUTUBE: "youtube",
  LOOM: "loom",
  SRT: "srt",
} as const;

export type TranscriptType = typeof TRANSCRIPT_TYPES[keyof typeof TRANSCRIPT_TYPES];

