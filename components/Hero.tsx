"use client";

import React from "react";
import Animated from "@/components/Animation";

const Hero = () => {
  return (
    <Animated>
      <section id="home" className="py-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Late Night Coders 🌌
        </h1>
        <p className="text-xl mb-8">Where Code Comes Alive in the Dark 🥷🏻</p>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Get Started
          </span>
        </button>
      </section>
    </Animated>
  );
};

export default Hero;
