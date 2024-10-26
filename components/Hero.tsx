"use client";

import React from "react";
import Animated from "@/components/Animation"; // Import your Animated component
import VideoEffect from "./VideoEffect"; // Import your VideoEffect component
import homeBg from "../public/videos/testBg.mp4";

const Hero: React.FC = () => {
  return (
    <>
      <Animated>
        <section id="home" className="relative text-center w-full h-screen">
          <video
            src={homeBg}
            autoPlay
            loop
            muted
            className=" w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 text-white flex flex-col items-center justify-center">
            <h1 className="text-7xl mb-6 silkscreen">
              Welcome to Late Night Coders 🌌
            </h1>
            <p className="text-2xl mb-8 silkscreen">
              Where Code Comes Alive in the Dark 🥷🏻
            </p>
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-lg font-medium text-white backdrop-blur-3xl">
                Get Started
              </span>
            </button>
          </div>
        </section>
      </Animated>
      <VideoEffect />
    </>
  );
};

export default Hero;
