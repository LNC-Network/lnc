"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "../ui/form";
import communityData from "@/public/data/community.json";
import Animated from "../Animation";
import Image from "next/image";
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="relative w-96 h-96">
                <Image
                  src="/images/rocket.gif"
                  alt="Rocket animation"
                  fill
                  className="object-contain animate-trans-right"
                  unoptimized
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl py-2 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                {title}
              </h2>
              <div className="dark:text-slate-400 text-slate-600 text-xl mb-8 text-justify space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-bold text-md"
                style={{ wordSpacing: "0.6em" }}
                //style={{ wordSpacing: "0.6em" }}
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
            <DialogTitle
              style={{ wordSpacing: "0.5em" }}
              className="text-2xl font-bold text-blue-400 text-center"
            >
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
