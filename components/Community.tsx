"use client";

import { useState } from "react";
import Animated from "@/components/Animation";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dynamically import Lottie to ensure it only runs on the client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const JoinUs = dynamic(() => import("./ui/join-us"), { ssr: false });

import Rocket from "../public/Animation/Animation - 1729532616541.json";

const CommunitySection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Animated>
      <section
        id="join"
        className="py-24 px-6 text-center bg-white dark:bg-slate-800 text-white min-h-screen animate-EvervaultCard"
      >
        <div className="max-w-8xl mx-auto">
          <div className="flex">
            <div className="w-1/2 h-60">
              <Lottie
                className="h-96 animate-trans-right"
                animationData={Rocket}
                loop={true}
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-6xl py-3 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Code by Night, Innovate by Light
              </h2>
              <p className="text-xl mb-10 text-gray-300">
                Join the L N C and be part of a vibrant community where
                creativity thrives after dark. Together, we turn caffeine into
                code and dreams into digital reality.
              </p>
              <p className="text-lg mb-10 text-gray-400">
                Whether you&apos;re a seasoned developer or just starting, we
                welcome you with open arms. Participate in coding sessions,
                hackathons, and learn from each other&apos;s experiences.
              </p>
              <p className="text-lg mb-10 text-gray-400">
                Share your projects, seek feedback, and connect with like-minded
                individuals who are just as passionate about coding as you are.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-bold text-2xl"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-70 transition-all duration-400 group-hover:opacity-100 group-hover:blur-sm"></span>
            <span className="relative rounded-full bg-gray-900 px-10 py-6 transition-all duration-400 group-hover:bg-opacity-90">
              Join LNC
            </span>
          </button>
        </div>
      </section>
      <div className="h-64 bg-gray-900"></div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-900 border border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400">
              Become a Night Coder
            </DialogTitle>
          </DialogHeader>
          <JoinUs/>
        </DialogContent>
      </Dialog>
    </Animated>
  );
};

export default CommunitySection;
