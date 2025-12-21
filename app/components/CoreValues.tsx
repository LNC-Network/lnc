"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { EVENTS } from "../data/events";
import EventCard from "./EventCard";

gsap.registerPlugin(ScrollTrigger);

export default function EventsShowcase() {
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
      gsap.set(items, { opacity: 0, y: 40 }); // Set initial state
      gsap.to(items, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
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
      className="bg-transparent pt-20 pb-0 px-6 md:px-12 w-full text-center border-t-2 border-dashed border-white/10 font-pixel"
    >
      {/* Header */}
      <div ref={headerRef}>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#71717a] mb-4">
          Community
        </h3>
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 tracking-wide text-white">
          Upcoming Events
        </h2>
        <p className="max-w-3xl mx-auto text-white/80 text-sm md:text-base leading-relaxed mb-16 font-mono">
          Join us, learn together, and build the future. Here is what is happening next.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {EVENTS.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Button */}
      <div className="mt-16 flex justify-center items-center gap-6">
        <Link href="/events" className="relative group px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest border-2 border-white hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
          View All Events
        </Link>
      </div>
    </section>
  );
}
