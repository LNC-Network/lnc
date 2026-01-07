"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PARTNERS } from "@/app/data/partners";
gsap.registerPlugin(ScrollTrigger);
export default function Partners() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
        gsap.to(headerRef.current, { opacity: 1 });
      }
      if (gridRef.current) {
        const items = gridRef.current.children;
        gsap.from(items, {
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        });
        gsap.to(items, { opacity: 1 });
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
        <div
          ref={headerRef}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white mb-4">
            POWERED BY THE BEST
          </h2>
          <div className="h-1 w-24 bg-purple-500 rounded-full" />
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="group relative w-full aspect-video flex items-center justify-center border  bg-card hover:bg-secondary transition-all duration-300 cursor-pointer rounded-sm"
            >
              <span className="text-sm md:text-base font-bold text-white/50 group-hover:text-white transition-colors duration-300 tracking-widest">
                {partner}
              </span>
              <div className="absolute top-0 left-0 w-1 h-1 bg-white group-hover:bg-purple-500 transition-colors" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-white group-hover:bg-purple-500 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
