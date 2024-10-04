"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Animated from "@/components/Animation";

const Hero = () => {
  return (
    <Animated>
      <section className="py-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Late Night Coders 🌌
        </h1>
        <p className="text-xl mb-8">Where Code Comes Alive in the Dark 🥷🏻</p>
        <Button size="lg" className="animate-pulse">
          Get Started
        </Button>
      </section>
    </Animated>
  );
};

export default Hero;
