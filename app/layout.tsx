import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "../components/ui/SmoothScroll";
import { Metadata } from "next";

// Define viewport here
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "When Innovation Meets Obsession",
    template: "%s",
  },
  description:
    "LNC Community is where innovation meets action. From hackathons to open-source collaborations, we bring together passionate minds to create impactful solutions, explore new technologies, and push the boundaries of what’s possible.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark antialiased">
        <Analytics />
        <SpeedInsights />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
