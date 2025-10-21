"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Carousel() {
  const images = [
    "/banner.png",
    "/banner.png",
    "/banner.png",
    "/banner.png",
    "/banner.png",
    "/banner.png",
    "/banner.png",
  ];

  const [index, setIndex] = useState(0);

  // base layout positions and rotations
  const positions = [
    { x: -510, z: 4, size: 200, rotateY: 45 },
    { x: -370, z: 5, size: 300, rotateY: 35 },
    { x: -200, z: 6, size: 400, rotateY: 25 },
    { x: 0, z: 7, size: 500, rotateY: 0 },
    { x: 200, z: 6, size: 400, rotateY: -25 },
    { x: 370, z: 5, size: 300, rotateY: -35 },
    { x: 510, z: 4, size: 200, rotateY: -45 },
  ];

  // Fixed: Corrected the direction logic
  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Fixed: Better image reordering logic
  const getImagePosition = (i: number) => {
    const positionIndex = (i - index + images.length) % images.length;
    return positions[positionIndex];
  };

  return (
    <div
      className="relative h-[70vh] flex items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      {/* Left Button - Fixed: Now correctly goes to previous image */}
      <button
        onClick={goPrev}
        className="absolute left-6 z-20 shadow-[0_0_20px_rgb(139,92,246)] bg-white/10 hover:bg-purple-700/95  rounded-full p-3 transition-all"
      >
        <ChevronLeft className="text-white w-8 h-8" />
      </button>

      {/* Carousel Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "800px",
          height: "600px",
          perspective: "1200px",
        }}
      >
        {images.map((src, i) => {
          const pos = getImagePosition(i);
          const isCenter = (i - index + images.length) % images.length === 3;

          return (
            <motion.div
              key={`${src}-${i}-${index}`}
              animate={{
                x: pos.x,
                rotateY: pos.rotateY,
                opacity: 1,
              }}
              initial={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                zIndex: pos.z,
                position: "absolute",
                transformStyle: "preserve-3d",
                filter: isCenter ? "brightness(1)" : "brightness(0.6)",
              }}
            >
              <motion.div
                transition={{ type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 50px rgb(67,25,100)",
                }}
              >
                <Image
                  src={src}
                  alt={`carousel-${i}`}
                  width={pos.size}
                  height={pos.size}
                  className="rounded-2xl object-cover shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow duration-300"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Right Button - Fixed: Now correctly goes to next image */}
      <button
        onClick={goNext}
        className="absolute right-6 z-20 shadow-[0_0_20px_rgb(139,92,246)] bg-white/10 hover:bg-purple-700/95  rounded-full p-3 transition-all"
      >
        <ChevronRight className="text-white w-8 h-8" />
      </button>

      {/* subtle floor reflection */}
      <div className="absolute bottom-0 w-full h-64 pointer-events-none"></div>
    </div>
  );
}
