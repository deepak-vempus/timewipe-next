import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface MetadataParams {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path = "/",
  keywords = ["timestamp remover", "transcript cleaner", "remove timestamps", "clean transcripts", "youtube transcript", "loom transcript", "srt file"],
}: MetadataParams = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} - Remove Timestamps from Transcripts`;
  const fullDescription = description || SITE_CONFIG.description;
  const canonicalUrl = `${SITE_CONFIG.url}${path}`;
  const ogImage = `${SITE_CONFIG.url}/og.png`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_CONFIG.creator }],
    creator: SITE_CONFIG.creator,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: `@${SITE_CONFIG.creator}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStructuredData(type: "WebApplication" = "WebApplication") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: SITE_CONFIG.creator,
    },
  };
}

