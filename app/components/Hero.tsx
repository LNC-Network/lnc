"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero Component
 * 
 * The main entry point of the homepage.
 * Features a split layout with a strong value proposition text on the left
 * and a visual element (currently a logo/image) on the right.
 * 
 * Animations:
 * - Text elements stagger in from bottom.
 * - Right visual scales and fades in.
 */
export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Animate Hero Title Characters (Staggered)
      tl.from(".hero-char", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
      })
        // 2. Animate Description & Buttons (Block stagger)
        .from(
          ".hero-text-content", // Renamed class from hero-text to distinguish
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.5"
        )
        // 3. Animate Visual
        .from(
          ".hero-visual",
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.5"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen flex items-center py-20 px-6 lg:p-20"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Column: Hero Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] overflow-hidden">
            {/* "Build Something" */}
            <span className="inline-block">
              {"Build Something".split("").map((char, i) => (
                <span key={`l1-${i}`} className="hero-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <br />
            {/* "Real" (Gradient) */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 inline-block">
              {"Real".split("").map((char, i) => (
                <span key={`l2-${i}`} className="hero-char inline-block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                  {char}
                </span>
              ))}
            </span>{" "}
            {/* "with LNC" */}
            <span className="inline-block">
              {"with LNC".split("").map((char, i) => (
                <span key={`l3-${i}`} className="hero-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-text-content text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Join a community of developers, designers, and makers collaborating
            on open source projects. Ship code, meaningful products, and grow
            alongside passionate builders.
          </p>

          <div className="hero-text-content flex flex-col sm:flex-row gap-4 w-full items-center justify-center lg:justify-start">
            {/* Primary Call to Action */}
            <Button
              asChild
              className="w-full sm:w-[280px] px-8 py-6 bg-fuchsia-400 text-black font-bold text-sm tracking-wide hover:shadow-[0_0_10px_#f0abfc] hover:bg-fuchsia-400 transition-all rounded-full flex items-center justify-center gap-2 group"
            >
              <Link href="https://chat.whatsapp.com/KtylUkytoAYDgbzAS2EQfR" target="_blank">
                Join WhatsApp Community
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </Button>

            {/* Secondary Link */}
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-[280px] px-8 py-6 bg-transparent border border-white/20 text-white font-medium text-sm tracking-wide transition-all rounded-full flex items-center justify-center"
            >
              <Link href="https://linktr.ee/lnc_community" target="_blank">
                All Links
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column: Visual / Logo (Hidden on mobile) */}
        <div className="hidden lg:flex justify-end hero-visual">
          <Image
            src="/assets/logo/logo.png"
            alt="Hero Image"
            width={600}
            height={400}
            className="w-full max-w-max"
            priority /* Prioritize loading LCP image */
          />
        </div>
      </div>
    </section>
  );
}
