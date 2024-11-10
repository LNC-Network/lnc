"use client";
import React, { useRef, useEffect } from "react";
import stars from "../public/videos/stars.mp4"
import Features from "./ui/Features";
const ScrollVideo = () => {
  const video = useRef<HTMLVideoElement>(null);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      // Pass an arrow function here
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollPosition / maxScroll;

      if (video.current && video.current.duration) {
        video.current.currentTime =
          video.current.duration * scrollPercent;
      }
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <video
        ref={video}
        src={stars}
        muted
        playsInline
        preload="auto"
        className="sticky top-0 left-0 w-full h-full object-cover z-0"
      />
      <Features className="reative z-50" />
    </div>
  );
};

export default ScrollVideo;
