"use client";
import React from "react";
import Animated from "@/components/Animation"; // Import your Animated component
import useFluidAnimation from "@/hooks/useFluidAnimation";
import ModelView from "./Model";
import Image from "next/image";
const Hero: React.FC = () => {
  useFluidAnimation();
  return (
    <>
      <Animated>
        <section className="relative text-center w-full h-screen">
          <canvas
            className="h-[200vh] w-full absolute z-10"
            id="liquid-canvas"
          ></canvas>
          <div className="absolute z-30">
            <ModelView />
          </div>
          <div className="relative h-screen w-screen z-0">
            <Image
              src="/images/bg.gif"
              alt="Fullscreen GIF"
              layout="fill" // Ensure the image fills the parent container
              objectFit="cover" // Ensure the image covers the screen
              unoptimized
              priority // Load the image immediately
            />
          </div>
          <div className="relative h-screen w-screen z-0">
            <Image
              src="/images/bg.gif"
              alt="Fullscreen GIF"
              layout="fill" // Ensure the image fills the parent container
              objectFit="cover" // Ensure the image covers the screen
              priority // Load the image immediately
              unoptimized
              style={{
                transform: "scaleY(-1)", // Flip the image vertically
              }}
            />
          </div>
        </section>
      </Animated>
    </>
  );
};

export default Hero;
