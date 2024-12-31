"use client";

import { useLoader } from "@/hooks/useLoader";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoadingHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useLoader();

  return <>{isLoading ? <LoadingScreen /> : children}</>;
}
