"use client";

import { useRef } from "react";
import { Share2, Calendar } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

      // Grid Animation
      const items = (gridRef.current as any).children;
      gsap.from(items, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-transparent py-20 px-6 md:px-12 w-full text-center border-t-2 border-dashed border-white/10 font-pixel"
    >
      {/* Header */}
      <div ref={headerRef}>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#71717a] mb-4">
          Core
        </h3>
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 tracking-wide text-white">
          What Makes LNC Different
        </h2>
        <p className="max-w-3xl mx-auto text-white/80 text-sm md:text-base leading-relaxed mb-16 font-mono">
          We built LNC around three pillars that matter. Each one drives how we
          work and who we become as a community.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
      >
        {/* Item 1 */}
        <div className="flex flex-col items-center">
          <Share2 className="w-10 h-10 mb-6 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-bold uppercase mb-4 tracking-wider text-white">
            Open-Source Collaboration
          </h3>
          <p className="text-white/60 text-xs md:text-sm font-mono leading-relaxed max-w-xs">
            We create together, share freely, and believe good code belongs to
            everyone.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center">
          <Share2
            className="w-10 h-10 mb-6 text-white rotate-180"
            strokeWidth={1.5}
          />
          <h3 className="text-lg font-bold uppercase mb-4 tracking-wider text-white">
            Knowledge Sharing
          </h3>
          <p className="text-white/60 text-xs md:text-sm font-mono leading-relaxed max-w-xs">
            Learning happens when we teach each other, not when we hoard what we
            know.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center">
          <Calendar className="w-10 h-10 mb-6 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-bold uppercase mb-4 tracking-wider text-white">
            Inclusive Events
          </h3>
          <p className="text-white/60 text-xs md:text-sm font-mono leading-relaxed max-w-xs">
            Our doors are open to anyone willing to show up and do the work.
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-20 flex justify-center items-center gap-4">
        <button className="px-8 py-3 bg-purple-500 text-white font-bold text-xs uppercase tracking-widest border-2 border-purple-500 hover:bg-purple-400 transition shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
          Explore
        </button>
        <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer hover:underline text-white">
          Arrow &gt;
        </span>
      </div>
    </section>
  );
}
