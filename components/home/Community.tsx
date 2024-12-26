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
import Form from "../ui/form";
import Rocket from "../../public/Animation/Animation - 1729532616541.json";

// Dynamically import Lottie to ensure it only runs on the client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const CommunitySection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedBackground
    elementType="star"
      color="rgba(255, 255, 255, 0.7)"
      count={250}
      >
    <Animated>
      <section
        id="join"
        className="py-24 px-6 text-center text-white min-h-screen animate-EvervaultCard"
      >
        <div className="max-w-8xl mx-auto">
          <div className="flex ">
            <div className="w-1/2 h-60 ">
              <Lottie
                className="h-96 animate-trans-right"
                animationData={Rocket}
                loop={true}
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-4xl py-2 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Code by Night, Innovate by Light
              </h2>

              <div className="dark:text-slate-400 text-slate-600 text-xl mb-8 text-justify space-y-4">
                <p>
                  Join LNC and be part of a vibrant community where creativity
                  thrives after dark. Together, we turn caffeine into code and
                  dreams into digital reality.
                </p>

                <p>
                  Whether you&apos;re a seasoned developer or just starting, we
                  welcome you with open arms. Participate in coding sessions,
                  hackathons, and learn from each other&apos;s experiences.
                </p>

                <p>
                  Share your projects, seek feedback, and connect with
                  like-minded individuals who are just as passionate about
                  coding as you are.
                </p>
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
        <DialogContent className="border border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400">
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
