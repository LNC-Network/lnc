import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Silkscreen } from "next/font/google";
import "./globals.css";
// import CoolNavbar from "@/components/CoolNavbar";
// import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LNC Community",
  description: "For The Greater Future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" /*data-theme="coffee"*/>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased dark`}
      >
        <ThemeProvider attribute="class">
          {/* <CoolNavbar /> */}
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
