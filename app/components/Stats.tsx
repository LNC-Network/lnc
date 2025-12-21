"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      // Header Animation
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

      // Stats Counting & Scramble Animation
      const statItems = (statsRef.current as any).children;
      Array.from(statItems).forEach((item: any) => {
        const numberEl = item.querySelector("h3");
        // Remove formatting to get raw number
        const rawText = numberEl.textContent.replace(/,/g, "").replace(/\+/g, "");
        const targetValue = parseInt(rawText);
        const suffix = numberEl.textContent.includes("+") ? "+" : "";
        const chars = "XYZ0123456789!@#$%^&*";

        // Fade in
        gsap.from(item, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });

        // Scramble / Count Effect
        gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
            duration: 2.5,
            ease: "circ.out",
            onUpdate: function () {
              const progress = this.progress();
              // Calculate current numeric value
              const currentNum = Math.floor(targetValue * progress);
              // Format it
              const currentStr = currentNum.toLocaleString();

              // Scramble Logic:
              // Replace some characters with random glyphs based on progress (inverse)
              // As progress -> 1, scramble -> 0
              if (progress < 1) {
                const scrambled = currentStr.split('').map(char => {
                  // 30% chance to be random character if not done
                  return Math.random() < (1 - progress) * 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char;
                }).join('');
                numberEl.textContent = scrambled + suffix;
              } else {
                numberEl.textContent = currentStr + suffix;
              }
            },
            onComplete: () => {
              numberEl.textContent = targetValue.toLocaleString() + suffix;
            }
          }
        );
      });
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
          {/* Stat 1 */}
          <div className="pl-8 border-l border-white/10 md:border-l-0 md:border-r">
            <h3 className="text-4xl md:text-6xl font-black text-white mb-2">
              2,400+
            </h3>
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717a]">
              Active Members
            </p>
          </div>

          {/* Stat 2 */}
          <div className="pl-8 border-l border-white/10 md:border-l-0 md:border-r">
            <h3 className="text-4xl md:text-6xl font-black text-white mb-2">
              180+
            </h3>
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717a]">
              Projects Shipped
            </p>
          </div>

          {/* Stat 3 */}
          <div className="pl-8 border-l border-white/10 md:border-l-0">
            <h3 className="text-4xl md:text-6xl font-black text-white mb-2">
              45
            </h3>
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717a]">
              Events Hosted Yearly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
