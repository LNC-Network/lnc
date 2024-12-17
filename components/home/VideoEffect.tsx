"use client";

import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import Animated from "@/components/Animation";
// import { useInView } from "react-intersection-observer";
import testBg from "../../public/videos/testBg.mp4";

const VideoEffect: React.FC = () => {
  const [scrollPos, setScrollPos] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const scaleFactor = Math.max(1, 1 + scrollPos / 1000);
  const translateX = Math.min(0, -70 + scrollPos / 10);
  const videoHeight = Math.max(200, 400 + scrollPos / 3); // Adjust height based on scroll

  return (
    <Animated>
      <section className="py-16 px-6 min-h-screen flex flex-col items-center justify-center">
        {/* <h2 className="text-3xl font-bold text-center mb-12">HERO 💻</h2> */}
        <div className="relative">
          <video
            src={testBg}
            className="rounded-xl max-h-[620px] object-contain border-4 border-slate-400"
            style={{
              height: videoHeight,
              width: "100%",
              // border: "none",
              transform: `translateX(${translateX}%)`,
              // transform: `scale(${scaleFactor})`,
            }}
            autoPlay
            loop
            muted
          ></video>
          {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Button variant="outline" className="text-white">
              PLAY NOW
            </Button>
          </div> */}
        </div>
      </section>
    </Animated>
  );
};

export default VideoEffect;
