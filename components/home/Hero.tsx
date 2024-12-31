"use client";
import React from "react";
import Animated from "@/components/Animation"; // Import your Animated component
import useFluidAnimation from "@/hooks/useFluidAnimation";
import ModelView from "./Model";
// import Image from "next/image";
const Hero: React.FC = () => {
  useFluidAnimation();
  return (
    <>
      <Animated>
        <section className="relative text-center w-full h-screen">
          <canvas
            className="h-full w-full absolute z-10"
            id="liquid-canvas"
          ></canvas>
          <div className="absolute z-20">
            <ModelView />
          </div>
          {/* <div className="relative h-screen w-screen z-0">
            <Image
              src="/images/giphy.gif"
              alt="Fullscreen GIF"
              layout="fill" // Ensure the image fills the parent container
              objectFit="cover" // Ensure the image covers the screen
              unoptimized // Avoid GIF optimization
              priority // Load the image immediately
            />
          </div> */}
        </section>
      </Animated>
    </>
  );
};

export default Hero;
