"use client";

import { useLoading } from "@/app/context/LoadingContext";
import { usePathname } from "next/navigation"; // Import usePathname to get the current route

const LoadingScreen = () => {
  const { isLoading } = useLoading();
  const pathname = usePathname(); // Get the current path name

  // Determine the video source based on the route
  const videoSrc = pathname === "/" ? "/videos/logoLoad.mp4" : "/videos/mainLoad.mp4";

  return (
    isLoading && (
      <div className="loadingScreen">
        <video
          src={videoSrc} // Use the determined video source
          autoPlay
          muted
          loop
          className="loadingVideo"
        />
      </div>
    )
  );
};

export default LoadingScreen;
