import { ThemeProvider } from "next-themes";
import { LoadingProvider } from "./context/LoadingContext";
import "./globals.css";
import LoadingHandler from "@/components/ui/loadingHandeller";

export const metadata = {
  title: "LNC Community",
  description: "For The Greater Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased dark`}>
        <ThemeProvider attribute="class">
          <LoadingProvider>
            <LoadingHandler>{children}</LoadingHandler>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
