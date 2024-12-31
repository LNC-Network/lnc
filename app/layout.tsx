"use client";
import { ThemeProvider } from "next-themes";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoadingProvider, useLoading } from "./context/LoadingContext";

// import CoolNavbar from "@/components/CoolNavbar";
// import Footer from "@/components/Footer";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400", "700"],
});

// export const metadata: Metadata = {
//   title: "LNC Community",
//   description: "For The Greater Future",
// };

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
        // className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased dark`}
        className={`$${silkscreen.variable} antialiased dark`}
      >
        <ThemeProvider attribute="class">
          {/* <CoolNavbar /> */}
          <LoadingProvider>
            <LoadingHandler>{children}</LoadingHandler>
          </LoadingProvider>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

// Handle route-based and initial loading
function LoadingHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track if it's the first load

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isInitialLoad) {
      // Show loading only for the initial load
      setIsLoading(true);
      timeout = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false); // Mark initial load as complete
      }, 3000); // Adjust the duration as needed
    } else {
      // Handle loading for route transitions
      setIsLoading(true);
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    return () => clearTimeout(timeout); // Clean up timeout on unmount or re-render
  }, [pathname, isInitialLoad, setIsLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}{" "}
      {/* Show loading screen only when loading */}
      {!isLoading && children}{" "}
      {/* Render children only after loading is done */}
    </>
  );
}
