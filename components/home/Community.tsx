"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "../ui/form";
// import Rocket from "../../public/Animation/Animation - 1729532616541.json";
import communityData from "@/public/data/community.json";
import Animated from "../Animation";
const { title, paragraphs } = communityData;

const CommunitySection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Animated>
      <section
        id="join"
        className="py-24 px-6 text-center text-white min-h-screen animate-EvervaultCard"
      >
        <div className="max-w-8xl mx-auto">
          <div className="flex ">
            <div className="w-1/2 h-60 ">
              {/* <Lottie
                className="h-96 animate-trans-right"
                animationData={Rocket}
                loop={true}
              /> */}
            </div>
            <div className="w-1/2">
              <h2 className="text-5xl py-2 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                {title}
                {/* title from data/community.json */}
              </h2>

              <div className="dark:text-slate-400 text-slate-600 text-2xl mb-8 text-justify space-y-4">
                {/* paragraph from from data/community.json */}
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-bold text-md"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-70 transition-all duration-400 group-hover:opacity-100 group-hover:blur-sm"></span>
                <span className="relative rounded-full bg-gray-900 px-8 py-4 transition-all duration-400 group-hover:bg-opacity-90">
                  Join LNC
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-slate-900 border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400 text-center">
              Become a Night Coder
            </DialogTitle>
          </DialogHeader>
          <Form />
        </DialogContent>
      </Dialog>
    </Animated>
  );
};

export default CommunitySection;
