import { metadata } from "../lib/metadata";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "../components/ui/SmoothScroll";

// Define viewport here
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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

export { metadata };
