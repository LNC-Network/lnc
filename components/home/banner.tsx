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
  // Adjusted offset for higher back position
  modelOffset = { x: 0, y: -200, z: -2200 },
}: BannerProps) => {
  const router = useRouter();
  const [scrollPos, setScrollPos] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout>();
  const lastScrollPos = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  // Adjusted section heights for better control
  // const SECTION_HEIGHT = viewportHeight;
  const MODEL_SECTION_HEIGHT = viewportHeight * 1.5; // Reduced from 2 to 1.5
  const BANNER_SECTION_HEIGHT = viewportHeight;
  const TOTAL_HEIGHT = MODEL_SECTION_HEIGHT + BANNER_SECTION_HEIGHT;

  // Adjusted transition points
  const TRANSITION_START = MODEL_SECTION_HEIGHT * 0.2; // Start transition later
  const TRANSITION_END = MODEL_SECTION_HEIGHT * 0.8; // End transition earlier

  useEffect(() => {
    const updateViewport = () => {
      setViewportHeight(window.innerHeight);
    };

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
      const currentScroll = window.scrollY;
      scrollDirection.current =
        currentScroll > lastScrollPos.current ? "down" : "up";
      lastScrollPos.current = currentScroll;
      setScrollPos(currentScroll);
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

  // Enhanced easing functions for smoother transitions
  const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const easeInOutQuart = (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const rawProgress = Math.max(
    0,
    Math.min(
      1,
      (scrollPos - TRANSITION_START) / (TRANSITION_END - TRANSITION_START)
    )
  );

  const progress = easeInOutQuart(rawProgress);

  // Section visibility states
  const isInModelSection = scrollPos < MODEL_SECTION_HEIGHT;
  const isInBannerSection =
    scrollPos >= MODEL_SECTION_HEIGHT && scrollPos < TOTAL_HEIGHT;
  const isPastBannerSection = scrollPos >= TOTAL_HEIGHT;

  // Scale and transform calculations
  const INITIAL_SCALE = 0.03; // Smaller initial scale
  const FINAL_SCALE = 1;
  const scale = INITIAL_SCALE + (FINAL_SCALE - INITIAL_SCALE) * progress;

  // Enhanced 3D transform calculations
  const translateX = modelOffset.x * (1 - progress);
  // const translateY =
  //   modelOffset.y + (viewportHeight * 0.2 - modelOffset.y) * progress;
  const translateZ = modelOffset.z * (1 - easeOutExpo(progress));
  const rotateX = 15 * (1 - progress); // Add some rotation for enhanced 3D effect

  const handleClick = useCallback(() => {
    if (progress > 0.5 && !isPastBannerSection) {
      router.push("/events");
    }
  }, [router, progress, isPastBannerSection]);

  return (
    <>
      {/* Fixed height spacer for scrolling */}
      <div
        style={{ height: `${TOTAL_HEIGHT}px` }}
        className="w-full relative"
        aria-hidden="true"
      />

      <section
        ref={bannerRef}
        className={`
          ${isInBannerSection ? "fixed top-0" : "absolute"}
          left-0 w-full h-screen flex items-start justify-center pt-16
          transition-[opacity,transform] duration-300 ease-out
        `}
        style={{
          top: isInModelSection
            ? `${scrollPos}px`
            : isPastBannerSection
            ? `${TOTAL_HEIGHT}px`
            : "0",
          perspective: "2500px",
          transformStyle: "preserve-3d",
          pointerEvents: progress > 0.5 ? "auto" : "none",
          zIndex: progress > 0.25 ? 10 : -1,
          visibility: isPastBannerSection ? "hidden" : "visible",
        }}
      >
        <div
          onClick={handleClick}
          onMouseEnter={() => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
          }}
          onMouseLeave={startAutoScroll}
          className={`
            relative overflow-hidden transition-all duration-150
            ${
              progress > 0.5
                ? "cursor-pointer shadow-2xl border-2 border-blue-900 rounded-lg"
                : ""
            }
            ${progress > 0.5 ? "hover:shadow-3xl hover:border-blue-700" : ""}
          `}
          style={{
            width: `${dimensions.width * scale}px`,
            height: `${dimensions.height * scale}px`,
            transform: `translate3d(${translateX}px, ${0}px, ${translateZ}px)
                       rotateX(${rotateX}deg)
                       ${
                         scrollDirection.current === "up" ? "rotateX(2deg)" : ""
                       }`,
            transformStyle: "preserve-3d",
            opacity: Math.pow(progress, 1.2),
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full flex">
              {images.map((src, index) => (
                <div
                  key={src}
                  className="flex-shrink-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                  aria-hidden={currentImageIndex !== index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
