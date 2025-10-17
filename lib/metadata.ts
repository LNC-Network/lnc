import { Metadata } from "next";

// Base URL of your application
const baseUrl = "https://lnc-community.vercel.app/";

// Site configuration
const siteConfig = {
  name: "LNC Community",
  title: "Innovation Meets Obsession",
  description:
    "LNC Community is where innovation meets action. From hackathons to open-source collaborations, we bring together passionate minds to create impactful solutions, explore new technologies, and push the boundaries of what’s possible.",
  url: baseUrl,
  ogImage: `${baseUrl}/banner.png`,
  keywords: ["LNC Community", "Hackathons", "Open Source", "community", "games", "chat"],
  author: "LNC Devs",
  creator: "Jit Debnath",
  publisher: "LNC Community",
  locale: "en_IN",
  type: "website",
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,

  // Alternate languages (if applicable)
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": `${siteConfig.url}/en-US`,
      "es-ES": `${siteConfig.url}/es-ES`,
    },
  },

  // Open Graph metadata (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
        type: "image/jpeg",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@LNC_Community",
    site: "@LNC_Community",
    images: [siteConfig.ogImage],
  },

  // Icons and theme
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/image.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // App-specific metadata
  manifest: "/manifest.json",

  // Verification for search engines and platforms
  verification: {
    google: "98320f379f11ea58",
    yandex: "your-yandex-verification-code",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export { siteConfig };
