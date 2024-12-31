"use client";
import { ThemeProvider } from "next-themes";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import Head from "next/head";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`$${silkscreen.variable} antialiased dark`}>
        <ThemeProvider attribute="class">
          <LoadingProvider>
            <LoadingHandler>{children}</LoadingHandler>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Handle route-based and initial loading
function LoadingHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Dynamic metadata
  const metadata = getMetadataForPath(pathname);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isInitialLoad) {
      setIsLoading(true);
      timeout = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 3000);
    } else {
      setIsLoading(true);
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [pathname, isInitialLoad, setIsLoading]);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {isLoading && <LoadingScreen />}
      {!isLoading && children}
    </>
  );
}

// Helper to get metadata for each path
function getMetadataForPath(path: string) {
  const metadataMap: Record<string, { title: string; description: string }> = {
    "/": {
      title: "LNC Community",
      description: "For The Greater Future",
    },
    "/events": {
      title: "Events",
      description: "Participate in upcoming events",
    },
  };

  return (
    metadataMap[path] || {
      title: "LNC Community",
      description: "For The Greater Future",
    }
  );
}
