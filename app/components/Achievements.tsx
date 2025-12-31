"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACHIEVEMENTS } from "@/app/data/achievements";

gsap.registerPlugin(ScrollTrigger);

/**
 * Achievements Component
 *
 * Displays a grid of stats/achievements with a scroll-triggered animation.
 * The header and cards animate in with specific staggers and eases.
 */
export default function Achievements() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate Header: Fade in and move up
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
        gsap.to(headerRef.current, {
          opacity: 1,
        });
      }

      // Animate Cards: Staggered entry
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%", // Trigger earlier than header
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0, // Should start from 0 opacity
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
        gsap.to(cards, {
          opacity: 1,
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
        {/* Header Section */}
        <div ref={headerRef} className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-white leading-tight mb-6">
            BUILT TO WIN
          </h2>
          <p className="text-sm md:text-base font-mono uppercase text-[#71717a] leading-relaxed max-w-2xl">
            We don&apos;t just participate; we dominate. Our track record in the
            hackathon arena speaks for itself.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.title}
              className="group p-8 border border-white/10 bg-card hover:secondary transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Floating background icon */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                {item.icon}
              </div>

              {/* Main Icon */}
              <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {item.title}
              </h3>

              <p className="text-sm text-[#71717a] font-mono leading-relaxed">
                {item.description}
              </p>

              {/* Visual Corners */}
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
