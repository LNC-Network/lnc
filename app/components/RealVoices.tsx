"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Card } from "@/components/ui/card";

const LEADS = [
  {
    name: "Sarah Chen",
    role: "Lead Architect",
    quote: "We’re not just writing code. We’re architecting open collaboration.",
    image: "/avatar_sarah.png",
  },
  {
    name: "Marcus Rodriguez",
    role: "Community Lead",
    quote: "Communities scale only when every voice matters.",
    image: "/avatar_marcus.png",
  },
  {
    name: "Alex Thompson",
    role: "Design Lead",
    quote: "Design is how it feels to build together.",
    image: "/avatar_alex.png",
  },
  {
    name: "Emily Davis",
    role: "DevOps Lead",
    quote: "Speed means nothing without stability.",
    image: "/avatar_sarah.png",
  },
  {
    name: "David Kim",
    role: "Security Lead",
    quote: "Trust is our most valuable system.",
    image: "/avatar_marcus.png",
  },
  {
    name: "Jessica Lee",
    role: "Product Lead",
    quote: "Building the right thing comes first.",
    image: "/avatar_alex.png",
  },
  {
    name: "Ryan Park",
    role: "Education Lead",
    quote: "Teaching multiplies impact.",
    image: "/avatar_sarah.png",
  },
];

// repeat same data
const LOOPED_LEADS = [...LEADS, ...LEADS, ...LEADS];

export default function RealVoices() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple scroll animation for the entire section appearing
  // We can add this back if desired, but sticking to clean native scroll for the cards

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 font-pixel"
    >
      {/* Header */}
      <div className="mb-16 px-6 md:px-12 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
          Leadership
        </p>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-white">
          Meet the Leads
        </h2>
      </div>

      {/* Scroll Track */}
      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

        <div
          className="flex gap-8 overflow-x-auto pl-6 pr-24 md:pl-12 py-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {LEADS.map((lead, i) => (
            <Card
              key={i}
              className="
                snap-center flex-shrink-0
                w-[300px] md:w-[360px]
                bg-[#1f1f23]
                border border-white/10
                p-8 text-center
                shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                transition-all duration-300
                hover:bg-[#27272a] hover:border-white/30 hover:scale-[1.02]
              "
            >
              <div className="mb-6 text-4xl font-serif text-white/15">“</div>

              <p className="mb-10 min-h-[72px] text-xs md:text-sm font-bold uppercase leading-relaxed text-white/90">
                {lead.quote}
              </p>

              <div className="mt-auto border-t border-white/10 pt-6 flex flex-col items-center">
                <div className="mb-4 h-12 w-12 overflow-hidden rounded-full border border-white/20">
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h4 className="text-sm font-black uppercase tracking-wider text-white">
                  {lead.name}
                </h4>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {lead.role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
