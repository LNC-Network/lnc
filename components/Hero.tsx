"use client";

import React, { useEffect } from "react";
import Animated from "@/components/Animation"; // Import your Animated component
const Hero: React.FC = () => {
  useEffect(() => {
    // Function to load the canvas animation script
    const loadCanvasAnimation = () => {
      const existingScript = document.querySelector(
        'script[src="lib/fluidBackground.js"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "lib/fluidBackground.js"; // Path to your animation script
        script.async = true; // Load the script asynchronously
        script.onload = () => {
          console.log("Fluid background script loaded successfully.");
        };
        script.onerror = () => {
          console.error("Failed to load the animation script");
        };
        document.body.appendChild(script); // Append the script to the body
      } else {
        console.log("Fluid background script is already loaded.");
      }
    };

    loadCanvasAnimation(); // Load the script on component mount

    return () => {
      // Cleanup function to remove the script if needed
      const existingScript = document.querySelector(
        'script[src="/lib/fluidBackground.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  return (
    <>
      <Animated>
        <section className="relative text-center w-full h-screen">
          <canvas
            className="h-full w-full absolute"
            id="liquid-canvas"
          ></canvas>
          <div className="absolute pointer-events-none inset-0 text-white flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-7xl font-bold mb-6 silkscreen">
              Welcome to Late Night Coders 🌌
            </h1>
            <p className="text-lg md:text-2xl mb-8 silkscreen">
              Where Code Comes Alive in the Dark 🥷🏻
            </p>
            <button className="relative pointer-events-auto inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-lg font-medium text-white backdrop-blur-3xl">
                Get Started
              </span>
            </button>
          </div>
        </section>
      </Animated>
    </>
  );
};

export default Hero;
