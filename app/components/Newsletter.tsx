"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animationData from "../data/newsletter_anim.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const container = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      tl.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        rightColRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-transparent py-20 px-6 md:px-12 w-full font-pixel border-t-2 border-dashed border-white/10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div ref={leftColRef}>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 tracking-widest text-white">
            STAY IN THE LOOP
          </h2>
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-white/80 mb-8 leading-loose max-w-md">
            GET UPDATES ON NEW PROJECTS, EVENTS, AND OPPORTUNITIES TO CONTRIBUTE.
          </p>

          <form className="flex flex-col md:flex-row gap-4 max-w-md mb-6">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="flex-1 bg-white/5 border border-white/20 p-4 text-sm font-mono placeholder:text-white/30 text-white outline-none focus:border-white/50"
            />
            <button className="px-8 py-4 bg-purple-500 text-white font-bold text-xs uppercase tracking-widest border-2 border-purple-500 hover:bg-purple-400 transition shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              SUBSCRIBE
            </button>
          </form>

          <p className="text-[10px] uppercase font-bold text-[#71717a] tracking-wider">
            WE RESPECT YOUR INBOX. UNSUBSCRIBE ANYTIME, NO QUESTIONS ASKED.
          </p>
        </div>

        {/* Right Column - Animation */}
        <div
          ref={rightColRef}
          className="relative w-full h-[400px] md:h-[500px] border-2 border-white flex items-center justify-center overflow-hidden bg-black/20"
        >
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full max-w-[80%] max-h-[80%]"
          />
        </div>
      </div>
    </section>
  );
}
