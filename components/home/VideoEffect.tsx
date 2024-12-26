"use client";
import React, { useEffect } from "react";
import Animated from "@/components/Animation";
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

  const translateX = Math.min(0, -70 + scrollPos / 10);
  const videoHeight = Math.max(200, 400 + scrollPos / 3);

  return (
    <Animated>
      <section className="py-16 px-6 min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <video
            src={testBg}
            className="rounded-lg max-h-[620px] object-contain border border-slate-400"
            style={{
              height: videoHeight,
              width: "100%",
              transform: `translateX(${translateX}%)`,
            }}
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>
    </Animated>
  );
};

export default VideoEffect;
