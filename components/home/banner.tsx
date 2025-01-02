"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { throttle } from "lodash";

interface BannerProps {
  images?: string[];
  autoScrollInterval?: number;
  dimensions?: { width: number; height: number };
  modelOffset?: { x: number; y: number; z: number };
}

const Banner = ({
  images = ["/images/1.jpg", "/images/2.jpg"],
  autoScrollInterval = 3000,
  dimensions = { width: 900, height: 550 },
  modelOffset = { x: 0, y: -200, z: -2000 },
}: BannerProps) => {
  const router = useRouter();
  const [scrollPos, setScrollPos] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout>();
  // const lastScrollPos = useRef(0);

  const MODEL_SECTION_HEIGHT = viewportHeight * 1.5;
  const TOTAL_HEIGHT = (MODEL_SECTION_HEIGHT + viewportHeight) / 2;

  const TRANSITION_START = MODEL_SECTION_HEIGHT * 0.2;
  const TRANSITION_END = MODEL_SECTION_HEIGHT * 0.8;

  useEffect(() => {
    const updateViewport = () => setViewportHeight(window.innerHeight);
    updateViewport();
    const handleResize = throttle(updateViewport, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPos(window.scrollY);
    }, 16);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, autoScrollInterval);
  }, [images.length, autoScrollInterval]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [startAutoScroll]);

  const progress = Math.max(
    0,
    Math.min(
      1,
      (scrollPos - TRANSITION_START) / (TRANSITION_END - TRANSITION_START)
    )
  );

  const scale = 0.03 + (1 - 0.03) * progress;
  const translateZ = modelOffset.z * (1 - progress);
  const opacity = Math.pow(progress, 1.2); // Smooth opacity transition as the user scrolls

  const handleClick = useCallback(() => {
    if (progress > 0.5) router.push("/events");
  }, [router, progress]);

  return (
    <>
      <div
        style={{ height: `${TOTAL_HEIGHT}px` }}
        aria-hidden="true"
        className="relative"
      />
      <section
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
        style={{
          perspective: "2500px",
          transformStyle: "preserve-3d",
          opacity: progress < 1 ? opacity : 0, // Hide only when fully out of view
          transition: "opacity 0.5s ease-out,visibility 0.5s ease-out", // Smooth transition for opacity
        }}
      >
        <div
          onClick={handleClick}
          onMouseEnter={() => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
          }}
          onMouseLeave={startAutoScroll}
          className={`relative overflow-hidden rounded-lg ${
            progress > 0.5 ? "cursor-pointer shadow-lg" : ""
          }`}
          style={{
            width: `${dimensions.width * scale}px`,
            height: `${dimensions.height * scale}px`,
            transform: `translate3d(0, 0, ${translateZ}px)`,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          }}
        >
          <div
            className="w-full h-full flex transition-transform duration-700"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            {images.map((src) => (
              <div
                key={src}
                className="flex-shrink-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
