"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Animated from "@/components/Animation";

const CommunitySection = () => {
  return (
    <Animated>
      <section className="py-24 px-6 text-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-200">
            Join Our Nocturnal Community 🌙
          </h2>
          <p className="text-xl mb-10 text-gray-200">
            Embrace the night. Code with might. Connect with fellow night owls.
          </p>
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-semibold">
            <span className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 opacity-70 transition-all duration-400 group-hover:opacity-100 group-hover:blur-sm"></span>
            <span className="relative rounded-full bg-black bg-opacity-80 px-6 py-3 transition-all duration-400 group-hover:bg-opacity-90">
              <span className="relative text-white text-lg">Get Started Now</span>
            </span>
          </button>
        </div>
        <div className="mt-16 flex justify-center space-x-6">
          <IconButton icon="github" />
          <IconButton icon="discord" />
          <IconButton icon="twitter" />
        </div>
      </section>
    </Animated>
  );
};

const IconButton = ({ icon }: { icon: string }) => (
  <button className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
    <img src={`/icons/${icon}.svg`} alt={icon} className="w-6 h-6" />
  </button>
);

export default CommunitySection;
