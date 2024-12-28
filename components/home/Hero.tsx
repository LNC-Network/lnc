"use client";
import React from "react";
import Animated from "@/components/Animation"; // Import your Animated component
import useFluidAnimation from "@/hooks/useFluidAnimation";
const Hero: React.FC = () => {
  useFluidAnimation();
  return (
    <>
      <Animated>
        <section className="relative text-center w-full h-screen">
          <canvas
            className="h-full w-full absolute"
            id="liquid-canvas"
          ></canvas>
        </section>
      </Animated>
    </>
  );
};

export default Hero;
