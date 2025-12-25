"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      })
        .from(".hero-visual", {
          opacity: 0,
          scale: 0.95,
          duration: 1.5,
          ease: "power3.out"
        }, "-=0.5");
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen flex items-center pt-20"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col items-start text-left z-10">

          <h1 className="hero-text text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Build Something <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
              Real
            </span>
            {" "}with LNC
          </h1>

          <p className="hero-text text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Join a community of developers, designers, and makers collaborating on open source projects.
            Ship code, meaningful products, and grow alongside passionate builders.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="https://chat.whatsapp.com/Fdv9D3iIgyQ9caeM20iH5l"
              className="px-8 py-4 bg-fuchsia-300 text-black font-bold text-sm tracking-wide hover:bg-white/90 transition-all rounded-full flex items-center justify-center gap-2 group"
            >
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

            <Link
              href="https://discord.gg/lnc"
              target="_blank"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium text-sm tracking-wide hover:bg-white/5 transition-all rounded-full flex items-center justify-center"
            >
              Join Discord
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
