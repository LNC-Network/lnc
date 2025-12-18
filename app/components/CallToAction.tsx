"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const container = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      tl.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          imageRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-transparent py-20 px-6 md:px-12 w-full text-center font-pixel"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={textRef}>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 tracking-widest text-white">
            START BUILDING WITH US
          </h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#a1a1aa] mb-12">
            THE BEST TIME TO JOIN WAS YESTERDAY. THE SECOND BEST TIME IS NOW.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-16">
            <button className="px-8 py-3 bg-purple-500 text-white font-bold text-xs md:text-sm uppercase tracking-widest border-2 border-purple-500 hover:bg-purple-400 transition shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              JOIN
            </button>
            <button className="px-8 py-3 bg-transparent text-white font-bold text-xs md:text-sm uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black transition shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              EXPLORE
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          ref={imageRef}
          className="w-full h-[400px] md:h-[600px] relative border-2 border-white"
        >
          <Image
            src="/cta_builder.png"
            alt="Start Building"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
