import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Starfield from "./components/Starfield";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: "LNC Community",
  description: "A community of developers building open source projects.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-x-hidden font-mono`}
      >
        <Starfield />
        <LoadingScreen />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
