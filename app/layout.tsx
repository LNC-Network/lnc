import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";

// Configure JetBrains Mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LNC - Build Something Real",
  description: "A community of developers building open source projects.",
};

/**
 * Root Layout
 * 
 * The top-level layout for the entire application.
 * Includes:
 * - Global CSS and Font definitions.
 * - Persistent UI elements (Navbar, ScrollProgress, Starfield Background).
 * - Global Loading Screen.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`
          ${jetbrainsMono.variable}
          antialiased bg-background text-foreground overflow-x-hidden font-mono
        `}
      >
        <Starfield />
        <LoadingScreen />
        <Navbar />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
