"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stats Component
 * 
 * Displays key metrics with a "scramble" text effect.
 * As the user scrolls into view, numbers count up while characters randomly flip,
 * creating a cyberpunk decoding aesthetic.
 */
import { STATS } from "@/app/data/stats";

// ... imports remain the same

export default function Stats() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate Header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Animate Stats Items
      if (statsRef.current) {
        const items = statsRef.current.children;
        gsap.from(items, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-transparent py-20 px-6 md:px-12 w-full font-pixel border-t-2 border-dashed border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Grid */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-white leading-tight max-w-md">
            Numbers That Tell Our Story
          </h2>
          <p className="text-sm md:text-base font-mono uppercase text-[#71717a] leading-relaxed max-w-lg">
            LNC has grown because people show up and do the work. These numbers
            reflect what happens when a community commits to something real.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 border-l border-white/10"
        >
          {STATS.map((stat, index) => (
            <div
              key={index}
              className={`pl-8 border-l border-white/10 md:border-l-0 ${index < STATS.length - 1 ? "md:border-r" : ""
                }`}
            >
              <h3 className="text-4xl md:text-6xl font-black text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717a]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
