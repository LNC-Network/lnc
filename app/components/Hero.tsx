"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      // Initial clean state
      gsap.set(".hero-element", { opacity: 0, y: 30 });

      // The Reveal Animation
      tl.to(textRef.current, {
        scale: 60,
        duration: 3,
        transformOrigin: "50% 50%",
        ease: "power3.inOut",
      })
        .to(
          maskRef.current,
          {
            opacity: 0, // Fade out concurrently with the end of the zoom
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              if (maskRef.current) maskRef.current.style.display = "none";
            },
          },
          "<60%" // Start this at 60% of the previous tween (Zoom)
        )
        // Bring in the actual text content early
        .call(() => {
          window.dispatchEvent(new CustomEvent("reveal-dock"));
        }, [], "<65%")
        .to(
          ".hero-element",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
          },
          "<70%" // Start overlapping shortly after the fade begins
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden font-pixel"
    >
      {/* The Magic Mask Layer */}
      <svg
        ref={maskRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="hero-mask">
            <rect width="100%" height="100%" fill="white" />

            {/* Wrap text inside group */}
            <g ref={textRef}>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="font-pixel text-[15vw] font-bold"
              >
                LNC
              </text>
            </g>
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="#110023ff"
          mask="url(#hero-mask)"
        />
      </svg>



      {/* Foreground Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <h1 className="hero-element font-pixel text-white text-4xl md:text-6xl leading-snug">
          BUILD SOMETHING REAL
          <br />
          WITH LNC
        </h1>

        <p className="hero-element text-white/90 max-w-2xl mt-6 text-sm md:text-base tracking-wide">
          WE ARE A COMMUNITY OF DEVELOPERS, DESIGNERS, AND MAKERS WHO BELIEVE IN
          THE POWER OF OPEN SOURCE. JOIN US TO COLLABORATE ON PROJECTS THAT
          MATTER AND GROW ALONGSIDE PEOPLE WHO SHARE YOUR PASSION.
        </p>

        <div className="hero-element mt-12 flex flex-col md:flex-row gap-6">
          <button className="px-8 py-4 bg-purple-500 text-white font-bold uppercase hover:bg-purple-400 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            Start Contributing
          </button>
          <button className="px-8 py-4 bg-transparent text-white border-2 border-white font-bold uppercase hover:bg-white hover:text-black transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            Join Discord
          </button>
        </div>
      </div>
    </section>
  );
}
